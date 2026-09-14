from pathlib import Path
import base64, hashlib, json, lzma, re, subprocess
root=Path(__file__).resolve().parent.parent
raw=lzma.decompress(base64.b64decode(''.join((root/'integration'/('payload-%02d.b64'%i)).read_text().strip() for i in range(7))))
assert hashlib.sha256(raw).hexdigest()=='e030510e41f5566067a254150fbb100c2d9cb55beb7ebd835f073ff535cf8a49', 'Payload integrity mismatch'
data=json.loads(raw)
index=(root/'index.html').read_text()
assert hashlib.sha256(index.encode()).hexdigest()==data['base_sha256'], 'Main source changed since review'
lines=index.splitlines(keepends=True)
for a,b,text in reversed(data['index_edits']):
    lines[a:b]=[text]
index=''.join(lines)
libs=[]
for name in ['qrcode.js','jsQR.js']:
    text=(root/'.build/vendor'/name).read_text()
    text=re.sub(r'</script',r'<\\/script',text,flags=re.I)
    libs.append('<script>\n'+text+'\n</script>')
bundled='\n'.join(libs)
out=root/'release'
out.mkdir(exist_ok=True)
values={'index.html':index.replace('<!-- BREAKFAST_BUNDLED_QR_LIBRARIES -->',bundled),'breakfast-tablet.html':data['tablet'].replace('<!-- BREAKFAST_BUNDLED_QR_LIBRARIES -->',bundled),'README.md':data['readme']}
for name,text in values.items():
    blob=text.encode()
    assert hashlib.sha256(blob).hexdigest()==data['manifest'][name]['sha256'], name+' differs from locally built release'
    (out/name).write_bytes(blob)
    if name.endswith('.html'):
        assert not re.search(r'<script[^>]+src=',text,re.I)
        for i,script in enumerate(re.findall(r'<script(?:\s[^>]*)?>([\s\S]*?)</script>',text,re.I)):
            p=root/'.build'/('check-'+name+'-'+str(i)+'.js');p.write_text(script)
            subprocess.run(['node','--check',str(p)],check=True)
(root/'release-manifest.json').write_text(json.dumps(data['manifest'],indent=2))
print('All three release files match the locally reviewed SHA256 hashes. All scripts pass syntax validation.')
