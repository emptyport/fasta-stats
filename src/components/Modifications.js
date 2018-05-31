import React, { Component } from 'react';
import ModificationEntry from './ModificationEntry';
import Modal from 'react-modal';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

Modal.setAppElement('#root')
const customStyles = {
  content : {
    top                   : '20%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : '20%',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -20%)'
  }
};

class Modifications extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      selectedOptions: [],
      modName: '',
      modType: '',
      modMass: '',
    }

    this.removeModification = this.removeModification.bind(this);
    this.addModification = this.addModification.bind(this);
    this.saveModification = this.saveModification.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleMassChange = this.handleMassChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  removeModification(id) {
    this.props.removeModificationCallback(id);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  addModification = () => {
    this.openModal();
  }

  saveModification = () => {
    if(this.state.modName === '') {
      alert("Please provide a name for the modification");
      return;
    }

    if(this.state.selectedOptions.length === 0) {
      alert("Please select at least one residue for this modification");
      return;
    }

    if(this.state.modType === '') {
      alert("Please select a type for the modification");
      return;
    }

    if(this.state.modMass === '') {
      alert("Please provide a mass for the modification");
      return;
    }

    let modResidues = [];
    for(var i=0; i<this.state.selectedOptions.length; i++) {
      modResidues.push(this.state.selectedOptions[i].value);
    }
    let newMod = {
      name: this.state.modName,
      residues: modResidues,
      type: this.state.modType,
      mass: parseFloat(this.state.modMass),
      id: this.props.modifications.length + 1
    };

    this.props.saveModificationCallback(newMod);

    this.setState({
      selectedOptions: []
    });

    this.closeModal();
  }

  handleSelectChange(selectedOptions) {
    this.setState({
      selectedOptions: selectedOptions
    });
  }

  handleNameChange(evt) {
    this.setState({
      modName: evt.target.value
    });
  }

  handleTypeChange(evt) {
    this.setState({
      modType: evt.target.value
    });
  }

  handleMassChange(evt) {
    this.setState({
      modMass: evt.target.value
    });
  }

  render() {

    const modNode = this.props.modifications.map((mod) => {
      return ( <ModificationEntry name={mod.name} residues={mod.residues.join(", ")} type={mod.type} mass={mod.mass} key={mod.id} id={mod.id} removeModificationCallback={this.removeModification}/>)
    });

    return (
      <div>
        <button onClick={this.addModification}>Add Modification</button>
        {modNode}

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        Name:<br />
        <input name='name' onChange={this.handleNameChange} /> <br />
        Residues:
        <Select
          name="form-field-name"
          value={this.state.selectedOptions}
          onChange={this.handleSelectChange}
          multi={true}
          joinValues={true}
          options={[
            { value: 'A', label: 'Alanine' },
            { value: 'R', label: 'Arginine' },
            { value: 'N', label: 'Asparagine' },
            { value: 'D', label: 'Aspartate' },
            { value: 'C', label: 'Cysteine' },
            { value: 'E', label: 'Glutamate' },
            { value: 'Q', label: 'Glutamine' },
            { value: 'G', label: 'Glycine' },
            { value: 'H', label: 'Histidine' },
            { value: 'I', label: 'Isoleucine' },
            { value: 'L', label: 'Leucine' },
            { value: 'K', label: 'Lysine' },
            { value: 'M', label: 'Methionine' },
            { value: 'F', label: 'Phenylalanine' },
            { value: 'P', label: 'Proline' },
            { value: 'S', label: 'Serine' },
            { value: 'T', label: 'Threonine' },
            { value: 'W', label: 'Tryptophan' },
            { value: 'Y', label: 'Tyrosine' },
            { value: 'V', label: 'Valine' },
          ]}
        />
        Type:
        <div onChange={this.handleTypeChange}>
          <input type='radio' name='type' value='variable' id='variable' />
          <label htmlFor='variable'>Variable</label>

          <input type='radio' name='type' value='fixed' id='fixed' />
          <label htmlFor='fixed'>Fixed</label>
        </div>
        
        <br />

        Mass:<br />
        <input name='mass' onChange={this.handleMassChange} /> <br />
        <button onClick={this.saveModification}>Save</button>
        <button onClick={this.closeModal}>Cancel</button>
        </Modal>
      </div>
    );
  }
}

export default Modifications;