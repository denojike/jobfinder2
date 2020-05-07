import React from 'react';
import { Link } from 'react-router-dom';

const SingleJobCategory = ({ job }) => {
  return (
    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 pb-3">
      <div className=" text-center mb-30">
        <div className="category-cap">
          <h5>
            <Link to={`job-detail/${job._id}`}>{job.jobTitle}</Link>
          </h5>
          <span>({job.jobNumVac})</span>
        </div>
      </div>
    </div>
  );
};

export default SingleJobCategory;
