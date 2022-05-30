import React, {Component} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Projects from './Projects';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

import Project from './Project';
import Phase from './Phase';
import DecisionAnalysis from './DecisionAnalysis';
import AlignmentModeller from './AlignmentModeller';

export const store = configureStore({
    reducer: {rootReducer},
  });


class BuilderApp2 extends Component{
    
    render(){
        
        return(
            
        <div>
            
            <Provider store={store}>
            <BrowserRouter>
            <Routes>
                <Route exact path ='/' element = {<Projects/>}/>
                <Route path="/project" element={<Project/>}/> 
                <Route path="/phase" element={<Phase/>}/> 
                <Route path="/decisionanalysis" element={<DecisionAnalysis/>}/> 
                <Route path="/alignmentmodeller" element={<AlignmentModeller/>}/> 
            </Routes>
            </BrowserRouter>
            </Provider>
        </div>
        )
    }

    
}


export default BuilderApp2;