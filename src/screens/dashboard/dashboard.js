import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import "./dashboard.css";

const Dashboard = () => {
  const accountID = useSelector((state) => state.counter.value);
  const [watchlistMovies, setWatchlistMovies] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(watchlistMovies);

  const navigate = useNavigate();

  const viewDetail = (item) => {
    console.log(item);
    navigate('/movieDetails',  { state: { param: item } });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredResults = watchlistMovies.filter((item) =>
      item.title.toLowerCase().includes(query)
    );

    setFilteredData(filteredResults);
  };

  const ListRecommendedListItem = ({ item }) => {
    return (
      <li style={{ display: "flex" }}>
        <img
          className="img"
          src={`https://media.themoviedb.org/t/p/w440_and_h660_face${item.poster_path}`}
          alt="Logo"
        />
        <h3 style={{ justifyContent: "center", marginLeft: "100px" }}>{item.title}</h3>
        <p style={{ justifyContent: "center", marginLeft: "100px" }}>{item.overview}</p>
      </li>
    );
  };

  const ListRecommendedComponent = ({ data }) => {
    return (
      <ul>
        {data?.map((item) => (
          <div className="card" onClick={() => viewDetail(item)}>
            <ListRecommendedListItem key={item.id} item={item} />
          </div>
        ))}
      </ul>
    );
  };

  const rateMoviesList = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDJhZWE2OTU3NjFhYjVkZjU1MDNhMjVlNDA3YzVlZSIsInN1YiI6IjY1YTA5YzM0MmNlZmMyMDEzMTM3NDZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qHbjeaQ9_qLHw36tXTj6aQGs-MWspj2v8ZW3XlM0SKI",
      },
    };

    fetch(
      `https://api.themoviedb.org/4/account/${accountID}/movie/recommendations?page=1&language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response?.results);
        setWatchlistMovies(response?.results);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    rateMoviesList();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1 className="headerText">Dashboard</h1>
      <div>
        <h1 className="headerText">List of Recommended Movies</h1>
          <div className="searchColumn">
              <input
                placeholder="Search"
                type="search"
                value={searchQuery}
                onChange={handleSearch}
                style={{width:"400px"}}
              />
          </div>
          <ListRecommendedComponent
            data={searchQuery ? filteredData : watchlistMovies}
          />
      </div>
    </div>
  );
};

export default Dashboard;
