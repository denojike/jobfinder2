import React, { useContext } from 'react';
import { StoreContext, ActionContext } from '../store';
import { uniqueFromArray } from '../utilFunctions/arrFunc';
import SearchBar from '../components/SearchBar';

const CategoryFilterForm = ({ menu }) => {
  const { handleChange } = useContext(ActionContext);
  const {
    // handleChange,
    filters,
    allJobs,
  } = useContext(StoreContext);

  const { jobCategory, jobCountry, jobType, searchQuery } = filters;

  //unique category list
  // const options = uniqueFromArray(allJobs, 'jobCategory');
  const options = [...new Set(allJobs.map(a => a.jobCategory))];
  // const options = allJobs.map(a => a.jobCategory);
  // const options = ['IT', 'Health'];
  //unique country list
  // const uniqueCountries = uniqueFromArray(allJobs, 'jobCountry');
  const uniqueCountries = [...new Set(allJobs.map(c => c.jobCountry))];
  // const uniqueCountries = allJobs.map(c => c.jobCountry);
  // const uniqueCountries = ['Germany', 'Nigeria'];

  return (
    <>
      <div className="col-12 offset-md-3  col-md-9 d-none d-md-block mb-5">
        <SearchBar
          name={'searchQuery'}
          value={searchQuery}
          placeholder={'Job Title...'}
          handleChange={handleChange}
        />
      </div>

      <div
        className={`col-12 col-md-4 col-lg-3 d-md-block bg-light px-4 pb-3 ${
          menu ? 'd-none' : 'd-block'
        }`}
      >
        <div className=" ">
          <h4>Job Category</h4>
          <div className=" ">
            <select
              className="form-control"
              name="jobCategory"
              value={jobCategory}
              onChange={e => handleChange(e)}
            >
              <option>All Category</option>
              {options.map((job, index) => (
                <option key={index}>{job}</option>
              ))}
            </select>
          </div>

          <h4>Job Type</h4>
          <div className=" ">
            <select
              className="form-control"
              name="jobType"
              value={jobType}
              onChange={e => handleChange(e)}
            >
              <option></option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Remote</option>
              <option>Freelance</option>
            </select>
          </div>
        </div>

        <div className=" ">
          <h4>Job Location</h4>

          <div className=" ">
            <select
              className="form-control"
              name="jobCountry"
              value={jobCountry}
              onChange={e => handleChange(e)}
            >
              <option>Anywhere</option>
              {uniqueCountries.map((c, index) => (
                <option key={index}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryFilterForm;
