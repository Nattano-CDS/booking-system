const apiURL = "Yhttps://script.google.com/macros/s/AKfycbxxPZYwtkv12nWdzELpECwXe8NJALhfBi8wop2Ax48fvf8QKEXPgesblNEHK_wBBHaO/exec";

let allClasses = [];

async function loadClasses(){

const res = await fetch(apiURL);
allClasses = await res.json();

renderClasses(allClasses);

}

function renderClasses(classes){

const container = document.getElementById("classList");
container.innerHTML="";

classes.forEach(cls=>{

const date = new Date(cls.date).toISOString().split("T")[0];

container.innerHTML += `

<div class="class-card">

<div class="class-title">${cls.name}</div>

<div class="class-info">
📅 ${date}<br>
🕒 ${cls.time}<br>
Seats: ${cls.maxPax}
</div>

<a class="btn" href="class.html?id=${cls.classID}">
View Details
</a>

</div>

`;

});

}

document.getElementById("dateFilter").addEventListener("change",function(){

const selected = this.value;

const filtered = allClasses.filter(cls=>{
const d = new Date(cls.date).toISOString().split("T")[0];
return d === selected;
});

renderClasses(filtered);

});

loadClasses();
