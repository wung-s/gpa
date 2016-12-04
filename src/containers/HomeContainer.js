import React, { Component } from 'react';
// import Grid from 'grid-styled';
import styled from 'styled-components';


//Material ui
import AppBar from 'material-ui/AppBar';
// import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

//Custom Component
import SubjectTable from '../components/SubjectTable';

const BodyWrapper = styled.div`
  padding: 0 20px;
`;
const AppBarWrapper = styled.div`
  text-align: center;
`;



class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.subject = {
      internal: '',
      external: '',
      creditHr: '',
      // credit: '',
      // grade: '',
    }
    this.state = {
      noOfSubj: 1,
      subjects: [Object.assign({}, this.subject)],
      formValid: false,
      isSubmitted: false

    }
    this.handleInternalMrkChange = this.handleInternalMrkChange.bind(this);
    this.handleExternalMrkChange = this.handleExternalMrkChange.bind(this);
    this.handleNoOfSubjSelection = this.handleNoOfSubjSelection.bind(this)
    this.handleCreditHourChange = this.handleCreditHourChange.bind(this)
    this.handleCalculateGPA = this.handleCalculateGPA.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleNoOfSubjSelection(event, target, value) {
    let subjects = this.state.subjects;
    this.setState({ isSubmitted: false });
    if (value > this.state.subjects.length) {
      let diff = value - this.state.subjects.length;
      while (diff > 0) {
        subjects.push(Object.assign({}, this.subject));
        diff--;
      }
    } else {
      let negDiff = value - this.state.subjects.length;
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
    this.setState({ subjects, isSubmitted: false })

  }
  handleExternalMrkChange(subjIndex, event, value) {
    let subjects = this.state.subjects.slice();
    subjects[subjIndex].external = value;
    this.setState({ subjects, isSubmitted: false })

  }
  handleCreditHourChange(subjIndex, event, value) {
    let subjects = this.state.subjects.slice();
    subjects[subjIndex].creditHr = value;
    this.setState({ subjects, isSubmitted: false })
  }
  handleCalculateGPA() {
    this.setState({ isSubmitted: true });
    // console.log(this.isFormValid(this.state.subjects));
    if (this.isFormValid(this.state.subjects))
      this.setState({ formValid: true })
    else
      this.setState({ formValid: false })
  }
  handleReset() {
    this.setState({
      noOfSubj: 1,
      subjects: [Object.assign({}, this.subject)],
      formValid: false,
      isSubmitted: false
    })
  }

  isFormValid(subjects) {
    for (let subj of subjects) {
      // console.log({ subj });
      if (subj.internal === '')
        return false;
      if (subj.external === '')
        return false;
      if (subj.creditHr === '')
        return false;
    }
    return true;
  }

  render() {
    const items = [
      <MenuItem key={1} value={1} primaryText="1" />,
      <MenuItem key={2} value={2} primaryText="2" />,
      <MenuItem key={3} value={3} primaryText="3" />,
      <MenuItem key={4} value={4} primaryText="4" />,
      <MenuItem key={5} value={5} primaryText="5" />,
      <MenuItem key={6} value={6} primaryText="6" />,
      <MenuItem key={7} value={7} primaryText="7" />,
      <MenuItem key={8} value={8} primaryText="8" />,
      <MenuItem key={9} value={9} primaryText="9" />,
      <MenuItem key={10} value={10} primaryText="10" />,
    ];
    return (
      <div>
        <AppBarWrapper>
          <AppBar
            title="Calculator"
            showMenuIconButton={false}
            />
        </AppBarWrapper>
        <BodyWrapper>
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
            formValid={this.state.formValid}
            isSubmitted={this.state.isSubmitted}
            />
          <RaisedButton label="Calculate" primary={true} style={{ margin: 5 }} onTouchTap={this.handleCalculateGPA} />
          <RaisedButton label="Reset" secondary={true} style={{ margin: 5 }} onTouchTap={this.handleReset} />
        </BodyWrapper>

      </div >
    );
  }

}

export default HomeContainer;