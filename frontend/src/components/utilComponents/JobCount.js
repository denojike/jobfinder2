import React from 'react';

const JobCount = ({ jobs }) => {
  const job = jobs <= 1 ? 'Job' : 'Jobs';
  return (
    <div className="col-8">
      <div className="listing-top">
        <span className="bg-light p-4 rounded rounded-circle text-info ">
          {`${jobs.length} ${job} found`}{' '}
        </span>
      </div>
    </div>
  );
};

export default JobCount;
