let firstOpen = true;
function searchWord(){
  keyword  = document.querySelector('#inputBox').value;
  if(firstOpen){
    keyword = 'covid'
    firstOpen =false;
  };

  fetch(`https://content.guardianapis.com/search?q=${keyword}&api-key=4b80840d-07ac-40db-8134-dfffe073f534`)
  .then(response =>{
      return response.json();
  })
  .then(data =>{
  if(data.response.status === "ok"){
    let articles = [];
    for(var i = 0; i <5; i++){
      articles.push({
        headline: data.response.results[i].webTitle,
        url: data.response.results[i].webUrl
      })
    }
    document.querySelector('.search-word').innerHTML = "'"+keyword+"'";

    document.querySelector('.headline-1').innerHTML = articles[0].headline;
    document.querySelector('.headline-1').href = articles[0].url;
    document.querySelector('.headline-2').innerHTML = articles[1].headline;
    document.querySelector('.headline-2').href = articles[1].url;
    document.querySelector('.headline-3').innerHTML = articles[2].headline;
    document.querySelector('.headline-3').href = articles[2].url;
    document.querySelector('.headline-4').innerHTML = articles[3].headline;
    document.querySelector('.headline-4').href = articles[3].url;
    document.querySelector('.headline-5').innerHTML = articles[4].headline;
    document.querySelector('.headline-5').href = articles[4].url;


  } else {
    "syntax error";
  }

});
}

let keyword = "cat";
searchWord(keyword);
