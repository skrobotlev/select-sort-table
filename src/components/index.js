import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";
import moment from "moment";
import orderby from "lodash.orderby";

const options = [
  { key: 1, text: "Name", value: "name", icon: "sort down" },
  { key: 2, text: "Time", value: "time", icon: "sort" },
  { key: 3, text: "Type", value: "type", icon: "sort" },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      original: [],
      sortObject: { field: "", order: "" },
    };
  }

  componentDidUpdate() {
    console.log(this.state, "stt");
  }

  componentDidMount() {
    let list = [
      {
        name: "namev1",
        time: 1583295463213,
        type: 14,
      },
      {
        name: "namea2",
        time: 1582885423296,
        type: 15,
      },
      {
        name: "namea3",
        time: 1581295463213,
        type: 16,
      },
    ];
    this.setState({ list, original: list });
  }

  handleSearch = (e) => {
    let searchInput = e.target.value;
    let filteredData = this.state.original.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.type.toString().includes(searchInput.toString())
      );
    });
    this.setState({ list: filteredData });
  };

  formSortObject = (fieldName) => {
    let { sortObject } = this.state;
    if (!sortObject.field || sortObject.field !== fieldName) {
      Object.assign(sortObject, {
        field: fieldName,
        order: "asc",
      });
      return sortObject;
    } else if (sortObject.field === fieldName) {
      Object.assign(sortObject, {
        ...sortObject,
        order: sortObject.order === "desc" ? "asc" : "desc",
      });
      return sortObject;
    }
    this.setState({ sortObject });
  };

  handleSort = (e, data) => {
    let dropdDownValue = data.value;
    let currentField = this.formSortObject(dropdDownValue);
    let result = orderby(
      this.state.list,
      currentField.field,
      currentField.order
    );
    this.setState({ list: result });
  };

  render() {
    return (
      <>
        <br />
        Search: <input type="text" onChange={this.handleSearch} />
        <br />
        <br />
        <Dropdown text="Sort By">
          <Dropdown.Menu>
            {options.map((item) => (
              <Dropdown.Item
                text={item.text}
                value={item.value}
                icon={item.icon}
                key={item.key}
                onClick={this.handleSort}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>{" "}
        <br />
        <br />
        <h1>List</h1>
        <table>
          <tbody>
            {this.state.list.map((item, index) => (
              <tr key={index}>
                <td>
                  <p>{index + 1}</p>
                </td>
                <td>
                  <p>{item.name}</p>
                </td>
                <td>
                  <p>{moment().diff(item.time, "days")}</p>
                </td>
                <td>
                  <p>{item.type}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
