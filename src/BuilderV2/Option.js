import React, {Component} from 'react';
import Header from './Header';
import './index.css';

class Option extends Component{
    render(){
        return(
            <div className='option'>
                 {this.props.name}
            </div>
        )
    }
}
export default Option;