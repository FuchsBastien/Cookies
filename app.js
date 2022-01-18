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


// créer cookies 

//prend 3 paramètres name, value, exp (= nvObj.cookieName, nvObj.cookieValue, nvObj.cookieExpire)
function creerCookie(name, value, exp){

    //on vide le texte (actualiser après la fonction précédente)
    infoTxt.innerText = "";

    //Si le cookie à un même nom
    //on coupe le tableau au niveau des ";"
    let cookies = document.cookie.split(';');
    console.log(cookies);
    //Pour chaque cookie
    cookies.forEach(cookie => {
        //on enlève les élèments vide au début et à la fin
        cookie = cookie.trim();
        console.log(cookie);
        //on coupe le tableau au niveau des "="
        let formatCookie = cookie.split('=');
        console.log(formatCookie);
        //encodeURLComponent = encode les caractères spéciaux
        if(formatCookie[0] === encodeURIComponent(name)){
            dejaFait = true;
        }
        //console.log("dfsdf;szdfsd".split (';'));
    })

    if(dejaFait){
        infoTxt.innerText = "Un cookie possède déjà ce nom!"
        //on repasse à false
        dejaFait = false;
        return;
    }

    // Si le cookie n'a pas de nom
    if(name.length === 0) {
        infoTxt.innerText = `Impossible de définir un cookie sans nom.`
        //return va sortir de la fonction et ne va pas l'executer ce qu'il y a à la suite
        return;
    }

    //encodeURLComponent = encode les caractères spéciaux
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${exp.toUTCString()}`;
    let info = document.createElement('li');
    //on affiche le texte avec le nom du cookie
    info.innerText = `Cookie ${name} créé.`;
    affichage.appendChild(info);
    setTimeout(() => {
        //on enlève l'élèment du DOM (le texte) au bout de 1500 ms
        info.remove();
    }, 1500)
}



// créer liste cookies

function listeCookies() {
    //on coupe le tableau au niveau des ";" split transforme chaine de caractères en tableau
    let cookies = document.cookie.split (';'); 
    console.log(cookies);
     //join transforme un tableau en chaine de caractères
     if(cookies.join() === "") {
        infoTxt.innerText = 'Pas de cookies à afficher';
        return;
    }

    cookies.forEach(cookie => {

        cookie = cookie.trim();
        let formatCookie = cookie.split('=');

        // console.log(formatCookie);
        let item = document.createElement('li');
        
        infoTxt.innerText = 'Cliquez sur un cookie dans la liste pour le supprimer.'
        //decodeURLComponent = decode les caractères spéciaux pour les retransformer en chaines de caractères
        item.innerText = `Nom : ${decodeURIComponent(formatCookie[0])}, Valeur : ${decodeURIComponent(formatCookie[1])}`;
        affichage.appendChild(item);


        // Suppression cookie
        item.addEventListener('click', () => {

            document.cookie = `${formatCookie[0]}=; expires=${new Date(0)}`
            item.innerText = `Cookie ${formatCookie[0]} supprimé`;
            setTimeout(() => {
                item.remove();
            }, 1000);

        })
    })

}


