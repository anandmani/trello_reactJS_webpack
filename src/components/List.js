import React from 'react';
import { render } from 'react-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Card from "./Card";
var moment = require('moment');
var List = React.createClass({

    getInitialState: function(){
        return {
          edit:false
        };
    },

    removeCard: function(index){
      var listObj = this.props.list;
      listObj.cards.splice(index,1);
      this.props.saveList(listObj,this.props.listIndex);
    },

    saveCard: function(obj, index){
      var listObj = this.props.list;
      listObj.cards[index] = obj;
      this.props.saveList(listObj,this.props.listIndex);
    },

    eachCard: function(item,index){ //Map just automatically serves these two parameters???????
        console.log(item,index);
        return(<Card key={index} ind={index} listInd ={this.props.listIndex} remCard={this.removeCard} svCard={this.saveCard} cardDetails={item} moveCard={this.props.moveCard}>{item.cardName}</Card>);
    },

    newCard: function(){
        var listObj = this.props.list;
        var date = moment(new Date()).format('MM/DD/YYYY hh:mm A z'); //Getting current date-time
        listObj.cards.push({cardName: "Default card", cardDescription: "Enter Description", cardDeadline: date});
        this.props.saveList(listObj,this.props.listIndex);
    },

    edit: function(){
      this.setState({edit: !this.state.edit});
    },

    checkEnter: function(event){
        if(event.keyCode == 13){ //If value is not empty, enter triggers save button
          if(this.refs.listNameInput.value.trim()!==""){
            var listObj = this.props.list;
            listObj.listName = this.refs.listNameInput.value.trim();
            this.props.saveList(listObj,this.props.listIndex);
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

    removeList: function(){
      this.props.remList(this.props.listIndex);
    },

    render: function(){
    console.log("List Render edit"+this.state.edit);
    if(!this.state.edit){
        return(
          <div className ="list">
            <button className="buttonRemoveList" onClick={this.removeList}>X</button>
            <h3 className="listName" onClick={this.edit}>{this.props.list.listName}</h3>
            <div>{this.props.list.cards.map(this.eachCard)}</div>
            <button  className="newCardButton" onClick={this.newCard} >New Card</button>
          </div>
        );
      }
      else{
        return(
          <div className ="list" onClick={this.edit}>
            <button className="buttonRemoveList" onClick={this.removeList}>X</button>
            <textarea ref="listNameInput" placeholder ={this.props.list.listName} autoFocus = {focus} onKeyDown={this.checkEnter} onClick={this.stopPropagation}></textarea>
            <div>{this.props.list.cards.map(this.eachCard)}</div>
            <button className="newCardButton" onClick={this.newCard} >New Card</button>
          </div>
        );
      }
    }
});

export default List;
