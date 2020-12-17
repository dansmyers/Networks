function main()
{
    let form = document.getElementById("derivativeInfo");
    let equation = document.getElementById("input");
    let expression = document.getElementById("expression");

    form.addEventListener("submit", function(){
        event.preventDefault();

        let dataForm = $(this).serialize();

        $.post("/calculateDerative", dataForm, function(equationInfo){
            console.log(equationInfo);
            expression.innerHTML = "The derivative of " + input.value + " is: " + equationInfo;
            derivativeGraph(equationInfo);
        });
    })
}

function derivativeGraph(expression)
{
	try
	{
		const value = math.compile(expression);
	
		const xVals = math.range(-20, 20, .01).toArray();
		const yVals = xVals.map(function(x){
			return value.evaluate({x: x});
		});
	
		const graph = {
			x: xVals,
			y: yVals,
			type: "scatter"
		};
	
		const graphPoints = [graph];
		Plotly.newPlot("plot", graphPoints);
	}
	catch(error)
	{
		console.error(error);
		alert(error);
	}
}

main();