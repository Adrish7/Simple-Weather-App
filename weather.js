const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "";

weatherForm.addEventListener("submit",async event => {
  // forms have a default behaviour to reload the page when a submit button is clicked, the following line prevents that
    event.preventDefault();
    const city = cityInput.value;
    if(city){
      try{
        const weatherData = await getWeatherData(city);
        displayWeatherInfo(weatherData);

      }
      catch(error){
        console.error(error);
        displayError(error);
      }
    }
    else{
          displayError("Please enter a city");
    }


  });

async function getWeatherData(city){
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiURL);
  if (!response.ok){
    throw new Error(`Could not fetch the weather data, please check if you enetered a valid city`);
  }
  console.log(response);

  return await response.json();

}

function displayWeatherInfo(data){
  const { name:city,
          main: {temp,humidity}, 
          weather: [{description,id}]} = data; // accessing the name property and creating a variable of city 

  card.textContent = "";
  card.style.display = "flex";
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descriptionDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  cityDisplay.classList.add("cityDisplay")
  
  tempDisplay.textContent = `${(temp - 273.15).toFixed(2)}°C`;
  tempDisplay.classList.add("tempDisplay");

  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  humidityDisplay.classList.add("humidityDisplay");

  descriptionDisplay.textContent = description;
  descriptionDisplay.classList.add("descriptionDisplay");

  weatherEmoji.textContent = getWeatherEmoji(id);
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descriptionDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
  const backgroundElement = document.querySelector('.background');
  switch(true){
    case weatherId >= 200 && weatherId < 300:
      backgroundElement.style.backgroundImage = `url('https://media1.tenor.com/m/wLZThZh-g7UAAAAC/dark-and-stormy-seagrass-and-the-ecosystem.gif')`;
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      backgroundElement.style.backgroundImage = `url('https://cdn.pixabay.com/animation/2023/06/25/21/55/21-55-38-961_512.gif')`;
      return "🌧️";
    case weatherId >= 500 && weatherId < 600:
      backgroundElement.style.backgroundImage = `url('https://i.pinimg.com/originals/c8/d3/69/c8d3699d09824df0f4e17c8f923ca9db.gif')`;
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      backgroundElement.style.backgroundImage = `url('https://64.media.tumblr.com/3f455e9d33c9f74c2dc8e15a795a3838/tumblr_p1oy9udhcU1viuar9o1_1280.gif')`;
      return "🌨️";
    case weatherId >= 700 && weatherId < 800:
      backgroundElement.style.backgroundImage = `url('https://cdn5.vectorstock.com/i/1000x1000/27/44/fog-background-vector-12302744.jpg')`;
      return "🌫️";
    case weatherId === 800:
      backgroundElement.style.backgroundImage = `url('https://c4.wallpaperflare.com/wallpaper/890/861/265/a-good-day-wallpaper-preview.jpg')`;
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      backgroundElement.style.backgroundImage = `url('https://media1.tenor.com/m/kgxDTe0aCQ0AAAAd/clouds.gif')`;
      return "☁️";
    default:
      return "❓";  // default to question mark emoji
  }

}

function displayError(message){
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);

}
