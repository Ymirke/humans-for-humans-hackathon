import React, { useEffect } from 'react';
import moment from 'moment';
import './Dashboard.css';
import { useHistory } from 'react-router-dom';

interface DisplayButtonProps {
  buttonView: string;
  id: string;
  token: string;
  setCurrentCase: React.Dispatch<React.SetStateAction<any>>;
}

interface Sidebar {
  setSidebar: React.Dispatch<React.SetStateAction<any>>;
  sidebar: any;
  buttonView: string;
  token: string;
  setCurrentCase: React.Dispatch<React.SetStateAction<any>>;
}

function DisplayButton({
  buttonView,
  id,
  token,
  setCurrentCase,
}: DisplayButtonProps) {
  const history = useHistory();
  const assignCase = (caseId: any, tokenString: string) => {
    fetch(`/api/cases/${caseId}/assign`, {
      method: 'PUT',
      headers: { 'x-auth-token': tokenString },
    }).then(() => {
      setCurrentCase(id);
      history.push('/chat/psychologist');
    });
  };

  if (buttonView === 'YourCases') {
    return (
      <button
        type="button"
        onClick={() => {
          setCurrentCase(id);
          history.push('/chat/psychologist');
        }}
      >
        Open case
      </button>
    );
  }

  if (buttonView === 'Unassigned') {
    return (
      <button
        type="button"
        onClick={() => {
          assignCase(id, token);
        }}
      >
        Assign case
      </button>
    );
  }
  return <div />;
}

export default function Sidebar({
  setSidebar,
  buttonView,
  sidebar,
  token,
  setCurrentCase,
}: Sidebar) {
  useEffect(() => {
    setSidebar(null);
  }, [buttonView]);
  if (sidebar) {
    return (
      <section className="right__content">
        <h1>{sidebar._id}</h1>
        <p>{sidebar.issue}</p>
        <p>
          Patient:
          {sidebar.patientId}
        </p>
        <p>{moment(sidebar.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>

        <DisplayButton
          buttonView={buttonView}
          id={sidebar._id}
          token={token}
          setCurrentCase={setCurrentCase}
        />
      </section>
    );
  }
  return <div />;
}
