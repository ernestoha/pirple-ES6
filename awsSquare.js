//TODO CALLING OTHER FUNCTIONS ASYNC.. PROMISES... TESTING...S
console.log('Loading function');

checkNumber = function(num) {
    return new Promise((resolve, reject) => {
        if (num == undefined) {
            reject("Parameter Num, not defined.");
        }
        if (typeof num !== "number") {
            reject("Invalid Number");
        }
        resolve("Ok");
    });
};
//exports.handler = async (event, context) => {
async function test(event, context){
    console.log('event =', event);
    let num = event.pathParameters['num'];
    // let statusCode = 1;
    // let body = 11;

    console.log(11);
    await checkNumber(num)
    .then(msg => {
        console.log(msg);
        // console.log({
        //     statusCode : 200,
        //     body: JSON.stringify(Math.sqrt(num)),
        // });
        return new Promise((resolve, reject) => {

            resolve({
                statusCode : 200,
                body: JSON.stringify(Math.sqrt(num)),
            });
        });
        return {
            statusCode : 200,
            body: JSON.stringify(Math.sqrt(num)),
        };
    }).catch(err => {
        console.log(err);
        return {
            statusCode: 400,
            body: JSON.stringify(err),
    }});//console.log("Error: "+err));

    // if (num==undefined) {
    //     statusCode = 400;
    //     body = "Parameter Num, not defined.";
    // } else {
    //     if (!isNaN(num)) {
    //         statusCode = 400;
    //         body = "Invalid Number.";
    //     } else {
    //         statusCode = 200;
    //         body = `Hello from Lambda ${num}!`;
    //     }
    // }
    
    // const response = {
    //     statusCode,
    //     body: JSON.stringify(body),
    // };
    // return response;
};

console.log(test({'pathParameters' : {'num' : 12} } ));
