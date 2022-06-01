export const ADD_PROJECT = 'ADD_PROJECT'
export const ADD_PHASE = 'ADD_PHASE'
export const GET_PROJECT = 'GET_PROJECT'
export const GET_MCDA = 'GET_MCDA'
export const ADD_MCDA = 'ADD_MCDA'
export const UPDATE_MCDA = 'UPDATE_MCDA'
export const ADD_ALIGNMENT = 'ADD_ALIGNMENT'
export const UPDATE_ALIGNMENT = 'UPDATE_ALIGNMENT'

export function updateAlignment(alignment){
    return{
        type: UPDATE_ALIGNMENT,
        alignment
    }
}

export function addProject(project){
    return{
        type: ADD_PROJECT,
        project
    }
}

export function addPhase(phase){
    return{
        type: ADD_PHASE,
        phase
    }
}

export function addAlignment(alignment){
    return{
        type: ADD_ALIGNMENT,
        alignment
    }
}

export function getProject(id){
    return{
        type: ADD_PHASE,
        id
    }
}

export function getMCDA(id){
    return{
        type: GET_MCDA,
        id
    }
}

export function addMCDA(mcda){
    return{
        type: ADD_MCDA,
        mcda
    }
}

export function updateMCDA(mcda){
    return{
        type: UPDATE_MCDA,
        mcda
    }
}