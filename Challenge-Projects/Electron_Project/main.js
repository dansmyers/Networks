const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let createEventwindow;


// Prepare to run the app

app.on('ready', function(){

    // Create the mainwindow

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load the HTML file into window;
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    })); 

    // Quit application when closed

    mainWindow.on('closed', function(){
        app.quit();
    })


    // Build a menu from the menu template

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Insert the menu
    Menu.setApplicationMenu(mainMenu);

});

// Create AddEvent Window

function createAddEventWindow() {

    addEventWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 400,
        height: 400,
        title: 'Add a New Event'
        
    });

    // Load the HTML file into window;
    addEventWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addEventWindow.html'),
        protocol: 'file:',
        slashes: true
    })); 

    // Handle old windows

    addEventWindow.on('close', function(){
        addEventWindow = null;
    });

}

// Receive item:add

ipcMain.on('item:add', function(e, items) {
    // Send the contents of the item to the main windown to be in the itinerary
    mainWindow.webContents.send('item:add', items);

    // Close add event window
    addEventWindow.close();
});


// create a menu template

const mainMenuTemplate = [
    {
        label: 'Electron',
        submenu: [
            {
                label: 'About'
            }
        ]
    },

    {
        label: 'File',
        submenu: [
            {
                label:'Add Event',
                accelerator: 'Command+Plus',
                click() {
                    createAddEventWindow();
                }
            },
            {
                label:'Clear Events',
                accelerator:'Command+-',
                click() {
                    mainWindow.webContents.send('item:clear');
                }
            },
            {
                label: 'Quit',
                accelerator: 'Command+Q',
                click(){
                    app.quit();
                }
            }

        ]
    }

];

// Developer tools

if(process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle On',
                // Click Toggle On function
                // We need to focus on the specific window that we are currently looking at to know where the DevTools should open
                accelerator: 'Command+D',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }   
            },
            {
                // Can reload the page
                role: 'reload'
            }
        ]   
    })
}
