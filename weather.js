const COORDS = 'coords';
const API_KEY = "1729c3164570426fdf23cd0dfb564980";
const weather = document.querySelector(".js-weather");

function getWeather(lat,lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(args){
        return args.json();
    }).then(function(args){
        const temperature = args.main.temp;
        const place = args.name;
        weather.innerText = `${temperature}°C @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj={
        latitude, longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log('Cant access geo location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadcoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if (loadedCords == null){
        askForCoords();
    }
    else{
        const parseCoords = JSON.parse(loadedCords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}





function init(){
    loadcoords();
}

init();