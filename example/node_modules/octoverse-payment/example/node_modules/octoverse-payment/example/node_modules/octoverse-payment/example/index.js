import OctoversePayment from "octoverse-payment";

OctoversePayment.init({
    testMode: true,
    secretKey: '123456'
});

var { error, data } = await OctoversePayment.requestPaymentToken({
    amount: '500',
    currencyCode: 'MMK',
    merchantID: 'TEST0000XX',
    invoiceNo: 'INV0000XX',
    backendUrl: 'https://yourbackendurl.com',
});

if(error){
console.log(data); // Error message
}else{
const tokens = data;
console.log(tokens.accessToken); // Bearer accessToken
console.log(tokens.paymentToken); // Body POST Method - paymentToken
}
