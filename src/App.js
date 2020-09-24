import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [ratesList, setRetesList] = useState([]);
  const [base, setBase] = useState("USD");

  useEffect(() => {
    getRates("USD");
  }, []);

  const getRates = async (base) => {
    const res = await axios.get(
      ` https://api.exchangeratesapi.io/latest?base=${base}`
    );
    const { rates } = res.data;

    const ratesTemp = [];
    for (const [symbol, rate] of Object.entries(rates)) {
      ratesTemp.push({ symbol, rate });
    }
    setRetesList(ratesTemp);
  };

  return (
    <div class="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3>Currency convert</h3>
          <br />
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Symbol :</label>
              <select
                className="form-control form-control-lg"
                value={base}
                onChange={(e) => {
                  const value = e.target.value;
                  setBase(value);
                  getRates(value);
                }}
              >
                {ratesList.map((d) => (
                  <option value={d.symbol}>{d.symbol}</option>
                ))}
                ;
              </select>
              <ul className="list-group">
                {ratesList.map((d) => (
                  <li className="list-group-item" key={d.symbol}>
                    {d.symbol}- {d.rate}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
