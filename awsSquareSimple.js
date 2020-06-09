console.log('Loading function');

exports.handler = async (event, context) => {
    // console.log('event =', event);
    let num = event.pathParameters['num'];
    let statusCode;
    let body;

    if (num==undefined) {
        statusCode = 400;
        body = "Parameter Num, not defined.";
    } else {
        if (isNaN(num)) {
            statusCode = 400;
            body = "Invalid Number.";
        } else {
            statusCode = 200;
            body = Math.sqrt(num);//`Hello from Lambda ${num}!`;
        }
    }
    
    const response = {
        statusCode,
        body: JSON.stringify(body),
    };
    return response;
};
