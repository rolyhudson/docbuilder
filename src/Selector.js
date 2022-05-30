import React, {Component} from 'react';

import BuilderApp from './Builder/BuilderApp';
import BuilderApp2 from './BuilderV2/BuilderApp2';
import Form from 'react-bootstrap/Form';

const versions =['V1','V2'];
class Selector extends Component {

    state = {
        selected: versions[0]
    }

    handleChange(event){
        this.setState({selected:event});
    }


    render(){
        return(
            <div>
                FUTURES RAT
                <div>
                ui prototypes
                <Form>

                <div className="mb-3">
                {versions.map((type,i) => (
                <Form.Check
                key = {i}
                label={type}
                name="group1"
                type={'radio'}
                id={`inline-radio-${i}`}
                checked ={this.state.selected === type}
                onChange = {() => this.handleChange(type)}
                />
                ))}
                </div>

                </Form>
                   
            </div>
            {
                this.renderVersion(this.state.selected)
            }
            </div>
        )
    }

    renderVersion(version){
        switch(version)
        {
            case 'V1':
                return <BuilderApp/>
            case 'V2':
                return <BuilderApp2/>
        }
    }
}
export default Selector;