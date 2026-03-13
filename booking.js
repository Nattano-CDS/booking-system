// ===============================
// GOOGLE SCRIPT API
// ===============================

const API = "https://script.google.com/macros/s/AKfycbzkoUpLUDR03lJnx6Bxunnd3AFJP7CXLpHtiYnA763w1mS019JZE_yutidiISJpSEdp/exec";


// ===============================
// GET URL PARAMETERS
// ===============================

const params = new URLSearchParams(window.location.search);

const classid = params.get("id");
const date = params.get("date");
const time = params.get("time");


// ===============================
// INSERT INTO HIDDEN FIELDS
// ===============================

document.getElementById("classid").value = classid || "";
document.getElementById("date").value = date || "";
document.getElementById("time").value = time || "";


// ===============================
// FORM SUBMIT
// ===============================

document.getElementById("bookingForm").addEventListener("submit", function(e){

e.preventDefault();

const adult = Number(document.getElementById("adult").value);
const child = Number(document.getElementById("child").value);

const data = {

sessionType: document.getElementById("sessionType").value,

classid: document.getElementById("classid").value,
date: document.getElementById("date").value,
time: document.getElementById("time").value,

adult: adult,
child: child,

email: document.getElementById("email").value,
phone: document.getElementById("phone").value,
name: document.getElementById("name").value,

dietary: "",
nationality: "",

total: "",
status: "Pending",

totalpax: adult + child,
remark: ""

};


// ===============================
// SEND BOOKING
// ===============================

fetch(API,{
method:"POST",
body: JSON.stringify(data)
})
.then(res => res.text())
.then(res => {

alert("Booking submitted successfully!");

window.location.href = "index.html";

})
.catch(err => {

console.error("Booking error", err);
alert("Booking failed");

});

});
