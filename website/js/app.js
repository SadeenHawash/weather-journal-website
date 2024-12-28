// Personal API Key for OpenWeatherMap API
const apiKey = "fd047de1a198b61672eb1f5e9b902cfc&units=imperial";

// URL
const url = "http://localhost:3000/";

// Elements
const zipElement = document.getElementById("zip");
const feelingsElement = document.getElementById("feelings");
const dateElement = document.getElementById("date");
const tempElement = document.getElementById("temp");
const contentElement = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", generateBtnClick);

/* Function to GET Web API Data -get zip code information- */
async function getZipCodeData(zipcode) {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apiKey}`
  ).then((response) => response.json());
}

/* Function called by event listener */
function generateBtnClick() {
  let data = {
    zip: zipElement.value,
    feel: feelingsElement.value,
    date: newDate,
  };
  getZipCodeData(data.zip)
    .then((zipInormation) => {
      data.temp = zipInormation.main.temp;
      postData(data);
    })
    .catch((error) => {
      console.error("Error fetching zip code data:", error);
    });
}

/* Function to POST data */
async function postData(data) {
  let response = await fetch(`${url}postData`, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    response.json().then((data) => {
      if (response.ok) {
        updateUI();
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

/* Function to GET Project Data And UPDATE UI */
async function updateUI() {
  const request = await fetch(`${url}all`);
  try {
    const data = await request.json();
    console.log(data);
    tempElement.innerHTML = `Temp: ${data.temp} degrees`;
    contentElement.innerHTML = `Feelings: ${data.feel}`;
    dateElement.innerHTML = `Date: ${data.date}`;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
