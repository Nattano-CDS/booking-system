const CLASS_API ="https://script.google.com/macros/s/AKfycbxxPZYwtkv12nWdzELpECwXe8NJALhfBi8wop2Ax48fvf8QKEXPgesblNEHK_wBBHaO/exec";


async function loadClasses() {

  const container = document.getElementById("classList");

  container.innerHTML = "Loading classes...";

  try {

    const response = await fetch(CLASS_API);
    const classes = await response.json();

    container.innerHTML = "";

    if (classes.length === 0) {
      container.innerHTML = "<p>No classes available.</p>";
      return;
    }

    classes.forEach(cls => {

      const date = new Date(cls.date).toLocaleDateString("en-GB");

      const card = document.createElement("div");
      card.className = "class-card";

      card.innerHTML = `
        <h3>${cls.name}</h3>

        <p><b>Date:</b> ${date}</p>

        <p><b>Time:</b> ${cls.time}</p>

        <p>${cls.description}</p>

        <p class="price">${cls.price} THB</p>

        <button onclick="goBooking('${cls.classID}')">
          Book Now
        </button>
      `;

      container.appendChild(card);

    });

  } catch (error) {

    console.error(error);

    container.innerHTML = "Failed to load classes.";

  }

}

function goBooking(classID) {

  window.location.href = "booking.html?classID=" + classID;

}

window.onload = loadClasses;
