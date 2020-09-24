import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [ratesList, setRetesList] = useState([]);

  useEffect(() => {
    console.log("test");
    getRates();
  }, []);

  const getRates = async () => {
    const res = await axios.get(
      ` https://api.exchangeratesapi.io/latest?base=USD`
    );
    const { rates } = res.data;

    const ratesTemp = [];
    for (const [symbol, rate] of Object.entries(rates)) {
      console.log(rate);
      ratesTemp.push({ symbol, rate });
    }
    setRetesList(ratesTemp);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <body>
        <select className="form-control form-control-lg">
          {ratesList.map((d)=>(
<option>
{d.symbol}
</option>
          ))};
        </select>
        <ul className="list-group">
          {ratesList.map((d) => 
           <li className="list-group-item" key={d.symbol}>
             {d.symbol}- {d.rate}</li> 
          )}
        </ul>
      </body>
    </div>
  );
}

export default App;
