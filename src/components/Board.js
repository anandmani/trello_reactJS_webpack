import React from 'react';
import { render } from 'react-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Button } from 'react-bootstrap';
import List from "./List";

import allMembers from '../constants/MembersDB';

var moment = require('moment');
var Board = React.createClass({
  getInitialState: function(){
    return({
      lists:
      [
        {//list-1
          listName:"Give the list a name",
          cards: [
            {cardName:'Click the card name ',           cardDescription:'',                                              cardDeadline: '',                     cardTags:[],                                 cardMembers:[]},  //list-1 card-1
            {cardName:'Click the card to see details',  cardDescription:'',                                              cardDeadline: '',                     cardTags:[],                                 cardMembers:[]},
            {cardName:'Give the card a description',    cardDescription:'Enter your description here',                   cardDeadline: '',                     cardTags:[],                                 cardMembers:[]},
            {cardName:'Give the card a deadline',       cardDescription:'Go ahead and change the deadline',              cardDeadline: '09/26/2016 12:00 AM',  cardTags:[],                                 cardMembers:[]},
            {cardName:'Tag your card with colours!',    cardDescription:'Click on the thumbnail to remove the colour',   cardDeadline: '09/26/2016 12:00 AM',  cardTags:["#bedadc","#fad0c3", "#d4c4fb"],   cardMembers:[]},
            {cardName:'Add members to your card',       cardDescription:'Add Aarti and Deepak as members',               cardDeadline: '09/26/2016 12:00 AM',  cardTags:[],                                 cardMembers:[allMembers[0]]},
            {cardName:'Drag and drop your card!',       cardDescription:'',                                              cardDeadline: '09/26/2016 12:00 AM',  cardTags:[],                                 cardMembers:[]},
          ]
        },
        {//list-2
          listName:"Monday",
          cards: [
            {cardName:'Go to the gym',              cardDescription:'Biceps Day \n3x15 Incline Hammer Curls \n3x15 Incline Inner-Biceps Curl \n3x15 Dumbbell Biceps Curl ',           cardDeadline: '10/10/2016 07:00 AM',  cardTags:["#bedadc", "#d4c4fb"],           cardMembers:[allMembers[0]]},  //list-2 card-1
            {cardName:'Clear the job interview',    cardDescription:'All the best, small son',                                                                                        cardDeadline: '10/10/2016 11:00 AM',  cardTags:["#fad0c3"],                      cardMembers:[allMembers[0]]},
            {cardName:'Take family out for dinner', cardDescription:'Reservation at The Big Chill, Khan Market',                                                                      cardDeadline: '10/10/2016 08:00 PM',  cardTags:["#fad0c3"],                      cardMembers:[allMembers[0],allMembers[5],allMembers[6]]},
          ]
        }
      ],
      headerNameIndex: 0,
      headerName: "Kanban"
    })
  },

  saveList: function(listObj, index){
    var listArray = this.state.lists;
    listArray[index] = listObj;
    this.setState({lists: listArray});
  },

  eachList: function(listObj,index){
    return(<List key={index} list={listObj} saveList={this.saveList} remList={this.removeList} listIndex={index} moveCard={this.moveCard}/>)
  },

  newList: function(){
    var listArray = this.state.lists;
    var date = moment(new Date()).format('MM/DD/YYYY hh:mm A z'); //Getting current date-time
    listArray.push({
      listName:"New List",
      cards:[
          {cardName:'Default Card',    cardDescription:'',   cardDeadline:date, cardTags:[], cardMembers:[]},
      ]
    });
    this.setState({listName: listArray})
  },

  removeList: function(index){
    var listArray = this.state.lists;
    listArray.splice(index,1);
    this.setState({lists: listArray});
  },

  moveCard: function(fromList, fromCard, toList, toCard){
    var listArray = this.state.lists;
    var draggedCard = listArray[fromList].cards.splice(fromCard,1); //Removing dragged card from its initial position; splice returns an object containing what was deleted
    listArray[toList].cards.splice(toCard,0,draggedCard[0]);//Inserting card into dropped position; we need to access first element of the splice object which is our card object
    this.setState({lists: listArray});
  },
  changeHeader: function(){
    var headerNameArray = ["Kanban!","Are","You","Ready","to"]
    this.setState({headerName: headerNameArray[(this.state.headerNameIndex+1)%5], headerNameIndex: this.state.headerNameIndex+1})
  },

  render: function(){
    return(
      <div>
        <div id ="header" onMouseEnter={this.changeHeader}>{this.state.headerName}</div>
        <div className = "board">
          {this.state.lists.map(this.eachList)}
          <Button id="newListButton" onClick={this.newList} bsStyle="primary">New List</Button>
        </div>
        <div  id="footer"> by Anand Chinnappan Mani </div>
      </div>
    )
  }
});

export default DragDropContext(HTML5Backend)(Board);
