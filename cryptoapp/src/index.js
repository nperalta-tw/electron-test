const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const axios = require('axios');
const ipc = electron.ipcRenderer;

const notifyBtn = document.getElementById('notifyBtn');
var price = document.getElementById('price');
var targetPrice = document.getElementById('targetPrice');
var targetPriceVal

const notification = {
  title: 'BTC Alert',
  body: 'BTC just exceeded your target price!',
  icon: path.join(__dirname, '../assets/icons/win/icon.ico')
}

const apiKey = 'ff4e4a941660c7090516ebf44a657276f9cc52a775362afd901d4a2fcc27a35f'
const headers = "ApiKey" + apiKey

function getBTC () {
  axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=ff4e4a941660c7090516ebf44a657276f9cc52a775362afd901d4a2fcc27a35f')
    .then(res => {
      const btcPrice = res.data.USD;
      price.innerHTML = '$'+btcPrice.toLocaleString('en');

      if (targetPrice.innerHTML != '' && targetPriceVal < btcPrice) {
        const myNotification = new window.Notification(notification.title, notification);
      }
    })
}

getBTC();
setInterval(getBTC, 10000);

notifyBtn.addEventListener('click', function(event) {
  const modalPath = path.join('file://', __dirname, 'add.html');
  let win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    alwaysOnTop: true, 
    transparent: true, 
    frame: false, 
    width: 400, 
    height: 200
  });
  win.on('close', function() {win = null});
  win.loadURL(modalPath);
  win.show();
})

ipc.on('targetPriceVal', function(event, arg) {
  targetPriceVal = Number(arg);
  console.log(targetPriceVal);
  console.log(targetPrice);
  console.log(__dirname, __filename);
  targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en');
});