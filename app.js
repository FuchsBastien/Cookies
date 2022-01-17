const affichage = document.querySelector('.affichage');
const btns = document.querySelectorAll('button');
const inputs = document.querySelectorAll('input');
const infoTxt = document.querySelector('.info-txt')


//date d'expiration cookie DANS INPUT

//date d'aujourd'hui
const today = new Date();
console.log(today);
//getTime donne la date d'aujourd'hui en ms auquel on ajoute le temps d'une semaine par multiplication
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
console.log(nextWeek);
//on transforme la valeur de nextWeek en chaine de caractères (chiffres) en l'additionnant à une chaine de caractère 0 qu'on découpe en récupérant les caractères 9 à 11
let day = ('0' + nextWeek).slice(9,11);
//get month permet de récupérer le chiffe du mois, on rajoute 1 car décompte se fait de 0 à 11
//slice (-2) découpe la chaine de caractères depuis la fin
let month = ('0' + (nextWeek.getMonth() +1 )).slice(-2);
let year = today.getFullYear();
//.value = innerText pour mettre directement les 3 valeurs
document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;



//Action boutons

//pour chaque btn (on l'appelle comme on veut)
btns.forEach(btn => {
    //on applique l'évènement click aux 2 boutons (fonction btn) en appliquant la fonction btnAction
    btn.addEventListener('click', btnAction);
})

function btnAction(e){

    let nvObj = {};
    //pour chaque input 
    inputs.forEach(input => {
        //on prend les noms des attributs name (cookieName, cookieValue, cookieExpire)
        let attrName = input.getAttribute('name');
        //si le nom de l'attribut est différent (!==) de "cookieExpire" on prend la valeur de l'input sinon (:) la valeur de l'input en date ECRITE   
        let attrValeur = attrName !== "cookieExpire" ? input.value : input.valueAsDate;
        //on rajoute les valeurs de ces 3 input (attrValeur) comme attribut prenant les noms des attributs name ([attrName]) à l'objet nvObj 
        nvObj[attrName] = attrValeur;
    })
    console.log(nvObj);

    //on prend le nom des attributs data (data-cookie)
    let description = e.target.getAttribute('data-cookie');

    //si le nom de l'attribut est strictement égal à (===) "créer" (le bouton sur lequel on clique)
    if(description === "creer"){
        //on crée le cookie prenant les valeurs de l'objet nvObj
        creerCookie(nvObj.cookieName, nvObj.cookieValue, nvObj.cookieExpire);
    } 
        //si le nom de l'attribut est strictement égal à (===) "toutAfficher" (le bouton sur lequel on clique)
    else if (description === "toutAfficher"){
        //on fera apparaitre la liste des cookies
        listeCookies();
    }
}

