import axios from "axios";
import qs from "querystring";
import jwt from "jsonwebtoken";
import validator from "../../admin_panel/library/dghub_payment/src/validator.js";

const baseUrl = 'https://octoverse.com.mm/api/payment';
const testBaseUrl = 'https://test.octoverse.com.mm/api/payment';
global.testMode = false;

const requestPaymentToken = async (settings)=>{
    return await new Promise(async (resolve, reject) => {
        try {
            global.testMode = settings.testMode;
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
                settings.secretKey,
                {
                    algorithm: 'HS512', 
                    noTimestamp: true
                  // expiresIn: '10h'
                }
              );


          var response = await axios.request({
            url: "/auth/token",
            method: "post",
            baseURL: global.testMode? testBaseUrl: baseUrl,
            data: JSON.stringify({
                payData: body
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          const decoded = jwt.verify(response.data, settings.secretKey);

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
            baseURL: global.testMode? testBaseUrl: baseUrl,
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
            baseURL: global.testMode? testBaseUrl: baseUrl,
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
                settings.secretKey,
                {
                    algorithm: 'HS512', 
                    noTimestamp: true
                  // expiresIn: '10h'
                }
              );


          var response = await axios.request({
            url: "/auth/paymentInQuery",
            method: "post",
            baseURL: global.testMode? testBaseUrl: baseUrl,
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

export default { requestPaymentToken,getAvailablePaymentsList,directDoPay,checkPaymentStatus }