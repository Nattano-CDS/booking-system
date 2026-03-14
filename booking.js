<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Cooking Class Booking</title>

<style>

body{
font-family: Arial;
background:#f5f5f5;
margin:0;
padding:0;
}

.container{
max-width:600px;
margin:auto;
background:white;
padding:30px;
margin-top:40px;
border-radius:8px;
box-shadow:0 2px 10px rgba(0,0,0,0.1);
}

h1{
text-align:center;
margin-bottom:25px;
}

label{
display:block;
margin-top:15px;
font-weight:bold;
}

input,select{
width:100%;
padding:10px;
margin-top:5px;
border:1px solid #ccc;
border-radius:5px;
}

button{
margin-top:20px;
width:100%;
padding:12px;
background:#000;
color:white;
border:none;
border-radius:5px;
font-size:16px;
cursor:pointer;
}

button:hover{
background:#333;
}

.success{
display:none;
margin-top:20px;
color:green;
text-align:center;
font-weight:bold;
}

</style>

</head>

<body>

<div class="container">

<h1>Cooking Class Booking</h1>

<form id="bookingForm">

<label>Session Type</label>
<select id="sessionType">
<option value="CLASS">Join Class</option>
<option value="PRIVATE">Private Class</option>
</select>

<label>Class</label>
<select id="classID">
<option value="CLS001">Thai Cooking Class</option>
<option value="CLS002">Evening Thai Cooking Class</option>
</select>

<label>Booking Date</label>
<input type="date" id="date" required>

<label>Booking Time</label>
<select id="time">
<option value="10:30 - 13:00">10:30 - 13:00</option>
<option value="15:30 - 19:00">15:30 - 19:00</option>
</select>

<label>Adults</label>
<input type="number" id="adults" value="1" min="1">

<label>Children</label>
<input type="number" id="children" value="0" min="0">

<label>Full Name</label>
<input type="text" id="name" required>

<label>Nationality</label>
<input type="text" id="nationality">

<label>Email</label>
<input type="email" id="email" required>

<label>Phone</label>
<input type="tel" id="phone" required>

<button type="submit">Book Now</button>

</form>

<div class="success" id="successMsg">
Booking submitted successfully!
</div>

</div>

<script>

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzkoUpLUDR03lJnx6Bxunnd3AFJP7CXLpHtiYnA763w1mS019JZE_yutidiISJpSEdp/exec";

document.getElementById("bookingForm").addEventListener("submit", function(e){

e.preventDefault();

var bookingData = {

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

fetch(SCRIPT_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(bookingData)
})
.then(res=>res.json())
.then(data=>{

document.getElementById("successMsg").style.display="block";
document.getElementById("bookingForm").reset();

})
.catch(err=>{
alert("Booking failed");
console.log(err);
});

});

</script>

</body>
</html>
