import { ChangeEvent } from "react";

const sortNameFunc = (
  e: { target: { value: any } },
  state: { original: any[] },
  setState: (arg0: any) => void
) => {
  let searchInput = e.target.value;
  let filteredData = state.original.filter((value: { company: string }) => {
    return value.company.toLowerCase().includes(searchInput.toLowerCase());
  });
  console.log(filteredData, "filt");
  setState({ ...state, list: filteredData });
};

const checkColumn = (
  selectColumn: string,
  value: { distance: any; amount: any }
) => {
  if (selectColumn === "distance") return value.distance;
  else if (selectColumn === "amount") return value.amount;
};

export const sortMoreFunc = (
  e: { target: { value: any } },
  state: { original: any[] },
  setState: (arg0: any) => any,
  selectColumn: any
) => {
  let searchInput = e.target.value;
  console.log(selectColumn, "selectColumn");
  console.log(typeof +searchInput, "searchInput");
  let filteredData: any = state.original.filter((value: any) => {
    if (checkColumn(selectColumn, value) > +searchInput) {
      return value;
    }
    return filteredData;
  });
  return setState({ ...state, list: filteredData });
};

export const sortEqualFunc = (
  e: { target: { value: any } },
  state: { original: any[] },
  setState: (arg0: any) => void,
  selectColumn: any
) => {
  let searchInput = e.target.value;
  console.log(selectColumn);
  let filteredData: any = state.original.filter((value: any) => {
    if (checkColumn(selectColumn, value) === +searchInput) {
      return value;
    } else if (searchInput === "") return state.original;

    return filteredData;
  });
  setState({ ...state, list: filteredData });
};
export const sortSmallerFunc = (
  e: { target: { value: any } },
  state: { original: any[] },
  setState: (arg0: any) => void,
  selectColumn: any
) => {
  let searchInput = e.target.value;
  console.log(selectColumn);
  let filteredData: any = state.original.filter((value: any) => {
    if (checkColumn(selectColumn, value) < +searchInput) {
      return value;
    } else if (searchInput === "") return state.original;

    return filteredData;
  });
  setState({ ...state, list: filteredData });
};

export const allSorts = (
  e: ChangeEvent<HTMLInputElement>,
  state: any,
  setState: any,
  sort: string,
  selectColumn: string
) => {
  if (sort === "more") return sortMoreFunc(e, state, setState, selectColumn);
  else if (sort === "equal")
    return sortEqualFunc(e, state, setState, selectColumn);
  else if (sort === "smaller")
    return sortSmallerFunc(e, state, setState, selectColumn);
  else if (sort === "name") return sortNameFunc(e, state, setState);
};
