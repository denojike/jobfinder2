import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Paginate = ({ listLength, pageSize, onPageChange, currentPage }) => {
  const pagesCount = Math.ceil(listLength / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav className="paginate">
      <ul className="pagination d-flex flex-row">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item'}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Paginate.propTypes = {
  listLength: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Paginate;
