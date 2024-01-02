const weatherInput = document.getElementById("weather-input")
const search = document.getElementById("search")
const apiKey = "1f4cfcf5277951aa3d4fb2f17ab833d0"
const acessKey = "MYkoPprOfDNNMz6jcqMlmi12ZQxyLo14fUZl033jiIw"

const weatherDataCity = document.getElementById("weather-data-city")
const temp = document.getElementById("temp")
const weatherDataDescription = document.getElementById("weather-data-description")
const weatherDataDetailsHumidity = document.getElementById("weather-data-details-humidity")
const weatherDataDetailsWind = document.getElementById("weather-data-details-wind")
const weatherDataDescriptionIcon = document.getElementById("weather-data-description-icon")
const weatherDataFlag = document.getElementById("weather-data-flag")
const weatherDataDiv = document.getElementById("weather-data")
const weatherErrorResponse = document.getElementById("weather-error-response")
const loadingDataDiv = document.getElementById("loading-data-div")
const main = document.getElementById("main")

async function getWeatherData(city) {
    try {
        const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`
        const res = await fetch(endPoint)
        const data = await res.json()
        if (res.status === 200) {
            console.log(data)
            return data
        } else {
            console.log("Server Error: " + res)
            return false
        }
    } catch(error) {
        console.log("Fetch Error" + error)
        return false
    }
}

async function renderWeatherData(user_input) {
    weatherErrorResponse.style.display = "none"
    weatherDataDiv.style.display = "none"
    loadingDataDiv.style.display = "flex"
    const weatherData = await getWeatherData(user_input)
    if(weatherData) {
        weatherDataDiv.style.display = 'block'
        weatherErrorResponse.style.display = 'none'
        loadingDataDiv.style.display = 'none'
        weatherDataCity.innerHTML = weatherData.name
        weatherDataDescriptionIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`)
        weatherDataFlag.setAttribute("src", `https://flagsapi.com/${weatherData.sys.country}/flat/32.png`)
        temp.innerHTML = parseInt(weatherData.main.temp)
        weatherDataDescription.innerHTML = weatherData.weather[0].description
        weatherDataDetailsHumidity.innerHTML = `${weatherData.main.humidity}%`
        weatherDataDetailsWind.innerHTML = `${weatherData.wind.speed}Km/h`
        loadBackgroundImage(user_input)
    }   
    else {
        console.log("Algo deu errado!")
        loadingDataDiv.style.display = 'none'
        weatherDataDiv.style.display = 'none'
        weatherErrorResponse.style.display = "block"
    }
}

async function getImageData(city) {
    try {
        const endPoint = `https://api.unsplash.com/search/photos?query=${city}&page=1&per_page=1&client_id=${acessKey}`
        const res = await fetch(endPoint)
        const data = await res.json()
        if (res.status === 200) {
            console.log(data)
            return data
        } else {
            console.log("Server Error: " + data)
            return false
        }
    } catch (error) {
        console.log("Fetch Error: " + error)
        return false
    }
}

async function loadBackgroundImage(city) {
    const imageData = await getImageData(city)
    if (imageData) {
        const image = imageData.results[0].urls.regular
        main.style.backgroundImage = `url("${image}")`
        main.style.backgroundSize = "cover"
        console.log(image)
    } else {
        console.log("algo deu errado em carregar a imagem...")
    }
}

search.addEventListener("click", () => {
    renderWeatherData(weatherInput.value)
})

document.addEventListener("keydown", (evt) => {
    if (evt.key == 'Enter') {
        renderWeatherData(weatherInput.value)
    }
})

//evento default
renderWeatherData("rio de janeiro")
