import React, {Component} from 'react';
import Header from './Header';
import Select from 'react-select';
import { config } from './Constants';
import { randomName } from './NameGenerator';
import { connect } from 'react-redux';
import {addMCDA, updateMCDA,getMCDA} from './actions';
import Option from './Option';
import { v4 as uuidv4 } from 'uuid';

import './index.css';

var apiurl = config.url.API_URL

class DecisionAnalysis extends Component{
    state = {
        elements : [],
        options:[],
        optionssublist : [],
        selectedElement :{value:'patient room', label : 'patient room'},
        mcda :{name: randomName('MCDA'), id :  uuidv4(), optionsselected : []}
        
    }

    componentDidMount(){

        let params = new URLSearchParams(window.location.search);
        
        let id = params.get('id');

        if(id !== null)
        {
            let m = this.props.mcdas.find(element => element.id === id);
            console.log("found mcda", this.state.mcda.id);
            this.setState({mcda: structuredClone(m) })
        }
            
        else {
           
            //console.log("saving new mcda",this.state.mcda);
            this.save(this.state.mcda);
        }
            

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
        //this.props.updateMCDA(this.state.mcda);
    }

    new(){
        this.setState({
        optionssublist : [],
        optionsselected : [],
        selectedElement :{value:'patient room', label : 'patient room'},
        mcda : {name: randomName('MCDA'), id :  uuidv4() , optionsselected :[]}
        })
    }

    nameupdate(value){
        
    }

    addOptionById(option){
        let currentMcda = this.state.mcda;
        currentMcda.optionsselected = [...this.state.mcda.optionsselected, option];
        this.setState(
            {
                mcda: currentMcda,
                optionssublist :this.state.optionssublist.filter(item => item.value !== option.value)
            }
        )
    }

    removeOptionById(option){
        console.log('removing', option)
        let currentMcda = this.state.mcda;
        currentMcda.optionsselected = this.state.mcda.optionsselected.filter(item => item.value !== option.value);
        this.setState(
            {
                optionssublist: [...this.state.optionssublist, option],
                mcda: currentMcda
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
        

        let {mcdas} = this.props;
        console.log('mcdas:',mcdas);
        return(
            <div>
                <Header/>
                <h4>Multi Criteria Decision Analysis</h4>
                MCDA: 
                <input type="text" value={this.state.mcda.name}  onChange={event => this.nameupdate(event.target.value)}/>
                <button type="button" className="btn btn-secondary" onClick={() => this.new()}>New</button>
                <button type="button" className="btn btn-secondary" onClick={() => this.save()}>Save</button>
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
                    this.state.mcda.optionsselected.map((option, index) => {
                        return (
                            <div  key = {index}>
                                
                                <div className='optionBox'>
                                <button type="button" className="btn btn-secondary" onClick={()=>this.removeOptionById(option)}>X</button>
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
                            
                            <div className='optionBox' >
                            <button type="button" className="btn btn-secondary" onClick={()=>this.addOptionById(option)}>+</button>
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

export default connect(mapStateToProps,{addMCDA, updateMCDA ,getMCDA}) (DecisionAnalysis);