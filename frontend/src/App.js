import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
//import logo from './logo.svg';
import { ToastContainer } from 'react-toastify';
import JobListing from './pages/JobListing';
import JobDetail from './pages/JobDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import EmployerLogin from './pages/EmployerLogin';
import EmployerSignup from './pages/EmployerSignup';
import AddJob from './pages/AddJob';
import PrivateRoute from './components/utilComponents/PrivateRoute';
import EditJob from './pages/EditJob';
import { ContextProvider } from './store';
import './scss/style.scss';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ContextProvider>
      <Router>
        <ToastContainer />
        <Header />
        <Switch>
          <Route exact path="/job-detail/:id" component={JobDetail} />
          <PrivateRoute exact path="/editJob/:id" component={EditJob} />
          <PrivateRoute exact path="/addjob" component={AddJob} />
          <Route exact path="/login" component={EmployerLogin} />
          <Route path="/sign-up" component={EmployerSignup} />
          <Route exact path="/" component={JobListing} />
          <Route render={() => <Redirect to="/"></Redirect>} />
        </Switch>
        <Footer />
      </Router>
    </ContextProvider>
  );
}

export default App;
