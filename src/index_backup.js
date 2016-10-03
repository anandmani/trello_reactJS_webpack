import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom'
var Datetime = require('react-datetime');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

//----Adding Modal
    // var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

    var Modal = React.createClass({
      getInitialState: function(){
        return {};
      },

      saveModalDescription: function(){
          this.props.saveDesc(this.refs.modalDescription.value);
      },
        render: function() {
            if(this.props.isOpen){

                return (
                  <ReactCSSTransitionGroup transitionName={this.props.transitionName}>
                    <div className="modal">
                      <h3>{this.props.modalName}</h3>
                      <Datetime/>
                      <p>Owner</p>
                      <p>Members</p>
                      <textArea placeholder = "Enter description" ref= "modalDescription" className="cardDescTextBox">{this.props.cardDesc}</textArea>
                      <button onClick = {this.saveModalDescription} className="cardDescSave">Save</button>
                      {this.props.children}
                    </div>
                  </ReactCSSTransitionGroup>
                );

            } else {
                return <ReactCSSTransitionGroup transitionName={this.props.transitionName} />;
            }
        }
    });
//---End of Modal

    var Card = React.createClass({

       getInitialState: function(){ //Gets called only when the component is first created. Does not get called when the component is getting re-rendered?
         console.log("getting init state");
            return {edit: false, isModalOpen: false}
       },

        edit: function(event){
          if (event.stopPropagation) {
              console.log("stopping propagation?")
              event.stopPropagation();   // W3C model
          } else {
              event.cancelBubble = true; // IE model
          }
          console.log("Clicked");
          var currentState = this.state.edit;
          console.log("In Edit - Old Value",currentState);
           this.setState({edit: !currentState});
           console.log("In Edit - New Value = ",!currentState);
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

        save: function(event){
          if (event.stopPropagation) {
              console.log("stopping propagation?")
              event.stopPropagation();   // W3C model
          } else {
              event.cancelBubble = true; // IE model
          }
          if(this.refs.textInput.value.trim() == ""){
             this.setState({edit: false});
          }
          else{
             this.setState({edit: false});
             this.props.svCard( this.refs.textInput.value, this.props.ind);
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
        saveDescription: function(val){
          this.props.saveDesc(val,this.props.ind);
        },

        renderNormal: function(){
        //  var self =this;  //Is this the right way????
          console.log("render Normal");
          return(<div className="card" onClick={this.openModal}>
              <p  className ="cardName" onClick={this.edit} >{this.props.children}</p>
              <Modal isOpen={this.state.isModalOpen} transitionName="modal-anim" modalName={this.props.children} cardDesc={this.props.cardDesc} saveDesc={this.saveDescription}>
                  <button onClick={this.closeModal} className="closeModal">Close modal</button>
              </Modal>
              <button className="buttonRemoveCard" onClick={this.remove}>X</button>
          </div>);
          //function(){self.remove(event);}
        },

        renderEditing: function(){
            console.log("render editing");
            return(<div className="card"  onClick={this.edit}>
                        <textarea ref="textInput" placeholder ={this.props.children} autoFocus = {focus} onClick={this.stopPropText} onKeyDown={this.checkEnter} ></textarea>
                        <button id="button3" ref="cardNameSave" onClick={this.save}>Save</button>
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
            return {comments:[
              'Hit the Gym',
              'Take Medicine',
              'Read the news'],
            cardDescription: [
              "Upper Body workout ",
              "1 Keraglo after breakfast",
              "Skip all the kachada news"]
            };
        },

        removeCard: function(index){
            var arr = this.state.comments;
            var arr2 = this.state.cardDescription;
            arr.splice(index,1);
            arr2.splice(index,1);
            this.setState({comments:arr, cardDescription:arr2});
        },

        saveCard: function(text, index){
            var arr = this.state.comments;
            arr[index] = text;
            this.setState({comments: arr});
        },

        saveDescription: function(value,index){
          var arr = this.state.cardDescription;
          arr[index]=value;
          this.setState({cardDescription: arr});
        },

        eachCard: function(item,index){ //Map just automatically serves these two parameters???????
            console.log(item,index);
             return(<Card key={index} ind={index} remCard={this.removeCard} svCard={this.saveCard} cardDesc={this.state.cardDescription[index]} saveDesc={this.saveDescription}>{item}</Card>);
        },

        newCard: function(){
             var arr = this.state.comments;
             arr.push("Default Card");
            this.setState({comments:arr});

        },

        render: function(){
        console.log("List Render");
            return(
            <div className ="list">
            <h3>List Name</h3>
            <button onClick={this.newCard}>New Card</button>
            <div>{this.state.comments.map(this.eachCard)}</div>
            </div>
            );
        }
    })



    ReactDOM.render(<List/>,document.getElementById("container"));
