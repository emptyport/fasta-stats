import React, { Component } from 'react';
import ModificationEntry from './ModificationEntry';

class Modifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modifications: [
        {
          'name': 'Carbamidomethylation',
          'residues': ['C'],
          'type': 'fixed',
          'mass': 57.02,
          'id': 1
        },
        {
          'name': 'Oxidation',
          'residues': ['O'],
          'type': 'variable',
          'mass': 15.99,
          'id': 2
        }
      ],
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (evt) => {
    
  }

  render() {

    const modNode = this.state.modifications.map((mod) => {
      return ( <ModificationEntry name={mod.name} residues={mod.residues.join(", ")} type={mod.type} mass={mod.mass} key={mod.id}/>)
    });
    
    return (
      <div>
        {modNode}
      </div>
    );
  }
}

export default Modifications;