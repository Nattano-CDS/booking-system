const BOOKING_API ="https://script.google.com/macros/s/AKfycbxxPZYwtkv12nWdzELpECwXe8NJALhfBi8wop2Ax48fvf8QKEXPgesblNEHK_wBBHaO/exec";

// =============================
// READ URL PARAMETERS
// =============================

const params = new URLSearchParams(window.location.search);

document.getElementById("classid").value = params.get("classid");
document.getElementById("classdate").value = params.get("date");
document.getElementById("classtime").value = params.get("time");


// =============================
// SUBMIT BOOKING
// =============================

document.getElementById("bookingForm").addEventListener("submit", function(e){

e.preventDefault();

const classid = document.getElementById("classid").value;
const date = document.getElementById("classdate").value;
const time = document.getElementById("classtime").value;

const session = document.getElementById("session").value;

const name = document.getElementById("name").value;
const nationality = document.getElementById("nationality").value;
const email = document.getElementById("email").value;
const phone = document.getElementById("phone").value;

const adult = Number(document.getElementById("adult").value);
const child = Number(document.getElementById("child").value);

const total = adult + child;

if(total === 0){

alert("Please enter participants");
return;

}

fetch(API,{
method:"POST",
body:JSON.stringify({

classid:classid,
date:date,
time:time,

session:session,

name:name,
nationality:nationality,
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

window.location.href="index.html";

})
.catch(err => {

console.error(err);

alert("Booking failed");

});

});
