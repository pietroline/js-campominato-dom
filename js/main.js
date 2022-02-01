/*random(min,max) ritorna un numero random tra min e max */
function random(min, max){
    return Math.floor(Math.random() * (max - min +1) +min);
}

const NUMERO_BOMBE = 16;
















/*La funzione difficolta() gestisce il valore di difficoltà impostato.
Ritorna un vettore, in funzione della difficoltà impostata,
dove il primo elemento è il numero di caselle totali,
mentre il secondo elemento è il nome della classe corrispondendte alle caselle da aggiungere*/ 
function difficolta(livello){
    let caselle = 0;
    let ordine = "";
    
    if(livello == "facile"){
        caselle = 100;
        ordine = "dieci";
    }else if(livello == "difficile"){
        caselle = 81;
        ordine = "nove";
    }else if(livello == "impossibile"){
        caselle = 49;
        ordine = "sette";
    }else{
        alert("Risulta un errore critico! Contattare l'amministratore del sito");
       
    }

    return [caselle, ordine];
}

/*La funzione createElement() prende in ingresso il riferimento alla grid, il numero di caselle e la classe corrispondeneti alle difficoltà
Si occupa di effettuare append dei box*/ 
function createElement(grid, caselle, ordine){
    for(let i=1; i<=caselle; i++){

        const box = document.createElement("div");
        box.classList.add("quadrato");
        box.classList.add(ordine);
        
        grid.appendChild(box);

        // Inserisco il numero della casella 
        let numero = document.createTextNode(i);
        box.appendChild(numero);


        // mi metto in ascolto sui click dei box e in caso venga premuto cambio colore del background-color e colore delle scritte
        // gestisco il caso in cui viene premuta più volte la stessa casella
        box.addEventListener("click", function(){

            console.log("cliccato");
            this.classList.add("clicked");
            this.removeEventListener("click", this);
    
        });

    }
}

/*la funzione generaBombe() si occupa di creare un array di numeri casuali
La dimensione dell'array è stabilito dall'argomento della funzione, primo argomento
Il range dei valori ammessi è coerente con il livello di difficoltà scelto, tramite il secondo argomento*/
function generaBombe(numeroBombe, numeroCaselle){
    const bombeGenerate = [];
    while(bombeGenerate.length != numeroBombe){

        //eseguo il push solo se il numero non è presente nell'array
        const bomba = random(1, numeroCaselle);
        if(!bombeGenerate.includes(bomba)){
            bombeGenerate.push(bomba);
        }
        
    }
    console.log("array bombe " + bombeGenerate);

    return bombeGenerate;
} 



const play = document.getElementById("play");
play.addEventListener("click", function(){

    document.getElementById("grid").innerHTML = "";

    let livello = document.getElementById("difficolta").value;

    difficolta(livello);


    // eseguo append delle caselle in funzione della difficoltà
    const grid = document.getElementById("grid");
    createElement(grid, difficolta(livello)[0], difficolta(livello)[1]);







// ---------------------------------------------------------------------------------------------------------------------------------------







    //Invoco generaBombe() per generare le caselle bombe
    const bombeCreate = generaBombe(NUMERO_BOMBE, difficolta(livello)[0]);


    //aggiungo classe bomba
    const addClasse = document.getElementsByClassName("quadrato");
    
    for(let i=0; i<addClasse.length; i++){

        if(bombeCreate.includes(parseInt(addClasse[i].innerText))){
            addClasse[i].classList.add("bomba");
        }

    }
     
    console.log(addClasse);
    
   
});



