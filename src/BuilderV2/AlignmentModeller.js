import React, {Component} from 'react';
import Header from './Header';
import Drawflow from 'drawflow'
import styleDrawflow from 'drawflow/dist/drawflow.min.css'
import './drawflow.css';

const tenents = ["REDUCE OPPORTUNITY FOR HARM","ENHANCED HUMAN EXPERIENCE","OPERATIONAL OPTIMIZATION","INCREASED RESILIENCY"];
const goals = ["ENGAGEMENT","INCLUSION","WELL-BEING","CLINICAL CARE MODEL","OPERATIONAL EFFICIENCY","CAHNGE READINESS","BUILDING PERFORMANCE","INDIVIDUAL RECOVERY & RESPONSE","SELF HARM","HARM TO OTHERS"];
const outcomes = ["ENHANCE PATIENT EXPERIENCE","ENHANCE STAFF ENGAGEMENT / EXPERIENCE","IMPROVE PATIENT ENGAGEMENT","IMPROVE STAFF ENGAGEMENT"
,"IMPROVE STAFF ENGAGEMENT","IMPROVE FAMILY ENGAGEMENT","IMPROVE COMMUNITY ENGAGEMENT","DECREASE LENGTH OF STAY","INCREASE CARE PROCESSES & EFFICIENCY"
," INCREASE BUILDING FLEXIBILITY","ENHANCE BUILDING PERFORMANCE","PROMOTE RECOVERY & DISEASE MANAGEMENT","REDUCE VIOLENCE/AGGRESSIVE INCIDENTS"
,"REDUCE ENVIRONMENTAL RISKS/HAZARDS"];

var mobile_item_selec = '';
    var mobile_last_move = null;
    var editor;
class AlignmentModeller extends Component{
    constructor(){
        super()
        this.addNodeToDrawFlow = this.addNodeToDrawFlow.bind(this);
        this.drop = this.drop.bind(this);
      }
    render(){
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
                <div className="tab">
                <button className="tablinks" onClick={this.openTab( 'Goals')}>Goals</button>
                <button className="tablinks" onClick={this.openTab( 'Tenets')}>Tenets</button>
                <button className="tablinks" onClick={this.openTab( 'Outcomes')}>Outcomes</button>
                </div>
                <div className="float-container">
                

                <div className="float-child" id="Tenets"> 
                {
                    tenents.map((tenent, index) => {
                        return(
                            <div className="drag-drawflow" draggable="true" onDragStart={this.drag} data-node={tenent}>
                            <i className="fab fa-facebook"></i><span>{tenent}</span>
                            </div>
                        )
                    })
                }
                </div>

                

                

                
                <div className='float-child'>Canvas
                <div style={mystyle} id="drawflow" onDrop={this.drop} onDragOver={this.allowDrop}></div>
                    
                </div>
                </div>
                </div>
                
                
        )
    }

    openTab(evt, element){
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        
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

export default AlignmentModeller;