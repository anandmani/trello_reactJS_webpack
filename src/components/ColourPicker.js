import React from 'react';
import { render } from 'react-dom';
import { GithubPicker  } from 'react-color';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
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
          // else {
          //   alert("Can set only 5 tags");
          // }
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

    tooltip: (<Tooltip id="tooltip">Maximum 5 tags allowed!</Tooltip>),


  render: function(){
    return(
      <div className = "tags modalSegment row">
          <p className="modalKey col-xs-2">Tags</p>
          <div className="modalValue col-xs-8">
              <OverlayTrigger placement="bottom" overlay={this.tooltip}>
                <Button bsStyle="success" className = "buttonAddTag"  onClick= {this.pickColour}>+</Button>
              </OverlayTrigger>
              {this.props.tagArray.map(this.eachTag)}
              <div className="colourPicker" style={{display:this.state.isTagging}}>
                  <GithubPicker onChangeComplete={ this.handleChangeComplete } />
              </div>

          </div>
      </div>
    );
  }
});

export default ColourPicker;
