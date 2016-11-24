import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';
import TextField from 'material-ui/TextField';

const calculateGrade = (total) => {
  let grade, gradePoint;
  if (total >= 70) {
    grade = 'O';
    gradePoint = 7;
  } else if (total >= 60) {
    grade = 'A';
    gradePoint = 6;
  } else if (total >= 55) {
    grade = 'B';
    gradePoint = 5;
  } else if (total >= 50) {
    grade = 'C';
    gradePoint = 4;
  } else if (total >= 45) {
    grade = 'D';
    gradePoint = 3;
  } else if (total >= 40) {
    grade = 'E';
    gradePoint = 2;
  } else {
    grade = 'F';
    gradePoint = 0;
  }
  return { grade, gradePoint };
}

const calculateGPA = (subjects) => {
  let total = subjects.reduce((total, currSubj) => {
    let creditPoint = calculateGrade((+currSubj.internal) + (+currSubj.external)).gradePoint * (+currSubj.creditHr);
    total.creditPoint = (total.creditPoint || 0) + creditPoint;
    total.creditHr = (total.creditHr || 0) + (+currSubj.creditHr);
    return total;
  }, [{ creditPoint: 0, creditHr: 0 }]);
  const result = (total.creditPoint / total.creditHr);
  if (result !== result)
    return ''
  return result.toFixed(3);

}

const getErrorText = (onSubmit, val) => {
  // console.log({ onSubmit, val });
  if (onSubmit && val === '')
    return 'Cannot be blank'
  return ''
}

const TableConfig = {
  fixedHeader: true,
  fixedFooter: true,
  stripedRows: false,
  showRowHover: false,
  selectable: false,
  multiSelectable: false,
  enableSelectAll: false,
  deselectOnClickaway: true,
  showCheckboxes: false,
  maxHeight: '400px',
}

const SubjectTable = (props) => {
  return (
    <div>
      <Table
        height={TableConfig.height}
        fixedHeader={TableConfig.fixedHeader}
        fixedFooter={TableConfig.fixedFooter}
        selectable={TableConfig.selectable}
        multiSelectable={TableConfig.multiSelectable}
        >
        <TableHeader
          displaySelectAll={TableConfig.showCheckboxes}
          adjustForCheckbox={TableConfig.showCheckboxes}
          enableSelectAll={TableConfig.enableSelectAll}
          >
          <TableRow>
            <TableHeaderColumn >#</TableHeaderColumn>
            <TableHeaderColumn >Internal</TableHeaderColumn>
            <TableHeaderColumn >External</TableHeaderColumn>
            <TableHeaderColumn >Credit Hour</TableHeaderColumn>
            <TableHeaderColumn >Total</TableHeaderColumn>
            <TableHeaderColumn >Grade</TableHeaderColumn>
            <TableHeaderColumn >Credit Points</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={TableConfig.showCheckboxes}
          deselectOnClickaway={TableConfig.deselectOnClickaway}
          showRowHover={TableConfig.showRowHover}
          stripedRows={TableConfig.stripedRows}
          >
          {props.subjects.map((currSubj, index) => (
            <TableRow key={index}>
              <TableRowColumn>{index + 1}</TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Internal"
                  type="number"
                  value={currSubj.internal}
                  errorText={getErrorText(props.onSubmit, currSubj.internal)}
                  onChange={props.onInternalMrkChange.bind(null, index)}
                  />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="External"
                  type="number"
                  value={currSubj.external}
                  errorText={getErrorText(props.onSubmit, currSubj.external)}
                  onChange={props.onExternalMrkChange.bind(null, index)}
                  />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Credit"
                  type="number"
                  value={currSubj.creditHr}
                  errorText={getErrorText(props.onSubmit, currSubj.creditHr)}
                  onChange={props.onCreditHourChange.bind(null, index)}
                  />
              </TableRowColumn>
              <TableRowColumn>
                {(+currSubj.internal) + (+currSubj.external)}
              </TableRowColumn>
              <TableRowColumn>
                {calculateGrade((+currSubj.internal) + (+currSubj.external)).grade}
              </TableRowColumn>
              <TableRowColumn>
                {calculateGrade((+currSubj.internal) + (+currSubj.external)).gradePoint * (+currSubj.creditHr)}
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h1> GPA: {(props.onSubmit && props.formValid) && calculateGPA(props.subjects)}</h1>
    </div>
  )
}

SubjectTable.propTypes = {
  subjects: PropTypes.array.isRequired,
  onSubmit: PropTypes.bool.isRequired,
  formValid: PropTypes.bool.isRequired,
  onInternalMrkChange: PropTypes.func.isRequired,
  onExternalMrkChange: PropTypes.func.isRequired,
  onCreditHourChange: PropTypes.func.isRequired
}

export default SubjectTable;