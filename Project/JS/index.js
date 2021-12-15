"use strict";
const baseURL = "http://localhost:8081";

const getByNameOutput = document.querySelector("#getByNameOutput");
const getByDivisionOutput = document.querySelector("#getByDivisionOutput");
const getByCountryOutput = document.querySelector("#getByCountryOutput");
const getAllSection = document.querySelector("#getAllFighters");

const findFighterByName = document.querySelector("#findFighterByName");
const findFighterByDivision = document.querySelector("#findFighterByDivision");
const findFighterByCountry = document.querySelector("#findFighterByCountry");
const updateButton = document.querySelector("#theUpdateFrom");

const getAllFighters = () => {
  axios
    .get(`${baseURL}/getAllFighters`)
    .then((res) => {
      const fighters = res.data;

      getAllOutput.innerHtml = "";

      fighters.forEach((fighter) => renderFighter(fighter, getAllOutput));
    })
    .catch((err) => console.log(err));
};

const renderFighter = (fighter, outputDiv) => {
  const fighterColumn = document.createElement("div");
  fighterColumn.classList.add("col");

  const fighterCard = document.createElement("div");
  fighterCard.classList.add("card");
  fighterColumn.appendChild(fighterCard);

  const newFighter = document.createElement("div");
  newFighter.classList.add("card-body");

  const newFighterName = document.createElement("div");
  newFighterName.innerText = fighter.name;
  newFighterName.classList.add("card-title");
  newFighter.appendChild(newFighterName);

  const fighterDivison = document.createElement("p");
  fighterDivison.innerText = `Division: ${fighter.division}`;
  fighterDivison.classList.add("card-text");
  newFighter.appendChild(fighterDivison);

  const fighterCountry = document.createElement("p");
  fighterCountry.innerText = `Nationality: ${fighter.country}`;
  fighterCountry.classList.add("card-text");
  newFighter.appendChild(fighterCountry);

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "DELETE";
  deleteButton.classList.add("btn", "btn-light");
  deleteButton.addEventListener("click", () => deleteFighter(fighter.id));
  newFighter.appendChild(deleteButton);

  const updateButton = document.createElement("button");
  updateButton.innerText = "UPDATE";
  updateButton.classList.add("btn", "btn-success");
  updateButton.addEventListener("click", () => updateFighter(fighter.id));
  newFighter.appendChild(updateButton);

  fighterCard.appendChild(newFighter);
  outputDiv.appendChild(fighterColumn);
};

document
  .querySelector("#createGameForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;

    const data = {
      name: form.name.value,
      divison: form.divison.value,
      country: form.country.value,
    };
    console.log("DATA:", data);

    axios
      .post(`${baseURL}/createFighter`, data)
      .then((res) => {
        console.log(res);
        getAllFighters();

        form.reset();
        form.name.focus();

        alert(`${form.name.value} has been added :)`);
      })
      .catch((err) => console.log(err));
  });

const deleteFighter = (id) => {
  axios
    .delete(`${baseURL}/deleteFighter/${id}`)
    .then((res) => {
      console.log(res);
      getAllFighters();

      alert("Fighter successfully deleted");
    })
    .catch((err) => console.log(err));
};

const updateFighter = (id) => {
  const data = {
    name: document.getElementById("fighterName").value,
    division: document.getElementById("fighterDivision").value,
    country: document.getElementById("fighterCountry").value,
  };
  axios
    .put(`${baseURL}/updateFighter/${id}`, data)
    .then((res) => {
      getAllFighters();

      alert(
        `${document.getElementById("figherName").value} has now been updated!`
      );
      createFighterForm.reset();
    })
    .catch((err) => console.log(err));
};

const getFighterById = () => {
  axios
    .get(`${baseURL}/getFighterById/${fighterId.value}`)
    .then((res) => {
      const fighter = res.data;

      getByIdOutput.innerHTML = "";

      renderFighter(fighter, getByIdOutput);
    })
    .catch((err) => console.log(err));
};

const getFighterByName = () => {
  axios
    .get(`${baseURL}/getFighterByName/${findFighterByName.value}`)
    .then((res) => {
      console.log(res);
      const fighters = res.data;
      console.log(fighters);
      getFighterByName.innerHTML = "";

      fighters.forEach((fighter) => renderFighter(fighter, getByNameOutput));
    })
    .catch((err) => console.log(err));
};

const getFighterByDivison = () => {
  axios
    .get(`${baseURL}/getFighterByDivison/${findFighterByDivison.value}`)
    .then((res) => {
      console.log(res);
      const fighters = res.data;
      console.log(fighters);
      getFighterByDivison.innerHTML = "";

      fighters.forEach((fighter) => renderFighter(fighter, getByNameOutput));
    })
    .catch((err) => console.log(err));
};

const getFighterByCountry = () => {
  axios
    .get(`${baseURL}/getFighterByCountry/${findFighterByCountry.value}`)
    .then((res) => {
      console.log(res);
      const fighters = res.data;
      console.log(fighters);
      getFighterByCountry.innerHTML = "";

      fighters.forEach((fighter) => renderFighter(fighter, getByNameOutput));
    })
    .catch((err) => console.log(err));
};

document
  .querySelector("div#getFighterByName > button")
  .addEventListener("click", getFighterByName);
document
  .querySelector("div#getFighterByDivision > button")
  .addEventListener("click", getFighterByDivison);
document
  .querySelector("div#getFighterByCountry > button")
  .addEventListener("click", getFighterByCountry);

getAllFighters();
