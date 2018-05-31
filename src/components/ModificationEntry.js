import React, { Component } from 'react';

class ModificationEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (evt) => {
    this.props.removeModificationCallback(this.props.id);
  }

  render() {
    return (
      <div>
          {this.props.name} - {this.props.residues} - {this.props.type} - {this.props.mass} <button onClick={this.handleClick}>Remove</button>
      </div>
    );
  }
}

export default ModificationEntry;