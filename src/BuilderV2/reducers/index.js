import { combineReducers } from "redux";
import { ADD_PROJECT, ADD_PHASE, GET_PROJECT, GET_MCDA, ADD_MCDA, UPDATE_MCDA,ADD_ALIGNMENT,UPDATE_ALIGNMENT } from "../actions";


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

function alignments(state = [], action){
    switch(action.type){
        case ADD_ALIGNMENT:
            state =[...state, action.alignment];
            return state;
        case UPDATE_ALIGNMENT:
            if(state.length === 0){
                console.log('adding new');
                return[...state, action.alignment];
                
            }
            else
            {
                console.log('updating',action);
                return updateObjectInArray(state, action);
            }
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
                console.log('adding new');
                return[...state, action.mcda];
                
            }
            else
            {
                console.log('updating');
                return updateObjectInArray(state, action);
            }
                
        default:
            return state;
    }
}

function updateObjectInArray(array, action) {
    return array.map((item,index) => {
      if (item.id !== action.alignment.id) {
        // This isn't the item we care about - keep it as-is
        return item
      }
  
      // Otherwise, this is the one we want - return an updated value
      else{
        return {
            ...item,
            ...action.alignment
          }
      }
      
    })
  }

const rootReducer = combineReducers({projects, phases, mcdas, alignments});

export default rootReducer;