var loading = document.querySelector('.lds-ripple');
var id = document.getElementById("id");
var advice = document.querySelector('.advice');
var adviceApi = 'https://api.adviceslip.com/advice';

function start() {
    getAdvice();
    randomAdvice();
}

start();

//function
function getAdvice() {
    fetch(adviceApi)
        .then(response => response.json())
        .then(renderAdvice)
        .catch(showErrorNoti);
}

function renderAdvice(data) {
    id.innerHTML = data.slip.id;
    advice.innerHTML = "\"" + data.slip.advice + "\"";
}

function randomAdvice() {
    var randomBtn = document.querySelector('.random-btn');
    randomBtn.onclick = () => {
        loadingData();
        getAdvice();
        setTimeout(unloadingData,1000);
    }
}

function loadingData() {
    id.parentElement.style.display = "none";
    advice.style.display = "none";
    loading.style.display = "block";
}

function unloadingData() {
    id.parentElement.style.display = "block";
    advice.style.display = "block";
    loading.style.display = "none";
}

function showErrorNoti(error) {
    document.querySelector('.error').classList.add('show');
}