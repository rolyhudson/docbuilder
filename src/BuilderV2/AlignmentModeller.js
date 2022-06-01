import React, {Component} from 'react';
import Header from './Header';
import { connect} from 'react-redux';
import {addAlignment, updateAlignment} from './actions';
import { ZoomIn, ZoomOut, ArrowsFullscreen } from 'react-bootstrap-icons';
import Drawflow from 'drawflow';
import { v4 as uuidv4 } from 'uuid';
import { randomName } from './NameGenerator';

import './drawflow.css';

const tenets = ["REDUCE OPPORTUNITY FOR HARM","ENHANCED HUMAN EXPERIENCE","OPERATIONAL OPTIMIZATION","INCREASED RESILIENCY","+ NEW"];
const goals = ["ENGAGEMENT","INCLUSION","WELL-BEING","CLINICAL CARE MODEL","OPERATIONAL EFFICIENCY","CHANGE READINESS","BUILDING PERFORMANCE","INDIVIDUAL RECOVERY & RESPONSE","SELF HARM","HARM TO OTHERS","+ NEW"];
const outcomes = ["ENHANCE PATIENT EXPERIENCE","ENHANCE STAFF ENGAGEMENT / EXPERIENCE","IMPROVE PATIENT ENGAGEMENT","IMPROVE STAFF ENGAGEMENT"
,"IMPROVE STAFF ENGAGEMENT","IMPROVE FAMILY ENGAGEMENT","IMPROVE COMMUNITY ENGAGEMENT","DECREASE LENGTH OF STAY","INCREASE CARE PROCESSES & EFFICIENCY"
," INCREASE BUILDING FLEXIBILITY","ENHANCE BUILDING PERFORMANCE","PROMOTE RECOVERY & DISEASE MANAGEMENT","REDUCE VIOLENCE/AGGRESSIVE INCIDENTS"
,"REDUCE ENVIRONMENTAL RISKS/HAZARDS","+ NEW"];

var mobile_item_selec = '';
    var mobile_last_move = null;
    var editor;
class AlignmentModeller extends Component{
    constructor(){
        super()
        this.addNodeToDrawFlow = this.addNodeToDrawFlow.bind(this);
        this.drop = this.drop.bind(this);
      }

      state ={
        components:tenets,
        currentModel :{}
      }
    render(){

      
        let { alignments} = this.props;
        
        

        const mystyle = {
            display: "block",
          position: "relative",
          width: "100%",
          height: "800px",
          };
        return(
            <div>
                <Header/>
                <h4>Alignment modeller</h4>
                <div>Alignment model : <input type="text" name="name" defaultValue={this.state.currentModel.name}/></div>
                <div className="float-container">

                <div className="float-child" id="Tenets"> 
                <button onClick={() => this.toggleComponentMenu('goals')}>Goals</button>
                <button onClick={() => this.toggleComponentMenu('tenets')}>Tenets</button>
                <button onClick={() => this.toggleComponentMenu('outcomes')}>Outcomes</button>
                <hr/>
                {
                  
                  this.state.components.map((tenent, index) => {
                        return(
                            <div key = {index} className="drag-drawflow" draggable="true" onDragStart={this.drag} data-node={tenent}>
                            <span>{tenent}</span>
                            </div>
                        )
                    })
                }
                </div>
                <div className='float-child canvas'>
                <button onClick={() => this.saveModel()}>Save</button>
                <button onClick={() => editor.zoom_in()}><ZoomIn /></button>
                <button onClick={() => editor.zoom_out()}><ZoomOut /></button>
                <button onClick={() => editor.zoom_reset()}><ArrowsFullscreen/></button>

                <div style={mystyle} id="drawflow" onDrop={this.drop} onDragOver={this.allowDrop}></div>
                    
                </div>
                </div>
                </div>
                
                
        )
    }

    saveModel(){
      var exportdata = editor.export();
      
      this.state.currentModel.data = exportdata;
      console.log('saving',this.state.currentModel);
      //this.props.updateAlignment(this.state.currentModel);
    }

    toggleComponentMenu(name, event){
        console.log(name);
        switch(name)
        {
          case 'goals':
            this.setState({components: goals});
            return;
          case 'tenets':
            this.setState({components: tenets});
            return;
          case 'outcomes':
            this.setState({components: outcomes});
            return;
        }
    }

    allowDrop(ev) {
        ev.preventDefault();
      }

    drag(ev) {
        
        if (ev.type === "touchstart") {
          mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
        } else {
        ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
        }
      }

      drop(ev) {
          console.log("droppin", ev.type);
        if (ev.type === "touchend") {
          var parentdrawflow = document.elementFromPoint( mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY).closest("#drawflow");
          if(parentdrawflow != null) {
            this.addNodeToDrawFlow(mobile_item_selec, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY);
          }
          mobile_item_selec = '';
        } else {
          ev.preventDefault();
          var data = ev.dataTransfer.getData("node");

          this.addNodeToDrawFlow(data, ev.clientX, ev.clientY);
        }
  
      }
  
      addNodeToDrawFlow(name, pos_x, pos_y) {
        
        if(editor.editor_mode === 'fixed') {
          return false;
        }
        pos_x = pos_x * ( editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)) - (editor.precanvas.getBoundingClientRect().x * ( editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)));
        pos_y = pos_y * ( editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)) - (editor.precanvas.getBoundingClientRect().y * ( editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)));
  
        editor.addNode('foo', 1, 1, pos_x, pos_y, 'foo', {}, name);
        
    }

    componentDidMount(){

      let params = new URLSearchParams(window.location.search);
      let id = params.get('id');
      this.setState({currentModel : {name: randomName('ALIGNMENT') , id : uuidv4(), data : {} }});
      if(id !== null)
      {
        this.setState({currentModel :this.props.alignments.find(element => element.id === id)});
      }

    const container = document.getElementById("drawflow");
    editor = new Drawflow(container);

    editor.reroute = true;
     editor.start();
     
    editor.reroute_fix_curvature = true;
    const data = {
      name: ''
    };
    editor.addNode('foo', 1, 1, 100, 200, 'foo', data, 'INCREASED RESILIENCY');
    editor.addNode('bar', 1, 1, 400, 100, 'bar', data, ' INCREASE BUILDING FLEXIBILITY');
    editor.addNode('bar', 1, 1, 400, 300, 'bar', data, 'ENHANCE BUILDING PERFORMANCE');

    editor.addConnection(1, 2, "output_1", "input_1");
    editor.addConnection(1, 3, "output_1", "input_1");

    // Events!
    editor.on('nodeCreated', function(id) {
        console.log("Node created " + id);
      })
  
      editor.on('nodeRemoved', function(id) {
        console.log("Node removed " + id);
      })
  
      editor.on('nodeSelected', function(id) {
        console.log("Node selected " + id);
      })
  
      editor.on('moduleCreated', function(name) {
        console.log("Module Created " + name);
      })
  
      editor.on('moduleChanged', function(name) {
        console.log("Module Changed " + name);
      })
  
      editor.on('connectionCreated', function(connection) {
        console.log('Connection created');
        console.log(connection);
      })
  
      editor.on('connectionRemoved', function(connection) {
        console.log('Connection removed');
        console.log(connection);
      })

  
      editor.on('nodeMoved', function(id) {
        console.log("Node moved " + id);
      })
  
      editor.on('zoom', function(zoom) {
        console.log('Zoom level ' + zoom);
      })
  
      editor.on('translate', function(position) {
        console.log('Translate x:' + position.x + ' y:'+ position.y);
      })
  
      editor.on('addReroute', function(id) {
        console.log("Reroute added " + id);
      })
  
      editor.on('removeReroute', function(id) {
        console.log("Reroute removed " + id);
      })
    }
}

function mapStateToProps(state){
    
  return {
      
      alignments: state.rootReducer.alignments,
  };
}

export default connect(mapStateToProps,{addAlignment,updateAlignment}) (AlignmentModeller);