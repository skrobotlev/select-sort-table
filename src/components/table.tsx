import TablePagination from "./table-pagination";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import { request } from "../api/faker-request";
import { allSorts } from "../functions/sort";
import { useStore } from "../store";
import "../global.scss"

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

interface StateRequest {
  list: any[];
  original: any[];
  sortObject: object;
}


const Table = observer(() => {
  const { store } = useStore();
  const [state, setState] = useState<StateRequest>({
    list: [],
    original: [],
    sortObject: { field: "", order: "" },
  });
  const [page, setPage] = useState<number>(0);
  const pageLimit: number = 10;

  const getPaginatedEntries = (state: any[]) => {
    const offset = page * pageLimit;
    console.log(offset, 'offset')
    return state.slice(offset, offset + pageLimit);
  };

  const renderEntries = (state: any[]) => {
    return getPaginatedEntries(state);
  };
  useEffect(() => {
    request().then((res) => {
      setState({ ...state, list: res, original: res });
      store.dashData = res;
    });
  }, []);

  return (
    <div className="table-page">
      <div className="table-container">
        <span className="sort-items">
          <Dropdown className="select-menu" text="Select Column">
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
          <Dropdown className="select-menu" text="Sort By">
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
          <input
            type="text"
            className="search-input"
            placeholder="Set search"
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
        </span>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Company</th>
              <th>Amount</th>
              <th>Distance, km</th>
            </tr>
          </thead>
          <tbody>
            {/* {state.list.map((item, index) => ( */}
            {renderEntries(state.list).map((item, index) => (
              <tr key={index}>
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
          pageLimit={pageLimit}
          pages={state.list.length}
          currentPage={page}
          setPage={setPage}
        />
      </div>
    </div>

  );
});
export default Table;
