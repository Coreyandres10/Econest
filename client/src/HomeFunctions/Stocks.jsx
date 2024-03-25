import React, { useState } from 'react';
import './HomeFunctionsStyling/Stocks.css';

function Stocks() {
  const [stockSymbol, setStockSymbol] = useState('');
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setStockSymbol(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetchStockData();
      const data = await response.json();
      if (response.ok) {
        setNews(data.data.news);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStockData = () => {
    const url = `https://real-time-finance-data.p.rapidapi.com/stock-news?symbol=${stockSymbol}%3ANASDAQ&language=en`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd0aecf7196msh1eb73a6c9c9a11ep1f9739jsnbfa2462c3764',
        'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
      }
    };
    return fetch(url, options);
  };

  return (
    <div className="stocks-container">
      <h2 className="stocks-heading">Stocks</h2>
      <form onSubmit={handleSubmit} className="stocks-form">
        <label htmlFor="stockSymbol" className="stocks-label">Enter Stock Symbol:</label>
        <input
          type="text"
          id="stockSymbol"
          value={stockSymbol}
          onChange={handleInputChange}
          className="stocks-input"
          required
        />
        <button type="submit" className="stocks-button">Fetch News</button>
      </form>
      {isLoading && <p className="stocks-loading">Loading...</p>}
      {error && <p className="stocks-error">Error: {error}</p>}
      {news.length > 0 && (
        <div>
          <h3 className="stocks-news-heading">News:</h3>
          <ul className="stocks-news-list">
            {news.map((item, index) => (
              <li key={index} className="stocks-news-item">
                <a href={item.article_url} target="_blank" rel="noopener noreferrer" className="stocks-news-link">
                  <img src={item.article_photo_url} alt="Article" className="stocks-news-image" />
                  <div className="stocks-news-details">
                    <h4 className="stocks-news-title">{item.article_title}</h4>
                    <p className="stocks-news-source">Source: {item.source}</p>
                    <p className="stocks-news-time">Post Time: {item.post_time_utc}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Stocks;
