import React, { Component } from 'react';

//Material ui
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';



//Custom Component
import SubjectTable from '../components/SubjectTable';


class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.subject = {
      internal: '',
      external: '',
      creditHr: '',
      credit: '',
      grade: '',
    }
    this.state = {
      noOfSubj: 1,
      subjects: [Object.assign({}, this.subject)]
    }
    this.handleInternalMrkChange = this.handleInternalMrkChange.bind(this);
    this.handleExternalMrkChange = this.handleExternalMrkChange.bind(this);
    this.handleNoOfSubjSelection = this.handleNoOfSubjSelection.bind(this)
    this.handleCreditHourChange = this.handleCreditHourChange.bind(this)
    this.handleCalculateGPA = this.handleCalculateGPA.bind(this)
  }

  handleNoOfSubjSelection(event, target, value) {
    let subjects = this.state.subjects;
    if (value > this.state.subjects.length) {
      let diff = value - this.state.subjects.length;
      console.log({ diff });
      while (diff > 0) {
        subjects.push(Object.assign({}, this.subject));
        diff--;
      }
    } else {
      let negDiff = value - this.state.subjects.length;
      console.log({ negDiff });
      subjects = this.state.subjects.slice(0, negDiff);

    }
    this.setState({
      noOfSubj: value,
      subjects
    })
  }



  handleInternalMrkChange(subjIndex, event, value) {
    let subjects = this.state.subjects.slice();
    subjects[subjIndex].internal = value;
    this.setState({ subjects })

  }
  handleExternalMrkChange(subjIndex, event, value) {
    let subjects = this.state.subjects.slice();
    subjects[subjIndex].external = value;
    this.setState({ subjects })

  }
  handleCreditHourChange(subjIndex, event, value) {
    let subjects = this.state.subjects.slice();
    subjects[subjIndex].creditHr = value;
    this.setState({ subjects })
  }
  handleCalculateGPA() {

  }

  render() {
    const items = [
      <MenuItem key={1} value={1} primaryText="1" />,
      <MenuItem key={2} value={2} primaryText="2" />,
      <MenuItem key={3} value={3} primaryText="3" />,
      <MenuItem key={4} value={4} primaryText="4" />,
      <MenuItem key={5} value={5} primaryText="5" />,
    ];
    return (
      <div>
        <AppBar
          title="Calculator"
          showMenuIconButton={false}
          />
        <SelectField
          value={this.state.noOfSubj}
          onChange={this.handleNoOfSubjSelection}
          floatingLabelText="No of Subject"
          >
          {items}
        </SelectField>
        <SubjectTable
          subjects={this.state.subjects}
          onExternalMrkChange={this.handleExternalMrkChange}
          onInternalMrkChange={this.handleInternalMrkChange}
          onCreditHourChange={this.handleCreditHourChange}
          />
        <RaisedButton label="Calculate" secondary={true} style={{ margin: 5 }} onTouchTap={this.handleCalculateGPA} />
      </div >
    );
  }

}

export default HomeContainer;