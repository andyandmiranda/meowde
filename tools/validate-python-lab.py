"""Execute only repository-authored examples/models and regression mutations, never submissions."""
import contextlib, copy, io, json, os, tempfile
from pathlib import Path

root=Path(__file__).resolve().parents[1]
temporary_root=root.parent/'python-lab-test-tmp'
temporary_root.mkdir(exist_ok=True)
data=json.loads((root/'assets/python-lab-content.json').read_text(encoding='utf-8'))
seen=set(); checks=0
os.environ['MPLBACKEND']='Agg'
for unit in data['units']:
    assert unit['id'] not in seen
    assert set(unit['prerequisites']) <= seen, f"Unintroduced prerequisite: {unit['id']}"
    seen.add(unit['id'])
    for field in ['concept','goals','glossary','flow','pitfalls']:
        assert unit[field], (unit['id'], field)
    assert len(unit['quiz']['reasons'])==len(unit['quiz']['choices'])
    assert 0 <= unit['quiz']['answer'] < len(unit['quiz']['choices'])
    task=unit['task']
    assert len(task['tests']) >= 4 and len(task['hints'])==3
    with tempfile.TemporaryDirectory(dir=temporary_root) as directory:
        previous=os.getcwd();os.chdir(directory)
        try:
            output=io.StringIO()
            with contextlib.redirect_stdout(output):
                exec(compile(unit['example'],'example.py','exec'),{})
            assert output.getvalue().strip()==unit['output'].strip(), (unit['id'],output.getvalue(),unit['output'])
            for case in task['tests']:
                namespace={}
                exec(compile(task['model'],'model.py','exec'),namespace)
                exec(compile(case['code'],'criteria.py','exec'),namespace)
                checks+=1
            # Starter stubs must not be accepted by every criterion.
            failures=0
            for case in task['tests']:
                namespace={}
                try:
                    exec(compile(task['starter'],'starter.py','exec'),namespace)
                    exec(compile(case['code'],'criteria.py','exec'),namespace)
                except Exception: failures+=1
            assert failures > 0, f"Stub accepted: {unit['id']}"
            if 'matplotlib.pyplot' in __import__('sys').modules:
                __import__('matplotlib.pyplot',fromlist=['close']).close('all')
        finally:os.chdir(previous)
    print('PASS',unit['id'])

def rejected(id,source,label):
    u=next(u for u in data['units'] if u['id']==id)
    case=next(c for c in u['task']['tests'] if c['label']==label)
    ns={}
    try:
        exec(source,ns);exec(case['code'],ns)
    except Exception:return
    raise AssertionError(f'Incorrect implementation accepted: {id}/{label}')

rejected('functions','def append_tag(tag,tags=[]):\n    tags.append(tag)\n    return tags','기본 호출 독립성')
rejected('copy','def shift(grid,delta):\n    return grid[:]','참조 독립성')
rejected('pandas-clean','import pandas as pd\ndef summarize(df):\n    return df.dropna(subset=["value"]).drop_duplicates("id",keep="last").groupby("zone")["value"].sum().to_dict()','최신 누락의 의미')
rejected('branches','def shipping(total,member):\n    return 0 if total > 30000 or member else 2500','경계 포함')
print(json.dumps({'units':len(seen),'reference_model_checks':checks,'mutation_rejections':4,'examples':len(seen)},ensure_ascii=False))
