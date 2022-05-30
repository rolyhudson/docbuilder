import React, {Component} from 'react';
import { v4 as uuid } from 'uuid';
import Option from './Option';
import Select from 'react-select';
import { config } from '../Constants'
var apiurl = config.url.API_URL

class Strategy extends Component{
    constructor(props) {
        super(props)
    }

    state = {
        options: [],
        id: this.props.id,
        name: this.props.name,
        linkedStrategies : []
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () =>
          console.log(`Option selected:`, this.state.selectedOption)
        );
        
      };

    removeStrategyFromParent = id =>
    {
        console.log('removing',this.state.id);
        this.props.removeFromParent(id);
    }

    optionISelected(){
        return this.state.selectedOption ? true : false;
    }

    addOption = () =>{
        if(!this.optionISelected())
        {
            alert('set strategy type before adding objects');
            return;
        }
        let currentOptions= this.state.options;
        let id = uuid();
        
        let n= this.state.options.length;
        currentOptions.push(<Option id ={id} name = {this.state.name + '.o_'+n} />);
        console.log("added option", id);
        this.setState({options:currentOptions });
    }

    removeChildOption = id =>{
        let currentOptions= this.state.options;
        console.log('parent is', this.state.name);
        console.log('removing option', id);

        const indexOfObject = currentOptions.findIndex(object => {
            return object.props.id === id;
            });

            console.log(indexOfObject); // 

            currentOptions.splice(indexOfObject, 1);

        this.setState({options:currentOptions });
    }

    componentDidMount(){
        var uri =apiurl+'/api/Containers/GetLinkedStrategies?parentName='+this.props.parentName;
        
        fetch(uri)
            .then(response =>  response.json())
            .then(json => this.setState ( {linkedStrategies : json}))//
            .catch(error => alert(error.message));
    }

    render(){

        const { selectedOption } = this.state;
        return(
            <div className='strategyDiv'>
                <div style ={{display:'inline-block'}}>
                <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={this.state.linkedStrategies}
                />
                </div>
                <button onClick={() => this.removeStrategyFromParent(this.props.id)}>-</button>
                <div>
                    options: <button onClick={this.addOption}>+</button>
                    <hr/>
                    {
                     this.state.options.map(option=>
                        {
                            return(
                                <Option
                                key = {option.props.id} 
                                id = {option.props.id}
                                name= {option.props.name}
                                removeFromParent = {this.removeChildOption}
                                parentName = {this.state.selectedOption.label}
                                />
                            )
                            })
                 }
                </div>
            </div>
        )
    }
}

export default Strategy;