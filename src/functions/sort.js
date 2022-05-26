export const sortMore = (e, state, setState) => {
  const searchInput = e.target.value;
  console.log(searchInput);
  let filteredData = state.original.filter((value) => {
    if (value.type > searchInput) {
      console.log(value, ">VAL");
      return value;
    }
    return filteredData;
  });
  setState({ ...state, list: filteredData });
};
