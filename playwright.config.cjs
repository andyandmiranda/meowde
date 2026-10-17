const {defineConfig}=require("playwright/test");
module.exports=defineConfig({
 testDir:"./tests",timeout:45000,workers:1,reporter:[["list"],["json",{outputFile:"artifacts/browser-results.json"}]],
 outputDir:"artifacts/test-results",
 use:{browserName:process.env.MEOWDE_TEST_BROWSER||"chromium",...(process.env.MEOWDE_BROWSER_CHANNEL?{channel:process.env.MEOWDE_BROWSER_CHANNEL}:{}),screenshot:"only-on-failure",trace:"off"},
 webServer:process.env.MEOWDE_BASE_URL?undefined:{command:"node tools/serve-preview.cjs",url:"http://127.0.0.1:4173",reuseExistingServer:false},
});
