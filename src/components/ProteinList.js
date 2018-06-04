import React, { Component } from 'react';
import '../assets/ProteinList.css';

class ProteinList extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

   
  }

  

  render() {
    return (
      <div>
        {this.props.entries.map((entry, index) => <div  className="proteinEntry" key={index}>{entry.id}</div>)}        
      </div>
    );
  }
}

export default ProteinList;