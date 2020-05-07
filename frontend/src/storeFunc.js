import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { setAuthToken } from './apiCalls/setAuthToken';

const StoreContext = createContext();

const ContextProvider = props => {
  const [store, setStore] = useState({
    allJobs: [],
    jobs: [],
    recentJobs: [],
    jobLoading: true,
    singleJob: null,
    singleJobLoading: true,
    user: null,
    isAuthenticated: false,
    country: '',
    posted: 'Any',
    category: 'All Category',
    searchQuery: '',
    type: 'Full Time',
  });

  useEffect(() => {
    //Load and authenticate user if logged in
    loadUser();
    //getAllJobs
    getAllJobs();
  }, [setStore]);

  //Function to get all jobs
  const getAllJobs = async () => {
    try {
      let jobs = await axios.get('/api/jobs');
      setStore(prev => ({
        ...prev,
        allJobs: jobs.data,
        jobs: jobs.data,
        recentJobs: jobs.data,
        jobLoading: false,
      }));
    } catch (error) {
      setStore(prev => ({
        ...prev,
        jobLoading: false,
      }));
    }
  };
  //Load and authenticate user if logged in
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      setStore(prev => ({
        ...prev,
        user: res.data,
        isAuthenticated: true,
      }));
    } catch (err) {
      setStore(prev => ({
        ...prev,
        user: null,
        isAuthenticated: false,
      }));
      console.log(err);
    }
  };

  //logout out user
  const logout = () => {
    localStorage.removeItem('token');
    setStore(prev => ({
      ...prev,
      user: null,
      isAuthenticated: false,
    }));
    window.location = '/login';
  };

  //Submit Filtered Jobs Function
  const sendFilter = e => {
    e.preventDefault();
    const { allJobs, country, posted, category, searchQuery, type } = store;

    let tempJobs = [...allJobs];
    //filter by country
    if (country) {
      tempJobs = tempJobs.filter(j => j.jobCountry === country);
    }

    //filter by Category
    if (category !== 'All Category') {
      tempJobs = tempJobs.filter(j => j.jobCategory === category);
    }

    //filter by Type
    if (type !== 'Full Time') {
      tempJobs = tempJobs.filter(j => j.jobType === type);
    }

    //Update state
    setStore(prev => ({
      ...prev,
      jobs: tempJobs,
    }));
  };

  //filterRecent Job Function
  const filterRecent = e => {
    const { name, value } = e.target;
    let tempJobs = [...store.recentJobs];
    if (value && name === 'recentJobTitle') {
      tempJobs = tempJobs.filter(j =>
        j.jobTitle.toLowerCase().includes(value.toLowerCase())
      );
      setStore(prev => ({
        ...prev,
        recentJobs: tempJobs,
      }));
    } else {
      setStore(prev => ({
        ...prev,
        recentJobs: store.allJobs,
      }));
    }
    // if (value === 'All' && name === 'recentJobCountry') {
    //   setStore(prev => ({
    //     ...prev,
    //     recentJobs: store.allJobs,
    //   }));
    // }
    if (name === 'recentJobCountry' && (value === 'All' || value === 'Where')) {
      setStore(prev => ({
        ...prev,
        recentJobs: store.allJobs,
      }));
    } else if (name === 'recentJobCountry') {
      const jobs = store.allJobs.filter(j => j.jobCountry === value);
      setStore(prev => ({
        ...prev,
        recentJobs: jobs,
      }));
    }
  };

  //handleChange
  const handleChange = e => {
    const { value, name } = e.target;
    setStore(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  //Get Single Job
  const getSingleJob = async id => {
    try {
      const job = await axios.get(`/api/jobs/${id}`);
      setStore(prev => ({
        ...prev,
        singleJob: job.data,
        singleJobLoading: false,
      }));
    } catch (err) {
      setStore(prev => ({
        ...prev,
        singleJobLoading: false,
      }));
    }
  };

  return (
    <StoreContext.Provider
      value={{
        ...store,
        getAllJobs,
        getSingleJob,
        loadUser,
        logout,
        handleChange,
        sendFilter,
        filterRecent,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export { ContextProvider, StoreContext };
