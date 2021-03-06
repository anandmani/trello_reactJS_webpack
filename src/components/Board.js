import React from 'react';
import { render } from 'react-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import List from "./List";

var moment = require('moment');
var Board = React.createClass({
  getInitialState: function(){
    return({
      lists:
      [
        {//list-1
          listName:"Monday",
          cards: [
            {cardName:'Hit the Gym',    cardDescription:'Chest workout',                                      cardDeadline: '09/25/2016 12:00 AM'},  //list-1 card-1
            {cardName:'Take Medicine',  cardDescription:'1 Keraglo after breakfast,\n 1 D-Rise after lunch',  cardDeadline: '09/26/2016 12:00 AM'},
            {cardName:'Read the news',  cardDescription:'Skip all the kachada news',                          cardDeadline: '09/40/2016 12:00 AM'},
          ]
        },
        {//list-2
          listName:"Tuesday",
          cards: [
            {cardName:'Hit the Gym',    cardDescription:'Shoulder workout',           cardDeadline: '09/25/2016 12:00 AM'},  //list-2 card-1
            {cardName:'Take Medicine',  cardDescription:'1 Keraglo after breakfast',  cardDeadline: '09/26/2016 12:00 AM'},
            {cardName:'Play the flute', cardDescription:'Tube it!',                   cardDeadline: '09/40/2016 12:00 AM'},
          ]
        }
      ],
      headerNameIndex: 0,
      headerName: "Kanban!"
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
          {cardName:'Default Card',    cardDescription:'Enter Description',   cardDeadline:date},
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
      <div className = "board">
        <div id ="header" onMouseEnter={this.changeHeader} onMouseExit={this.changeHeader}>{this.state.headerName}</div>
        {this.state.lists.map(this.eachList)}
        <button id="newListButton" onClick={this.newList}>New List</button>
      </div>
    )
  }
});

export default DragDropContext(HTML5Backend)(Board);
