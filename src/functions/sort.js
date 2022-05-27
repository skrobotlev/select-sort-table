export const sortFunc = (e, state, setState, selectCol, selectSortMode) => {
  let searchInput = e.target.value;
  console.log(selectCol, "sel COl");
  console.log(selectSortMode, "sortMode");
  // if (searchInput == "") return state.original;
  switch (selectCol) {
    case "distance":
      if (selectSortMode === "more" && searchInput !== "") {
        let filteredData = state.original.filter((value) => {
          if (value.distance > searchInput) {
            return value;
          }
          // else state.original;
          return filteredData;
        });
        console.log(filteredData, "filDat");
        return setState({ ...state, list: filteredData });
      } else if (selectSortMode === "smaller" && searchInput !== "") {
        let filteredData = state.list.filter((value) => {
          if (value.distance < searchInput) {
            return value;
          } else if (searchInput === "") {
            return setState({ ...state, list: state.original });
          }
          return filteredData;
        });
        console.log(filteredData, "filDat");
        return setState({ ...state, list: filteredData });
      } else if (selectSortMode === "equal" && searchInput !== "") {
        let filteredData = state.original.filter((value) => {
          if (value.distance == searchInput) {
            return value;
          }
          // else state.original;
          return filteredData;
        });
        console.log(filteredData, "filDat");
        return setState({ ...state, list: filteredData });
      }

    // break;
  }
  console.log(searchInput, "searchINP");
};

export const allSorts = (e, sort, state, setState) => {
  if (sort === "more") {
    return sortMoreFunc(e, state, setState);
  }
};

export const request = async () => {
  const req = await fetch("http://localhost:3000/people");
  const res = await req.json();
  return res;
};

const checkColumn = (selectColumn, value) => {
  console.log(selectColumn, "selCOl");
  console.log(value, "VLAl");
  if (selectColumn === "distance") return value.distance;
  else if (selectColumn === "amount") return value.amount;
  // else if (selectColumn === "distance") return value.distance;
};

export const sortMoreFunc = (e, state, setState, selectColumn) => {
  let searchInput = e.target.value;
  console.log(selectColumn, "selectColumn");
  console.log(typeof +searchInput, "searchInput");
  let filteredData = state.original.filter((value) => {
    if (checkColumn(selectColumn, value) > +searchInput) {
      return value;
    }
    return filteredData;
  });
  return setState({ ...state, list: filteredData });
};

export const sortEqualFunc = (e, state, setState, selectColumn) => {
  let searchInput = e.target.value;
  console.log(selectColumn);
  let filteredData = state.original.filter((value) => {
    if (selectColumn == searchInput) {
      return value;
    }
    return filteredData;
  });
  setState({ ...state, list: filteredData });
};
