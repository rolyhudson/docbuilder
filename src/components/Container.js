import React, {Component} from 'react';
import { v4 as uuid } from 'uuid';
import Strategy from './Strategy';
import Select from 'react-select';

class Container extends Component{

    constructor(props) {
        super(props)
    }

    state = {
        containers: [],
        strategies: [],
        id: this.props.id,
        name: this.props.name,
        showContainers: true,
        showStrategies: true,
        linkedContainers : [],
        linkedStrategies : [],
        
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () =>
          console.log(`Option selected:`, this.state.selectedOption)
        );
      };

    addContainer = () =>{
        if(!this.optionISelected())
        {
            alert('set container type before adding objects');
            return;
        }
        let currentContainers = this.state.containers;
        let id = uuid();
        let n= this.state.containers.length;
        currentContainers.push(<Container id ={id} name = {this.state.name + '.c_'+n} />);
        console.log("added container", id);
        this.setState({containers:currentContainers });
        
    }

    removeContainerFromParent = id =>
    {
        console.log('removing',this.state.id);
        this.props.removeFromParent(id);
    }
    optionISelected(){
        return this.state.selectedOption ? true : false;
    }

    addStrategy = () =>{
        if(!this.optionISelected())
        {
            alert('set container type before adding objects');
            return;
        }
        let currentStrategies= this.state.strategies;
        let id = uuid();
        
        let n= this.state.strategies.length;
        currentStrategies.push(<Strategy id ={id} name = {this.state.name + '.s_'+n} removeFromParent = {this.removeChildStrategy}/>);
        console.log("added strategy", id);
        this.setState({strategies:currentStrategies });
            
    }

    removeChildContainer = id =>{
        let currentContainers = this.state.containers;
        console.log('removing container', id );
        const indexOfObject = currentContainers.findIndex(object => {
            return object.props.id === id;
            });
        currentContainers.splice(indexOfObject, 1);
        this.setState({containers:currentContainers });
    }

    removeChildStrategy = id =>{
        let currentStrategies = this.state.strategies;
        console.log('parent is', this.state.name);
        console.log('removing strategy', id);
        console.log(currentStrategies);
        const indexOfObject = currentStrategies.findIndex(object => {
            return object.props.id === id;
            });

            console.log(indexOfObject); // 

            currentStrategies.splice(indexOfObject, 1);

        console.log(currentStrategies); // 
        this.setState({strategies:currentStrategies });
    }

    componentDidMount(){
        var uri='';
        if(this.state.id===0)//root
            uri='/api/Responses/GetContainers';
        else
            uri ='/api/Responses/GetLinkedContainers?parentName='+this.props.parentName;
        fetch(uri)
            .then(response =>  response.json())
            .then(json => this.setState ( {linkedContainers : json}))
            .catch(error => alert(error.message));
    }

    toggleComponentDisplay = () =>{
        this.setState({showContainers: !this.state.showContainers});
    }

    toggleStrategyDisplay = () =>{
        this.setState({showStrategies: !this.state.showStrategies});
    }

 render(){
    const { selectedOption } = this.state;

     return (
         <div className='childrenContainer'>
             
             Container Name: 
             <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={this.state.linkedContainers}
                />
             <button onClick={this.addContainer}>+ Container</button>
             <button onClick={() => this.removeContainerFromParent(this.props.id)}>- Container</button>
             <p>{this.props.id}</p>
             <div className='childrenContainer'>
                 
                 
                 {
                     this.state.showStrategies?
                     (
                        <div>
                            <p>strategies</p>
                            <button onClick={this.toggleStrategyDisplay}>-</button>
                            <button onClick={this.addStrategy}>+ Strategy</button>
                            <hr/>
                            
                            {
                                
                                this.state.strategies.map(strategy=>
                                    {
                                        return(
                                            <Strategy 
                                            key = {strategy.props.id} 
                                            id = {strategy.props.id}
                                            name= {strategy.props.name}
                                            removeFromParent = {this.removeChildStrategy}
                                            parentName = {this.state.selectedOption.label}
                                            />
                                        )
                                        })
                            }
                        </div>
                     )
                     :
                     (
                        <div>
                            <p>strategies</p>
                            <button onClick={this.toggleStrategyDisplay}>+</button>
                            
                            <hr/>
                        </div>
                     )
                    
                 }
             </div>
             <div className='childrenContainer'>
                 {
                     this.state.showContainers?
                     (
                        <div>
                        <p>containers</p>
                        <button onClick={this.toggleComponentDisplay}>-</button>
                        {
                            this.state.containers.map(container=>
                               {
                                   return(
                                       <Container 
                                       key = {container.props.id} 
                                       id = {container.props.id}
                                       name= {container.props.name}
                                       removeFromParent = {this.removeChildContainer}
                                       parentName = {this.state.selectedOption.label}
                                       />
                                   )
                                   })
                        }
                        </div>
                     )
                     :
                     (
                         <div>
                             <p>containers</p>
                            <button onClick={this.toggleComponentDisplay}>+</button>
                         </div>
                     )
                 }
                 
             </div>
             
         </div>
         
     )
 }   
}
export default Container;