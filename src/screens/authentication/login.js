import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { savingToken, savingAccessToken } from "../../features/auth/tokenSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requestToken, setRequestToken] = useState(null);
  const [externalPopup, setExternalPopup] = useState(null);
  const [url, setUrl] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!externalPopup) {
      return;
    }
    const timer = setInterval(async () => {
      if (!externalPopup) {
        timer && clearInterval(timer);
        return;
      }
      const currentUrl = externalPopup?.location?.href;
      if (currentUrl === url) {
        return;
      } else {
        try {
          await createAccessToken(requestToken);
        } catch (error) {
          console.log(error);
        } finally {
          setExternalPopup(null);
          timer && clearInterval(timer);
        }
      }
    }, 1000);
    // eslint-disable-next-line
  }, [externalPopup, requestToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
  };

  const createRequestToken = async () => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDJhZWE2OTU3NjFhYjVkZjU1MDNhMjVlNDA3YzVlZSIsInN1YiI6IjY1YTA5YzM0MmNlZmMyMDEzMTM3NDZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qHbjeaQ9_qLHw36tXTj6aQGs-MWspj2v8ZW3XlM0SKI",
      },
    };
    try {
      fetch("https://api.themoviedb.org/4/auth/request_token", options)
        .then((response) => response.json())
        .then(async (response) => {
          console.log(response?.request_token);
          setRequestToken(response?.request_token);
          const url = `https://www.themoviedb.org/auth/access?request_token=${response?.request_token}`;
          const popup = window.open(url);
          setExternalPopup(popup);
          setUrl(url);
        })
        .catch((err) => console.error(err));
    } catch {}
  };

  const createAccessToken = async (requestToken) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDJhZWE2OTU3NjFhYjVkZjU1MDNhMjVlNDA3YzVlZSIsInN1YiI6IjY1YTA5YzM0MmNlZmMyMDEzMTM3NDZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qHbjeaQ9_qLHw36tXTj6aQGs-MWspj2v8ZW3XlM0SKI",
      },
      body: JSON.stringify({
        request_token: requestToken,
      }),
    };

    await fetch("https://api.themoviedb.org/4/auth/access_token", options)
      .then((response) => response.json())
      .then((response) => {
        console.log('line 88', response);
        dispatch(savingToken(response?.account_id));
        dispatch(savingAccessToken(response?.access_token));
      })
      .catch((err) => console.error(err));
  };

  const theMovieDBSignIn = async () => {
    await createRequestToken();
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Regov Technologies</h1>
      <h2 style={{ textAlign: "center" }}>Sign In</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <div>
          <button type="submit">Sign In</button>
          <button onClick={theMovieDBSignIn}>Sign In with themoviedb</button>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default Login;
