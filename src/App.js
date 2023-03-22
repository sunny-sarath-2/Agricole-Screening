import React, { useEffect, useState } from "react";
import { InputGroup, Input, Table } from "./components";
import SwitchImg from "./assets/switch.png";

function App() {
  const [fxRate, setFxRate] = useState(1.1);
  const [inputValue, setInputValue] = useState({
    USD: "",
    EUR: "",
  });

  const [converionFrom, setConverionFrom] = useState("EUR");
  const [switchPlaces, setSwitchPlaces] = useState(false);
  const [override, setOverride] = useState(false);
  const [storeIntervals, setStoreIntervals] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    setIntervals(fxRate);
  }, []);

  useEffect(() => {
    override && clearInterval(storeIntervals);
  }, [override]);

  const setIntervals = (fxRateValue) => {
    const interval = setInterval((a) => {
      let updatedFx = getRandomValue(fxRateValue);
      updatedFx = Math.round(updatedFx * 100) / 100;
      setFxRate(updatedFx);
      clearInterval(interval);
      setIntervals(updatedFx);
    }, 3000);
    setStoreIntervals(interval);
  };

  const getRandomValue = (fxRateValue) => {
    return Math.round(Math.random()) ? fxRateValue + 0.05 : fxRateValue - 0.05;
  };

  useEffect(() => {
    if (converionFrom === "EUR" && inputValue.EUR) {
      setInputValue({
        ...inputValue,
        USD: Number(fxRate * inputValue.EUR).toFixed(2),
      });
    } else if (converionFrom === "USD" && inputValue.USD) {
      setInputValue({
        ...inputValue,
        EUR: Number(inputValue.USD / fxRate).toFixed(2),
      });
    }
  }, [fxRate]);

  const onInputChange = (value, name) => {
    if (name !== converionFrom) {
      setConverionFrom(name);
    }
    if (/^-?\d*[.,]?\d*$/.test(value)) {
      if (name === "USD") {
        let calculatedValue = Number(value / fxRate).toFixed(2);
        setInputValue({
          USD: value,
          EUR: value ? calculatedValue : "",
        });
      } else if (name === "EUR") {
        let calculatedValue = Number(fxRate * value).toFixed(2);
        setInputValue({
          EUR: value,
          USD: value ? calculatedValue : "",
        });
      }
    }
  };

  useEffect(() => {
    if (converionFrom === "USD" && inputValue.EUR) {
      onInputChange(inputValue.USD, "EUR");
      setConverionFrom("EUR");
    } else if (converionFrom === "EUR" && inputValue.USD) {
      onInputChange(inputValue.EUR, "USD");
      setConverionFrom("USD");
    }
  }, [switchPlaces]);

  const handleSave = (event) => {
    if (event.key === "Enter") {
      let currentHistory = transactionHistory;
      currentHistory.length === 5 && currentHistory.pop();
      currentHistory.unshift({
        fx: fxRate,
        override: override,
        intial:
          event.target.name === "USD"
            ? inputValue.USD + " $"
            : inputValue.EUR + " €",
        Converted:
          event.target.name === "USD"
            ? inputValue.EUR + " €"
            : inputValue.USD + " $",
      });
      setTransactionHistory([...currentHistory]);
    }
  };

  return (
    <div
      className="container mt-5"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className="card"
        style={{
          width: "50rem",
          minHeight: "430px",
          position: "relative",
        }}
      >
        <div
          className="card-body"
          style={{
            position: "absolute",
            width: "100%",
            top: "5%",
          }}
        >
          <div className="row">
            {override ? (
              <div
                className="col-12"
                style={{ width: "50%", marginBottom: "10px" }}
              >
                <span style={{ float: "left", marginRight: "7px" }}>
                  FX Rate:
                </span>
                <Input
                  style={{ width: "70%", marginTop: "-4px" }}
                  value={fxRate}
                  name="fxRate"
                  onChange={(value) => {
                    setFxRate(value);
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-circle"
                  viewBox="0 0 16 16"
                  style={{
                    float: "right",
                    marginTop: "-28px",
                    marginRight: "20px",
                    cursor: "pointer",
                    color: "red",
                  }}
                  onClick={() => {
                    setFxRate(1.1);
                    setIntervals(1.1);
                    setOverride(false);
                  }}
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </div>
            ) : (
              <div style={{ width: "17%" }}>
                <span>FX Rate: {fxRate}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil"
                  viewBox="0 0 16 16"
                  style={{
                    float: "right",
                    marginTop: "3px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setOverride(true);
                  }}
                >
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-5">
              <InputGroup
                name={switchPlaces ? "USD" : "EUR"}
                onKeyDown={handleSave}
                onChange={onInputChange}
                value={switchPlaces ? inputValue.USD : inputValue.EUR}
                currency={switchPlaces ? "$" : "€"}
                placeholder={`Enter ${switchPlaces ? "USD" : "EUR"} here`}
              />
              <p>{switchPlaces ? "USD" : "EUR"}</p>
            </div>

            <div className="col-2">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSwitchPlaces(!switchPlaces);
                }}
              >
                <img src={SwitchImg} alt="switch-icon" />
              </div>
            </div>

            <div className="col-5">
              <InputGroup
                name={switchPlaces ? "EUR" : "USD"}
                onChange={onInputChange}
                value={switchPlaces ? inputValue.EUR : inputValue.USD}
                currency={switchPlaces ? "€" : "$"}
                placeholder={`Enter ${switchPlaces ? "EUR" : "USD"} here`}
                onKeyDown={handleSave}
              />
              <p>{switchPlaces ? "EUR" : "USD"}</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Table data={transactionHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
