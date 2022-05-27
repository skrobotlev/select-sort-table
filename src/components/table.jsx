import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";
import { request } from "../functions/sort";
import orderby from "lodash.orderby";
import { sortFunc, sortMoreFunc, sortEqualFunc } from "../functions/sort";
import "../global.scss";
import { useStore } from "../store";
import { observer } from "mobx-react-lite";

const columnOptions = [
  { key: 1, text: "Company", value: "company", icon: "sort down" },
  { key: 2, text: "Amount", value: "amount", icon: "sort" },
  { key: 3, text: "Distance", value: "distance", icon: "sort" },
];

const vulnOptions = [
  { key: 1, text: "More", value: "more", icon: "sort" },
  { key: 2, text: "Equal", value: "equal", icon: "sort" },
  { key: 3, text: "Smaller", value: "smaller", icon: "sort" },
  { key: 4, text: "Name", value: "name", icon: "sort" },
];

const Table = observer(() => {
  const { store } = useStore();
  const [state, setState] = useState({
    list: [],
    original: [],
    sortObject: { field: "", order: "" },
  });
  const [selectCol, setselectCol] = useState("");
  const [selectSortMode, setSelectSortMode] = useState("");
  const [fetchData, setFetchData] = useState([]);

  // const request = async () => {
  //   const req = await fetch("http://localhost:3000/people");
  //   const res = await req.json();
  //   return res;
  // };

  useEffect(() => {
    request().then((res) => {
      setFetchData(res);
      setState({ ...state, list: res, original: res });
      store.dashData = res;
    });
  }, []);

  // const formSortObject = (fieldName) => {
  //   let { sortObject } = state;
  //   console.log(sortObject, "srtOBJ");
  //   if (!sortObject.field || sortObject.field !== fieldName) {
  //     Object.assign(sortObject, {
  //       field: fieldName,
  //       order: "asc",
  //     });
  //     return sortObject;
  //   } else if (sortObject.field === fieldName) {
  //     Object.assign(sortObject, {
  //       ...sortObject,
  //       order: sortObject.order === "desc" ? "asc" : "desc",
  //     });
  //     return sortObject;
  //   }
  //   setState({ ...state, sortObject });
  // };

  // const handleSort = (e, data) => {
  //   let dropdDownValue = data.value;
  //   console.log(data.value, "dat val");
  //   let currentField = formSortObject(dropdDownValue);
  //   let result = orderby(state.list, currentField.field, currentField.order);
  //   setState({ ...state, list: result });
  // };

  const handleselectColumn = (e, data) => {
    let selectColumn = data;
    setselectCol(data);
    // console.log(data.value, "dat val");
    console.log(selectCol);
    // let currentField = formSortObject(dropdDownValue);
    // let result = orderby(state.list, currentField.field, currentField.order);
  };

  // const handleSearch = (e) => {
  //   let searchInput = e.target.value;
  //   let filteredData = state.original.filter((value) => {
  //     return (
  //       value.name.toLowerCase().includes(searchInput.toLowerCase()) ||
  //       value.type.toString().includes(searchInput.toString())
  //     );
  //   });
  //   console.log(filteredData, "filt");
  //   setState({ ...state, list: filteredData });
  // };
  const equalSort = (e) => {
    let searchInput = e.target.value;
    let filteredData = state.original.filter((value) => {
      if (value.distance > searchInput) {
        return value;
      }
      return filteredData;
    });
    console.log(filteredData, "filDat");
    setState({ ...state, list: filteredData });
  };

  return (
    <>
      <br />
      {/* Search: <input type="text" onChange={handleSearch} /> */}
      {/* Search equal: <input type="text" onChange={equalSort} /> */}
      Search equal:{" "}
      <input
        type="text"
        // onChange={equalSort}
        onChange={(e) => {
          console.log(selectSortMode, "selSorm");
          if (selectSortMode == "more") {
            return sortMoreFunc(
              e,
              state,
              setState,
              store.selectColumn,
              store.selectSort
            );
          } else if (selectSortMode == "equal") {
            return sortEqualFunc(e, state, setState, store.selectColumn);
          }

          // return sortFunc(e, state, setState, selectCol, selectSortMode);
        }}
      />
      <br />
      <br />
      <Dropdown text="Select Column">
        <Dropdown.Menu>
          {columnOptions.map((item) => (
            <Dropdown.Item
              text={item.text}
              value={item.value}
              icon={item.icon}
              key={item.key}
              onClick={(e) => {
                setselectCol(item.value);
                store.selectColumn = item.value;
                console.log(store.selectColumn, "store.selectColumn");
                // handleselectColumn(e, item.value);
              }}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown text="Sort By">
        <Dropdown.Menu>
          {vulnOptions.map((item) => (
            <Dropdown.Item
              text={item.text}
              value={item.value}
              icon={item.icon}
              key={item.key}
              onClick={(e) => {
                // console.log(item.value, "setSelectSortMode");
                store.selectSort = item.value;
                setSelectSortMode(item.value);
                console.log(store.selectSort, "store.seelectSort");
              }}
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
});
export default Table;
