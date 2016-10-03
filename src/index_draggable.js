import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable';

var Datetime = require('react-datetime');
var moment = require('moment');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

//----Adding Modal
    // var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
                      {this.props.children}
                    </div>
                  </ReactCSSTransitionGroup>
                );

            } else {
                return <ReactCSSTransitionGroup transitionName={this.props.transitionName} />;
            }
        }
    });


    var Card = React.createClass({

       getInitialState: function(){ //Gets called only when the component is first created. Does not get called when the component is getting re-rendered?
            return {edit: false, isModalOpen: false}
       },

        edit: function(event){  //When cardName is being edited
          if (event.stopPropagation) {
              event.stopPropagation();   // W3C model
          } else {
              event.cancelBubble = true; // IE model
          }
          console.log("Clicked");
          var currentState = this.state.edit;
          this.setState({edit: !currentState}); //Note: state value does not get changed right after setState is called. React may pool couple of setStates together
        },

        remove: function(event){
          console.log("event",event);
          if (event.stopPropagation) {
              console.log("stopping propagation?")
              event.stopPropagation();   // W3C model
          } else {
              event.cancelBubble = true; // IE model
          }
          this.props.remCard(this.props.ind);
        },

        saveCardName: function(event){
          if (event.stopPropagation) {
              console.log("stopping propagation?")
              event.stopPropagation();   // W3C model
          } else {
              event.cancelBubble = true; // IE model
          }

          if(this.refs.textInput.value.trim() == ""){ //If name is empty
             this.setState({edit: false});
          }
          else{         //Else, i.e. Name not empty
             var obj = this.props.cardDetails;
             this.setState({edit: false});
             obj.cardName = this.refs.textInput.value;  //Change card name and retain other card values
             this.props.svCard( obj, this.props.ind);
          }
        },

        stopPropText : function(event){     //Where does this event magically come from?????;       Why do I have to stop propagation only from textArea why not from saveButton
          console.log("event",event);
          if (event.stopPropagation) {
              console.log("stopping propagation?")
              event.stopPropagation();   // W3C model
          } else {
              event.cancelBubble = true; // IE model
          }
        },

        checkEnter : function(event){
          //Make validation that card name is not empty
            if(this.refs.textInput.value.trim() == "");
            else{
              if(event.keyCode == 13) //If value is not empty, enter triggers save button
                this.refs.cardNameSave.click();
            }
        },

        openModal: function() {
               this.setState({ isModalOpen: true });
        },

        closeModal: function(event) { //since the modal and modal close button are inside the div (although not graphically) we have to disable click propogate
          if (event.stopPropagation) {
              console.log("stopping propagation?")
              event.stopPropagation();   // W3C model
          } else {
              event.cancelBubble = true; // IE model
          }
          this.setState({ isModalOpen: false });
        },

        saveCardModal: function(modalObject){ //Save card values entered in modal
          var obj = modalObject;
          console.log("in card:",obj);
          obj.cardName = this.props.cardDetails.cardName; //Save cardModal values and retain cardName
          this.props.svCard( obj, this.props.ind);
        },

        componentDidMount: function(){
          var rect = this.refs.card.getBoundingClientRect();
          console.log("Initial Position: TRBL ",rect.top, rect.right, rect.bottom, rect.left);
        },
        componentDidUpdate: function(){
          var rect = this.refs.card.getBoundingClientRect();
          console.log("Updated Position: TRBL ",rect.top, rect.right, rect.bottom, rect.left);
        },
        mouseDown: function(){
          var rect = this.refs.card.getBoundingClientRect();
          console.log("Mouse Down Position: TRBL ",rect.top, rect.right, rect.bottom, rect.left);
        },
        onControlledDragStop: function(event, deltaPosition){
          if (event.stopPropagation) {
              console.log("stopping propagation?")
              event.stopPropagation();   // W3C model
          } else {
              event.cancelBubble = true; // IE model
          }
          console.log("Drag stop",deltaPosition.x,deltaPosition.y);
        },

        renderNormal: function(){
        //  var self =this;  //Is this the right way????
          console.log("render Normal");
          return(<Draggable  axis="y" onStop={this.onControlledDragStop} >
            <div className="card" onClick={this.openModal} ref="card" onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>
              <p  className ="cardName" onClick={this.edit} >{this.props.children}</p>
              <Modal isOpen={this.state.isModalOpen} transitionName="modal-anim" cardDetails={this.props.cardDetails} saveModal={this.saveCardModal}>
                  <button onClick={this.closeModal} className="closeModal">Close modal</button>
              </Modal>
              <button className="buttonRemoveCard" onClick={this.remove}>X</button>
          </div>
        </Draggable>);
          //function(){self.remove(event);}
        },

        renderEditing: function(){
            console.log("render editing");
            return(<div className="card"  onClick={this.edit}>
                        <textarea ref="textInput" placeholder ={this.props.children} autoFocus = {focus} onClick={this.stopPropText} onKeyDown={this.checkEnter} ></textarea>
                        <button id="button3" ref="cardNameSave" onClick={this.saveCardName}>Save</button>
                   </div>);
        },

        render: function(){
            if(this.state.edit){
                console.log("Card Edit Rendering",this.props.ind);
                console.log("edit",this.state.edit);
                return this.renderEditing();
            }
            else{
              console.log("Card Rendering",this.props.ind);
              console.log("edit",this.state.edit);
                return this.renderNormal();
            }
        }
    })



    var List = React.createClass({

        getInitialState: function(){
            return {
              cardDetails:[
                {cardName:'Hit the Gym', cardDescription:'Upper Body workout', cardDeadline: '09/25/2016 12:00 AM'},
                {cardName:'Take Medicine', cardDescription:'1 Keraglo after breakfast', cardDeadline: '09/26/2016 12:00 AM'},
                {cardName:'Read the news', cardDescription:'Skip all the kachada news', cardDeadline: '09/40/2016 12:00 AM'},
              ]
            };
        },

        removeCard: function(index){
            var arr_obj = this.state.cardDetails;
            arr_obj.splice(index,1);
            this.setState({cardDetails: arr_obj});
        },

        saveCard: function(obj, index){
            var arr_obj = this.state.cardDetails;
            arr_obj[index] = obj;
            this.setState({cardDetails: arr_obj});
        },

        eachCard: function(item,index){ //Map just automatically serves these two parameters???????
            console.log(item,index);
            return(<Card key={index} ind={index} remCard={this.removeCard} svCard={this.saveCard} cardDetails={item}>{item.cardName}</Card>);
        },

        newCard: function(){
            var arr_obj = this.state.cardDetails;
            arr_obj.push({cardName: "Default card", cardDescription: "Enter Description", cardDeadline: ""});
            this.setState({cardDetails: arr_obj});
        },

        render: function(){
        console.log("List Render");
            return(
            <div className ="list">
            <h3>List Name</h3>
            <button onClick={this.newCard} >New Card</button>
            <div>{this.state.cardDetails.map(this.eachCard)}</div>
            </div>
            );
        }
    })

    ReactDOM.render(<List/>,document.getElementById("container"));
