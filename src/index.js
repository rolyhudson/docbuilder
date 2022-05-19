import React from 'react';
import { createRoot } from 'react-dom/client';
import {Router, Switch, Route} from 'react-router-dom';

import App from './components/App';
import Header from './components/Header';
import './index.css'


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

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



