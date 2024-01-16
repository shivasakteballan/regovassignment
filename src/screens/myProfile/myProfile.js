import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { savingToken, savingAccessToken } from "../../features/auth/tokenSlice";

const MyProfile = () => {

    const accessToken = useSelector((state) => state?.counter?.accessToken)
    const dispatch = useDispatch();

    const logout = () => {
        const options = {
            method: 'DELETE',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDJhZWE2OTU3NjFhYjVkZjU1MDNhMjVlNDA3YzVlZSIsInN1YiI6IjY1YTA5YzM0MmNlZmMyMDEzMTM3NDZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qHbjeaQ9_qLHw36tXTj6aQGs-MWspj2v8ZW3XlM0SKI'
            },
            body: JSON.stringify({
                access_token: accessToken
              })
          };
          
          fetch('https://api.themoviedb.org/4/auth/access_token', options)
            .then(response => response.json())
            .then(response => {
                dispatch(savingToken(null));
                dispatch(savingAccessToken(null));
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
        <div>My Profile</div>
        <button onClick={logout}>Logout</button>
        </div>
    );
};

export default MyProfile;