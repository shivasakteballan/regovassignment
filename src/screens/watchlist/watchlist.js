import React, { useEffect, useState } from "react";

import "./watchlist.css";

const Watchlist = () => {
  const [watchlistMovies, setWatchlistMovies] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(watchlistMovies);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredResults = watchlistMovies.filter((item) =>
      item.title.toLowerCase().includes(query)
    );

    setFilteredData(filteredResults);
  };

  const ListWatchListItem = ({ item }) => {
    return (
      <li>
        <img
          className="img"
          src={`https://media.themoviedb.org/t/p/w440_and_h660_face${item.poster_path}`}
          alt="Logo"
        />
        {item.title}
      </li>
    );
  };

  const ListWatchListComponent = ({ data }) => {
    return (
      <ul>
        {data?.map((item) => (
          <div className="card">
            <ListWatchListItem key={item.id} item={item} />
          </div>
        ))}
      </ul>
    );
  };

  const getWatchlistMovies = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDJhZWE2OTU3NjFhYjVkZjU1MDNhMjVlNDA3YzVlZSIsInN1YiI6IjY1YTA5YzM0MmNlZmMyMDEzMTM3NDZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qHbjeaQ9_qLHw36tXTj6aQGs-MWspj2v8ZW3XlM0SKI",
      },
    };

    fetch(
      "https://api.themoviedb.org/4/account/65a09c342cefc201313746fd/movie/watchlist?page=1&language=en-US",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setWatchlistMovies(response?.results);
    })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getWatchlistMovies();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ marginLeft: "40px", marginTop: "72px" }}>
      <h1 className="headerText">Watchlist</h1>
      <div className="searchColumn">
              <input
                placeholder="Search"
                type="search"
                value={searchQuery}
                onChange={handleSearch}
                style={{width:"400px"}}
              />
          </div>
          <ListWatchListComponent
            data={searchQuery ? filteredData : watchlistMovies}
          />
    </div>
  );
};

export default Watchlist;
