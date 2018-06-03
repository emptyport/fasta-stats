import React, { Component } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import EnzymeSelector from './components/EnzymeSelector';
import Modifications from './components/Modifications';
import ProteinList from './components/ProteinList';
import { Line } from 'rc-progress';

var fastaParser = require('fasta-js');
var peptideCutter = require('peptide-cutter');
var peptideModifier = require('peptide-modifier');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fastaEntries: [],
      filteredFastaEntries: [],
      unmodifiedPeptideLengths: [],
      modifiedPeptideMasses: [],
      numberOfProteins: 0,
      numberOfUnmodifiedPeptides: 0,
      numberOfModifiedPeptides: 0,
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
      digestProgress: 0,
    };

    this.removeModification = this.removeModification.bind(this);
    this.saveModification = this.saveModification.bind(this);
    this.runAnalysis = this.runAnalysis.bind(this);
  }

  getFastaData = (fastaText) => {
    var fasta = new fastaParser();
    var entries = fasta.parse(fastaText);
    this.setState({
      fastaEntries: entries,
      numberOfProteins: entries.length,
      filteredFastaEntries: entries,
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

  runAnalysis = () => {
    var options = {
      'enzyme': this.state.enzyme,
      'num_missed_cleavages': 2,
      'min_length': 2,
      'max_length': 30
    };
     
    let peptideList = [];

    var cutter = new peptideCutter(options);
    for(var i=0; i<this.state.fastaEntries.length; i++) {
      var peptides = cutter.cleave(this.state.fastaEntries[i].sequence);
      for(var j=0; j<peptides.length; j++) {
        peptideList.push(peptides[j]);

      }
      var progress = parseInt( (((i+1) / this.state.numberOfProteins) * 100), 10 );
      this.setState({
        digestProgress: progress,
      });
    }
    console.log(peptideList.length);
    /*this.setState({
      unmodifiedPeptides: peptideList,
      numberOfUnmodifiedPeptides: peptideList.length
    });*/
  }
  


  render() {
    return (
      <div className="App">
        

        <FileUpload getFastaCallback={this.getFastaData} />
        <ProteinList entries={this.state.filteredFastaEntries} />


        <br />
        <br />
        <br />

        <EnzymeSelector setEnzymeCallback={this.setEnzyme} />
        <Modifications 
          modifications={this.state.modifications}
          removeModificationCallback={this.removeModification}
          saveModificationCallback={this.saveModification}
        />

        <button onClick={this.runAnalysis}>Run</button>
        <Line percent={this.state.digestProgress} strokeWidth="2" strokeColor="#0066ff" />
      </div>
    );
  }
}

export default App;
