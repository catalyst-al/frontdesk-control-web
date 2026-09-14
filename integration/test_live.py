import asyncio,json
from pathlib import Path
from urllib.parse import urlsplit,parse_qs
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parent.parent
RESULT=[]
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True,args=['--no-sandbox'])
  a=await browser.new_context(viewport={'width':1440,'height':1000})
  b=await browser.new_context(viewport={'width':820,'height':1180})
  errors=[];pairs={};signals=[]
  async def signal(route):
   req=route.request
   headers={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET, POST, DELETE, OPTIONS','Access-Control-Allow-Headers':'content-type','Content-Type':'application/json'}
   if req.method=='OPTIONS':await route.fulfill(status=204,headers=headers);return
   parts=urlsplit(req.url);key=parts.path.split('/');obj={};status=200
   if req.method=='POST' and parts.path=='/pair':
    data=json.loads(req.post_data);pairs[data['id']]=data;signals.append(data);obj={'ok':True}
   elif len(key)>2:
    pair=pairs.get(key[2]);token=(parse_qs(parts.query).get('token')or[''])[0]
    if req.method=='POST':token=json.loads(req.post_data).get('token')
    if not pair or pair.get('token')!=token:status=404;obj={'error':'not found'}
    elif req.method=='DELETE':pairs.pop(key[2],None);obj={'ok':True}
    elif req.method=='POST':pair['answer']=json.loads(req.post_data)['answer'];obj={'ok':True}
    elif parts.path.endswith('/answer'):obj={'ready':bool(pair.get('answer')),'answer':pair.get('answer')}
    else:obj={'offer':pair['offer']}
   await route.fulfill(status=status,headers=headers,body=json.dumps(obj))
  for ctx in [a,b]:
   await ctx.add_init_script('window.__wire=[];const send=RTCDataChannel.prototype.send;RTCDataChannel.prototype.send=function(x){window.__wire.push(String(x));return send.call(this,x);};')
   await ctx.route('https://parkinn-breakfast-signaling.stivenjanaqi1.workers.dev/**',signal)
   await ctx.route('https://frontdesk.test/**',lambda route:route.fulfill(path=str(ROOT/'release'/route.request.url.rsplit('/',1)[-1]),content_type='text/html'))
  pc=await a.new_page();tb=await b.new_page()
  pc.on('pageerror',lambda e:errors.append('PC: '+str(e)));tb.on('pageerror',lambda e:errors.append('Tablet: '+str(e)))
  async def wait_stat(name,value):
   await pc.wait_for_function('(x)=>document.querySelector("#breakfastLiveHost").shadowRoot.getElementById(x[0]).textContent===String(x[1])',arg=[name,value])
  async def source(d):
   await pc.evaluate('(d)=>{localStorage.setItem("parkInnBreakfastSession_v1",JSON.stringify(d));window.dispatchEvent(new Event("frontdesk:breakfast-session"));}',d)
  await pc.goto('https://frontdesk.test/index.html')
  assert await pc.locator('.tab').count()==6
  tabs=await pc.locator('.tab').evaluate_all('(els)=>els.map(e=>e.id)')
  assert tabs[-2:]==['tab-nightaudit','tab-breakfastlive']
  await pc.locator('#tab-breakfastlive').click()
  await pc.locator('#breakfastLiveHost #sourceBox').wait_for()
  assert 'No Breakfast report' in await pc.locator('#breakfastLiveHost #sourceBox').inner_text()
  fixture={'rooms':[{'room':'101','status':'INCLUDED','names':['PRIVATE_SENTINEL_NAME']},{'room':'102','status':'UPGRADE'},{'room':'103','status':'PRIVATE_SENTINEL_STATUS'}],'fileName':'PRIVATE_SENTINEL_FILENAME.pdf','reportDateStr':'14.09.2026','auditLog':[]}
  await source(fixture);await wait_stat('stRooms',3)
  RESULT.append('six native tabs; instant source update; blank-start behavior')
  await tb.goto('https://frontdesk.test/breakfast-tablet.html')
  await tb.evaluate('document.querySelectorAll("main>section").forEach(e=>e.classList.remove("on"));document.getElementById("screen-staff").classList.add("on");')
  async def pair():
   await pc.locator('#tab-breakfastlive').click()
   await pc.locator('#breakfastLiveHost #createOfferBtn').click()
   await pc.locator('#breakfastLiveHost #offerQr canvas').wait_for(timeout=15000)
   qr=ROOT/'.build/test-pair.png'
   await pc.locator('#breakfastLiveHost #offerQr canvas').screenshot(path=str(qr))
   await tb.locator('#rtcQrPhotoInput').set_input_files(str(qr))
   await pc.wait_for_function('document.getElementById("breakfastLiveBadge").textContent==="Live"',timeout=25000)
   await tb.wait_for_function('document.getElementById("rtcStatus").textContent.includes("Connected")',timeout=25000)
   await pc.wait_for_function('document.querySelector("#breakfastLiveHost").shadowRoot.getElementById("syncText").textContent.includes("confirmed")',timeout=10000)
  try:
   await pair()
   stored=await tb.evaluate('JSON.parse(localStorage.getItem("parkInnBreakfastGuestList_v1"))')
   assert stored['meta']['count']==3
   assert stored['rooms']['0103']['s']=='UNKNOWN'
   wire=await pc.evaluate('window.__wire')
   assert 'PRIVATE_SENTINEL' not in '\n'.join(wire)
   assert 'PRIVATE_SENTINEL' not in json.dumps(signals)
   RESULT.append('one QR photo -> signaling -> real WebRTC DataChannel -> 3-room acknowledgement; privacy canaries absent')
   await tb.locator('#backBtn').click()
   async def enter(room):
    await tb.wait_for_function('!document.getElementById("answer").classList.contains("on")',timeout=12000)
    for d in room:await tb.locator('#keypad [data-k="'+d+'"]').click()
    await tb.wait_for_function('document.getElementById("answer").classList.contains("on")')
    await asyncio.sleep(.3)
   await enter('0101');await wait_stat('stTotal',1)
   await pc.locator('#tab-nightaudit').click()
   await enter('0101');await enter('0999');await wait_stat('stTotal',3)
   assert await pc.locator('#breakfastLiveBadge').text_content()=='Live'
   for name in ['vcc','handover','group','breakfast','nightaudit','breakfastlive']:
    await pc.locator('#tab-'+name).click()
    assert await pc.locator('.tabpanel.active').count()==1,name
   logs=await pc.evaluate('JSON.parse(localStorage.getItem("parkInnBreakfastBridgeLog_v1"))')
   assert [x['result'] for x in logs]==['ok','repeat','ask']
   RESULT.append('welcomed / repeat / reception events; connection retained across every original tab')
   await pc.locator('#tab-nightaudit').click()
   fixture['rooms'].append({'room':'104','status':'INCLUDED','names':['PRIVATE_SENTINEL_TWO']})
   await source(fixture)
   await tb.wait_for_function('JSON.parse(localStorage.getItem("parkInnBreakfastGuestList_v1")).meta.count===4')
   RESULT.append('hidden-panel automatic list update to 4 rooms')
   await pc.locator('#tab-breakfastlive').click()
   await pc.screenshot(path=str(ROOT/'pc-preview.png'),full_page=True)
   await tb.wait_for_function('!document.getElementById("answer").classList.contains("on")',timeout=12000)
   await tb.screenshot(path=str(ROOT/'tablet-preview.png'),full_page=True)
   await pc.locator('#breakfastLiveHost #disconnectBtn').click()
   await enter('0104')
   assert len(await pc.evaluate('JSON.parse(localStorage.getItem("parkInnBreakfastBridgeLog_v1"))'))==3
   await pair();await wait_stat('stTotal',4)
   await pc.locator('#breakfastLiveHost #snapshotBtn').click();await asyncio.sleep(1)
   assert len(await pc.evaluate('JSON.parse(localStorage.getItem("parkInnBreakfastBridgeLog_v1"))'))==4
   RESULT.append('offline tablet lookup and log; re-pair restores missing event once; repeated snapshots deduplicated')
   packets=await pc.evaluate('window.__wire')+await tb.evaluate('window.__wire')
   assert all('PRIVATE_SENTINEL' not in x for x in packets)
   assert len(packets)>10
   assert max(len(x.encode()) for x in packets)<65536
   await pc.locator('#breakfastLiveHost #disconnectBtn').click()
   await pc.reload()
   assert await pc.locator('#panel-breakfastlive').evaluate('e=>e.classList.contains("active")')
   assert await pc.locator('#breakfastLiveHost #stTotal').text_content()=='4'
   RESULT.append('selected native tab and retained PC log restore after reload')
   assert not errors,errors
   (ROOT/'test-results.json').write_text(json.dumps({'passed':RESULT,'javascript_errors':errors,'wire_messages':len(packets),'network':'Mock signaling endpoint; real Chromium WebRTC data channels; isolated browser contexts, not hotel Wi-Fi.'},indent=2))
   print(json.dumps(RESULT,indent=2))
  except Exception:
   await pc.screenshot(path=str(ROOT/'failure-pc.png'),full_page=True)
   await tb.screenshot(path=str(ROOT/'failure-tablet.png'),full_page=True)
   print('Completed tests:',RESULT,'JavaScript errors:',errors)
   print('PC state:',await pc.locator('#breakfastLiveHost #pairNote').inner_text())
   print('Tablet state:',await tb.locator('#rtcMeta').inner_text())
   raise
  finally:
   await browser.close()
asyncio.run(main())
