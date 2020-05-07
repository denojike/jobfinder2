import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const SingleJobListing = ({ job }) => {
  const strFormat = e => {
    return e.charAt(0).toUpperCase() + e.slice(1);
  };
  const timePosted = <Moment date={job.date} fromNow filter={strFormat} />;
  return (
    <section className="featured-job-area">
      <div className="single-job-items mb-30">
        <div className="job-items px-3">
          <div className="job-tittle job-tittle2">
            <Link to={`job-detail/${job._id}`}>
              <h4>{job.jobTitle}</h4>
            </Link>
            <ul>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                {`${job.jobCity} ${job.jobState}, ${job.jobCountry}`}
              </li>
            </ul>
          </div>
        </div>
        <div className="items-link items-link2 f-right">
          <Link to={`job-detail/${job._id}`}>{job.jobType}</Link>
          <span>{timePosted}</span>
        </div>
      </div>
    </section>
  );
};

export default SingleJobListing;
