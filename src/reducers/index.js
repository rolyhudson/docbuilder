import {SELECT, DESELECT, ADD_TO_STORE, REMOVE_FROM_STORE} from '../actions';

function selectionState(state=[], action){
    switch(action.type)
    {
        case ADD_TO_STORE:
            console.log("adding new component id :", action.id);
            let activeComponents = [...state,{id: action.id, active: false}];
            console.log('activeComponents', activeComponents);
            return activeComponents;
        case REMOVE_FROM_STORE:
            console.log("removing component id :", action.id);
            activeComponents = state.filter(item => item.id !== action.id);
            console.log('activeComponents', activeComponents);
            return activeComponents;
        default: 
            return state;
    }

    
}


export default selectionState;