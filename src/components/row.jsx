import React from "react";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCurrentRecords } from '../features/country/countryListSlice';

function TableBody() {
  const countries = useSelector(selectCurrentRecords);

  return (
      <>
        {countries.map((country, key) => (
          <tr key={key}>
            <td>{country.flag}</td>
            <td>{country.name.common}</td>
            <td>{country.region}</td>
            <td>{country.population}</td>
            <td>{country.languages ? (
              <ul>{(Object.values(country.languages)).map((item, key) => (
                <li key={key}>{item}</li>))}
              </ul>
            ) : null}
            </td>
            <td>
              <Link to={`/details/${country.name.common}`}>
                <Button variant="light" data-cy={`detailsBtn-${country.name.common}`}>
                  <i className="fa fa-angle-right"></i>
                </Button>
              </Link>
            </td>
          </tr>
        ))}
      </>
  );
}

export default TableBody;