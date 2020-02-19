const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  });

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'cryptowatch-win32-ia32/'),
    authors: 'Nestor Peralta',
    noMsi: true,
    outputDirectory: path.join(outPath, 'installer'),
    exe: 'cryptowatch.exe',
    setupExe: 'cryptowatchInstaller.exe',
    setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico'),
    description: 'Application for spotting BTC price'
  });
};