import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from './countryAPI';
import _ from 'lodash'

const initialState = {
  filteredData: [],
  countryData: [],
  currentRecords: [],
  currentPage: 1,
  nPages: null,
  totalVisiblePageNumbers: 5,
  sortingOrder: '',
  sortingIconPosition: 'sort',
  recordsPerPage: 5,
  searchString: '',
  debouncedSearch: null,
  loadingStatus: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const countryDataAsync = createAsyncThunk(
  'countryList/fetchData',
  async (url) => {
    const response = await fetchData(url);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const filteredData = (data, searchString) => {
  const newArray =  _.filter(data, (item) => item.name.common.toLowerCase().startsWith(searchString.toLowerCase()))
  return newArray
}

export const countryDataSlice = createSlice({
    name: 'countryList',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      setCountryDataForTest: (state, action) => {
        state.countryData = action.payload
      },
      setSearchString: (state, action) => {
        state.searchString = action.payload
      },
      setDebouncedSearch: (state, action) => {
        state.debouncedSearch = action.payload
        state.currentPage = 1
        state.filteredData = filteredData(state.countryData, state.debouncedSearch)

        const indexOfLastRecord = state.currentPage * state.recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - state.recordsPerPage;
        let newList

        if(state.sortingOrder === 'asc') {
          newList = state.filteredData.sort(
            (p1, p2) =>
            (p1.name.common.toUpperCase() > p2.name.common.toUpperCase()) ? 1 : (p1.name.common.toUpperCase() < p2.name.common.toUpperCase()) ? -1 : 0
          )
          const currentRecords = newList.slice(indexOfFirstRecord, indexOfLastRecord);
          state.currentRecords = currentRecords;
        } else if (state.sortingOrder === 'desc') {
          newList = state.filteredData.sort(
            (p1, p2) =>
            (p1.name.common.toUpperCase() < p2.name.common.toUpperCase()) ? 1 : (p1.name.common.toUpperCase() > p2.name.common.toUpperCase()) ? -1 : 0
          )
          const currentRecords = newList.slice(indexOfFirstRecord, indexOfLastRecord);
          state.currentRecords = currentRecords;
        } else {
          const currentRecords = state.filteredData && state.filteredData.length && state.filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
          state.currentRecords = currentRecords;
        }

        state.nPages = (Math.ceil(state.filteredData.length / state.recordsPerPage))
      },
      setCurrentPage: (state, action) => {
        state.currentPage = action.payload;

        const indexOfLastRecord = state.currentPage * state.recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - state.recordsPerPage;
        let newList
        const data = state.filteredData.length > 0 ? state.filteredData : state.countryData

        if(state.sortingOrder === 'asc') {
          newList = data.sort(
            (p1, p2) =>
            (p1.name.common.toUpperCase() > p2.name.common.toUpperCase()) ? 1 : (p1.name.common.toUpperCase() < p2.name.common.toUpperCase()) ? -1 : 0
          )
          const currentRecords = newList.slice(indexOfFirstRecord, indexOfLastRecord);
          state.currentRecords = currentRecords;
        } else if (state.sortingOrder === 'desc') {
          newList = data.sort(
            (p1, p2) =>
            (p1.name.common.toUpperCase() < p2.name.common.toUpperCase()) ? 1 : (p1.name.common.toUpperCase() > p2.name.common.toUpperCase()) ? -1 : 0
          )
          const currentRecords = newList.slice(indexOfFirstRecord, indexOfLastRecord);
          state.currentRecords = currentRecords;
        } else {
          const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
          state.currentRecords = currentRecords;
        }

        state.nPages = (Math.ceil(data.length / state.recordsPerPage))
      },
      setSortingOrder: (state) => {
        state.sortingOrder = state.sortingOrder === 'asc' ? 'desc' : 'asc';
        state.sortingIconPosition = state.sortingOrder === 'asc' ? 'caret-down' : 'caret-up';

        const indexOfLastRecord = state.currentPage * state.recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - state.recordsPerPage;
        let newList
        const data = state.filteredData.length > 0 ? state.filteredData : state.countryData

        if(state.sortingOrder === 'asc') {
          newList = data.sort(
            (p1, p2) =>
            (p1.name.common.toUpperCase() > p2.name.common.toUpperCase()) ? 1 : (p1.name.common.toUpperCase() < p2.name.common.toUpperCase()) ? -1 : 0
          )
          const currentRecords = newList.slice(indexOfFirstRecord, indexOfLastRecord);
          state.currentRecords = currentRecords;
        } else if (state.sortingOrder === 'desc') {
          newList = data.sort(
            (p1, p2) =>
            (p1.name.common.toUpperCase() < p2.name.common.toUpperCase()) ? 1 : (p1.name.common.toUpperCase() > p2.name.common.toUpperCase()) ? -1 : 0
          )
          const currentRecords = newList.slice(indexOfFirstRecord, indexOfLastRecord);
          state.currentRecords = currentRecords;
        } else {
          const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
          state.currentRecords = currentRecords;
        }

        state.nPages = (Math.ceil(data.length / state.recordsPerPage))
      }
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
      builder
        .addCase(countryDataAsync.pending, (state) => {
          state.loadingStatus = true;
          state.countryData = [];
        })
        .addCase(countryDataAsync.fulfilled, (state, action) => {
          state.loadingStatus = false;
          state.countryData = action.payload;

          const indexOfLastRecord = state.currentPage * state.recordsPerPage;
          const indexOfFirstRecord = indexOfLastRecord - state.recordsPerPage;
          let newList
  
          if(state.sortingOrder === 'asc') {
            newList = state.countryData.sort(
              (p1, p2) =>
              (p1.name.common.toUpperCase() > p2.name.common.toUpperCase()) ? 1 : (p1.name.common.toUpperCase() < p2.name.common.toUpperCase()) ? -1 : 0
            )
            const currentRecords = newList.slice(indexOfFirstRecord, indexOfLastRecord);
            state.currentRecords = currentRecords;
          } else if (state.sortingOrder === 'desc') {
            newList = state.countryData.sort(
              (p1, p2) =>
              (p1.name.common.toUpperCase() < p2.name.common.toUpperCase()) ? 1 : (p1.name.common.toUpperCase() > p2.name.common.toUpperCase()) ? -1 : 0
            )
            const currentRecords = newList.slice(indexOfFirstRecord, indexOfLastRecord);
            state.currentRecords = currentRecords;
          } else {
            const currentRecords = state.countryData.slice(indexOfFirstRecord, indexOfLastRecord);
            state.currentRecords = currentRecords;
          }

          state.nPages = (Math.ceil(state.countryData.length / state.recordsPerPage))
        });
    }
});

export const { setSearchString, setDebouncedSearch, setSortingOrder, setCurrentPage, setCountryDataForTest } = countryDataSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectCountryData = (state) => state.country.countryData;
export const selectStatus = (state) => state.country.loadingStatus;
export const selectCurrentRecords = (state) => state.country.currentRecords;
export const selectCurrentPage = (state) => state.country.currentPage;
export const selectNPages = (state) => state.country.nPages;
export const selectTotalVisiblePageNumbers = (state) => state.country.totalVisiblePageNumbers;
export const selectSortingOrder = (state) => state.country.sortingOrder;
export const selectSortingIconPosition = (state) => state.country.sortingIconPosition;
export const selectSearchString = (state) => state.country.searchString;

export default countryDataSlice.reducer;
