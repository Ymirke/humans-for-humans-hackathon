import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../Login.css';
import Footer from '../Footer/Footer';

interface Props {
  saveToken: (arg0: string) => void;
}

interface SubmitObj {
  username: string;
  password: string;
}

const PatientLogin: React.FC<Props> = (props: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const obj: SubmitObj = {
      username,
      password,
    };

    fetch('/api/patients/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(obj),
    }).then((response) => response.json())
      .then((data) => {
        if (data.token) {
          props.saveToken(data.token);
          history.push('/chat');
        } else {
          alert('Login failed.');
        }
      });
  };

  return (
    <>
      <main className="login__content">
        <section className="login__box">
          <h1 className="content__user">Log in</h1>

          <form onSubmit={handleSubmit}>
            <input
              className="form__text"
              placeholder="Username"
              type="text"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />

            <br />

            <input
              className="form__text"
              placeholder="Password"
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />

            <br />

            <input className="form__submit" type="submit" value="Log in" />
          </form>
          <p>Dont have an account?</p>
          <Link className="form__submit" to="/signup/patient">Sign up</Link>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PatientLogin;
