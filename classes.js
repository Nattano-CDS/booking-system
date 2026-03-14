// =============================
// API CONFIG
// =============================

const API = "https://script.google.com/macros/s/AKfycbxxPZYwtkv12nWdzELpECwXe8NJALhfBi8wop2Ax48fvf8QKEXPgesblNEHK_wBBHaO/exec";

let classesData = [];


// =============================
// FORMAT DATE
// =============================

function formatDate(dateString){

const d = new Date(dateString);

return d.toLocaleDateString("en-GB",{
day:"numeric",
month:"short",
year:"numeric"
});

}


// =============================
// LOAD CLASSES
// =============================

function loadClasses(){

fetch(API)
.then(res => res.json())
.then(data => {

classesData = data;

renderClasses(data);

})
.catch(err => {

console.error("Error loading classes", err);

});

}


// =============================
// RENDER CLASS CARDS
// =============================

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

<button onclick="goBooking('${cls.classID}','${cls.date}','${cls.time}')">
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


// =============================
// DATE FILTER
// =============================

function filterByDate(selectedDate){

if(!selectedDate){

renderClasses(classesData);
return;

}

const filtered = classesData.filter(cls => {

const classDate = new Date(cls.date);

const y = classDate.getFullYear();
const m = String(classDate.getMonth()+1).padStart(2,'0');
const d = String(classDate.getDate()).padStart(2,'0');

const formatted = `${y}-${m}-${d}`;

return formatted === selectedDate;

});

renderClasses(filtered);

}


// =============================
// REDIRECT TO BOOKING PAGE
// =============================

function goBooking(id,date,time){

const url = `booking.html?classid=${id}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`;

window.location.href = url;

}


// =============================
// INITIAL LOAD
// =============================

document.addEventListener("DOMContentLoaded", () => {

loadClasses();

const dateInput = document.getElementById("dateFilter");

dateInput.addEventListener("change", function(){

filterByDate(this.value);

});

});
