function updateClock() {
  const now = new Date();
  const clockTitle = document.getElementById("time");
  let hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  let fixedhour = hour;
  let fixedminute = minute;
  let fixedsecond = second;
  if (hour < 10) {
    fixedhour = "0" + hour;
  }
  if (minute < 10) {
    fixedminute = "0" + minute;
  }
  if (second < 10) {
    fixedsecond = "0" + second;
  }
  clockTitle.innerText = `${fixedhour}:${fixedminute}:${fixedsecond}`;

  const container = document.querySelector(".container"); // Selecting the container element

  if (hour >= 6 && hour < 12) {
    container.style.backgroundColor = "#aa7cff"; // Morning
  } else if (hour >= 12 && hour < 18) {
    container.style.backgroundColor = "#9257ff"; // Afternoon
  } else if (hour >= 18 && hour < 20) {
    container.style.backgroundColor = " #7930ff"; // Evening
  } else {
    container.style.backgroundColor = "#5c05ff"; // Night
  }
}

function Onlogin(event) {
  event.preventDefault();
  console.log("Onlogin function called");
  const username = document.getElementById("username").value;

  // Simple login validation
  if (username) {
    const loginForm = document.getElementById("loginForm"); // Define loginForm here
    loginForm.classList.add("hidden");
    localStorage.setItem("username", username);
    paintGreeting(username);
  }
}

function paintGreeting(username) {
  const greeting = document.getElementById("greeting");
  greeting.innerText = `Hello ${username}`;
  greeting.classList.remove("hidden");
}

function deleteMother(event) {
  const li = event.target.parentElement;
  li.remove();
  updateLocalStorage();
}

function updateLocalStorage() {
  const taskList = document.getElementById("todolist");
  const tasks = [];
  taskList.querySelectorAll("li").forEach(function (li) {
    tasks.push(li.querySelector("span").innerText);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(event) {
  event.preventDefault();
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();

  if (task) {
    const taskList = document.getElementById("todolist");
    const li = document.createElement("li");
    const words = document.createElement("span");
    const butt = document.createElement("button");
    butt.innerText = "X";
    butt.addEventListener("click", deleteMother);
    words.innerText = task;
    li.appendChild(words);
    li.appendChild(butt);
    taskList.appendChild(li);
    taskInput.value = "";

    // Save task to local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const taskList = document.getElementById("todolist");
    const li = document.createElement("li");
    const words = document.createElement("span");
    const butt = document.createElement("button");
    butt.innerText = "X";
    butt.addEventListener("click", deleteMother);
    words.innerText = task;
    li.appendChild(words);
    li.appendChild(butt);
    taskList.appendChild(li);
  });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeather);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showWeather(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const API_KEY = "f304ebb4c376b3994bdd277bb9b03942"; // Assuming this is a valid API key
  const griddata = document.getElementById("locationData1");
  griddata.textContent = latitude + ", " + longitude;
  const mapurl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    API_KEY;

  fetch(mapurl)
    .then((response) => response.json())
    .then((data) => {
      const city = document.getElementById("locationData2");
      const weather = document.getElementById("weatherData");
      city.innerText = data.name;
      weather.innerText = data.weather[0].main;
    });
}

getLocation();
loadTasks();
setInterval(updateClock, 1000);
const savedUser = localStorage.getItem("username");
const loginForm = document.getElementById("loginForm");
const listForm = document.getElementById("todoform");
loginForm.addEventListener("submit", Onlogin);
listForm.addEventListener("submit", addTask);
if (savedUser == null) {
  loginForm.classList.remove("hidden");
} else {
  paintGreeting(savedUser);
}
