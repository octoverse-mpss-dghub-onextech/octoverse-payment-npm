<img align="right" alt="Octoverse logo" width="160" src="https://www.octoverse.com.mm/img/octoverse-gateway-logo.b63854c7.png">

&nbsp;

# Octoverse Payment
Package developed by Dimi (Founder of DGHub)

"Accept payments anytime, anywhere!"

Access to variety of digital payment methods in a single platform. Simplify financial transactions for your sustainable business growth. A fast and secure way to accept payments into your pocket.

[![npm](https://img.shields.io/npm/v/ajv.svg)](https://www.npmjs.com/package/octoverse-payment)

## Teams

[<img src="https://avatars.githubusercontent.com/u/112307287?v=4" width="22.5%" alt="Retool">](https://dghub.dev/)<img src="https://ajv.js.org/img/gap.svg" width="3%">
[<img src="https://github.com/dghub-founder/logos/blob/main/onex.jpg" width="22.5%" alt="Retool">](https://onextech.asia/)<img src="https://ajv.js.org/img/gap.svg" width="3%">
[<img src="https://github.com/dghub-founder/logos/blob/main/mpss.png" width="22.5%" alt="Retool">](https://mpss.com.mm/)<img src="https://ajv.js.org/img/gap.svg" width="3%">

## Another packages

[<img src="https://storage.googleapis.com/cms-storage-bucket/70760bf1e88b184bb1bc.png" width="22.5%" alt="Retool">](https://github.com/octoverse-mpss-dghub-onextech/octoverse-payment-flutter)<img src="https://ajv.js.org/img/gap.svg" width="3%">[<img src="https://www.php.net/images/meta-image.png" width="22.5%" alt="Tidelift">](https://github.com/octoverse-mpss-dghub-onextech/octoverse-payment-flutter)

Thank you.

## Documentation

## Install

```
npm install octoverse-payment

```
OR
```
npm install "https://github.com/octoverse-mpss-dghub-onextech/octoverse-payment-npm" --save

```

## <a name="usage"></a>Getting started

## Import

```javascript
// ESM/TypeScript import
import OctoversePayment from "octoverse-payment";
```
Or

```javascript
// Node.js require:
const OctoversePayment = require("octoverse-payment");
```

## Init

```javascript
OctoversePayment.init({
    testMode: true,
    secretKey: '123456',
    });
```
## Example request payment token

```javascript
var { error, data } = await OctoversePayment.requestPaymentToken({
      amount: '500',
      currencyCode: 'MMK',
      merchantID: 'TEST0000XX',
      invoiceNo: 'INV0000XX',
      backendUrl: 'https://yourbackendurl.com',
});

if(error){
 console.log(data); // Error message
 return;
}
const tokens = data;
console.log(tokens.accessToken); // Bearer accessToken
console.log(tokens.paymentToken); // Body POST Method - paymentToken
```
## Example get available payments list

```javascript
var { error, data } = await OctoversePayment.getAvailablePaymentsList(tokens);

if(error){
 console.log(data); // Error message
 return;
}
const availablePayments = data;
console.log(availablePayments); // available payments list data
```

## Example direct do pay

```javascript
var { error, data } = await OctoversePayment.directDoPay(tokens,{
   paymentCode: "AYAPAY_PIN",
   payData: "IUYnLxp8SHv0Ayy3jDDF0E+GuianSYgDi3xvYeIxC8eFlOr1ME9HdOMhQ0yzRnxX"
});

if(error){
 console.log(data); // Error message
 return;
}
const response = data;
console.log(response); // response status
```
## Example check payment status

```javascript
var { error, data } = await OctoversePayment.checkPaymentStatus(tokens,{
      merchantID: 'TEST0000XX',
      invoiceNo: 'INV0000XX',
});

if(error){
 console.log(data); // Error message
 return;
}
const response = data;
console.log(response); // response status
```


## Report

Please report any unacceptable behaviour to team@octoverse.asia - it will be reviewed by the project team.

## License

[MIT](./LICENSE)
