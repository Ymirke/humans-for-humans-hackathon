import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ChatBubble from './ChatBubbles/ChatBubbles';
import './Chat.css';

interface Props {
  token: string;
}

interface Content {
  cases: Array<{
    _id: string;
    issue: string;
    messages: Array<{
      text: string;
    }>;
  }>;
}

const InitContent = {
  cases: [
    {
      _id: '',
      issue: '',
      messages: [{ text: '' }],
    },
  ],
};

const Chat: React.FC<Props> = ({ token }: Props) => {
  const [issue, setIssue] = useState<string>('');
  const [content, setContent] = useState<Content>(InitContent);
  const [message, setMessage] = useState<string>();
  const [userFeedback, setUserFeedback] = useState<string>('');
  const history = useHistory();

  useEffect(() => {
    if (token === '' && !window.localStorage.getItem('token')) {
      history.push('/login/patient');
    } else {
      fetch('/api/patients', {
        headers: {
          'content-type': 'application/json',
          'x-auth-token': token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setContent(data);
          const json = JSON.stringify(data);
          window.localStorage.setItem('case', json);
        })
        .catch((err) => {
          console.error(err);
          return undefined;
        });
    }
  }, [token, history]);

  interface Response {
    status: number;
  }

  function handleResponse(response: Response) {
    if (response.status !== 201) return alert('Error');

    fetch('/api/patients', {
      headers: {
        'content-type': 'application/json',
        'x-auth-token': token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        const json = JSON.stringify(data);
        window.localStorage.setItem('case', json);
      })
      .catch((err) => {
        console.error(err);
      });
    return undefined;
  }

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();
    fetch('/api/cases', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify({ issue }),
    }).then((response) => {
      handleResponse(response);
    });
  };

  const messageHandleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch(`api/cases/${content.cases[0]._id}/message`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify({ text: message }),
    }).then((response) => {
      handleResponse(response);
    });

    setMessage('');
    window.scrollTo(0, document.body.scrollHeight);
  };

  const closeCase = async () => {
    const results = await fetch(`/api/cases/${content.cases[0]._id}/close`, {
      method: 'PUT',
      headers: {
        'x-auth-token': token,
      },
    });

    if (results.status === 200) {
      setUserFeedback('Case has been closed');
      setTimeout(() => {
        setUserFeedback('');
        window.location.reload();
      }, 4000);
    } else {
      setUserFeedback('Something went wrong, please try again later. ');
      setTimeout(() => {
        setUserFeedback('');
        window.location.reload();
      }, 4000);
    }
  };

  if (
    !content
    || content.cases.length === 0
    || !window.localStorage.getItem('case')
  ) {
    return (
      <>
        <main className="chat__content">
          <section className="issue__box">
            <h1 className="issue__title">Please describe your issue</h1>
            <form className="issue__form" onSubmit={handleSubmitForm}>
              <textarea
                className="issue__input"
                placeholder="Please describe your problem!"
                onChange={(event) => {
                  setIssue(event.target.value);
                }}
              />
              <input
                className="issue__button"
                type="submit"
                value="Submit issue"
              />
            </form>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="chat__content">
        <section className="issue__content">
          <p className="issue__text">{content.cases[0].issue}</p>
        </section>
        <button
          type="button"
          className="close__case__button"
          onClick={() => {
            closeCase();
          }}
        >
          Close case
        </button>
        <p>{userFeedback}</p>
        <section className="chat__messages">
          {content.cases[0].messages.map((oneMessage: any) => (
            <ChatBubble key={Math.random()} message={oneMessage} />
          ))}
        </section>
        <form
          onSubmit={messageHandleSubmit}
          className="message__form"
          action="submit"
        >
          <input
            type="text"
            className="message__input"
            placeholder="Your message..."
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <input className="message__button" type="submit" />
        </form>
      </main>
    </>
  );
};

export default Chat;
