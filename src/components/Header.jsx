import React, { useMemo } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import debounce from 'lodash.debounce';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchString, setDebouncedSearch, selectSearchString } from '../features/country/countryListSlice';

function Header() {
  const dispatch = useDispatch();
  const searchString = useSelector(selectSearchString);

  const searchStringHandler = (e) => {
    dispatch(setSearchString(e.target.value))
    debouncedChangeHandler(e.target.value)
  };

  const debouncedChangeHandler = useMemo(() => debounce(value =>
    dispatch(setDebouncedSearch(value)), 1000), [dispatch]
  )

  return (
    <Navbar bg="secondary">
      <Container>
        <Navbar.Brand href="#" style={{ color: 'white' }}><i className="fa fa-bars"></i></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#home" style={{ color: 'white' }}>Country</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Form className="d-flex">
            <Form.Control
                placeholder="Search by country name"
                aria-label="search"
                aria-describedby="basic-addon1"
                onChange={searchStringHandler}
                value={searchString}
            />
        </Form>
      </Container>
    </Navbar>
  );
}

export default Header;