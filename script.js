// ==============================
// CONFIG
// ==============================

const API = "https://script.google.com/macros/s/AKfycbzkoUpLUDR03lJnx6Bxunnd3AFJP7CXLpHtiYnA763w1mS019JZE_yutidiISJpSEdp/exec";


// ==============================
// DATE FORMATTER
// ==============================

function formatDate(dateString){

const d = new Date(dateString);

return d.toLocaleDateString("en-GB",{
day:"numeric",
month:"short",
year:"numeric"
});

}


// ==============================
// LOAD CLASSES FROM API
// ==============================

function loadClasses(){

fetch(API)
.then(res => res.json())
.then(data => {

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
${formatDate(cls.date)} | ${cls.time}
</div>

</div>

<div class="class-detail">

<p class="class-desc">
${cls.description}
</p>

<p class="price">
Price: ${cls.price} THB
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

})
.catch(err => {

console.error("Error loading classes", err);

document.getElementById("classList").innerHTML =
"<p>Unable to load classes.</p>";

});

}


// ==============================
// BOOKING FUNCTION
// ==============================

function book(id,date,time){

const name = prompt("Enter your name");
if(!name) return;

const email = prompt("Enter your email");
if(!email) return;

const phone = prompt("Enter your phone number") || "";

const adult = prompt("Number of adults") || 0;

const child = prompt("Number of children") || 0;

const total = Number(adult) + Number(child);

if(total === 0){

alert("Please enter number of participants");
return;

}

const bookingData = {

classid:id,
date:date,
time:time,
name:name,
email:email,
phone:phone,
adult:adult,
child:child,
totalpax:total

};

fetch(API,{
method:"POST",
body:JSON.stringify(bookingData)
})
.then(res => res.text())
.then(response => {

alert("✅ Booking submitted successfully!");

})
.catch(err => {

console.error(err);

alert("❌ Booking failed");

});

}


// ==============================
// INITIAL LOAD
// ==============================

document.addEventListener("DOMContentLoaded", loadClasses);
