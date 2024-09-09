import React, { useState, useEffect } from "react";

export default function CurrencyConverter({ transactions }) {
  const [exchangeRates, setExchangeRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("PKR");

  useEffect(() => {
    // Fetch exchange rates from an external API
    async function fetchExchangeRates() {
      try {
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/PKR");
        const data = await res.json();

        // Validate that data.rates is an object and sanitize it
        if (data && typeof data.rates === 'object') {
          const validCurrencies = ["USD", "EUR", "GBP", "PKR", "INR", "JPY"]; // List of allowed currencies
          const sanitizedRates = {};
          validCurrencies.forEach((currency) => {
            if (data.rates[currency] && typeof data.rates[currency] === 'number') {
              sanitizedRates[currency] = data.rates[currency];
            }
          });
          setExchangeRates(sanitizedRates);
        } else {
          console.error("Invalid data format from API");
        }
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
      }
    }
    fetchExchangeRates();
  }, []);

  // Convert the amount to the selected currency
  const convertAmount = (amount, currency) => {
    const rate = exchangeRates[currency];
    return rate ? (amount * rate).toFixed(2) : amount;
  };

  return (
    <div>
      <h3>Currency Converter</h3>
      <select
        onChange={(e) => setSelectedCurrency(e.target.value)}
        value={selectedCurrency} // Sorted alphabetically
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
