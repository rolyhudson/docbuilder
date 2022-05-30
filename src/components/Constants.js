const prod = {
    url: {
     API_URL: 'https://rat-prototype-api.azurewebsites.net'}
   };
const dev = {
    url: {//just use the package proxy
     API_URL: "https://localhost:7029"
    }
   };
   export const config = process.env.NODE_ENV === 'development' ? dev : prod;