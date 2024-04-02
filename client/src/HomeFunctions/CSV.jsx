import React, { useState } from 'react';
import './HomeFunctionsStyling/CSV.css'; 
import axios from 'axios';
function CSV() {
  const [csvFile, setCSVFile] = useState(null);

  const handleFileChange =async (e) => {
    const file = e.target.files[0];
    setCSVFile(file);
 
  };

  const handleSubmit =async(e) => {
    e.preventDefault();

    if (csvFile) {
      let formdata=new FormData()
      formdata.append('file',csvFile)
      let response=await axios.post(`http://localhost:3001/uploadcsv`,formdata)
     if(response.status==200){
      console.log(response.data.message)
     }

      console.log('CSV file:', csvFile);
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
