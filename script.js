const API = "https://script.google.com/macros/s/AKfycbzkoUpLUDR03lJnx6Bxunnd3AFJP7CXLpHtiYnA763w1mS019JZE_yutidiISJpSEdp/exec";

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
<span>${cls.date} | ${cls.time}</span>
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
