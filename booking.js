// ============================
// API ENDPOINT
// ============================

const API = "https://script.google.com/macros/s/AKfycbzkoUpLUDR03lJnx6Bxunnd3AFJP7CXLpHtiYnA763w1mS019JZE_yutidiISJpSEdp/exec";


// ============================
// GET URL PARAMETERS
// ============================

const params = new URLSearchParams(window.location.search);

const classId = params.get("id");
const date = params.get("date");
const time = params.get("time");


// ============================
// SET HIDDEN FIELDS
// ============================

document.getElementById("classid").value = classId || "";
document.getElementById("date").value = date || "";
document.getElementById("time").value = time || "";


// ============================
// FORM SUBMIT
// ============================

document.getElementById("bookingForm").addEventListener("submit", function(e){

e.preventDefault();

const sessionType = document.getElementById("sessionType").value;

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const phone = document.getElementById("phone").value;

const adult = Number(document.getElementById("adult").value);
const child = Number(document.getElementById("child").value);

const total = adult + child;


// ============================
// VALIDATION
// ============================

if(!name || !email){

alert("Please enter name and email");

return;

}

if(total === 0){

alert("Please enter number of participants");

return;

}


// ============================
// PREPARE DATA
// ============================

const data = {

sessionType: sessionType,

classid: classId,
date: date,
time: time,

name: name,
email: email,
phone: phone,

adult: adult,
child: child,

totalpax: total

};


// ============================
// SEND TO GOOGLE SHEETS
// ============================

fetch(API,{
method:"POST",
body: JSON.stringify(data)
})
.then(res => res.text())
.then(response => {

alert("Booking successful!");

window.location.href = "index.html";

})
.catch(err => {

console.error(err);

alert("Booking failed");

});

});
