import React from 'react';
import Select from '../components/utilComponents/Select';
import Input from '../components/utilComponents/Input';
import ButtonClick from '../components/utilComponents/ButtonClick';

const Form1 = ({
  formData,
  handleChange,
  errors,
  handlePageChange,
  countries,
  states,
  cities,
}) => {
  const {
    jobTitle,
    jobType,
    jobCategory,
    jobNumVac,
    jobCity,
    jobState,
    jobCountry,
  } = formData;

  const fieldsToSkip = ['_id', 'jobCity', 'jobSkills', 'jobEdu', 'jobDesc'];

  return (
    <>
      <h4 className="pb-4">Step 1/3: Job Information</h4>
      <div className="row">
        <div className="col-12 col-md-9">
          <Input
            label="Job Title"
            name="jobTitle"
            value={jobTitle}
            handleChange={handleChange}
            error={errors.jobTitle && 'Job Title is required'}
            required={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9">
          <Select
            label="Category"
            name="jobCategory"
            value={jobCategory}
            handleChange={handleChange}
            options={[
              'Accounting',
              'IT',
              'Banking',
              'Education',
              'Health',
              'Government',
              'Other',
            ]}
            error={errors.jobCategory && 'Job Category is required'}
            required={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9">
          <Select
            label="Type"
            name="jobType"
            value={jobType}
            handleChange={handleChange}
            options={['Full Time', 'Part Time', 'Freelance', 'Varies']}
            error={errors.jobType && 'Job Type is required'}
            required={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9">
          <Input
            type="number"
            min="1"
            label="No of Vacancy"
            name="jobNumVac"
            value={jobNumVac}
            handleChange={handleChange}
            error={errors.jobNumVac}
            required={true}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-9">
          <Select
            label="Country"
            name="jobCountry"
            value={jobCountry}
            handleChange={handleChange}
            options={countries}
            error={errors.jobCountry && 'Country is required'}
            required={true}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-9">
          <Select
            label="State"
            name="jobState"
            value={jobState}
            handleChange={handleChange}
            options={states && states}
            error={errors.jobState && 'State is required'}
            required={true}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-9">
          <Select
            label="City"
            name="jobCity"
            value={jobCity}
            handleChange={handleChange}
            options={cities}
            error={errors.jobCity && 'City is required'}
            required={false}
          />
        </div>
      </div>

      <ButtonClick
        handleClick={() => handlePageChange(formData, fieldsToSkip)}
        name="Next"
      />
    </>
  );
};

export default Form1;
