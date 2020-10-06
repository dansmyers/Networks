window.addEventListener("DOMContentLoaded", (e) => {
  //store useful elements in variables
  const form = document.querySelector("form");
  const button = document.getElementById("submit");
  const result = document.getElementById("result");
  const userInput = document.getElementById("userInput");
  const smoot =  5.583; //cm

  //listen for click on submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userInputValue = document.getElementById("userInput").value;
    const selectConversion = document.getElementById("conversion").value;

    //transform feet to smoot
    const toSmoot = (feet) => {
      let s = (feet/smoot);
      return s.toFixed(2);
    };
    //transform smoot to feet
    const toFeet = (s) => {
      let f = smoot*s;
      return f.toFixed(2);
    };

    //logic on result statement
    if (userInputValue !== "" && selectConversion === "to-smoot") {
      result.innerHTML =
        userInputValue +
        " feet is " +
        toSmoot(userInputValue) +
        " smoot plus or minus one ear";
    } else if (userInputValue !== "" && selectConversion === "to-feet") {
      result.innerHTML =
        userInputValue +
        " smoot is " +
        toFeet(userInputValue) +
        " feet plus or minus one ear";
    } else {
      result.innerHTML = "Please enter a value";
    }
  });
});
