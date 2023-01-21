import React from "react";
import Table from 'react-bootstrap/Table';
import TableBody from './row'
import { useSelector, useDispatch } from 'react-redux';
import { setSortingOrder, selectSortingIconPosition } from '../features/country/countryListSlice';

function Listing() {
  const sortingIconPosition = useSelector(selectSortingIconPosition);
  const dispatch = useDispatch();

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Flag</th>
          <th onClick={() => dispatch(setSortingOrder())} style={{ cursor: "pointer" }}>Name <i className={`fa fa-${sortingIconPosition}`}></i></th>
          <th>Region</th>
          <th>Population</th>
          <th>Languages</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <TableBody />
      </tbody>
    </Table>
  );
}

export default Listing;