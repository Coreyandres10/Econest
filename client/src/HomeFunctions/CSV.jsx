import React, { useState } from 'react';
import './HomeFunctionsStyling/CSV.css';
import axios from 'axios';
import csvImage from '../Pictures/csvexample.png'; // Import the PNG image

function CSV() {
  const [csvFile, setCSVFile] = useState(null); // State for storing the selected CSV file

  // Event handler for when a file is selected
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setCSVFile(file);
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (csvFile) {
      let formData = new FormData();
      formData.append('file', csvFile);

      try {
        // Send POST request to upload CSV file
        let response = await axios.post(`http://localhost:3001/uploadcsv`, formData);
        if (response.status === 200) {
          window.alert("CSV upload successful");
        }
      } catch (error) {
        console.error("Error uploading CSV file:", error);
        window.alert("Error uploading CSV file. Please try again.");
      }

      console.log('CSV file:', csvFile);
    }
  };

  return (
    <div className="csv-container">
      <h2 className="csv-heading">CSV Upload</h2>
      <img src={csvImage} alt="CSV Example" className="csv-image" />
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



