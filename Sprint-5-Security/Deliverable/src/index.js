import axios from "axios";
const api = "https://factchecktools.googleapis.com/v1alpha1/claims:search?query=";
const apiKey = "&key=AIzaSyAAjFhcSbOqq2JBT3gZd7d2H4rSaKszv9Y"

const errors = document.querySelector(".errors");
const loading = document.querySelector(".loading");
const results = document.querySelector(".results");
const title = document.querySelector(".title");
const resultsCon = document.querySelector(".result-container");
resultsCon.style.display = "none";
loading.style.display = "none";
errors.textContent = "";

const form = document.querySelector(".form-data");

const claim = document.querySelector(".claim");

const rating = "Rating: ";
const article = " Article Link";
const newLineBold = "<p><strong>";
const newLine = "<p>";
const newLink = "<a href=";
const newClaim = "Claim: ";
const newClaimant = "Claimant: ";

const searchForClaim= async claimName => {
  loading.style.display = "block";
  errors.textContent = "";
  try {
	console.log("Trying");
    const response = await axios.get(`${api}${claimName}${apiKey}`);
	console.log("Done");
	/* JSON.stringify(response); */
	console.log(response);
	console.log(newLink.concat(response.data.claims[0].claimReview[0].url, ' target="_blank">'));
    loading.style.display = "none";
	/* const x = response.data.claims[0].claimant.concat(" claims that ", response.data.claims[0].text) */
	for(let i = 0; i < 10; i++) {
		document.getElementById("resultsContainer").innerHTML += newClaim.concat(response.data.claims[i].text);
		if(response.data.claims[i].claimant !== null){
			document.getElementById("resultsContainer").innerHTML += newLine.concat(newClaimant, response.data.claims[i].claimant, "<span></span></p>");
		}
		document.getElementById("resultsContainer").innerHTML += newLineBold.concat(rating.concat(response.data.claims[i].claimReview[0].textualRating, " (", response.data.claims[i].claimReview[0].publisher.name, ")"), "</strong><span></span></p>");
		document.getElementById("resultsContainer").innerHTML += newLink.concat(response.data.claims[i].claimReview[0].url, ' target="_blank">', response.data.claims[i].claimReview[0].publisher.site.concat(article), "</a>");
		document.getElementById("resultsContainer").innerHTML += newLine.concat("---------------------------------------------------------------------------<span></span></p>");
	}
	
/* 	document.getElementById("resultsContainer").innerHTML += response.data.claims[0].claimant.concat(" claims that ", response.data.claims[0].text);
	document.getElementById("resultsContainer").innerHTML += newLine.concat(rating.concat(response.data.claims[0].claimReview[0].textualRating, " (", response.data.claims[0].claimReview[0].publisher.name, ")"), "</strong><span></span></p>");
	document.getElementById("resultsContainer").innerHTML += newLink.concat(response.data.claims[0].claimReview[0].url, ' target="_blank">', response.data.claims[0].claimReview[0].publisher.site.concat(article), "</a>"); */
	
   /*  title.textContent = response.data.claims[0].claimant.concat(" claims that ", response.data.claims[0].text).link("https://www.w3schools.com"); */
    resultsCon.style.display = "block";
  } catch (error) {
    loading.style.display = "none";
    resultsCon.style.display = "none";
	
    errors.textContent = "We have no data for the claim you have requested.";
  }
};

// declare a function to handle form submission
const handleSubmit = async e => {
  e.preventDefault();
  const search = claim.value.replace(/\s/g, "%20")
  searchForClaim(search);
  console.log(search);
};

form.addEventListener("submit", e => handleSubmit(e));