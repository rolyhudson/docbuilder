const prod = {
    url: {
     API_URL: 'https://designresponseapi.azurewebsites.net'}
   };
const dev = {
    url: {//just use the package proxy
     API_URL: ''
    }
   };
   export const config = process.env.NODE_ENV === 'development' ? dev : prod;