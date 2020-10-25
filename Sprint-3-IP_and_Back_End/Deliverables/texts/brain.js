// Set a listener function for the button click
document.getElementById('submitButton').onclick = function () {

    // Get the current string in the text box
    var input = document.getElementById('inputBox').value;

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", responseListener);
    oReq.open("GET", "https://PATH-TO-MIMIR-WORKSPACE/search?query=" + input);
    oReq.send();
}

function responseListener() {
    document.getElementById('responseDiv').innerHTML = this.responseText;
}
