// Currency Converter with live exchange rates
// Uses exchangerate-api.com (free tier, demo key)

async function convertCurrency() {
   const amount = parseFloat(document.getElementById('amount').value);
   const from = document.getElementById('fromCurrency').value;
   const to = document.getElementById('toCurrency').value;
   const resultDiv = document.getElementById('currencyResult');
   if (isNaN(amount)) {
      resultDiv.innerText = 'Please enter a valid amount.';
      return;
   }
   resultDiv.innerText = 'Fetching exchange rate...';
   try {
      // You can get a free API key at https://www.exchangerate-api.com/
      const apiKey = 'https://open.er-api.com/v6/latest/' + from;
      const response = await fetch(apiKey);
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      const rate = data.rates[to];
      if (!rate) {
         resultDiv.innerText = 'Currency not supported.';
         return;
      }
      const converted = amount * rate;
      resultDiv.innerText = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
   } catch (err) {
      resultDiv.innerText = 'Error fetching exchange rate.';
   }
}
