import { test, expect, type Page, _electron as electron, ElectronApplication } from '@playwright/test';
import { 
  clickMenuItemById,
  findLatestBuild, 
  ipcMainCallFirstListener, 
  ipcRendererCallFirstListener, 
  parseElectronApp,
  ipcMainInvokeHandler,
  ipcRendererInvoke
} from 'electron-playwright-helpers'

const eph = require('electron-playwright-helpers')

let electronApp: ElectronApplication;

test.beforeEach(async ({ page }) => {
  // find the latest build in the out directory
  const latestBuild = findLatestBuild()
  // parse the packaged Electron app and find paths and other info
  const appInfo = parseElectronApp(latestBuild)
  electronApp = await electron.launch({
    args: [appInfo.main],
    executablePath: appInfo.executable,
  })
});

test.describe('Main Page', () => {
  test('has title', async ({ page }) => {
    const window = await electronApp.firstWindow();
    // Print the title.
    console.log(await window.title());
  // Capture a screenshot.
    await window.screenshot({ path: 'intro.png' });
    // Direct Electron console to Node terminal.
    window.on('console', console.log);
    // Exit app.
    await electronApp.close();
  });

  /**
   * Test that the text input panel can receive text input
   */
  test("paste in text", async () => {
    const page = await electronApp.firstWindow()

    await page.evaluate(() => navigator.clipboard.writeText('Hello, World!'));

    await page.waitForSelector('#text-input-panel');
    await page.click("#text-input-panel");
    await page.dispatchEvent('#text-input-panel', 'input', { text: 'Hello, World!' });

    const modifier = true ? 'Meta' : 'Control';
    await page.keyboard.press(`${modifier}+KeyV`);

    const inputValue = await (await page.waitForSelector('#text-input-panel')).textContent();

    expect(inputValue).toBe('Hello, World!');
  });

  test('open a DOCX file', async () => {
    const page = await electronApp.firstWindow()
    await page.getByRole('button', { name: 'File' }).click();
    await page.getByText('Load File').click();
    await eph.stubDialog(electronApp, 'showOpenDialog', { filePaths: ['./files/article.docx'] })
    // const result = await eph.ipcMainInvokeHandler(electronApp, 'spawn-file-dialog')
    // expect(result).toBe('./files/article.docx')
    const inputValue = await (await page.waitForSelector('#text-input-panel')).textContent();
    expect(inputValue).toBe('Hello, World!');
  })
});
