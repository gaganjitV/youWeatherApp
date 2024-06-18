var userFormEl = document.querySelector('#city-search-form');
var cityInputEl = document.querySelector('#cityName');
var todayContainerEl = document.getElementById('.today-container');
var citySearchTerm = document.querySelector('#current-city');
var timeToday = document.querySelector('#current-date');
var tempToday = document.querySelector('#current-temp');
var windToday = document.querySelector('#current-wind');
var humidityToday = document.querySelector('#current-humidity');
var presetCityButtons = document.querySelector('#preset-cities');

// 1st Forecast Card
var cardDateOne = document.querySelector('.forecast-date-one');
var tempOneDay = document.querySelector('.temp-one');
var windOneDay = document.querySelector('.wind-one');
var humidityOneDay = document.querySelector('.humidity-one');

//2nd Day Forecast

var cardDateTwo = document.querySelector('.forecast-date-two');
var tempTwoDay = document.querySelector('.temp-two');
var windTwoDay = document.querySelector('.wind-two');
var humidityTwoDay = document.querySelector('.humidity-two');

//3rd Day Forecast

var cardDateThree = document.querySelector('.forecast-date-three');
var tempThreeDay = document.querySelector('.temp-three');
var windThreeDay = document.querySelector('.wind-three');
var humidityThreeDay = document.querySelector('.humidity-three');

//4th Day Forecast
var cardDateFour = document.querySelector('.forecast-date-four');
var tempFourDay = document.querySelector('.temp-four');
var windFourDay = document.querySelector('.wind-four');
var humidityFourDay = document.querySelector('.humidity-four');

//5th Day Forecast
var cardDateFive = document.querySelector('.forecast-date-five');
var tempFiveDay = document.querySelector('.temp-five');
var windFiveDay = document.querySelector('.wind-five');
var humidityFiveDay = document.querySelector('.humidity-five');

// Click buttons as denoted by city label
var buttonAtlanta = document.querySelector('.buttonAtlanta');
var buttonDenver = document.querySelector('.buttonDenver');
var buttonSeattle = document.querySelector('.buttonSeattle');
var buttonSF = document.querySelector('.buttonSF');
var buttonOrlando = document.querySelector('.buttonOrlando');
var buttonNY = document.querySelector('.buttonNY');
var buttonChicago = document.querySelector('.buttonChicago');
var buttonAustin = document.querySelector('.buttonAustin');

// Text field variable for user input + initial input by deafult when opening page
citySearchTerm.textContent = " ";

// Displaying dates from present time
function displayTime() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  // Create a string in the format "MM/DD/YYYY"
  var formattedDate = `${month}/${day}/${year}`;
  var oneDayOut = `${month}/${day + 1}/${year}`;
  var twoDaysOut = `${month}/${day + 2}/${year}`;
  var threeDaysOut = `${month}/${day + 3}/${year}`;
  var fourDaysOut = `${month}/${day + 4}/${year}`;
  var fiveDaysOut = `${month}/${day + 5}/${year}`;

  // Display the formatted date on console testing
  //console.log(formattedDate);

  timeToday.textContent = "(" + formattedDate + ")";
  cardDateOne.textContent = oneDayOut
  cardDateTwo.textContent = twoDaysOut
  cardDateThree.textContent = threeDaysOut
  cardDateFour.textContent = fourDaysOut
  cardDateFive.textContent = fiveDaysOut
}

// Function for form submission
function formSubmitHandler(event) {
  event.preventDefault();
  var cityName = cityInputEl.value;

  if (!cityName) {
    alert('Please enter a valid city');
  } else {
    getWeatherData();
  }
}

// function that contains two fetch commands to first retrieve longitude and latitude
// then second fetch utilize data to retrieve additional weather info
function getWeatherData (cityName) {

  var cityName = cityInputEl.value;
  var apiUrl1 = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&APPID=efd27a81601aecf8450cd1c62fee7b55';

  fetch(apiUrl1).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          console.log(cityName);
        
          var latitude = data.coord.lat
          var longitude = data.coord.lon

          var apiUrl2 = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=efd27a81601aecf8450cd1c62fee7b55&units=imperial';

          fetch(apiUrl2).then(function (response2) {
            if (response2.ok) {
              response2.json().then(function (data2) {
                //console.log(data2);
                //console.log(data2.list[2].main.temp);

                citySearchTerm.textContent = cityName + " ";
                tempToday.textContent = " " + data2.list[0].main.temp + " ℉";
                windToday.textContent = " " + data2.list[0].wind.speed + " MPH";
                humidityToday.textContent = " " + data2.list[0].main.humidity + " %";

                tempOneDay.textContent = " " + data2.list[8].main.temp + " ℉";
                tempTwoDay.textContent = " " + data2.list[16].main.temp + " ℉";
                tempThreeDay.textContent = " " + data2.list[24].main.temp + " ℉";
                tempFourDay.textContent = " " + data2.list[32].main.temp + " ℉";
                tempFiveDay.textContent = " " + data2.list[39].main.temp + " ℉";

                windOneDay.textContent = " " + data2.list[8].wind.speed + " MPH";
                windTwoDay.textContent = " " + data2.list[16].wind.speed + " MPH";
                windThreeDay.textContent = " " + data2.list[24].wind.speed + " MPH";
                windFourDay.textContent = " " + data2.list[32].wind.speed + " MPH";
                windFiveDay.textContent = " " + data2.list[39].wind.speed + " MPH";

                humidityOneDay.textContent = " " + data2.list[8].main.humidity + " %";
                humidityTwoDay.textContent = " " + data2.list[16].main.humidity + " %";
                humidityThreeDay.textContent = " " + data2.list[24].main.humidity + " %";
                humidityFourDay.textContent = " " + data2.list[32].main.humidity + " %";
                humidityFiveDay.textContent = " " + data2.list[39].main.humidity + " %";

        
                //the icons
                document.getElementById('weather-forecast-today').innerHTML = `<img src='https://openweathermap.org/img/wn/${data2.list[0].weather[0].icon}@2x.png' />`
                document.getElementById('weather-forecast-one-day').innerHTML = `<img src='https://openweathermap.org/img/wn/${data2.list[8].weather[0].icon}@2x.png' />`
                document.getElementById('weather-forecast-two-day').innerHTML = `<img src='https://openweathermap.org/img/wn/${data2.list[16].weather[0].icon}@2x.png' />`
                document.getElementById('weather-forecast-three-day').innerHTML = `<img src='https://openweathermap.org/img/wn/${data2.list[24].weather[0].icon}@2x.png' />`
                document.getElementById('weather-forecast-four-day').innerHTML = `<img src='https://openweathermap.org/img/wn/${data2.list[32].weather[0].icon}@2x.png' />`
                document.getElementById('weather-forecast-five-day').innerHTML = `<img src='https://openweathermap.org/img/wn/${data2.list[39].weather[0].icon}@2x.png' />` 
        

              });
            } 
          })
        });
      } 

   createNewSearchedButton(cityName);
   cityInputEl.value = "";

  })
}

// function for city buttons that have a preconfigured city per button
function presetButtonClickHandler (event) {
  var presetCityName = event.target.getAttribute('value');
  //console.log(presetCityName);
  cityInputEl.value = presetCityName;
  getWeatherData(presetCityName);
}

function createNewSearchedButton (cityName) {
  
  alreadyMadePresets = ['Atlanta', 'Denver', 'Seattle', 'San Francisco', 'Orlando', 'New York', 'Chicago', 'Austin'];

  var newButton = document.createElement('button');
  newButton.classList = 'btn';
  newButton.setAttribute('value', cityName);

  var buttonTitle = document.createElement('span');
  buttonTitle.textContent = cityName;

  newButton.appendChild(buttonTitle);
  presetCityButtons.appendChild(newButton);

  saveDataToStorage(cityName);
}

function readSavedDataFromStorage () {
  var searchHistory = localStorage.getItem('search');
  if (searchHistory) {
    searchHistory = JSON.parse(searchHistory);
  } else {
    searchHistory = [];
  }

  //createNewSearchedButton(searchHistory); 
};

function saveDataToStorage (searchHistory) {
  localStorage.setItem('search', JSON.stringify(searchHistory));
} 

// Calling functions to both display dates and allow for submit feature
displayTime();
userFormEl.addEventListener('submit', formSubmitHandler);

// call function to read data from local storage 
readSavedDataFromStorage();

// preset buttons
presetCityButtons.addEventListener('click', presetButtonClickHandler);