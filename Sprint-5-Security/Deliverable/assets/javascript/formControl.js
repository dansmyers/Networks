function main()
{
    let form = document.getElementById("derivativeInfo");

    form.addEventListener("submit", function(){
        event.preventDefault();

        let dataForm = $(this).serialize();

        $.post("/calculateDerative", dataForm, function(equationInfo){
            console.log(equationInfo);
        });
    })
}

main();