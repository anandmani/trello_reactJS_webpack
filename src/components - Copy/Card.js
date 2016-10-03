import React from 'react';
import { render } from 'react-dom';
import Modal from "./Modal";

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

    renderNormal: function(){
    //  var self =this;  //Is this the right way????
      console.log("render Normal");
      return(
        <div className="card" onClick={this.openModal} ref="card" onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>
          <p  className ="cardName" onClick={this.edit} >{this.props.children}</p>
          <Modal isOpen={this.state.isModalOpen} transitionName="modal-anim" cardDetails={this.props.cardDetails} saveModal={this.saveCardModal}>
              <button onClick={this.closeModal} className="closeModal">Close modal</button>
          </Modal>
          <button className="buttonRemoveCard" onClick={this.remove}>X</button>
      </div>
    );
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
});

export default Card;
