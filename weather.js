const apikey = "f74bd5cd57eb097b2ad574178fcc5ed8";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");
const vide = document.querySelector(".vid");
const bg1 = document.querySelector(".bg1");
const time = new Date();
const hour = time.getHours();
if (hour >= 6 && hour < 8) {
    bg1.src = "media/sunrise.jpg";
}
else if (hour >= 8 && hour < 17) {
    bg1.src = "media/clearsky.jpg";
}
else if (hour >= 17 && hour < 19) {
    bg1.src = "media/sunset.jpg";
}
else if (hour >= 19 || hour < 6) {
    bg1.src = "media/nightsky.jpg";
    document.querySelector(".card").style.border = "1px solid #fff";
}

async function checkweather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
        var data = await response.json();


        const weathericon = document.querySelector(".weather-icon");
        const vide = document.querySelector(".vid");
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";


        if (Math.round(data.main.temp) <= 0) {
            vide.src = "media/snow.mp4"; 
        } else if (Math.round(data.main.temp) <= 10) {
            vide.src = "media/snow.mp4"; 
        } else if (Math.round(data.main.temp) <= 20) {
            vide.src = "media/fog.mp4"; 
        }

        if (data.weather[0].main == "Clouds") {

            if (hour >= 19) {

                vide.src = "media/nightclouds.mp4";
                weathericon.src = "media/moonc.png";
            }
            else {
                weathericon.src = "media/clouds.png";
                vide.src = "media/clouds 4k.mp4";

                document.querySelector(".card").style.border = "1px solid #8f9199";
            }
        }
        else if (data.weather[0].main == "Clear") {
            if (hour >= 19) {
                vide.src = "media/nightsky.mp4";
                weathericon.src = "media/moon.png";
            }
            else {
                weathericon.src = "media/clear.png";
                vide.src = "media/clearsky.mp4";
                document.querySelector(".card").style.border = "1px solid #8f9199";
            }

        }
        else if (data.weather[0].main == "Rain") {
            if (hour >= 19) {
                vide.src = "media/nightrain.mp4";
                weathericon.src = "media/night-rain.png";
            }
            else {
                weathericon.src = "media/rain.png";
                vide.src = "media/rain.mp4";
                document.querySelector(".card").style.border = "1px solid #8f9199";
            }
        }
        else if (data.weather[0].main == "Drizzle") {
            if (hour >= 19) {
                vide.src = "media/nightdrizzle.mp4";
                weathericon.src = "media/night-rain.png";
            }
            else {
                weathericon.src = "media/drizzle.png";
                vide.src = "media/drizzle.mp4";
                document.querySelector(".card").style.border = "1px solid #8f9199";
            }
        }
        else if (data.weather[0].main == "Mist") {
            if (hour >= 19) {
                vide.src = "media/nightmiat.mp4";
                weathericon.src = "media/fog.png";
            }
            else {
                weathericon.src = "media/mist.png";
                document.querySelector(".card").style.border = "1px solid #8f9199";
                vide.src = "media/mist.mp4";
            }

        }
        else if (data.weather[0].main == "Snow") {
            if (hour >= 19) {
                vide.src = "media/nightsnow.mp4";
                weathericon.src = "media/night-snow.png";
            }
            else {
                weathericon.src = "media/snow.png";
                vide.src = "media/snow.mp4"
                document.querySelector(".card").style.border = "1px solid #8f9199";
            }
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

}
searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
    document.querySelector(".bg img").style.display = "none";
    document.querySelector("video").style.display = "block";

    // animation

    document.querySelector("video").style.visibility = "visible";
    document.querySelector("video").style.opacity = "1";
    document.querySelector("video").style.transition = "opacity 4s, visibility 4s";


})