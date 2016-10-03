import React from 'react';
import { render } from 'react-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import List from "./List";

var Board = React.createClass({
  getInitialState: function(){
    return({
      listName: ["Today","Tomorrow"]
    })
  },

  setListName: function(value, index){
    var listArray = this.state.listName;
    listArray[index] = value;
    this.setState({listName: listArray});
  },

  eachList: function(list,index){
    console.log("list"+list);
    return(<List key={index} listName={list} setListName={this.setListName} listIndex={index} />)
  },

  newList: function(){
    var listArray = this.state.listName;
    console.log("Array before pushing"+ listArray);
    listArray.push("List Name");
      console.log("Array after pushing"+ listArray);
    this.setState({listName: listArray})
  },

  render: function(){
    return(
      <div className = "board">
        {this.state.listName.map(this.eachList)}
        <button id="newListButton" onClick={this.newList}>New List</button>
      </div>
    )
  }
});

export default DragDropContext(HTML5Backend)(Board);
