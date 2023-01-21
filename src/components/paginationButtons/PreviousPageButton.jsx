import React from 'react'
import Button from 'react-bootstrap/Button';
import { setCurrentPage, selectCurrentPage } from '../../features/country/countryListSlice';
import { useSelector, useDispatch } from 'react-redux';

const RenderPrevButton = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
    return (
      <>
        {currentPage > 1 ? (
          <Button
              variant="outline-secondary"
              style={{ cursor: "pointer", marginLeft: "2px", marginRight: "2px" }}
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          >
              <i className="fa fa-angle-left"></i>
          </Button>
        ) : (
          <Button variant="outline-secondary" style={{ marginLeft: "2px", marginRight: "2px" }} disabled>
              <i className="fa fa-angle-left"></i>
          </Button>
        )}
      </>
    );
}
export default RenderPrevButton;