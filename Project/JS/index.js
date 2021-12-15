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
