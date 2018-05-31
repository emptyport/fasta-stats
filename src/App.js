import React, { Component } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import EnzymeSelector from './components/EnzymeSelector';
import Modifications from './components/Modifications';

var fastaParser = require('fasta-js');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fastaEntries: [],
      numberOfProteins: 0,
      enzyme: 'trypsin',
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
    };

    this.removeModification = this.removeModification.bind(this);
    this.saveModification = this.saveModification.bind(this);
  }

  getFastaData = (fastaText) => {
    var fasta = new fastaParser();
    var entries = fasta.parse(fastaText);
    this.setState({
      fastaEntries: entries,
      numberOfProteins: entries.length,
    });
  }

  setEnzyme = (enzyme) => {
    this.setState({
      enzyme: enzyme,
    });
    console.log(enzyme);
  }

  saveModification = (newMod) => {
    this.setState({
      modfications: this.state.modifications.push(newMod)
    });
  }

  removeModification = (id) => {
    const remainder = this.state.modifications.filter((mod) => {
      if(mod.id !== id) return mod;
      return null;
    });
    this.setState({
      modifications: remainder
    });
  }
  


  render() {
    return (
      <div className="App">
        

        <FileUpload getFastaCallback={this.getFastaData} />
        <EnzymeSelector setEnzymeCallback={this.setEnzyme} />
        <Modifications 
          modifications={this.state.modifications}
          removeModificationCallback={this.removeModification}
          saveModificationCallback={this.saveModification}
        />
      </div>
    );
  }
}

export default App;
