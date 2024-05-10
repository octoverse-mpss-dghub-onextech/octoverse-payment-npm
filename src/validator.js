import Joi from "joi";

function validator(body, data) {
    if (Object.keys(body).length == 0) {
      return Object.keys(body).length + " body not required.Check multer";
    }
  
    const schema = Joi.object(data);
    const { error, value } = schema.validate(body || {}, { abortEarly: false });
  
    if (error) {
      return error.details[0].message;
    } else {
      return true;
    }
  }


function requestPaymentToken(body){

  return validator(body, 
    {
      amount: Joi.string().max(255).required(),
      currencyCode: Joi.string().max(255).required(),
      secretKey: Joi.string().max(255).required(),
      merchantID: Joi.string().max(255).required(),
      testMode: Joi.boolean().allow(null, ''),
      invoiceNo: Joi.string().max(255).required(),
      backendUrl: Joi.string().max(255).allow(null, ''),
    });  

}

function checkPaymentStatus(body){

    return validator(body, 
      {
        amount: Joi.string().max(255).required(),
        currencyCode: Joi.string().max(255).required(),
        secretKey: Joi.string().max(255).required(),
        merchantID: Joi.string().max(255).required(),
        testMode: Joi.boolean().allow(null, ''),
        invoiceNo: Joi.string().max(255).required(),
        backendUrl: Joi.string().max(255).allow(null, ''),
      });  
  
  }

export default {requestPaymentToken,checkPaymentStatus};