const API = "https://script.google.com/macros/s/AKfycbzkoUpLUDR03lJnx6Bxunnd3AFJP7CXLpHtiYnA763w1mS019JZE_yutidiISJpSEdp/exec";

// Format date nicely
function formatDate(dateString){

const d = new Date(dateString);

return d.toLocaleDateString("en-GB",{
day:"numeric",
month:"short",
year:"numeric"
});

}

// Load Classes
fetch(API)
.then(res => res.json())
.then(data => {

const container = document.getElementById("classList");
container.innerHTML = "";

data.forEach(cls => {

const card = document.createElement("div");
card.className = "class-card";

card.innerHTML = `
<div class="class-header">
<h3>${cls.name}</h3>
<span class="class-date">${formatDate(cls.date)} | ${cls.time}</span>
</div>

<div class="class-detail">

<p>${cls.description}</p>

<p><b>Price:</b> ${cls.price} THB</p>

<button onclick="book('${cls.id}','${cls.date}','${cls.time}')">
Book Now
</button>

</div>
`;

card.querySelector(".class-header").onclick = () => {

const detail = card.querySelector(".class-detail");

detail.style.display =
detail.style.display === "block" ? "none" : "block";

};

container.appendChild(card);

});

})
.catch(err => {

console.error("Error loading classes", err);

});


// Booking Function
function book(id,date,time){

const name = prompt("Enter your name");
const email = prompt("Email");
const phone = prompt("Phone");
const adult = prompt("Number of Adults");
const child = prompt("Number of Children");

if(!name || !email){
alert("Name and Email required");
return;
}

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
totalpax:Number(adult)+Number(child)

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
