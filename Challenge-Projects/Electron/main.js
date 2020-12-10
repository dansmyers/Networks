const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow} = electron;

let mainWindow;
let addWindow;

// listen for app
app.on('ready', function(){
  // create new window
  mainWindow = new BrowserWindow({});
  
  // load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
  
  // quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });
  
  // build menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  
  // insert menu
  Menu.setApplicationMenu(mainMenu);
});

// create add window
function createAddWindow(){
  // create new window
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add Note'
  });
  
  // load html into window
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file',
    slashes: true
  }));
  
  addWindow.on('close', function(){
    addWindow = null;
  });
}

// catch item:add
ipcMain.on('item:add', function(e, item){
  mainWindow.webContents.send('item:add', item);
  addWindow.close();
});

// create menu template
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add Note',
        click(){
          createAddWindow();
        }
      },
      {
        label: 'Clear Notes',
        click(){
          mainWindow.webContents.send('item:clear');
        }
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' :
        'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

// if mac to fix menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

// add dev tools if not in production
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' :
        'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]    
  });     
}       
        
        
        
        
        
          
