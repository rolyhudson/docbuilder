export const SELECT ='SELECT';
export const DESELECT ='DESELECT';
export const ADD_TO_STORE = 'ADD_TO_STORE';
export const REMOVE_FROM_STORE = 'REMOVE_FROM_STORE';

export function deselect(id){
    const action = {
        type: DESELECT,
        id
    }
    return action;
}

export function select(id){
    const action = {
        type: DESELECT,
        id
    }
    return action;
}

export function removeFromStore(id){
    const action = {
        type: REMOVE_FROM_STORE,
        id
    }
    return action;
}

export function addToStore(id){
    const action = {
        type: ADD_TO_STORE,
        id
    }
    return action;
}