import React, {Component} from 'react';
import Select from 'react-select';
import { config } from '../Constants'
var apiurl = config.url.API_URL

class Option extends Component{

    constructor(props) {
        super(props)
    }

    state = {
        selected: false,
        id: this.props.id,
        name: this.props.name,
        selectedOption: null,
        linkedOptions: []
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () =>
          console.log(`Option selected:`, this.state.selectedOption)
        );
      };

      handleCheckChanged (){

      }

    removeOptionFromParent = id =>
    {
        console.log('removing',this.state.id);
        this.props.removeFromParent(id);
    }
    
    componentDidMount(){
        var uri =apiurl+'/api/Containers/GetStrategyOptions?parentName='+this.props.parentName;
        fetch(uri)
            .then(response =>  response.json())
            .then(json => this.setState ( {linkedOptions : json}))
            .catch(error => alert(error.message));
    }
    getRandomArbitrary(min, max) {
        let n = Math.random() * (max - min) + min;
        return Math.round(n * 100) / 100;
      }
    render(){
        const { selectedOption } = this.state;


        return(
            <div className='strategyDiv'>
                <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={this.state.linkedOptions}
                />
                <table>
                    <tbody>
                    <tr><td>risk</td><td>{selectedOption ? this.getRandomArbitrary(0,20):0}</td></tr>
                    <tr><td>evidence</td><td>{selectedOption ? this.getRandomArbitrary(0,20):0}</td></tr>
                    <tr><td>alignment</td><td>{selectedOption ? this.getRandomArbitrary(0,20):0}</td></tr>
                    <tr><td>cost</td><td>{selectedOption ? this.getRandomArbitrary(0,20):0}</td></tr>
                    </tbody>
                </table>
                <input type = 'radio' checked={this.state.selected} onChange={this.handleCheckChanged}/>
                <button onClick={() => this.removeOptionFromParent(this.props.id)}>-</button>


            </div>
        )
    }
}
export default Option;