import React from 'react';
import { render } from 'react-dom';
import Modal from "./Modal";
var PropTypes = React.PropTypes;
var DragSource = require('react-dnd').DragSource;
var DropTarget = require('react-dnd').DropTarget;

var draggedItemProps;

var cardSource = {
  beginDrag: function(props){
    draggedItemProps =  props;
    return {};
  }
};

var cardTarget = {
  drop: function(props,monitor){
    console.log("Dragging:\nList-"+draggedItemProps.listInd,"Card-"+draggedItemProps.ind+" "+draggedItemProps.cardDetails.cardName);
    // console.log("target "+JSON.stringify(monitor.getItem(), null, 4));  //Supposed to use monitor.getItem() to get what's being dragged instead of global variable. But, monitor.getItem() not working
    console.log("Dropping to:\nList-"+props.listInd,"Card-"+props.ind+" "+props.cardDetails.cardName);
    props.moveCard(draggedItemProps.listInd,draggedItemProps.ind,props.listInd,props.ind);
  }
};

function collect(connect, monitor){
  return{
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),

  };
};

function collect1(connect,monitor){
  return{
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
};

var Card = React.createClass({

  propTypes: {
   connectDragSource: PropTypes.func.isRequired,
   connectDropTarget: PropTypes.func.isRequired,
   isDragging: PropTypes.bool.isRequired,
   isOver: PropTypes.bool.isRequired
 },

   getInitialState: function(){ //Gets called only when the component is first created. Does not get called when the component is getting re-rendered?
      //  console.log("Card "+this);
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

    // componentDidMount: function(){
    //   var rect = this.refs.card.getBoundingClientRect();
    //   console.log("Initial Position: TRBL ",rect.top, rect.right, rect.bottom, rect.left);
    // },
    // componentDidUpdate: function(){
    //   var rect = this.refs.card.getBoundingClientRect();
    //   console.log("Updated Position: TRBL ",rect.top, rect.right, rect.bottom, rect.left);
    // },
    // mouseDown: function(){
    //   var rect = this.refs.card.getBoundingClientRect();
    //   console.log("Mouse Down Position: TRBL ",rect.top, rect.right, rect.bottom, rect.left);
    // },

    renderNormal: function(){   //When we are not editing Card Name
      var connectDragSource = this.props.connectDragSource;
      var isDragging = this.props.isDragging;
      var connectDropTarget = this.props.connectDropTarget;
      var isOver = this.props.isOver;
      var val = "grey" && true;
      // var index = parseInt(this.props.ind);
      // var odd = parseInt(this.props.ind)%2; //index mod 2 = 1 (true) for all odd cards.

    //  var self =this;  //Is this the right way????
      console.log("render Normal");
      //If modal is not open, enable Drag-Drop
      if(!this.state.isModalOpen){
        return connectDragSource(connectDropTarget(
          <div
              style={{
                opacity: isDragging ? 0 : isOver? 0.5 : 1,
                border: isDragging? "none" : isOver? "solid 1px black":"none",
              }}
              className="card" onClick={this.openModal} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>

                <p  className ="cardName" onClick={this.edit} >{this.props.children}</p>
                <Modal isOpen={this.state.isModalOpen} transitionName="modal-anim" cardDetails={this.props.cardDetails} saveModal={this.saveCardModal}>
                    <button onClick={this.closeModal} className="closeModal">Close modal</button>
                </Modal>
                <button className="buttonRemoveCard" onClick={this.remove}>X</button>

          </div>
      ));
    }
    //If Modal is not open, disable Drag-Drop
    else{
      return (
        <div
            style={{
              opacity: isDragging ? 0 : isOver? 0.5 : 1,
              border: isDragging? "none" : isOver? "solid 1px black":"none",
            }}
            className="card" onClick={this.openModal} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>

              <p  className ="cardName" onClick={this.edit} >{this.props.children}</p>
              <Modal isOpen={this.state.isModalOpen} transitionName="modal-anim" cardDetails={this.props.cardDetails} saveModal={this.saveCardModal}>
                  <button onClick={this.closeModal} className="closeModal">Close modal</button>
              </Modal>
              <button className="buttonRemoveCard" onClick={this.remove}>X</button>

        </div>
      );
    }

    },

    renderEditing: function(){ //When we are editing Card Name
        console.log("render editing");
        return(<div className="card"  onClick={this.edit}>
                    <textarea ref="textInput" placeholder ={this.props.children} autoFocus = {focus} onClick={this.stopPropText} onKeyDown={this.checkEnter} ></textarea>
                    <button id="button3" ref="cardNameSave" onClick={this.saveCardName}>Save</button>
               </div>);
    },

    render: function(){
        if(this.state.edit){
            // console.log("Card Edit Rendering",this.props.ind);
            // console.log("edit",this.state.edit);
            return this.renderEditing();
        }
        else{
          // console.log("Card Rendering",this.props.ind);
          // console.log("edit",this.state.edit);
            return this.renderNormal();
        }
    }
});

var partCard =  DropTarget('card', cardTarget, collect1)(Card);
export default DragSource('card', cardSource, collect)(partCard);
