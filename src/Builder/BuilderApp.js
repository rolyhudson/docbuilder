import React, {Component} from 'react';
import Container from './Container';
import './index.css'

class BuilderApp extends Component {

    state = {displayBio : false};
    //never directly set state values call setState and render is called afterwards
    toggleDisplayBio = () => {
        this.setState({displayBio: !this.state.displayBio});
    }

    render() {
       
        return(
            
            <div>
            <h1>Builder V1</h1>
            <div>
             Project Name: 
             <input type="text" name="name" defaultValue='Project name'/>
             </div>
             <hr/>
                <Container id={0}/>
            </div>
        )
    }
}



export default BuilderApp;