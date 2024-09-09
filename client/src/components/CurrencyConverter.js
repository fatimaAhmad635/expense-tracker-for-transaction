// src/components/CurrencyConverter.js
import React, { useState, useEffect } from "react";

export default function CurrencyConverter({ transactions }) {
  const [exchangeRates, setExchangeRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("PKR");

  useEffect(() => {
    // Fetch exchange rates from an external API
    async function fetchExchangeRates() {
      const res = await fetch("https://api.exchangerate-api.com/v4/latest/PKR");
      const data = await res.json();
      setExchangeRates(data.rates);
    }
    fetchExchangeRates();
  }, []);

  const convertAmount = (amount, currency) => {
    const rate = exchangeRates[currency];
    return rate ? (amount * rate).toFixed(2) : amount;
  };

  return (
    <div>
      <h3>Currency Converter</h3>
      <select
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value)}
      >
        {Object.keys(exchangeRates).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.name}: {convertAmount(transaction.amount, selectedCurrency)} {selectedCurrency}
          </li>
        ))}
      </ul>
    </div>
  );
}
