import React from 'react';
import { render } from 'react-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Card from "./Card";

var List = React.createClass({

    getInitialState: function(){
        return {
          cardDetails:[
            {cardName:'Hit the Gym', cardDescription:'Upper Body workout', cardDeadline: '09/25/2016 12:00 AM'},
            {cardName:'Take Medicine', cardDescription:'1 Keraglo after breakfast', cardDeadline: '09/26/2016 12:00 AM'},
            {cardName:'Read the news', cardDescription:'Skip all the kachada news', cardDeadline: '09/40/2016 12:00 AM'},
          ],
          edit:false
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

    edit: function(){
      this.setState({edit: !this.state.edit});
    },

    checkEnter: function(event){
        if(event.keyCode == 13){ //If value is not empty, enter triggers save button
          if(this.refs.listNameInput.value.trim()!==""){
            this.props.setListName(this.refs.listNameInput.value.trim(),this.props.listIndex);
          }
          this.setState({edit:false});
        }
    },

    stopPropagation: function(event){
      if (event.stopPropagation) {
          event.stopPropagation();   // W3C model
      } else {
          event.cancelBubble = true; // IE model
      }
    },

    render: function(){
    console.log("List Render edit"+this.state.edit);
    if(!this.state.edit){
        return(
          <div className ="list">
            <h3 className="listName" onClick={this.edit}>{this.props.listName}</h3>
            <button onClick={this.newCard} >New Card</button>
            <div>{this.state.cardDetails.map(this.eachCard)}</div>
          </div>
        );
      }
      else{
        return(
          <div className ="list" onClick={this.edit}>
            <textarea ref="listNameInput" placeholder ={this.props.listName} autoFocus = {focus} onKeyDown={this.checkEnter} onClick={this.stopPropagation}></textarea>
            <button onClick={this.newCard} >New Card</button>
            <div>{this.state.cardDetails.map(this.eachCard)}</div>
          </div>
        );
      }
    }
});

export default List;
