import { combineReducers } from "redux";
import { ADD_PROJECT, ADD_PHASE, GET_PROJECT, GET_MCDA, ADD_MCDA, UPDATE_MCDA } from "../actions";


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
            return state.find(element => element.id === action.id);
        case UPDATE_MCDA:
            if(state.length === 0){
                state =[...state, action.mcda];
                return state;
            }
            return updateObjectInArray(state, action);
        default:
            return state;
    }
}

function updateObjectInArray(array, action) {
    return array.map((item,index) => {
      if (index !== action.index) {
        // This isn't the item we care about - keep it as-is
        return item
      }
  
      // Otherwise, this is the one we want - return an updated value
      else{
        return {
            ...item,
            ...action.mcda
          }
      }
      
    })
  }

const rootReducer = combineReducers({projects, phases, mcdas});

export default rootReducer;