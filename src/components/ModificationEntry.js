import React, { Component } from 'react';

class ModificationEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (evt) => {
    
  }

  render() {
    return (
      <div>
          {this.props.name} - {this.props.residues} - {this.props.type} - {this.props.mass} <button>Remove</button>
      </div>
    );
  }
}

export default ModificationEntry;