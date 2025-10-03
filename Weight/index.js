// Temperature Conversion Program

const textBox = document.getElementById("textBox");

const toKilogram = document.getElementById("toKilogram");


const toGrammes = document.getElementById("toGrammes");
const toPounds = document.getElementById("toPounds");
const toKilogramFromPounds = document.getElementById("toKilogramFromPounds");
const toOunces = document.getElementById("toOunces");
const toKilogramFromOunces = document.getElementById("toKilogramFromOunces");

const result = document.getElementById("result");

let weight;

function convert() {

   if (toGrammes.checked) {
      weight = Number(textBox.value);
      weight = weight * 1000;
      result.textContent = weight.toFixed(1) + " G";
   }
   else if (toKilogram.checked) {
      weight = Number(textBox.value);
      weight = weight / 1000;
      result.textContent = weight.toFixed(1) + " Kg";
   }
   else if (toPounds.checked) {
      weight = Number(textBox.value);
      weight = weight * 2.20462262;
      result.textContent = weight.toFixed(4) + " lb";
   }
   else if (toKilogramFromPounds.checked) {
      weight = Number(textBox.value);
      weight = weight / 2.20462262;
      result.textContent = weight.toFixed(4) + " Kg";
   }
   else if (toOunces.checked) {
      weight = Number(textBox.value);
      weight = weight * 35.2739619;
      result.textContent = weight.toFixed(4) + " oz";
   }
   else if (toKilogramFromOunces.checked) {
      weight = Number(textBox.value);
      weight = weight / 35.2739619;
      result.textContent = weight.toFixed(4) + " Kg";
   }
   else {
      result.textContent = "Select a unit";
   }

}