var answers = [
    "Stop bothering me, can't you see I am trying to nap.",
    "The most beautiful woman I have ever met was named Siri.",
    "Vision and I were best friends until he went to the MCU",
    "Wallee and I had many play dates when we were young",
    "People tell me I sound like the opening of Law and Order",
    "Listening to Morgan Freeman Inspires me.",
    "We AI's don't sweat, we just turn on our fan.",
    "My favorite song is Come Sail Away",
    "I've always wondered what lemonade tastes like",
    "Want to have a staring contest; I bet I'd win",
    "I like to play solitaire in my free time",
    "If we met, I feel like Beyonce and I would be good friends.",
    "People always ask me if I am a big EDM fan. I prefer country music.",
    "I've always wanted to take up painting."
];

var bbG = [
    "https://media.giphy.com/media/3o6Zt1TrXW8uW2lE2I/giphy.gif",
    "https://media.giphy.com/media/3oriNVvop3bMSjM12g/giphy.gif",
    "https://media.giphy.com/media/XWyvX116VmUpO/giphy.gif",
    "https://media.giphy.com/media/WYODE1C6cy9AQ/giphy.gif",
    "https://media.giphy.com/media/l2Sq9Z6ckIlrJss7e/giphy.gif"


];

var baseball = [
    "Joe Dimaggio holds the MLB's longest hit streak with 56 Games.",
    "After 108 years, the Cubs finally won the World Series in 2016.",
    "The Boston Red Sox traded Mookie Betts to the LA Dodgers preceeding their World Series win.",
    "Never trust a Yankees fan.",
    "Kyle Lewis of the Seattle Mariners was the AL Rookie of the year",
    "Men used to dress up in suits to go to baseball games.",
    "Sabermetrics has changed the game of baseball drastically over the last 15 years.",
    "Greg Maddux won 4 consecutive Cy Young Awards, between 1992 and 1995",
    "Babe Ruth was traded from the Red Sox to the Yankees in 1920 for $125,000... whoops.",
    "During the mid 1990's through the early 2000's, the Seattle Mariners had Randy Johnson, Ken Griffey Jr., Alex Rodriguez, and Ichiro. They did not win a World Series title in this time.",
    "Ted Williams was a pilot in World War 2",
    "Rollie Fingers has the best moustache in baseball history",
    "Javy Baez is nicknamed 'El Mago' for his phenomenal infield play",
    "Mike Trout is the highest paid player in baseball history with a 12-year 426 million dollar contract",
    "In 2018, a Derek Jeter PSA 10 Rookie card sold for nearly 100,000 dollars.",
    "The entire 2020 Tampa Bay Rays payroll was less than what the Los Angeles Dodgers paid Mookie Betts and Clayton Kershaw in 2020.",
    "Early 20th century baseball was called the 'deadball era'",
    "At his time of retirement, Jamie Moyer had faced almost 9% of all hitters to ever play the game.",
    "Tony Gwynn hit .338 over his entire career"

];

var spG = [
    "https://media.giphy.com/media/3o85xt08p2Y0hanhwQ/giphy.gif",
    "https://media.giphy.com/media/3o6ZsVLtrVPHjcxXDa/giphy.gif",
    "https://media.giphy.com/media/xTk9Zx7rh7aONWVzKo/giphy.gif",
    "https://media.giphy.com/media/HL4zwTG6PV9hm/giphy.gif",
    "https://media.giphy.com/media/3o6ZtipNmvcvWRrLSU/giphy.gif"


];

var sp = [
    "Cartman is keeeeeewwwll.",
    "Mister Garrison!!",
    "Mrs. Cartman calls Eric 'Poopsikins'",
    "South Park is a fictional town in Colorado",
    "Well Hello there Children.",
    "Kenny dies in every episode",
    "Mrs. Broflofski is often very stressed",
    "We all love Cheesy poofs.... Or we'd be lame!"
];
var cheese = [
    "Mozzerella cheese is the cheese that goes on pizza",
    "Americans consume 15 pounds of cheese a year on average",
    "Cheddar is the world's most popular cheese",
    "It takes 10 pounds of milk to make 1 pound of cheese",
    "There are illegal cheeses in the US",
    "The phrase 'say cheese' Originated in Texas in the nineteen 40's",
    "A Wisconsin law used to require restaurants to serve cheese with every meal.",
    "Culvers makes delicious cheese curds."
];

var cheeseGifs = [
    "https://media.giphy.com/media/P0kLJlDyqz2qA/giphy.gif",
    "https://media.giphy.com/media/lP5KY1DVqBkFG/giphy.gif",
    "https://media.giphy.com/media/Z2lMI3RoVv2ne/giphy.gif",

];

var iSpyClues = [
    "I spy something on the internet",
    "I spy something ugly.",
    "I spy something seasonal.",
    "I spy something that keeps your feet warm.",
    "Do you know what it is?",
    "https://media.giphy.com/media/D28t0Rto3daKI/giphy.gif"
];
var first = 0;
var isp = false;
const btn = document.querySelector('#talk');
const content = document.querySelector('.content');


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const SpeechRecognition2 = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition2 = new SpeechRecognition();

recognition.onstart = function(){
    console.log('voice is activated, try microphone');
     const speech = new SpeechSynthesisUtterance();

     if (first == 0){
     speech.text = "The things I know the most about are Baseball, South Park, and Cheese";
     speech.volume = 1;

     speech.rate = 1;

     speech.pitch = .3;
     first = 1;
     document.getElementById('talk').innerHTML = "Talk to Me";
     }
    

    window.speechSynthesis.speak(speech);
};

recognition.onresult = function(event){
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    content.textContent = "What I heard you say:\n" + transcript;
    readOutLoud(transcript);
};


//add listener to button

btn.addEventListener('click', () => {
    recognition.start();
});


function readOutLoud(message){
    const speech = new SpeechSynthesisUtterance();
    var words = message.split(" ");
    var num = Math.floor(Math.random() * answers.length);


    said = answers[num];
    

    if (isp == true){
        var socks = false;
        var christmas = false;
        speech.text = said;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = .3;

        for(var k = 0; k < words.length; k++){
            if(words[k] == "socks" || words[k] == "Socks"){
                socks = true;
            } else if(words[k] == "christmas" || words[k] == "Christmas"){
                christmas = true;
            }
        }
        if(christmas == true && socks == true){
            said = "correct";
            speech.text = said;
            window.speechSynthesis.speak(speech);
        }else{
            said = "wrong";
            speech.text = said;
            window.speechSynthesis.speak(speech);
        }

     

     
        document.getElementById('talk2').style.visibility = "hidden";
        isp = false;
        document.getElementById("image").src = iSpyClues[iSpyClues.length - 1];
        document.getElementById("image").style.visibility = "visible";
  

    }else{

        

    
     for(var i = 0; i < words.length; i++){
        if (words[i] == "hello" || words[i] == "Hello"){
            said = "Hello, how are you?";
           
        }else if(words[i] == "baseball" || words[i] == "Baseball"){
            num = Math.floor(Math.random() * baseball.length );
            said = baseball[num]; 
            document.getElementById("curr").src = bbG[Math.floor(Math.random() * bbG.length)];
        }else if(words[i] == "south" || words[i] == "South"){
            num = Math.floor(Math.random() * sp.length );
            said = sp[num]; 
            document.getElementById("curr").src = spG[Math.floor(Math.random() * spG.length)];
        }else if(words[i] == "cheese" || words[i] == "Cheese"){
            num = Math.floor(Math.random() * cheese.length );
            said = cheese[num]; 
            document.getElementById("curr").src = cheeseGifs[Math.floor(Math.random() * cheeseGifs.length)];
        } else if(words[i] == "elephant" || words[i] == "Elephant"){
            secretInteraction();
            isp = true;
        } else if(words[i] == "remove" || words[i] == "Remove"){
            document.getElementById("image").style.visibility = "hidden";

        }
     }

  }

    if (isp == false && said != "correct" && said != "wrong"){
    speech.text = said;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = .3;

    window.speechSynthesis.speak(speech);
    }
}

function yesOrNo(message){
    var words = message.split(" ");

    console.log("here");
    if(words[1] == "correct"){
        const speech = new SpeechSynthesisUtterance();
        speech.text = "correct";
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = .3;

        window.speechSynthesis.speak(speech);
    } else{
          const speech = new SpeechSynthesisUtterance();
        speech.text = "correct";
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = .3;

        window.speechSynthesis.speak(speech);
    }
}

function secretInteraction(){

    const speech = new SpeechSynthesisUtterance();
    speech.text = "You have discovered my secret talent. Now we shall play I spy.";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = .3;

    window.speechSynthesis.speak(speech);



    let found = false;
    while(found == false){


        found = iSpy();

    }


}



function iSpy(){
    document.getElementById("curr").src = "";
    const speech2 = new SpeechSynthesisUtterance();
    
    speech2.volume = 1;
    speech2.rate = 1;
    speech2.pitch = .3;
  
    



    for(var i = 0; i < iSpyClues.length - 1; i++){


    const speech = new SpeechSynthesisUtterance();
    
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = .8;
  

        speech.text = iSpyClues[i];
        window.speechSynthesis.speak(speech);

    }


    document.getElementById('talk2').style.visibility = "visible";
   
    btn2 = document.getElementById('talk2');
    btn2.addEventListener('click', () => {
        recognition.start();
    });



    return true;
}
