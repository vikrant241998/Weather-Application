console.log("Jai Shree Ganesh");

const wrapper = document.querySelector(".wrapper"),
  inputPart = wrapper.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-text"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  wIcon = document.querySelector(".weather-part img"),
  arrowBack = wrapper.querySelector("header i");

let api;
let apikey;

inputField.addEventListener("keyup", e => {
  // if user press enter btn and input value is not empty.
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});


locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){  // if browser support geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else{
        alert("Your browser not support geolocation api");
    }
});

function onSuccess(position){
    apikey = '83106b8634706fe47730c21b3dedef38';
    const {latitude, longitude} = position.coords;  //getting lat and lon of the user device from coords obj
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`;
    fetchData();
}

 function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}   

function requestApi(city) {
     apikey = '83106b8634706fe47730c21b3dedef38'; 
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    fetchData();
}

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    // getting api response and returning it with parsing into js obj and in another.
    // then function calling weatherDetails function with passing api result as an argument.
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }
    else{
        // let's get required properties value from the info object
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;


        // Using custom icon according to the id which api return us
        if(id == 800){
            console.log("image1");
            wIcon.src="./Icons/clear.svg";
        }
        else if(id >= 200 && id <= 232){
            console.log("image2");
            wIcon.src="./Icons/strom.svg";
        }

        else if(id >= 600 && id <= 622){
            console.log("image3");
            wIcon.src="./Icons/snow.svg";
        }

        else if(id >= 701 && id <= 781){
            console.log("image4");
            wIcon.src="./Icons/haze.svg";
        }

        else if(id >= 801 && id <= 804){
            console.log("image5");
            wIcon.src="./Icons/cloud.svg";
        }

        else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
            console.log("image6");
            wIcon.src="./Icons/rain.svg";
        }


        // let's pass these values to a particular html element
        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;


        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        // console.log(info);
    }
}

arrowBack.addEventListener("click", ()=>{
  wrapper.classList.remove("active");
})