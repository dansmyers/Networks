gapi.load("client");

const errors = document.querySelector(".errors");
const loading = document.querySelector(".loading");
const results = document.querySelector(".results");
const resultsCon = document.querySelector(".result-container");
resultsCon.style.display = "none";
loading.style.display = "none";
errors.textContent = "";

const form = document.querySelector(".form-data");

const claim = document.querySelector(".claim");

  function loadClient() {
    gapi.client.setApiKey("AIzaSyAAjFhcSbOqq2JBT3gZd7d2H4rSaKszv9Y");
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/factchecktools/v1alpha1/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }

  function execute() {
    return gapi.client.factchecktools.claims.search({
      "languageCode": "en-US",
      "maxAgeDays": 33,
      "query": claim.value
    })
        .then(function(response) {
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  loadClient();
  execute();