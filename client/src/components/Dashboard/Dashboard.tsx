import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useHistory } from 'react-router-dom';
import Sidebar from './Sidebar';
import CaseList from './CaseList';

interface Props {
  token: string;
  setCurrentCase: any;
}

const Dashboard: React.FC<Props> = ({ token, setCurrentCase }: Props) => {
  const [cases, setCases] = useState([]);
  const [buttonView, setButtonView] = useState('YourCases');
  const [sidebar, setSidebar] = useState();

  const history = useHistory();
  useEffect(() => {
    if (token === '' && !window.localStorage.getItem('token')) {
      history.push('/login/psychologist');
    }
  });

  useEffect(() => {
    fetch('/api/cases/assigned', {
      headers: {
        'x-auth-token': token,
      },
    })
      .then((res) => res.json())
      .then((data) => setCases(data));
  }, [token]);

  const getCases = (url: string) => {
    fetch(url, {
      headers: {
        'x-auth-token': token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCases(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const selectCase = (id: String) => {
    const newCase = cases.filter((item: { _id: String }) => item._id === id);
    setSidebar(newCase[0]);
  };

  return (
    <>
      <div className="dashboard__nav">
        <button
          className={
            buttonView === 'YourCases'
              ? 'dashboard__button'
              : 'dashboard__button--not'
          }
          type="button"
          onClick={() => {
            getCases('api/cases/assigned');
            setButtonView('YourCases');
          }}
        >
          Your Cases
        </button>
        <button
          className={
            buttonView === 'Unassigned'
              ? 'dashboard__button'
              : 'dashboard__button--not'
          }
          type="button"
          onClick={() => {
            getCases('api/cases/unassigned');
            setButtonView('Unassigned');
          }}
        >
          Unassigned Cases
        </button>
        <button
          className={
            buttonView === 'AllCases'
              ? 'dashboard__button'
              : 'dashboard__button--not'
          }
          type="button"
          onClick={() => {
            getCases('api/cases');
            setButtonView('AllCases');
          }}
        >
          All Cases
        </button>
      </div>
      <section className="dash__content">
        <div className="left__content">
          <CaseList cases={cases} selectCase={selectCase} />
        </div>

        <Sidebar
          setSidebar={setSidebar}
          sidebar={sidebar}
          buttonView={buttonView}
          token={token}
          setCurrentCase={setCurrentCase}
        />
      </section>
    </>
  );
};

export default Dashboard;
