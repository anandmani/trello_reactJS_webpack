import React from 'react';
import { render } from 'react-dom';   //import and export are ES6. Converted by Babel
import { GithubPicker  } from 'react-color';
import  ColourPicker from './ColourPicker'; //If the component is export default we dont have to put { } around it
import Members from './Members';
import { Button } from 'react-bootstrap';

var Datetime = require('react-datetime');  //require and module.export is commonJS
var moment = require('moment');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Modal = React.createClass({

  getInitialState: function(){
    return { isTagging: "none"};
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

  saveTags: function(tagArray){
    var modal_obj = this.props.cardDetails;
    modal_obj.cardTags = tagArray;
    this.props.saveModal(modal_obj);
  },

  saveMembers: function(memberArray){
    console.log("in modal, array"+memberArray);
    var modal_obj = this.props.cardDetails;
    modal_obj.cardMembers = memberArray;
    this.props.saveModal(modal_obj);
  },

  stopPropagation: function(event){
    if (event.stopPropagation) {
        event.stopPropagation();   // W3C model
    } else {
        event.cancelBubble = true; // IE model
    }

    this.closeTagging();
  },

  toggleTagging: function(){
    this.setState({isTagging: (this.state.isTagging=="block")?"none":"block"});
  },

  closeTagging: function(){
    this.setState({isTagging: "none"});
  },

  removeDeadline: function(){
    var modal_obj = this.props.cardDetails;     //Copy by reference.
    modal_obj.cardDeadline = "";
    this.props.saveModal(modal_obj);  //This is useless
  },

    render: function() {
        if(this.props.isOpen){
          console.log("Rendering modal");
            return (
              <ReactCSSTransitionGroup transitionName={this.props.transitionName}>
                  <div className="modal">
                      <div className="modalContent container" onClick={this.stopPropagation}>

                          <h3>{this.props.cardDetails.cardName}</h3>

                          <div  className="modalSegment row">
                              <p className="modalKey col-xs-2">Deadline </p>
                              <div className="modalValue col-xs-8">
                                  <Datetime className="dateInput" refs="dateInput" value={this.props.cardDetails.cardDeadline} onChange={this.saveDeadline}/>
                                  <Button className="buttonClearDate" onClick={this.removeDeadline}> X </Button>
                              </div>
                          </div>

                            <Members  memberArray={this.props.cardDetails.cardMembers} saveMembers={this.saveMembers}/>

                            <ColourPicker tagArray={this.props.cardDetails.cardTags} saveTags={this.saveTags} isTagging={this.state.isTagging} toggleTagging={this.toggleTagging}/>

                          <div   className="modalSegment row">
                              <p className="modalKey col-xs-2">Description</p>
                              <div  className="modalValue col-xs-8">
                                  <textArea placeholder = "Enter description" ref= "modalDescription" className="cardDescTextBox" defaultValue={this.props.cardDetails.cardDescription}></textArea>
                                  <Button bsStyle="success" onClick = {this.saveDescription} className="cardDescSave">Save</Button>
                              </div>
                          </div>



                          {this.props.children}

                      </div>
                  </div>
              </ReactCSSTransitionGroup>
            );

        } else {
            return <ReactCSSTransitionGroup transitionName={this.props.transitionName} />;
        }
    }
});

export default Modal;
