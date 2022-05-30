import { combineReducers } from "redux";
import { ADD_PROJECT, ADD_PHASE, GET_PROJECT, GET_MCDA, ADD_MCDA } from "../actions";


function projects(state = [], action){
    switch(action.type){
        case ADD_PROJECT:
            state =[...state, action.project];
            return state;
        case GET_PROJECT:
            return state.find(element => element.id = action.id);
        default:
            return state;
    }
}

function phases(state = [], action){
    switch(action.type){
        case ADD_PHASE:
            state =[...state, action.phase];
            return state;
        default:
            return state;
    }
}

function mcdas(state = [], action){
    switch(action.type){
        case ADD_MCDA:
            state =[...state, action.mcda];
            return state;
        case GET_MCDA:
            return state.find(element => element.id = action.id);
        default:
            return state;
    }
}

const rootReducer = combineReducers({projects, phases, mcdas});

export default rootReducer;