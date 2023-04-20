import React, { useState } from "react";
import Papa from "papaparse";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [columnArray, setColumnArray] = useState([]);
  const [valuesArray, setValuesArray] = useState([]);

  const handleFileChange = (e) => {
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const columnArray = [];
        const valuesArray = [];

        result.data.map((d) => {
          columnArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        setData(result.data);
        setColumnArray(columnArray[0]);
        setValuesArray(valuesArray);
      },
    });
  };

  return (
    <div>
      <h1 className="title">File Upload + CSV Parser</h1>
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={handleFileChange}
      />
      <hr />
      {data.length > 0 && (
        <div>
          <h1>Report</h1>
          <h3>Host - Anniruddha SG</h3>
          <h3>Total Participants - {data.length}</h3>
          <h3>Duration - 92 Minutes</h3>
        </div>
      )}
      <table>
        <thead>
          <tr>
            {columnArray.map((col, i) => {
              return <th key={i}>{col}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {valuesArray.map((v, i) => {
            return (
              <tr key={i}>
                {v.map((value, i) => {
                  return <td key={i}>{value}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
