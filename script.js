const form = document.getElementById("converterForm");
const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertedAmount = document.getElementById("convertedAmount");
const loading = document.querySelector(".loading");
const result = document.querySelector(".result");
const error = document.querySelector(".error");

const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

async function convertCurrency() {
    loading.style.display = 'block';
    result.style.display = 'none';
    error.style.display = 'none';

    try {
        const response = await fetch(`${API_URL}${fromCurrency.value}`);
        const data = await response.json();

        const rate = data.rates[toCurrency.value];
        const convertedValue = (amount.value * rate).toFixed(2);

        convertedAmount.value = convertedValue
        result.style.display = 'block';
        error.style.display = 'none';

        result.innerHTML = `
            <div style="font-size: 1.4rem">
            ${amount.value} ${fromCurrency.value} = ${convertedAmount.value} ${toCurrency.value}
            <div style="font-size:0.9rem; margin-top: 5px; color: #ffcca4;">
                Taxa: 1 ${fromCurrency.value} = ${rate.toFixed(4)} ${toCurrency.value}
            </div>
            </div>
        `


    } catch (err) {
        error.style.display = 'block';
        error.innerText = 'Ocorreu um erro ao converter a moeda. Por favor, tente novamente.';
        alert('Ocorreu um erro ao converter a moeda. Por favor, tente novamente.');
    }

    loading.style.display = 'none';

}


form.addEventListener('submit', function (event) {
    event.preventDefault();
    convertCurrency();
});