import React, {Component} from 'react';
import Header from './Header';
import { connect} from 'react-redux';
import {getMCDA,addMCDA, getProject} from './actions';
import { v4 as uuidv4 } from 'uuid';
import {Link} from 'react-router-dom';
import { randomName } from './NameGenerator';

class Phase extends Component{
    render(){

        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');
console.log(this.props);
        let { mcdas} = this.props;
        let parentProject = this.props.phases.find(element => element.id === id);

        return(
            <div>
                <Header/>
                <div>Phase : <input type="text" name="name" defaultValue={parentProject.name}/></div>
                <div>MCDAS</div>
            <div className='add' onClick={() => this.props.addMCDA({name: randomName('MCDA') , id: uuidv4(), parentPhase: id})}>
            +
            </div>
            {
                    mcdas.map((mcda, index) => {
                        if(mcda.parentPhase === id)
                        {
                            return(
                                <div key = {index}>
                                    {mcda.name}
                                    <Link to = {'/decisionanalysis?id='+mcda.id}> edit</Link>
                                </div>
                                
                            )
                        }
                        
                    })
                }
            </div>
        )
    }
}
function mapStateToProps(state){
    
    return {
        mcdas: state.rootReducer.mcdas,
        phases: state.rootReducer.phases,
    };
}

export default connect(mapStateToProps,{getMCDA, getProject,addMCDA}) (Phase);