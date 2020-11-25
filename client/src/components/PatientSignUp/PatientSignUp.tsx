import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import '../Login.css';
import Footer from '../Footer/Footer';

interface Props {
  saveToken: (arg0: string) => void;
}

const PatientSignUp: React.FC<Props> = (props: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState<any>();
  const [gender, setGender] = useState('female');
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const obj: any = {
      username,
      password,
      email,
      gender,
    };

    fetch('/api/patients', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(obj),
    }).then((response) => response.json())
      .then((data) => {
        if (data.token) {
          props.saveToken(data.token);
          history.push('/chat');
        }
      });
  };

  return (
    <>
      <main className="login__content">
        <section className="login__box">
          <h1 className="content__user">Create an account</h1>

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
            <p>
              Email is not required for anonymity reasons, but can be added
              <br />
              if you wish to recieve notifications about your open cases.
            </p>
            <input
              className="form__text"
              placeholder="Email (optional)"
              type="text"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <br />
            <select
              className="form__select"
              name="Select Gender"
              id=""
              onChange={(event) => {
                setGender(event.target.value);
              }}
            >
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="none">neither / rather not say</option>
            </select>
            <br />
            <input className="form__submit" type="submit" value="Create account" />
          </form>
          <Link className="form__goBack" to="/login/patient">Go back</Link>

        </section>
      </main>
      <Footer />
    </>
  );
};

export default PatientSignUp;
