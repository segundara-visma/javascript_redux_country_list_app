import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { countryDataAsync, selectStatus, selectCurrentRecords } from './countryListSlice';

import Spinner from 'react-bootstrap/Spinner';
import Pagination from "../../components/Pagination";
import Header from '../../components/Header';
import Listing from '../../components/Listing';

export function CountryData() {
  const loading = useSelector(selectStatus);
  const currentRecords = useSelector(selectCurrentRecords);
  const dispatch = useDispatch();

  const url = "https://restcountries.com/v3.1/all"

  useEffect(() => {
    dispatch(countryDataAsync(url))
  }, [url, dispatch])

  return (
    <div className="container mt-3">
    <h1>Country List</h1>
    <Header />
    {loading && (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )}
    {currentRecords && currentRecords.length > 0 && !loading && (
    <>
      <Listing />
      <Pagination/>
    </>
    )}
    </div>
  );
}
