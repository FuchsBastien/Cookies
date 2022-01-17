//date d'aujourd'hui
const today = new Date();
console.log(today);
//getTime donne la date d'aujourd'hui en ms auquel on ajoute le temps d'une semaine par multiplication
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
console.log(nextWeek);
//transforme l'objet date en chaine de caractères en  l'additionnant à une chaine de caractère 0 qu'on découpe en récupérant les caractères 9 à 11
let day = ('0' + nextWeek).slice(9,11);
//get month permet de récupérer le chiffe du mois, on rajoute 1 car décompte se fait de 0 à 11
//slice (-2) découpe la chaine de caractères depuis la fin
let month = ('0' + (nextWeek.getMonth() +1 )).slice(-2);
let year = today.getFullYear();
//.value = innerText pour mettre directement
document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;
