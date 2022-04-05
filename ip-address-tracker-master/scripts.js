var ipApi = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_ohylAFSa2uQHRbADaRVF9EGOvbwcE';
var searchBtn = document.querySelector('.search-btn');
var input = document.querySelector('.search-input');

function start() {
    getDataByApi(''); //user ip
    setEnterEvent();
    searchBtn.onclick = () => {
        getDataByApi('&ipAddress=' +  input.value);
    }
}

start();

// Function
function initMap(lat,lng) {
    resetMapElement();
    var location = [lat, lng];
    var map = L.map('map').setView(location,16);

    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3'],
        attribution: 'Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. Coded by <a href="https://www.facebook.com/shvqn/">Vũ Quân</a>.'
    });
    googleStreets.addTo(map);
    
    L.marker(location).addTo(map)
}

function getDataByApi(ip) {
    fetch (ipApi + ip)
        .then(res => res.json())
        .then(renderData)
        .catch(errorNoti)
    input.value = "";
}

function renderData(data) {
    input.placeholder = 'Search for any IP address or domain';
    var ipAddress = document.querySelector('.ip-address-value');
    var location = document.querySelector('.location-value');
    var timezone = document.querySelector('.timezone-value');
    var isp = document.querySelector('.isp-value');
    ipAddress.innerHTML = data.ip;
    location.innerHTML = data.location.region + ', ' + data.location.country + ' ' + data.location.postalCode;
    timezone.innerHTML = "UTC " + data.location.timezone;
    isp.innerHTML = data.isp;
    initMap(data.location.lat, data.location.lng);
}

function setEnterEvent() {
    window.onkeydown = (key) => {
        if (key.code === "Enter" || key.code === "NumpadEnter") searchBtn.click();
    }
}

function resetMapElement() {
    if (document.querySelector('#map')) 
        document.querySelector('#map').remove();
    document.querySelector('.map-container').innerHTML = '<div id="map"></div>'
}

function errorNoti() {
    input.placeholder = 'Invalid ip address';
}