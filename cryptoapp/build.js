// C:\Users\npera\Desktop\work\projects\electron-workspace\build.js
var electronInstaller = require('electron-winstaller');

// In this case, we can use relative paths
var settings = {
    // Specify the folder where the built app is located
    appDirectory: './testrelease-builds/cryptowatch',
    // Specify the existing folder where 
    outputDirectory: './installer-release-builds',
    // The name of the Author of the app (the name of your company)
    authors: 'NP',
    // The name of the executable of your built
    exe: './cryptowatch.exe',
    // The description of the app
    description: 'Stay updated with btc price'
};

resultPromise = electronInstaller.createWindowsInstaller(settings);
 
resultPromise.then(() => {
    console.log("The installers of your application were succesfully created !");
}, (e) => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`)
});