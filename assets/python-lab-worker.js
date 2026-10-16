/* Learner code executes only in a disposable browser worker, never on the host/server. */
"use strict";
const CDN="https://cdn.jsdelivr.net/pyodide/v0.28.0/full/";
self.onmessage=async ({data})=>{
  try{
    self.postMessage({stage:"loading"});
    importScripts(CDN+"pyodide.js");
    const py=await loadPyodide({indexURL:CDN});
    const sources=[data.code,...(data.tests||[]).map(t=>t.code)].join("\n");
    await py.loadPackagesFromImports(sources);
    py.globals.set("__lab_payload",JSON.stringify(data));
    self.postMessage({stage:"running"});
    const serialized=await py.runPythonAsync(`
import json, io, contextlib, tempfile, os, traceback, sys, base64
payload = json.loads(__lab_payload)
os.environ["MPLBACKEND"] = "Agg"
class LimitedOutput(io.StringIO):
    def write(self, text):
        room = max(0, 20000 - self.tell())
        super().write(text[:room])
        return len(text)
def charts():
    if "matplotlib.pyplot" not in sys.modules:
        return []
    plt = sys.modules["matplotlib.pyplot"]
    result = []
    for number in plt.get_fignums()[:2]:
        buffer = io.BytesIO()
        plt.figure(number).savefig(buffer, format="png", dpi=90)
        encoded = base64.b64encode(buffer.getvalue()).decode("ascii")
        if len(encoded) < 2000000:
            result.append(encoded)
    return result
results, images, output = [], [], ""
cases = payload.get("tests") or [{"label": "예제 실행", "code": ""}]
for index, case in enumerate(cases):
    namespace = {"__name__": "__main__"}
    captured = LimitedOutput()
    previous = os.getcwd()
    try:
        with tempfile.TemporaryDirectory() as directory:
            os.chdir(directory)
            try:
                with contextlib.redirect_stdout(captured), contextlib.redirect_stderr(captured):
                    exec(compile(payload["code"], "learner.py", "exec"), namespace)
                    exec(compile(case["code"], "criteria.py", "exec"), namespace)
                results.append({"pass": True, "label": case["label"]})
            except BaseException as error:
                results.append({"pass": False, "label": case["label"], "errorType": type(error).__name__, "error": str(error)[:1200], "trace": "".join(traceback.format_exception(type(error), error, error.__traceback__))[-2500:]})
            if index == 0:
                output = captured.getvalue()
                images = charts()
            if "matplotlib.pyplot" in sys.modules:
                sys.modules["matplotlib.pyplot"].close("all")
            os.chdir(previous)
    finally:
        os.chdir(previous)
json.dumps({"results": results, "output": output, "images": images}, ensure_ascii=False)
`);
    self.postMessage({stage:"complete",result:JSON.parse(serialized)});
  }catch(error){
    self.postMessage({stage:"error",message:String(error.message||error).slice(0,1500)});
  }
};
