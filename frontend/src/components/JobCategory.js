import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SingleJobCategory from './SingleJobCategory';
import Loader from './utilComponents/Loader';
import { StoreContext } from '../store';

const JobCategory = () => {
  const { jobLoading, recentJobs, allJobs } = useContext(StoreContext);

  if (jobLoading) {
    return <Loader />;
  }

  if (!jobLoading && allJobs.length < 1) {
    return (
      <div className="job-category">
        <div className="container">
          <h4 className="text-center">No Jobs Found</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="job-category">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center mb-5">
              <h1>Browse Job Categories </h1>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-contnet-center">
          {recentJobs.map(job => (
            <SingleJobCategory job={job} key={job._id} />
          ))}
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className=" text-center mt-4">
              <Link to="/job-listing" className="border-btn2">
                Browse All Sectors
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCategory;
