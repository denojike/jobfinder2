import React from 'react';
import SingleJobListing from './SingleJobListing';

const SingleListingContainer = ({ jobs }) => {
  return (
    <div className="col-xl-9 col-lg-9 col-md-8">
      {jobs.map((job, index) => (
        <SingleJobListing job={job} key={index} />
      ))}
    </div>
  );
};

export default SingleListingContainer;
