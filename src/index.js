import React from 'react';
import { createRoot } from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
import App from './components/App';
import './index.css'


const store = createStore(rootReducer);



const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
<Provider store = {store}>
<App />
</Provider>);

// new Promise((resolve,reject) => {
//     return reject(new Error('failed'));

//     setTimeout(()=>{
//         resolve('Bears beets battle');
//     },2000);

// })
// .then(quote=>{
//     console.log(quote);
    
// })
// .catch(error => console.log('error',error));



