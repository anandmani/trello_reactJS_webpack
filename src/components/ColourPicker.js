import React from 'react';
import { render } from 'react-dom';
import { GithubPicker  } from 'react-color';

var ColourPicker = React.createClass({

    getInitialState: function(){
      return({
          isTagging: "none",
        });
    },


    pickColour : function(){ //Flipping value of isTagging
        this.setState({isTagging: (this.state.isTagging=="block")?"none":"block"})
    },


    handleChangeComplete: function(color){
        console.log(this.props.tagArray.indexOf(color.hex));
        if(this.props.tagArray.indexOf(color.hex)==-1){//If the color is not used already
          if(this.props.tagArray.length < 5){//Allow max five colours
            var array = this.props.tagArray;
            array.push(color.hex);
            this.props.saveTags(array);
          }
          else {
            alert("Can set only 5 tags");
          }
        }
        else {  //If colour is already present, remove it
          var array = this.props.tagArray;
          array.splice(this.props.tagArray.indexOf(color.hex),1);
          this.props.saveTags(array);
        }
      console.log("Array of tags: "+this.state.tagArray);
    },

    removeTag: function(tag){
        console.log("inside remove tag"+tag);
        var array = this.props.tagArray;
        array.splice(this.props.tagArray.indexOf(tag),1);
        this.props.saveTags(array);
    },

    eachTag: function(color, index){
      console.log("Color inside each tag"+ color);
      return(
        <div key={index} className = "tag" style ={{ backgroundColor: color}} onClick= {this.removeTag.bind(null,color)} />
      );
    },

  render: function(){
    return(
      <div className = "tags modalSegment">
          <p className="modalKey">Tags</p>
          <div className="modalValue">
              {this.props.tagArray.map(this.eachTag)}
              <button className = "buttonAddTag"  onClick= {this.pickColour}>+</button>
              <div className="colourPicker" style={{display:this.state.isTagging}}>
                  <GithubPicker onChangeComplete={ this.handleChangeComplete } />
              </div>
          </div>
      </div>
    );
  }
});

export default ColourPicker;
