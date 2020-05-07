import React from 'react';
import FormConfirmItem from './FormConfirmItem';
import ButtonClick from '../components/utilComponents/ButtonClick';
import ButtonSubmit from '../components/utilComponents/ButtonSubmit';

const FormConfirm = ({ formData, handleSubmit, setStep }) => {
  const {
    jobTitle,
    jobDesc,
    jobEdu,
    jobSkills,
    jobType,
    jobNumVac,
    jobCity,
    jobState,
    jobCountry,
  } = formData;

  //Convert Str to Array
  const strToArr = str => {
    return str
      .trim()
      .toLowerCase()
      .split(',')
      .map((item, index) => (
        <li key={index}>{item.charAt(0).toUpperCase() + item.slice(1)}</li>
      ));
  };

  return (
    <form onSubmit={handleSubmit} className="card card-header">
      <h4 className="pb-4">Step 3/3: Confirm your Entries</h4>

      <h5 className="my-4">Job Information</h5>

      <FormConfirmItem title="Job Title" value={jobTitle} />
      <FormConfirmItem title="Job Description" value={jobDesc} />
      <FormConfirmItem title="Job Type" value={jobType} />
      <FormConfirmItem title="No of Vacancy" value={jobNumVac} />
      <FormConfirmItem title="Country" value={jobCountry} />
      <FormConfirmItem title="State" value={jobState} />
      <FormConfirmItem title="City" value={jobCity} />
      <FormConfirmItem title="Job Description" value={jobDesc} />
      <FormConfirmItem
        title="Required Skills"
        value={jobSkills && <ul>{strToArr(jobSkills)} </ul>}
      />
      <FormConfirmItem
        title="Education / Experience"
        value={jobEdu && <ul>{strToArr(jobEdu)} </ul>}
      />

      <div className="row">
        <div className="col col-md-1">
          <ButtonClick
            handleClick={() => setStep(1)}
            name={'Edit'}
            className="btn"
          />
        </div>
        <div className="col col-md-4">
          <ButtonSubmit name={'Send'} className="btn ml-md-4 pl-md-4" />
        </div>
      </div>
    </form>
  );
};

export default FormConfirm;
