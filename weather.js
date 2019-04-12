const COORDS = 'coords';
const API_KEY = "cd0671f258db977fabe950b24001503c";

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

    }
}





function init(){
    loadcoords();
}

init();