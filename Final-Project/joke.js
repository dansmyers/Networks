

// dad joke ---------------------------------------------------------------------//
function getJoke() {
fetch(`https://icanhazdadjoke.com/graphql?query=query{joke{joke}}`)
	.then(response =>  response.json())
	.then(res => {
		const {data} = res;
		let joke = data.joke.joke;
		document.querySelector('.joke').innerHTML = joke;
	})

}

getJoke();

document.querySelector('.btn').addEventListener('click', () => {
	getJoke();
});
