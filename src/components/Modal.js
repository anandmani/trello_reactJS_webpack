import React from 'react';
import { render } from 'react-dom';
import { CirclePicker } from 'react-color';

var Datetime = require('react-datetime');
var moment = require('moment');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Modal = React.createClass({

  getInitialState: function(){
    return {isTagging: "none", tag: "#F44336"};
  },

  saveDescription: function(){
    var modal_obj = this.props.cardDetails;     //this is copying by reference. Therefore, our save functions are useless!
    modal_obj.cardDescription =  this.refs.modalDescription.value;
    this.props.saveModal(modal_obj);      //Useless call!
  },

  saveDeadline: function(moment_obj){ //moment object is passed by Time picker
    var date = moment_obj._d; //selected date on timepicker
    var date = moment(date).format('MM/DD/YYYY hh:mm A z');
    console.log("date:",date);

    var modal_obj = this.props.cardDetails;     //Copy by reference.
    modal_obj.cardDeadline = date;
    this.props.saveModal(modal_obj);  //This is useless
  },

  pickColour : function(){ //Flipping value of isTagging
    this.setState({isTagging: (this.state.isTagging=="inline-block")?"none":"inline-block"})
  },

  handleChange: function(color){
    console.log("onChange "+color.hex);
    this.setState({tag: color.hex})
  },

  handleChangeComplete: function(color){
    console.log("onChangeComplete "+color.hex);
  },

    render: function() {
        if(this.props.isOpen){
          console.log("Rendering modal");
            return (
              <ReactCSSTransitionGroup transitionName={this.props.transitionName}>
                <div className="modal">
                  <h3>{this.props.cardDetails.cardName}</h3>
                  <Datetime defaultValue={this.props.cardDetails.cardDeadline} onChange={this.saveDeadline}/>
                  <p>Owner</p>
                  <p>Members</p>
                  <textArea placeholder = "Enter description" ref= "modalDescription" className="cardDescTextBox" defaultValue={this.props.cardDetails.cardDescription}></textArea>
                  <button onClick = {this.saveDescription} className="cardDescSave">Save</button>
                  <button className = "buttonColourPicker" onClick= {this.pickColour}>Tag</button>
                  <div className="colourPicker" style={{display:this.state.isTagging}}>
                    <CirclePicker  onChange={ this.handleChange } color={ this.state.tag } onChangeComplete={ this.handleChangeComplete } />
                  </div>
                  {this.props.children}
                </div>
              </ReactCSSTransitionGroup>
            );

        } else {
            return <ReactCSSTransitionGroup transitionName={this.props.transitionName} />;
        }
    }
});

export default Modal;
