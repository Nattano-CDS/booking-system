const BOOKING_API =
"https://script.google.com/macros/s/AKfycbxxPZYwtkv12nWdzELpECwXe8NJALhfBi8wop2Ax48fvf8QKEXPgesblNEHK_wBBHaO/exec";

document
.getElementById("bookingForm")
.addEventListener("submit", async function(e){

e.preventDefault();

const bookingData = {

sessionType: document.getElementById("sessionType").value,
classID: document.getElementById("classID").value,
date: document.getElementById("date").value,
time: document.getElementById("time").value,

adults: parseInt(document.getElementById("adults").value),
children: parseInt(document.getElementById("children").value),

name: document.getElementById("name").value,
nationality: document.getElementById("nationality").value,

email: document.getElementById("email").value,
phone: document.getElementById("phone").value

};

try{

const response = await fetch(BOOKING_API, {

method:"POST",
headers:{
"Content-Type":"application/json"
},

body: JSON.stringify(bookingData)

});

const result = await response.json();

if(result.status === "success"){

alert("Booking submitted successfully!");

document.getElementById("bookingForm").reset();

}else{

alert("Booking failed");

}

}catch(error){

console.error(error);
alert("Error submitting booking");

}

});
