const API = "https://script.google.com/macros/s/AKfycbxxPZYwtkv12nWdzELpECwXe8NJALhfBi8wop2Ax48fvf8QKEXPgesblNEHK_wBBHaO/exec";

let classesData = [];

/* =========================
DATE FORMAT
========================= */

function formatDate(dateString){

const d = new Date(dateString);

return d.toLocaleDateString("en-GB",{
day:"numeric",
month:"short",
year:"numeric"
});

}

/* =========================
LOAD CLASSES
========================= */

function loadClasses(){

fetch(API)
.then(res => res.json())
.then(data => {

classesData = data;

renderClasses(data);

})
.catch(err => {

console.error(err);

});

}

/* =========================
RENDER CLASSES
========================= */

function renderClasses(data){

const container = document.getElementById("classList");

container.innerHTML = "";

if(data.length === 0){

container.innerHTML = "<p>No classes available.</p>";
return;

}

data.forEach(cls => {

const card = document.createElement("div");
card.className = "class-card";

card.innerHTML = `

<div class="class-header">

<div class="class-title">
${cls.name}
</div>

<div class="class-date">
📅 ${formatDate(cls.date)} | ⏰ ${cls.time}
</div>

</div>

<div class="class-detail">

<p class="class-desc">
${cls.description}
</p>

<p class="price">
💰 ${cls.price} THB
</p>

<button onclick="book('${cls.id}','${cls.date}','${cls.time}')">
Book Now
</button>

</div>

`;

card.querySelector(".class-header").onclick = () => {

const detail = card.querySelector(".class-detail");

detail.style.display =
detail.style.display === "block"
? "none"
: "block";

};

container.appendChild(card);

});

}

/* =========================
DATE FILTER
========================= */

document.addEventListener("DOMContentLoaded", () => {

loadClasses();

document.getElementById("dateFilter").addEventListener("change", function(){

const selectedDate = this.value;

if(!selectedDate){

renderClasses(classesData);
return;

}

const filtered = classesData.filter(cls => {

const d = new Date(cls.date).toISOString().split("T")[0];

return d === selectedDate;

});

renderClasses(filtered);

});

});

/* =========================
BOOKING
========================= */

function book(id,date,time){

const name = prompt("Enter your name");
if(!name) return;

const email = prompt("Enter your email");
if(!email) return;

const phone = prompt("Enter your phone number") || "";

const adult = prompt("Number of adults") || 0;
const child = prompt("Number of children") || 0;

const total = Number(adult) + Number(child);

fetch(API,{
method:"POST",
body:JSON.stringify({

classid:id,
date:date,
time:time,
name:name,
email:email,
phone:phone,
adult:adult,
child:child,
totalpax:total

})
})
.then(res => res.text())
.then(() => {

alert("Booking submitted successfully!");

})
.catch(err => {

alert("Booking failed");

});

}
