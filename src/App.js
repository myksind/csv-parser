import React, { Component } from 'react';
import csvToArray from './csvToArray';

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      csvArray: []
    };
  }
  parseCSV = e => {
    e.preventDefault();
    this.setState({
      csvArray: csvToArray(this.state.value)
    });
  };
  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  render() {
    const { csvArray, value } = this.state;
    return (
      <div>
        <form onSubmit={this.parseCSV}>
          <textarea onChange={this.handleChange} />
          <button>Submit</button>
        </form>
        <p>{value}</p>
        <Table data={csvArray} />
      </div>
    );
  }
}

const TableRow = ({ row }) => (
  <tr>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>
);
const Table = ({ data }) => (
  <table>
    <tbody>
      {data.map((row, index) => <TableRow key={index} row={row} />)}
    </tbody>
  </table>
);

export default App;
