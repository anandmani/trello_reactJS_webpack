import React, {Component, PropTypes} from 'react';
import { render } from 'react-dom';
import Autosuggest from 'react-autosuggest';
import allMembers from '../constants/MembersDB';   //Using this as a DB call to get all members
import { Button } from 'react-bootstrap';
//  autosuggest pool


// Use your imagination to render suggestions.


class Members extends Component {
  constructor(props) {
    super(props);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      memberPool : allMembers.filter(x => props.memberArray.indexOf(x) == -1)
    };
  }
   //all members that have not been selected already

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : this.state.memberPool.filter(memb =>
      memb.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input field
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion.name;

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  renderSuggestion = suggestion => {
    return(
    <div>
      {suggestion.name}
    </div>
  );
}


  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
      memberPool : allMembers.filter(x => this.props.memberArray.indexOf(x) == -1)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  removeMember = (value) => {
    console.log("Inside remove member"+value.name);
    var tempArray = this.props.memberArray;
    tempArray.splice(tempArray.indexOf(value),1);
    this.props.saveMembers(tempArray);
  };

  eachMember = (memberObj, index) => {
  return (<div key={index} className="member" >
            <img className = "memberDp" src={memberObj.dp.src} height="30" width="30"/>
            <p className ="memberName">{memberObj.name}</p>
            <Button className="buttonRemoveMember" onClick={()=>(this.removeMember(memberObj))}>X</Button>
          </div>) ;
  };

  onSuggestionSelected = (event, obj) =>{
    var tempArray = this.props.memberArray;
    tempArray.push(obj.suggestion);
    this.props.saveMembers(tempArray);
    this.setState({
      memberPool : allMembers.filter(x => this.props.memberArray.indexOf(x) == -1),
      value: '',
    }); //Removing name from memberPool after adding it to memberArray
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input field.
    const inputProps = {
      placeholder: 'Add member',
      value,
      onChange: this.onChange
    };
    // Finally, render it!
    return (
      <div  className="modalSegment row">
          <p className ="modalKey col-xs-2">Members</p>
          <div className = "modalValue col-xs-8">
              {this.props.memberArray.map(this.eachMember)}
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                onSuggestionSelected ={this.onSuggestionSelected}
                inputProps={inputProps}
              />
          </div>
      </div>
    );
  }
}

export default Members;
