import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";
import { allSorts, request } from "../functions/sort";
import orderby from "lodash.orderby";
import "../global.scss";
import { useStore } from "../store";
import { observer } from "mobx-react-lite";
import TablePagination from "./table-pagination";

const columnOptions = [
  { key: 1, text: "Company", value: "company", icon: "sort down" },
  { key: 2, text: "Amount", value: "amount", icon: "sort" },
  { key: 3, text: "Distance, km", value: "distance", icon: "sort" },
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
  const [page, setPage] = useState(1);
  const pageLimit = 10;

  // const doesIncludeEntry = (entry) => {
  //   return filter.length > 0
  //     ? textfilterOptions.filter((option) =>
  //         entry[option].toLowerCase().includes(filter.toLowerCase())
  //       ).length > 0
  //     : true;
  // };

  const getPaginatedEntries = () => {
    const offset = page * pageLimit;
    return state.list.slice(offset, offset + pageLimit);
  };

  // const getFilteredEntries = () => {
  //   return entries.filter((entry) => doesIncludeEntry(entry));
  // };

  const renderEntries = () => {
    return getPaginatedEntries(state.list);
  };
  useEffect(() => {
    request().then((res) => {
      setState({ ...state, list: res, original: res });
      store.dashData = res;
    });
  }, []);

  return (
    <>
      <br />
      Search equal:
      <input
        type="text"
        onChange={(e) => {
          return allSorts(
            e,
            state,
            setState,
            store.selectSort,
            store.selectColumn
          );
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
                store.selectColumn = item.value;
              }}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown text="Sort By">
        <Dropdown.Menu>
          {vulnOptions.map((item) => (
            <Dropdown.Item
              disabled={
                store.selectColumn == "company" && item.value != "name"
                  ? true
                  : undefined
              }
              text={item.text}
              value={item.value}
              icon={item.icon}
              key={item.key}
              onClick={(e) => {
                store.selectSort = item.value;
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
            {/* <th>Id</th> */}
            <th>Date</th>
            <th>Company</th>
            <th>Amount</th>
            <th>Distance, km</th>
          </tr>
        </thead>
        <tbody>
          {renderEntries().map((item, index) => (
            <tr key={index}>
              {/* <td>
                <p>{index + 1}</p>
              </td> */}
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
      <TablePagination
        pageLimit={10}
        pages={state.list.length}
        currentPage={page}
        setPage={setPage}
      />
    </>
  );
});
export default Table;
