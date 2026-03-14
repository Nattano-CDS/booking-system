const CLASS_API = "YOUR_CLASS_API_URL";

const datePicker = document.getElementById("classDate");

datePicker.addEventListener("change", loadClasses);

async function loadClasses(){

const selectedDate = datePicker.value;

const container = document.getElementById("classList");

container.innerHTML = "Loading classes...";

try{

const response = await fetch(CLASS_API);
const classes = await response.json();

container.innerHTML = "";

const filtered = classes.filter(cls => {

const classDate =
new Date(cls.date).toISOString().split("T")[0];

return classDate === selectedDate;

});

if(filtered.length === 0){

container.innerHTML = "No classes available.";

return;

}

filtered.forEach(cls => {

const card = document.createElement("div");
card.className = "class-card";

card.innerHTML = `

<h3>${cls.name}</h3>

<p><b>Time:</b> ${cls.time}</p>

<p>${cls.description}</p>

<p class="price">${cls.price} THB</p>

<button onclick="goBooking('${cls.classID}','${selectedDate}','${cls.time}')">
Book Now
</button>

`;

container.appendChild(card);

});

}catch(err){

console.error(err);

container.innerHTML = "Failed to load classes.";

}

}

function goBooking(classID,date,time){

window.location.href =
`booking.html?classID=${classID}&date=${date}&time=${encodeURIComponent(time)}`;

}
