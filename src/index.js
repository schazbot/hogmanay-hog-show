const hogsUrl = "http://localhost:3000/hogs";
const hogContainer = document.getElementById("hog-container");
const hogForm = document.getElementById("hog-form");

//api
function getAllHogs() {
  return fetch(hogsUrl).then(resp => resp.json());
}

function createHog(hog) {
  return fetch(hogsUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(hog)
  }).then(resp => resp.json());
}

//client
function renderHog(hog) {
  const hogDiv = document.createElement("div");
  hogDiv.className = "hog-card";
  hogDiv.innerHTML = `
<h2>Name:${hog.name}</h2>
<h2>Specialty:${hog.specialty}</h2>
<h3>Weight: ${hog.weight}
<h3>Highest medal achieved : ${hog["highest medal achieved"]}</h3>
<img width="350px" src= ${hog.image}>
`;
  hogContainer.appendChild(hogDiv);
}

//hog form
hogForm.addEventListener("submit", function(e) {
  e.preventDefault();
  createHog(formHog(event)).then(renderHog);
});

function formHog(event) {
  const hogName = event.target.querySelector("#form-name").value;
  const hogSpecialty = event.target.querySelector("#form-specialty").value;
  const hogMedal = event.target.querySelector("#form-medal").value;
  const hogImg = event.target.querySelector("#form-img").value;
  event.target.reset();
  return {
    name: hogName,
    specialty: hogSpecialty,
    "highest medal achieved": hogMedal,
    image: hogImg
  };
}

//init
function renderHogs(hogs) {
  hogs.forEach(hog => renderHog(hog));
}

getAllHogs().then(renderHogs);
