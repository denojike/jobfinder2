import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import { endPoint } from '../apiCalls/endPoint';
import { StoreContext, ActionContext } from '../store';
import Loader from '../components/utilComponents/Loader';

const JobDetail = ({ match }) => {
  const history = useHistory();
  const { id } = match.params;
  const { getSingleJob, getAllJobs } = useContext(ActionContext);
  const { singleJob, singleJobLoading, user } = useContext(StoreContext);

  //Check if job was created by logged in employer
  const isEmployer =
    (singleJob && singleJob.employer._id) === (user && user._id);

  //formate date posted
  const timePosted = singleJob && (
    <Moment date={singleJob.date} format="MMMM DD, Y" />
  );

  useEffect(() => {
    getSingleJob(id);
  }, [id, getSingleJob]);

  //Confirm alert options

  //handleDelete
  const handleDelete = async id => {
    try {
      let res = await axios.delete(`${endPoint}/${id}`);
      if (res.data.msg) {
        toast(res.data.msg);
        getAllJobs();
        history.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (singleJobLoading) {
    return <Loader />;
  }

  if (!singleJobLoading && singleJob === null) {
    return (
      <div className="job-post-company" style={{ height: '70vh' }}>
        <div className="container">
          <h4 className="text-center">This job does not exist</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="container pb-5">
      <div className="row justify-content-between">
        <div className="col-xl-7 col-lg-8">
          <div className="pt-3">
            <h2>{singleJob.jobTitle}</h2>
            <i>{`${singleJob.jobCity}${singleJob.jobCity && ','} ${
              singleJob.jobState
            }, ${singleJob.jobCountry}`}</i>
          </div>

          <div className="pt-3">
            <h4>Job Description</h4>
            <p>{singleJob.jobDesc}</p>
          </div>
          <div className="pt-2">
            <h4>Required Knowledge, Skills, and Abilities</h4>
            <ul>
              {singleJob.jobSkills.split(',').map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="pt-3">
            <h4>Education + Experience</h4>
            <ul>
              {singleJob.jobEdu.split(',').map((edu, index) => (
                <li key={index}>{edu}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-xl-4 col-lg-4">
          <div className="job-detail  mt-3">
            <h4>Job Overview</h4>

            <ul>
              <li>
                Posted date : <span>{timePosted}</span>
              </li>
              <li>
                Location : <span>{singleJob.jobCity}</span>
              </li>
              <li>
                Vacancy : <span>{singleJob.jobNumVac}</span>
              </li>
              <li>
                Job nature : <span>{singleJob.jobType}</span>
              </li>
            </ul>
            <div className="btn2">
              <a
                href={`mailto:${singleJob.employer.empCompanyEmail}`}
                className="btn"
              >
                Apply Now
              </a>
            </div>
          </div>
          <div className=" pt-4">
            <h4>Company Information</h4>

            <span>{singleJob.employer.empCompanyName}</span>
            <p>{singleJob.employer.empCompanyDesc}</p>
            <ul>
              <li>
                Name: <span>{singleJob.employer.empCompanyName}</span>
              </li>
              <li>
                Web : <span> {singleJob.employer.empCompanyWeb}</span>
              </li>
              <li>
                Email: <span>{singleJob.employer.empCompanyEmail}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {isEmployer && (
        <div className="mt-3">
          <Link className="btn head-btn2" to={`/editJob/${singleJob._id}`}>
            Edit Job
          </Link>
          <button
            className="btn head-btn1 ml-3"
            onClick={() => handleDelete(singleJob._id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
