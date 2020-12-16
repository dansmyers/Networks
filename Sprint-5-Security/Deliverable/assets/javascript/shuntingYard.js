function shuntingYard(expression)
{
    queue = [];
    stack = [];
    let number = "";

    for(let i = 0; i < expression.length; i++)
    {
        //console.log(typeof(expression[i]))
        if(!isNaN(expression[i]))
        {
            number += expression[i];
        }
        else
        {
            if(number.length > 0)
            {
                queue.push(number);
                stack.push(expression[i]);
                number = "";
            }
        }
    }

    console.log(queue);
    console.log(stack);
}
