import React from 'react'
import Button from 'react-bootstrap/Button';
import { setCurrentPage, selectCurrentPage, selectNPages } from '../../features/country/countryListSlice';
import { useSelector, useDispatch } from 'react-redux';

const RenderLastButton = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const pages = useSelector(selectNPages);
  return (
    <>
      {currentPage < pages ? (
        <Button
          variant="outline-secondary"
          style={{ cursor: "pointer", marginLeft: "2px", marginRight: "2px" }}
          onClick={() => dispatch(setCurrentPage(pages))}
        >
          <i className="fa fa-angle-double-right"></i>
        </Button>
      ) : (
        <Button variant="outline-secondary" style={{ marginLeft: "2px", marginRight: "2px" }} disabled>
          <i className="fa fa-angle-double-right"></i>
        </Button>
      )}
    </>
  );
}
export default RenderLastButton;