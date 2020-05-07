import React, { useState, useContext } from 'react';
import CategoryFilterForm from '../forms/CategoryFilterForm';
import JobCount from '../components/utilComponents/JobCount';
import ToggleFilterMobile from '../components/ToggleFilterMobile';
import SingleListingContainer from '../components/SingleListingContainer';
import { StoreContext } from '../store';
import Paginate from '../components/utilComponents/Paginate';
import { paginate } from '../utilFunctions/paginate';

const JobListing = () => {
  const [menu, toggleMenu] = useState(true);
  const { jobs } = useContext(StoreContext);

  //Page change handlers
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  // determine pagination
  const pagedJobs = paginate(jobs, currentPage, pageSize);

  return (
    <>
      <div className="job-listing-area">
        <div className="container">
          <div className="row">
            <JobCount jobs={jobs} />
            <ToggleFilterMobile menu={menu} toggleMenu={toggleMenu} />
          </div>
          <div className="row">
            <CategoryFilterForm toggleMenu={toggleMenu} menu={menu} />
            {jobs && jobs.length > 0 ? (
              <SingleListingContainer jobs={pagedJobs} />
            ) : (
              <div className="col text-center">
                <h4>No jobs returned.</h4>
              </div>
            )}
          </div>
          <div className="row mt-3 ">
            <div className="col col-md-9 offset-md-3  pagination-area">
              <div className="div">
                <Paginate
                  listLength={jobs.length}
                  pageSize={pageSize}
                  onPageChange={handlePageChange}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobListing;
