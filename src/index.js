import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Switch, Route} from 'react-router-dom';

import App from './components/App';
import Header from './components/Header';
import './index.css'



ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

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



