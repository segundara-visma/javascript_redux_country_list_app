import { fetchData } from './countryAPI';
import countryReducer, {
  setDebouncedSearch,
  setCountryDataForTest
} from './countryListSlice';

describe('country reducer', () => {
  const url = "https://restcountries.com/v3.1/all"
  const search = "fi"
  let state = {}

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
    searchResult: '',
    loadingStatus: false,
  };

  it('should handle initial state', () => {
    expect(countryReducer(undefined, { type: 'unknown' })).toEqual({
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
    });
  });

  it('should handle fetch', async () => {
    const res = await fetchData(url);
    const actual = countryReducer(initialState, setCountryDataForTest(await res.data));
    state.countryData = actual.countryData
    expect(actual.countryData.length).toBeGreaterThan(0);
  });

  it('should handle filter', () => {
    const actual = countryReducer(initialState, setDebouncedSearch(search));
    expect(actual.filteredData.length).toBeLessThanOrEqual(state.countryData.length);
    actual.filteredData.length > 0 && expect(actual.filteredData.every((item) => item.startsWith(search)));
  });
});
