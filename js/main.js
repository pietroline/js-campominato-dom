
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
        box.addEventListener("click", function(){

            this.classList.add("clicked");
    
        });

    }
}



const play = document.getElementById("play");
play.addEventListener("click", function(){

    document.getElementById("grid").innerHTML = "";

    let livello = document.getElementById("difficolta").value;

    difficolta(livello);


    // eseguo append delle caselle in funzione della difficoltà
    const grid = document.getElementById("grid");
    createElement(grid, difficolta(livello)[0], difficolta(livello)[1]);
   
});



