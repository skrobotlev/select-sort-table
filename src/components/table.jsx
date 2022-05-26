import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";
import moment from "moment";
import orderby from "lodash.orderby";
import { sortMore } from "../functions/sort";
import "../global.scss";
import { useStore } from "../store";

const columnOptions = [
  { key: 1, text: "Company", value: "company", icon: "sort down" },
  { key: 2, text: "Amount", value: "amount", icon: "sort" },
  { key: 3, text: "distance", value: "distance", icon: "sort" },
];

const vulnOptions = [
  { key: 1, text: "More", value: "more", icon: "sort" },
  { key: 2, text: "Equal", value: "equal", icon: "sort" },
  { key: 3, text: "Smaller", value: "smaller", icon: "sort" },
  { key: 4, text: "Name", value: "name", icon: "sort" },
];

const Table = () => {
  const { store } = useStore();
  console.log(store, "ctns");
  const [state, setState] = useState({
    list: [],
    original: [],
    sortObject: { field: "", order: "" },
  });
  const [cuurrentRow, setCurrentRow] = useState("");
  const [fetchData, setFetchData] = useState([]);

  // let list = [
  //   {
  //     name: "namev1",
  //     time: 1583295463213,
  //     type: 14,
  //   },
  //   {
  //     name: "namea2",
  //     time: 1582885423296,
  //     type: 15,
  //   },
  //   {
  //     name: "namea3",
  //     time: 1581295463213,
  //     type: 16,
  //   },
  // ];

  const request = async () => {
    const req = await fetch("http://localhost:3000/people");
    const res = await req.json();
    return res;
  };

  useEffect(() => {
    request().then((res) => {
      setFetchData(res);
      setState({ ...state, list: res, original: res });
      store.dashData = res;
    });
  }, []);

  // useEffect(() => {
  //   setState({ ...state, list, original: list });
  // }, []);

  // useEffect(() => {
  // console.log(store.dashData, "dsh");
  //   console.log(fetchData, "ftchDA");
  // }, [fetchData,store.dashData]);

  const formSortObject = (fieldName) => {
    let { sortObject } = state;
    console.log(sortObject, "srtOBJ");
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
    setState({ ...state, sortObject });
  };

  const handleSort = (e, data) => {
    let dropdDownValue = data.value;
    console.log(data.value, "dat val");
    let currentField = formSortObject(dropdDownValue);
    let result = orderby(state.list, currentField.field, currentField.order);
    setState({ ...state, list: result });
  };

  const handleselectRow = (e, data) => {
    let dropdDownValue = data.value;
    console.log(data.value, "dat val");
    let currentField = formSortObject(dropdDownValue);
    let result = orderby(state.list, currentField.field, currentField.order);
    setState({ ...state, list: result });
  };

  const handleSearch = (e) => {
    let searchInput = e.target.value;
    let filteredData = state.original.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.type.toString().includes(searchInput.toString())
      );
    });
    console.log(filteredData, "filt");
    setState({ ...state, list: filteredData });
  };
  const equalSort = (e, currentCol) => {
    const searchInput = e.target.value;
    console.log(searchInput);
    let filteredData = state.original.filter((value) => {
      if (value.distance > searchInput) {
        console.log(value, ">VAL");
        return value;
      }
      return filteredData;
    });
    setState({ ...state, list: filteredData });
  };

  return (
    <>
      <br />
      Search: <input type="text" onChange={handleSearch} />
      Search equal: <input type="text" onChange={equalSort} />
      <br />
      <br />
      <Dropdown text="Sort By">
        <Dropdown.Menu>
          {columnOptions.map((item) => (
            <Dropdown.Item
              text={item.text}
              value={item.value}
              icon={item.icon}
              key={item.key}
              onClick={handleSort}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown text="Sort By">
        <Dropdown.Menu>
          {vulnOptions.map((item) => (
            <Dropdown.Item
              text={item.text}
              // value={item.value}
              icon={item.icon}
              key={item.key}
              onClick={sortMore}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <br />
      <br />
      <h1>List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Company</th>
            <th>Amount</th>
            <th>Distance</th>
            {/* {Object.keys(list[0]).map((column, indexHeader) => {
              return (
                <th key={`columnHead-${indexHeader}`}>
                  <h1>{column}</h1>
                </th>
              );
            })} */}
          </tr>
        </thead>
        <tbody>
          {state.list.map((item, index) => (
            <tr key={index}>
              <td>
                <p>{index + 1}</p>
              </td>
              <td>
                <p>{item.date}</p>
              </td>
              <td>
                <p>{item.company}</p>
              </td>
              <td>
                <p>{item.amount}</p>
              </td>
              <td>
                <p>{item.distance}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Table;
