import React, { PropTypes } from 'react';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};


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
                  onChange={props.onInternalMrkChange.bind(null, index)}
                  />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="External"
                  type="number"
                  value={currSubj.external}
                  onChange={props.onExternalMrkChange.bind(null, index)}
                  />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Credit"
                  type="number"
                  value={currSubj.creditHr}
                  onChange={props.onCreditHourChange.bind(null, index)}
                  />
              </TableRowColumn>
              <TableRowColumn>
                {(+currSubj.internal) + (+currSubj.external)}
              </TableRowColumn>
              <TableRowColumn>

              </TableRowColumn>
              <TableRowColumn>
                {(+currSubj.internal) + (+currSubj.external)}
              </TableRowColumn>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

SubjectTable.propTypes = {
  subjects: PropTypes.array.isRequired,
  onInternalMrkChange: PropTypes.func.isRequired,
  onExternalMrkChange: PropTypes.func.isRequired,
  onCreditHourChange: PropTypes.func.isRequired
}

export default SubjectTable;