//Save the objects to work with them
let container = document.querySelector('.container')
let search = document.querySelector('.search-button')
let weatherBox = document.querySelector('.weather-box')
let weatherDetails = document.querySelector('.weather-details')
let error404 = document.querySelector('.not-found')

//Take APIKey and save it
const APIKey = "3dcddb0f8bb8442095071943231005"

const proccesing = () => {
    let city = document.querySelector('.location').value
    const url = `http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no`
    if(city.length > 0) {
        search.addEventListener("click", () => {
            error404.classList.remove("show")
            weatherBox.classList.remove("show")
            weatherDetails.classList.remove("show")

            let xhr = new XMLHttpRequest()
            xhr.open("GET", url)
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.send()
            xhr.onload = () => {
                let weather = xhr.response
                console.log(weather)
                weather = JSON.parse(weather)
                console.log(weather)

                if (!weather.hasOwnProperty("current")) {
                    error404.classList.add("show")
                    weatherBox.classList.remove("show")
                    weatherDetails.classList.remove("show")
                    return 
                } else {
                    error404.classList.remove("show")
                }

                weatherBox.classList.add("show")
                weatherDetails.classList.add("show")

                const image = document.querySelector('.weather-img')
                const temperature = document.querySelector('.temperature')
                const humidity = document.querySelector('.humidity-text')
                const wind = document.querySelector('.wind-text')
                  
                const weatherCondition = weather.current.condition.text
                switch (weatherCondition) {
                    case 'Sunny':
                        image.src = './img/clear.png'
                      break
                    case 'Patchy rain possible':
                        image.src = './img/rain.png'
                      break
                    case 'Snow':
                        image.src = './img/snow.png'
                      break
                    case 'Partly cloudy':
                        image.src = './img/cloud.png'
                      break
                    case 'Haze':
                      image.src = './img/mist.png'
                      break
                    default:
                      image.src = "./img/mist.png"
                  }
                      temperature.innerHTML = `Temperature: ${weather.current.temp_c}°C`
                      humidity.innerHTML = `Humidity: <br> ${weather.current.humidity}%` 
                      wind.innerHTML = `Wind: <br> ${weather.current.wind_kph}km/h`
            }
        })
    }
}

document.querySelector('.location').addEventListener("change", proccesing)