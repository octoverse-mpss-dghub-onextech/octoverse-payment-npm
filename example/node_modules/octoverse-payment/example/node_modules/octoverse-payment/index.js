import axios from "axios";
import qs from "querystring";
import jwt from "jsonwebtoken";
import validator from "./src/validator.js";

const baseUrl = 'https://octoverse.com.mm/api/payment';
const testBaseUrl = 'https://test.octoverse.com.mm/api/payment';
global.testMode = false;
global.secretKey = '';

const init = (settings)=>{
     testMode = settings.testMode;
     secretKey = settings.secretKey;
     if(testMode){
        console.log('Installed Octoverse payment')
     } 
}

const requestPaymentToken = async (settings)=>{
    return await new Promise(async (resolve, reject) => {
        try {
            testMode = settings.testMode;
            var vali = validator.requestPaymentToken(settings);

            if (vali != true) {
              console.log(vali);
              return {error: true, data: vali };
            }
           
            const body = jwt.sign(
                {
                merchantID: settings.merchantID,
                invoiceNo: settings.invoiceNo,
                amount: settings.amount,
                currencyCode: settings.currencyCode.toUpperCase(),
                backendUrl: settings.backendUrl
                },
                secretKey,
                {
                    algorithm: 'HS512', 
                    noTimestamp: true
                  // expiresIn: '10h'
                }
              );


          var response = await axios.request({
            url: "/auth/token",
            method: "post",
            baseURL: testMode? testBaseUrl: baseUrl,
            data: JSON.stringify({
                payData: body
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if(testMode){
            console.log(secretKey);
         } 
          const decoded = jwt.verify(response.data, secretKey);
          
          return resolve({
            error: false,
            data: decoded,
          });
        } catch (error) {
          console.log(error);
          return resolve({ error: true, data: error.message });
        }
      });
}


const getAvailablePaymentsList = async (token)=>{
    return await new Promise(async (resolve, reject) => {
        try {
            
          var response = await axios.request({
            url: "/getAvailablePaymentsList",
            method: "post",
            baseURL: testMode? testBaseUrl: baseUrl,
            data: JSON.stringify({
                paymentToken: token.paymentToken
            }),
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " + token.accessToken,
            },
          });
    
         
        
          return resolve({
            error: false,
            data: response.data,
          });
        } catch (error) {
          console.log(error);
          return resolve({ error: true, data: error.message });
        }
      });
}

const directDoPay = async (token,settings)=>{
    return await new Promise(async (resolve, reject) => {
        try {
            
          var response = await axios.request({
            url: "/dopay",
            method: "post",
            baseURL: testMode? testBaseUrl: baseUrl,
            data: JSON.stringify({
                paymentCode: settings.paymentCode,
                paymentToken: token.paymentToken,
                payData: settings.payData
            }),
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " + token.accessToken,
            },
          });
    
         
        
          return resolve({
            error: false,
            data: response.data,
          });
        } catch (error) {
          console.log(error);
          return resolve({ error: true, data: error.message });
        }
      });
}

const checkPaymentStatus = async (token,settings)=>{
    return await new Promise(async (resolve, reject) => {
        try {
            
            var vali = validator.checkPaymentStatus(settings);

            if (vali != true) {
              console.log(vali);
              return {error: true, data: vali };
            }

            const body = jwt.sign(
                {
                merchantID: settings.merchantID,
                invoiceNo: settings.invoiceNo,
                },
                secretKey,
                {
                    algorithm: 'HS512', 
                    noTimestamp: true
                  // expiresIn: '10h'
                }
              );


          var response = await axios.request({
            url: "/auth/paymentInQuery",
            method: "post",
            baseURL: testMode? testBaseUrl: baseUrl,
            data: JSON.stringify({
                payData: body
            }),
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " + token.accessToken,
            },
          });
        
          return resolve({
            error: false,
            data: response.data,
          });
        } catch (error) {
          console.log(error);
          return resolve({ error: true, data: error.message });
        }
      });
}

export default { init, requestPaymentToken,getAvailablePaymentsList,directDoPay,checkPaymentStatus }