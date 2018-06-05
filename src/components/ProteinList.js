import React, { Component } from 'react';
import '../assets/ProteinList.css';

class ProteinList extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(index) {
    this.props.handleClickCallback(index);
  }

  render() {
    return (
      <div className="grid-item listHolder">
        {this.props.entries.map((entry, index) => <div className="proteinEntry" key={index} onClick={()=>this.handleClick(index)}>{entry.id}</div>)}        
      </div>
    );
  }
}

export default ProteinList;