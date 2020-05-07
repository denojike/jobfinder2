import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Form1 from '../forms/Form1';
import Form2 from '../forms/Form2';
import FormConfirm from '../forms/FormConfirm';
import { validateForm } from '../utilFunctions/formUtil';
import { Locations } from '../apiCalls/Locations';
import { addJob } from '../apiCalls/jobs';
import { toast } from 'react-toastify';
import { ActionContext } from '../store';

const AddJob = () => {
  const history = useHistory();
  const { isLoggedIn, loadJobs } = useContext(ActionContext);

  //Manage form page change
  const [step, setStep] = useState(1);

  //formData state
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDesc: '',
    //Convert to array
    jobEdu: '',
    //Convert to array
    jobSkills: '',
    jobType: 'Full Time',
    jobCategory: '',
    jobNumVac: 1,
    jobCity: '',
    jobState: '',
    jobCountry: '',
  });

  //Form Error data
  const [errors, setErrors] = useState({});
  //Locations Data
  const [countryArr, setCountryArr] = useState();

  useEffect(() => {
    //Get locations data
    const countryStates = Locations.getFormatedLocation();
    setCountryArr(countryStates);
  }, []);

  //common variabe for getStates and getCities function
  const { jobCountry, jobState } = formData;
  const countryData = countryArr && countryArr.filter(item => item.name);
  // const countries = countryData && countryData.map(c => c.name);

  // getting states for given country
  const getStates = () => {
    try {
      const states =
        jobCountry &&
        countryData
          .filter(c => c.name === jobCountry)[0]
          .stateCities.map(s => s.state);
      return states;
    } catch (err) {
      console.log(err);
    }
  };

  //getting cities for given state
  const getCities = () => {
    try {
      const cities =
        jobCountry &&
        jobState &&
        countryData
          .filter(c => c.name === jobCountry)[0]
          .stateCities.filter(s => s.state === jobState)[0].cities;

      return cities;
    } catch (err) {
      console.log(err);
    }
  };

  //handlechange
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'jobCountry') {
      setFormData({
        ...formData,
        [name]: value,
        jobState: '',
        jobCity: '',
      });
    } else if (name === 'jobState') {
      setFormData({
        ...formData,
        [name]: value,
        jobCity: '',
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  //handleSubmit

  const handleSubmit = e => {
    e.preventDefault();
    if (!isLoggedIn()) {
      toast.error('Failed. Please Login');
      // history.push('/login');
      window.location = '/login';
    } else {
      addJob(formData)
        .then(err => {
          if (!err) {
            toast('Job successfully added');
            loadJobs();
            history.push('/');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  //Handle form page navigation
  const handlePageChange = (data, fieldsToSkip) => {
    const errors = validateForm(data, fieldsToSkip, setErrors);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setStep(step => step + 1);
    }
  };

  return (
    <div className="container py-5 mx-auto w-75">
      {step === 1 ? (
        <Form1
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handlePageChange={handlePageChange}
          countries={countryArr && countryArr.map(c => c.name)}
          states={getStates()}
          cities={getCities()}
        />
      ) : step === 2 ? (
        <Form2
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handlePageChange={handlePageChange}
          setStep={setStep}
        />
      ) : (
        <FormConfirm
          formData={formData}
          handleSubmit={handleSubmit}
          setStep={setStep}
        />
      )}
    </div>
  );
};

export default AddJob;
