const CLASS_API =
"https://script.google.com/macros/s/CLASS_API_ID/exec";

async function loadClasses() {

const response = await fetch(CLASS_API);
const classes = await response.json();

const container = document.getElementById("classList");
container.innerHTML = "";

classes.forEach(cls => {

const date = new Date(cls.date).toLocaleDateString("en-GB");

const card = document.createElement("div");
card.className = "class-card";

card.innerHTML = `
<h3>${cls.name}</h3>

<p><b>Date:</b> ${date}</p>

<p><b>Time:</b> ${cls.time}</p>

<p>${cls.description}</p>

<p><b>Price:</b> ${cls.price} THB</p>

<button onclick="goBooking('${cls.classID}')">
Book Now
</button>
`;

container.appendChild(card);

});

}

function goBooking(classID){

window.location.href =
"booking.html?classID=" + classID;

}

window.onload = loadClasses;
