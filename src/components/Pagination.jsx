import React from "react";
import Stack from 'react-bootstrap/Stack';
import VisiblePageNumbers from './paginationButtons/VisiblePageNumbers';
import PreviousPageButton from './paginationButtons/PreviousPageButton';
import NextPageButton from './paginationButtons/NextPageButton';
import FirstPageButton from './paginationButtons/FirstPageButton';
import LastPageButton from './paginationButtons/LastPageButton';
import { selectCurrentPage, selectNPages, selectTotalVisiblePageNumbers } from '../features/country/countryListSlice';
import { useSelector } from 'react-redux';

function Pagination() {
  const currentPage = useSelector(selectCurrentPage);
  const numOfPages = useSelector(selectNPages);
  const maxVisible = useSelector(selectTotalVisiblePageNumbers);

    return (
        <Stack direction="horizontal">
          <FirstPageButton/>
          <PreviousPageButton/>
          {currentPage > Math.ceil(maxVisible / 2) && numOfPages > maxVisible && (
            <i className="fa fa-ellipsis-h" style={{ marginLeft: "2px", marginRight: "2px" }}></i>
          )}
          <VisiblePageNumbers/>
          {maxVisible % 2 === 1 ? (currentPage <= numOfPages - Math.ceil(maxVisible / 2) && numOfPages > maxVisible && (
            <i className="fa fa-ellipsis-h" style={{ marginLeft: "2px", marginRight: "2px" }}></i>
          ))
          :(currentPage < numOfPages - Math.ceil(maxVisible / 2) && numOfPages > maxVisible && (
            <i className="fa fa-ellipsis-h" style={{ marginLeft: "2px", marginRight: "2px" }}></i>
          ))}
          <NextPageButton/>
          <LastPageButton/>
        </Stack>
    );
}

export default Pagination;