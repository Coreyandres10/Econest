import React, { useState } from 'react';
import './HomeFunctionsStyling/CSV.css'; // Import CSS file for styling

function CSV() {
  const [csvFile, setCSVFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCSVFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle the submission of the CSV file, such as sending it to the server or processing it.
    if (csvFile) {
      console.log('CSV file:', csvFile);
      // You can perform further actions here, such as sending the file to the server for processing.
    }
  };

  return (
    <div className="csv-container">
      <h2 className="csv-heading">CSV Upload</h2>
      <form onSubmit={handleSubmit} className="csv-form">
        <div className="csv-form-group">
          <label htmlFor="csvFile" className="csv-label">Choose CSV file:</label>
          <input
            type="file"
            id="csvFile"
            accept=".csv"
            onChange={handleFileChange}
            className="csv-input"
            required
          />
        </div>
        <button type="submit" className="csv-button">Upload</button>
      </form>
    </div>
  );
}

export default CSV;
