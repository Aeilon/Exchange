import React, { useState, useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const Exchange = () => {
  const [amount, setAmount] = useState();
  const [outcome, setOutcome] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [chosenCurrency, setChosenCurrency] = useState("PLN");
  const [receivedCurrency, setReceivedCurrency] = useState("USD");
  const [data, setData] = useState({});

  useEffect(() => {
    getValues();
  }, [chosenCurrency]);
  const getValues = async () => {
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${chosenCurrency}`
      );
      const data = await response.json();
      let keys = Object.keys(data.rates);
      setData(data.rates);
      setCurrencies(keys);
    } catch (error) {
      console.error(error);
    }
  };

  const getConvertedCurrency = e => {
    e.preventDefault();
    const value = amount * data[receivedCurrency];
    const result = value.toFixed(2);
    setOutcome(`${amount} ${chosenCurrency} = ${result} ${receivedCurrency}`);

  };

  const updateInput = e => {
    if (!isNaN(e.target.value)){
    setAmount(parseInt(e.target.value));
    }
  };
  const updateSelect1 = e => {
    setChosenCurrency(e.target.value);
  };
  const updateSelect2 = e => {
    setReceivedCurrency(e.target.value);
  };
  const reverseCurrency = () => {
    setChosenCurrency(receivedCurrency);
    setReceivedCurrency(chosenCurrency);
  };

  const paperStyle = {
    backgroundColor: "#f0ebf7",
    height: "20vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  return (
    <div>
      <Paper style={paperStyle} elevation={3} variant="outlined">
        
          <Select
            color="secondary"
            value={chosenCurrency}
            onChange={updateSelect1}
            data-testid="select1"
          >
            {currencies.map(currency => {
              if (currency !== receivedCurrency) {
                return (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                );
              }
            })}
          </Select>

          <TextField
            color="secondary"
            placeholder="Amount"
            data-testid="amount-input"
            onChange={updateInput}
            value={amount}
          />

          <Select
            onChange={updateSelect2}
            color="secondary"
            value={receivedCurrency}
            data-testid="select2"
          >
            {currencies.map(currency => {
              if (currency !== chosenCurrency) {
                return (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                );
              }
            })}
          </Select>

          <Button
            type="submit"
            data-testid="button"
            variant="contained"
            color="primary"
            data-testid="button"
            onClick={getConvertedCurrency}
          >
            Convert
          </Button>

          <Button
            type="button"
            onClick={reverseCurrency}
            variant="contained"
            color="secondary"
          >
            Reverse
          </Button>
       

        <h1>{outcome}</h1>
      </Paper>
      {/* <table>
        {Object.keys(data).map(currency => (
          <tr>
            <td>{currency}</td>
            <td>{data[currency]}</td>
          </tr>
        ))}
      </table> */}
    </div>
  );
};

export default Exchange;
