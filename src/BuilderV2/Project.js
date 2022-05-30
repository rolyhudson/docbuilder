import React, {Component} from 'react';
import Header from './Header';
import { connect} from 'react-redux';
import {addPhase, getProject} from './actions';
import { v4 as uuidv4 } from 'uuid';
import {Link, useParams } from 'react-router-dom';
import { randomName } from './NameGenerator';
class Project extends Component{

    render(){

        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        console.log(id);

        let {phases} = this.props;
        let parentProject = this.props.projects.find(element => element.id === id);
        console.log(parentProject);
        return(
        <div>
            <Header/>
            <div>Project : <input type="text" name="name" defaultValue={parentProject.name}/></div>
            
            <div>Phases</div>
            <div className='add' onClick={() => this.props.addPhase({name: randomName('PHASE') , id: uuidv4(), parentProject: id})}>
            +
            </div>
            {
                    phases.map((phase, index) => {
                        if(phase.parentProject === id)
                        {
                            return(
                                <div key = {index}>
                                    {phase.name}
                                    <Link to = {'/phase?id='+phase.id}> edit</Link>
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
        projects: state.rootReducer.projects,
        phases: state.rootReducer.phases,
    };
}
export default connect(mapStateToProps,{addPhase, getProject}) (Project);