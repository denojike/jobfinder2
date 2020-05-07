import React from 'react';
import Input from '../components/utilComponents/Input';
import Textarea from '../components/utilComponents/Textarea';
import ButtonClick from '../components/utilComponents/ButtonClick';

const Form2 = ({
  formData,
  handleChange,
  setStep,
  errors,
  handlePageChange,
}) => {
  const { jobDesc, jobSkills, jobEdu } = formData;

  return (
    <>
      <h4 className="pb-4">Step 2/3: Job Information</h4>

      <div className="row">
        <div className="col-12 col-md-9">
          <Textarea
            label="Job Description"
            name="jobDesc"
            value={jobDesc}
            handleChange={handleChange}
            error={errors.jobDesc && 'Description is required'}
            required={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9">
          <Input
            label="Required Skills"
            name="jobSkills"
            placeholder="Javascript, Database Management System, Python etc."
            hint="seperate each entered skill with a comma"
            value={jobSkills}
            handleChange={handleChange}
            error={errors.jobSkills && 'Required'}
            required={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9">
          <Input
            label="Education / Experience"
            placeholder="Bachelor in Computer Science, 3 years experience with react, etc."
            hint="seperate each entry with a comma"
            name="jobEdu"
            value={jobEdu}
            handleChange={handleChange}
            error={errors.jobEdu && 'Required'}
            required={true}
          />
        </div>
      </div>

      <ButtonClick handleClick={() => setStep(1)} name="Prev" />
      <ButtonClick
        handleClick={() => handlePageChange({ jobSkills, jobEdu, jobDesc }, [])}
        name="Next"
      />
    </>
  );
};

export default Form2;
