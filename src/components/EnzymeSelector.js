import React, { Component } from 'react';

class EnzymeSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentEnzyme: 'trypsin',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (evt) => {
    this.setState({
      currentEnzyme: evt.target.value,
    });
    
    this.props.setEnzymeCallback(evt.target.value);
  }

  render() {
    return (
      <div>
        <select value={this.state.currentEnzyme} onChange={this.handleChange}>
          <option value="arg-c">Arg-C</option>
          <option value="asp-n">Asp-N</option>
          <option value="bnps-skatole">BNPS-Skatole</option>
          <option value="caspase 1">Caspase1</option>
          <option value="caspase 2">Caspase2</option>
          <option value="caspase 3">Caspase3</option>
          <option value="caspase 4">Caspase4</option>
          <option value="caspase 5">Caspase5</option>
          <option value="caspase 6">Caspase6</option>
          <option value="caspase 7">Caspase7</option>
          <option value="caspase 8">Caspase8</option>
          <option value="caspase 9">Caspase9</option>
          <option value="caspase 10">Caspase10</option>
          <option value="chymotrypsin high specificity">Chymotrypsin (high specificity)</option>
          <option value="chymotrypsin low specificity">Chymotrypsin (low specificity)</option>
          <option value="clostripain">Clostripain</option>
          <option value="cnbr">CNBr</option>
          <option value="enterokinase">Enterokinase</option>
          <option value="factor xa">Factor Xa</option>
          <option value="formic acid">Formic acid</option>
          <option value="glutamyl endopeptidase">Glutamyl endopeptidase</option>
          <option value="granzyme b">GranzymeB</option>
          <option value="hydroxylamine">Hydroxylamine</option>
          <option value="iodosobenzoic acid">Iodosobenzoic acid</option>
          <option value="lysc">LysC</option>
          <option value="ntcb">NTCB</option>
          <option value="pepsin ph1.3">Pepsin pH 1.3</option>
          <option value="pepsin ph2.0">Pepsin pH >2.0</option>
          <option value="proline endopeptidase">Proline-endopeptidase</option>
          <option value="proteinase k">Proteinase K</option>
          <option value="staphylococcal peptidase i">Staphylococcal peptidase I</option>
          <option value="thermolysin">Thermolysin</option>
          <option value="thrombin">Thrombin</option>
          <option value="trypsin">Trypsin</option>
        </select>
      </div>
    );
  }
}

export default EnzymeSelector;