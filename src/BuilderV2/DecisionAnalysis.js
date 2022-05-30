import React, {Component} from 'react';
import Header from './Header';
import Select from 'react-select';
import { config } from './Constants';
import { randomName } from './NameGenerator';
import { connect } from 'react-redux';
import {addMCDA} from './actions';
import Option from './Option';

import './index.css';

var apiurl = config.url.API_URL

class DecisionAnalysis extends Component{
    state = {
        elements : [],
        options:[],
        optionssublist : [],
        optionsselected : [],
        selectedElement :{value:'patient room', label : 'patient room'},
        name : ''
        
    }

    componentDidMount(){

        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        
        id? this.setState({name: this.props.mcdas.find(element => element.id === id).name }): this.setState({name: randomName('MCDA')});

        var uri=apiurl;
        console.log(apiurl);
        
        uri +='/api/Responses/GetNames';
        
        console.log(uri);
        fetch(uri, { mode: 'cors' })
            .then(response =>  response.json())
            .then(json => this.setState ( {elements : json}))
            .catch(error => alert(error.message));

        uri  = apiurl +'/api/Options/GetNames';
        fetch(uri, { mode: 'cors' })
            .then(response =>  response.json())
            .then(json => {this.setState ( {options : json});})
            .catch(error => alert(error.message));
    }

    save(){

    }

    addOptionById(option){
        console.log('adding', option)
        let opts = this.state.optionssublist.filter(item => item.value !== option.value);
        this.setState(
            {
                optionsselected : [...this.state.optionsselected, option],
                optionssublist :this.state.optionssublist.filter(item => item.value !== option.value)
            }
        )
    }

    removeOptionById(option){
        console.log('removing', option)
        
        this.setState(
            {
                optionssublist: [...this.state.optionssublist, option],
                optionsselected :this.state.optionsselected.filter(item => item.value !== option.value)
            }
        )
    }

    handleOptionChange = (selectedOption) => { 
        this.setState({ selectedOption }, () =>
          console.log(`Option selected:`, this.state.selectedOption)
        );
      };

    handleElementChange = (selectedElement) => {
        this.setState({ selectedElement }, () =>{
            console.log(`Element selected:`, this.state.selectedElement);

        var optionssublist =[]
        for(var i = 0;i < this.state.options.length; i++)
        {
            if(this.state.options[i] !== null)
            {
                if(this.state.options[i].value.includes(this.state.selectedElement.value))
                    optionssublist.push(this.state.options[i]);
            }
                
        }
        
        if(optionssublist.length === 0)
            this.setState ( {optionssublist : this.state.options});
        else
            this.setState ( {optionssublist : optionssublist});
        }
          
        );   
      };

    render(){
        

        
        return(
            <div>
                <Header/>
                <h4>Multi Criteria Decision Analysis</h4>
                MCDA: 
             <input type="text" value={this.state.name}  onChange={event => this.setState({name: event.target.value})}/>
             <button type="button" className="btn btn-secondary" onClick={this.save}>New</button>
             <button type="button" className="btn btn-secondary" onClick={this.save}>Save</button>
             <hr/>
             <div className='flex-parent'>
                <div className="flex-child">
                Element:
                    
                <Select
                selectedOption ={this.state.selectedElement}
                onChange={this.handleElementChange}
                options={this.state.elements}
                />
                Options to compare:
                {
                    this.state.optionsselected.map((option, index) => {
                        return (
                            <div key = {index}>
                                <button type="button" className="btn btn-secondary" onClick={()=>this.removeOptionById(option)}>X</button>
                                <div style={{display : 'inline-block'}}>
                                <Option
                            key ={index}
                            name = {option.value}
                            />
                            </div>
                            </div>
                        )
                    })
                }
                </div>
                <div className="flex-child">
                Options:
                {
                    this.state.optionssublist.map((option, index) => {
                        return(
                            <div  key = {index}>
                            <button type="button" className="btn btn-secondary" onClick={()=>this.addOptionById(option)}>+</button>
                            <div style={{display : 'inline-block'}}>
                            <Option
                            key ={index}
                            name = {option.value}
                            />
                            </div>
                            </div>
                        )
                    })
                }
                
                    
                </div>
             </div>
             
            
            </div>
        )
    }
}

function mapStateToProps(state){
    
    return {
        mcdas: state.rootReducer.mcdas,
    };
}

export default connect(mapStateToProps,{addMCDA}) (DecisionAnalysis);