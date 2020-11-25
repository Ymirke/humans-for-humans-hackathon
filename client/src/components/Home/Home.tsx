import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Footer from '../Footer/Footer';

const Home: React.FC = () => (
  <>
    <section className="home__content">
      <h2 className="content__title">Welcome!</h2>
      <h5 className="content__description">
        This is an easy-to-use platform that can be
        used by organizations to provide mental health support for human traffic victims.
        The application currently supports two types
        of users: patients and psychologists. Patients can anonymously register,
        login and leave a message (create a case) for
        a mental health specialist and close the case at any time.
        Psychologists must already be in a system in
        order to login, work with cases, write notes and answer/talk to patients.
        The conversation between two
        parties works like a chat.
      </h5>
      <h3>Let us help you.</h3>
      <Link className="content__login" to="/signup/patient">Get started</Link>
      <h5 className="content__description">Already have an account?</h5>
      <Link className="content__signup" to="/login/patient">Log in</Link>
    </section>
    <Footer />
  </>
);

export default Home;
