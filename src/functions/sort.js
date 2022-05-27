// export const sortFunc = (e, state, setState, selectCol, selectSortMode) => {
//   let searchInput = e.target.value;
//   console.log(selectCol, "sel COl");
//   console.log(selectSortMode, "sortMode");
//   // if (searchInput == "") return state.original;
//   switch (selectCol) {
//     case "distance":
//       if (selectSortMode === "more" && searchInput !== "") {
//         let filteredData = state.original.filter((value) => {
//           if (value.distance > searchInput) {
//             return value;
//           }
//           // else state.original;
//           return filteredData;
//         });
//         console.log(filteredData, "filDat");
//         return setState({ ...state, list: filteredData });
//       } else if (selectSortMode === "smaller" && searchInput !== "") {
//         let filteredData = state.list.filter((value) => {
//           if (value.distance < searchInput) {
//             return value;
//           } else if (searchInput === "") {
//             return setState({ ...state, list: state.original });
//           }
//           return filteredData;
//         });
//         console.log(filteredData, "filDat");
//         return setState({ ...state, list: filteredData });
//       } else if (selectSortMode === "equal" && searchInput !== "") {
//         let filteredData = state.original.filter((value) => {
//           if (value.distance == searchInput) {
//             return value;
//           }
//           // else state.original;
//           return filteredData;
//         });
//         console.log(filteredData, "filDat");
//         return setState({ ...state, list: filteredData });
//       }

//     // break;
//   }
//   console.log(searchInput, "searchINP");
// };

export const request = async () => {
  const req = await fetch("http://localhost:3000/people");
  const res = await req.json();
  return res;
};

const sortNameFunc = (e, state, setState) => {
  let searchInput = e.target.value;
  let filteredData = state.original.filter((value) => {
    return value.company.toLowerCase().includes(searchInput.toLowerCase());
  });
  console.log(filteredData, "filt");
  setState({ ...state, list: filteredData });
};

const checkColumn = (selectColumn, value) => {
  if (selectColumn === "distance") return value.distance;
  else if (selectColumn === "amount") return value.amount;
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
    if (checkColumn(selectColumn, value) === +searchInput) {
      return value;
    } else if (searchInput === "") return state.original;

    return filteredData;
  });
  setState({ ...state, list: filteredData });
};
export const sortSmallerFunc = (e, state, setState, selectColumn) => {
  let searchInput = e.target.value;
  console.log(selectColumn);
  let filteredData = state.original.filter((value) => {
    if (checkColumn(selectColumn, value) < +searchInput) {
      return value;
    } else if (searchInput === "") return state.original;

    return filteredData;
  });
  setState({ ...state, list: filteredData });
};

export const allSorts = (e, state, setState, sort, selectColumn) => {
  if (sort === "more") return sortMoreFunc(e, state, setState, selectColumn);
  else if (sort === "equal")
    return sortEqualFunc(e, state, setState, selectColumn);
  else if (sort === "smaller")
    return sortSmallerFunc(e, state, setState, selectColumn);
  else if (sort === "name")
    return sortNameFunc(e, state, setState, selectColumn);
};
