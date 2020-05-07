import React, { Component, createContext } from 'react';
import axios from 'axios';
import { setAuthToken } from './apiCalls/setAuthToken';
import { getAllJobs } from './apiCalls/jobs';
import { getAllEmployers } from './apiCalls/employers';
import { endPoint } from './apiCalls/endPoint';

const StoreContext = createContext();
const ActionContext = createContext();

class ContextProvider extends Component {
  state = {
    allJobs: [],
    jobs: [],
    jobLoading: true,
    singleJob: null,
    singleJobLoading: true,
    employers: null,
    user: null,
    isAuthenticated: false,
    filters: {
      jobCountry: 'Anywhere',
      jobType: '',
      jobCategory: 'All Category',
      // date: 'Any',
      searchQuery: '',
    },
  };

  componentDidMount() {
    //Load and authenticate user if logged in
    this.loadUser();
    this.loadJobs();
    getAllEmployers().then(emp => {
      this.setState({
        employers: emp,
      });
    });
  }

  //load Alljobs
  loadJobs = async () => {
    try {
      const jobs = await getAllJobs();
      this.setState({
        allJobs: jobs,
        jobs: jobs,
        jobLoading: false,
      });
    } catch (err) {
      this.setState({
        jobLoading: false,
      });
    }
  };

  //Load and authenticate user if logged in
  loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      try {
        const res = await axios.get(`${endPoint}/auth`);
        this.setState({
          user: res.data,
          isAuthenticated: true,
        });
      } catch (err) {
        this.setState({
          user: null,
          isAuthenticated: false,
        });
        console.log(err);
      }
    } else {
      this.setState({
        user: null,
        isAuthenticated: false,
      });
    }
  };

  //check logged in
  isLoggedIn = () => {
    if (!localStorage.token) {
      return false;
    } else {
      return true;
    }
  };

  //logout out user
  logout = () => {
    localStorage.removeItem('token');
    this.setState({
      user: null,
      isAuthenticated: false,
    });
    console.log('Logged Out');

    window.location = '/login';
  };

  //Update State with filters
  filterJob = () => {
    const {
      jobCountry,
      // date,
      jobCategory,
      searchQuery,
      jobType,
    } = this.state.filters;

    const { allJobs } = this.state;

    let tempJobs = [...allJobs];

    //filter by searchQuery
    if (searchQuery) {
      tempJobs = tempJobs.filter(j =>
        j.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    //filter by Category
    if (jobCategory !== 'All Category') {
      tempJobs = tempJobs.filter(j => j.jobCategory === jobCategory);
    }

    //filter by Type
    if (jobType !== '') {
      tempJobs = tempJobs.filter(j => j.jobType === jobType);
    }
    //filter by jobCountry
    if (jobCountry !== 'Anywhere') {
      tempJobs = tempJobs.filter(j => j.jobCountry === jobCountry);
    }

    // //Update state
    this.setState({
      jobs: tempJobs,
    });
  };

  //handleChange
  handleChange = e => {
    const { value, name } = e.target;
    this.setState(
      state => ({
        filters: { ...state.filters, [name]: value },
      }),
      this.filterJob
    );
  };

  //Get Single Job
  getSingleJob = async id => {
    try {
      const job = await axios.get(`${endPoint}/jobs/${id}`);
      this.setState(prev => ({
        ...prev,
        singleJob: job.data,
        singleJobLoading: false,
      }));
    } catch (err) {
      this.setState(prev => ({
        ...prev,
        singleJobLoading: false,
      }));
    }
  };
  render() {
    return (
      <StoreContext.Provider
        value={{
          ...this.state,
        }}
      >
        <ActionContext.Provider
          value={{
            handleChange: this.handleChange,
            getSingleJob: this.getSingleJob,
            loadUser: this.loadUser,
            loadJobs: this.loadJobs,
            logout: this.logout,
            isLoggedIn: this.isLoggedIn,
          }}
        >
          {this.props.children}
        </ActionContext.Provider>
      </StoreContext.Provider>
    );
  }
}

export { ContextProvider, StoreContext, ActionContext };
