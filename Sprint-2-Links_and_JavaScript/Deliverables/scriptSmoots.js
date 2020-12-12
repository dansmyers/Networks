let first = false;

function convert() {
  if (first == false) {
    first = true;
  } else {
    let removing = document.getElementById("output");
    removing.removeChild(removing.firstChild);
  }

  let conversion_type = document.getElementById("selectionSF");
  let numberIn = document.getElementById("inputNum");
  if (conversion_type.value == "smoot_to_feet") {
    let num = numberIn.value;
    console.log(conversion_type.value);

    let smoots = 5.58333 * num;
    smoots = smoots.toFixed(3);
    let answer = document.createTextNode(smoots + " feet");
    document.getElementById("output").appendChild(answer);
  } else {
    let num = numberIn.value;

    let feet = num / 5.8333;
    feet = feet.toFixed(3);
    let answer = document.createTextNode(feet + " smoots");
    document.getElementById("output").appendChild(answer);
  }
}