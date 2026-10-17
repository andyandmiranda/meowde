# Run from any directory: python tools/audit-python-beginner.py [report.json]
# Checks the effective data stack, not browser bootstrap or teaching effectiveness.
import json,subprocess,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
x=json.loads(subprocess.check_output(['node','tools/effective-curriculum.cjs'],cwd=ROOT,text=True));report=[];failures=[]
fill_outputs=['Meowde','2026','python','츄르','13','12','cat','12','Amy','Hi Mina','Hi Jieun','13','OK','True','통과','다시','선선','입장','출발','bird','dog','milk']
# Outputs translated in the curriculum are specified explicitly, not copied from answers under test.
en_fill=['Meowde','2026','python','treat','13','12','cat','12','Amy','Hi Mina','Hi Jieun','13','OK','True','Pass','Try again','Cool','Enter','Go','bird','dog','milk']
fixtures={'if-gate-f':'score = 90\n','else-cabin-b':'score = 50\n','elif-mushroom-f':'temp = 20\n','elif-mushroom-b':'temp = 20\n','logic-lantern-f':'age = 12\nhas_ticket = True\n'}
def run(code,stdin='Amy'):
 p=subprocess.run([sys.executable,'-I','-c',code],input=stdin+'\n',capture_output=True,text=True,timeout=4)
 return p.stdout.strip(),p.stderr.strip(),p.returncode
for lang in ['ko','en']:
 for i,l in enumerate(x[lang][:22]):
  row={'lang':lang,'index':i+1,'slug':l['slug'],'exercises':[]}
  for e in l['exercises']:
   typ=e['type'];code=None;expected=None
   if typ=='predict':code=e['code'];expected=e.get('output',e['choices'][e['answer']])
   if typ=='write':code=e['model'];expected=e['expected']
   if typ=='concept':code=e['code']
   if typ=='fill':code=fixtures.get(e['id'],'')+e['code'].replace('____',e['answer']);expected=(fill_outputs if lang=='ko' else en_fill)[i]
   if typ=='bughunt':
    lines=e['lines'].copy();lines[e['buggy']]=e['fixed'];code=fixtures.get(e['id'],'')+'\n'.join(lines)
   out,err,ret=run(code,e.get('stdin',{}).get('default','Amy'))
   error_expected=typ=='predict' and str(expected).endswith('Error')
   ok=(ret!=0 and (str(expected)+':') in err) if error_expected else ret==0 and (expected is None or out==str(expected).strip())
   item={'id':e['id'],'type':typ,'status':'PASS' if ok else 'FAIL','output':out}
   if not ok:item.update(expected=expected,error=err);failures.append(item)
   row['exercises'].append(item)
  report.append(row)
if len(sys.argv)>1:
 with open(sys.argv[1],'w') as target:json.dump({'method':'CPython isolated execution; explicit fixture context for incomplete fragments; not browser or mastery evidence','rows':report,'failures':failures},target,ensure_ascii=False,indent=2)
print('Exercises',sum(len(r['exercises']) for r in report),'failures',len(failures))
for e in failures:print(e)
raise SystemExit(bool(failures))
