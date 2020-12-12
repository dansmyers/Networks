const electron = require('electron');


const path = require('path');
const url = require('url');


// SET ENV
process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain} = electron;



let mainWindow;
let addWindow;
let addWindowTwo;

app.on('ready', function(){
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        
    });
     mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
    }));

     // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
    
});



// Handle add item window
function createAddWindow(){
  addWindow = new BrowserWindow({
    width: 500,
    height:300,
    title:'Player info'
  });
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Handle garbage collection
  addWindow.on('close', function(){
    addWindow = null;
  });
}

function createAddWindowTwo(){
  addWindowTwo = new BrowserWindow({
    width: 800,
    height:600,
    title:'Slug %'
  });
  addWindowTwo.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindowTwo.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Handle garbage collection
  addWindowTwo.on('close', function(){
    addWindowTwo = null;
  });
}


// Create menu template
const mainMenuTemplate =  [
  // Each object is a dropdown
  {
    label: 'File',
    submenu:[
      {
        label:'Look at gif',
        click(){
          createAddWindow();
        }
      },{
        label:'Slug% calculator',
        click(){
          createAddWindowTwo();
        }
      },
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

// If OSX, add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}


// Add developer tools option if in dev
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}