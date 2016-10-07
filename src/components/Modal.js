import React from 'react';
import { render } from 'react-dom';   //import and export are ES6. Converted by Babel
import { GithubPicker  } from 'react-color';
import  ColourPicker from './ColourPicker'; //If the component is export default we dont have to put { } around it
import Members from './Members';

var Datetime = require('react-datetime');  //require and module.export is commonJS
var moment = require('moment');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Modal = React.createClass({

  getInitialState: function(){
    return {};
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

    render: function() {
        if(this.props.isOpen){
          console.log("Rendering modal");
            return (
              <ReactCSSTransitionGroup transitionName={this.props.transitionName}>
                  <div className="modal">
                      <div className="modalContent">

                          <h3>{this.props.cardDetails.cardName}</h3>

                          <div  className="modalSegment">
                              <p className="modalKey">Deadline </p>
                              <div className="modalValue">
                                  <Datetime defaultValue={this.props.cardDetails.cardDeadline} onChange={this.saveDeadline}/>
                              </div>
                          </div>

                            <Members  memberArray={this.props.cardDetails.cardMembers} saveMembers={this.saveMembers}/>

                          <div   className="modalSegment">
                              <p className="modalKey">Description</p>
                              <div  className="modalValue">
                                  <textArea placeholder = "Enter description" ref= "modalDescription" className="cardDescTextBox" defaultValue={this.props.cardDetails.cardDescription}></textArea>
                                  <button onClick = {this.saveDescription} className="cardDescSave">Save</button>
                              </div>
                          </div>

                          <ColourPicker tagArray={this.props.cardDetails.cardTags} saveTags={this.saveTags}/>

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
