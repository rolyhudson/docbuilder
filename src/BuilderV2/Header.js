import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component{
render(){
    return (
        <div className='header'>
        <h1>Builder V2</h1>
        <Link className='header-link' to = '/'>Projects</Link>{'  '}
        <Link className='header-link'  to = '/decisionanalysis'>MCDA</Link>{'  '}
        <Link className='header-link'  to = '/alignmentmodeller'>Alignment modeller</Link>{'  '}
        </div>
    )
}
}

export default Header;