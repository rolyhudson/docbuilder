import React, {Component} from 'react';
import { connect} from 'react-redux';
import Header from './Header';
import {addProject} from './actions';
import { v4 as uuidv4 } from 'uuid';
import {Link} from 'react-router-dom';
import { randomName } from './NameGenerator';

import './index.css';


class Projects extends Component{
    render(){
        
        let {projects} = this.props;
        
        return (
           
            <div>
                <Header/>
                <h4>Projects</h4>
                <div className='add' onClick={() => this.props.addProject({name: randomName('PROJECT') , id: uuidv4()})}>
                    +
                    </div>
                {
                    projects.map((project, index) => {
                        return(
                            <div  key = {index}>
                                {project.name}
                                <Link to = {'/project?id='+project.id}> edit</Link>
                            </div>
                            
                        )
                    })
                }
            </div>
        )
    }

    
}

function mapStateToProps(state){
    
    return {
        projects: state.rootReducer.projects
    };
}

export default connect(mapStateToProps, {addProject})(Projects);