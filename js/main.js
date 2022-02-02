/*random(min,max) ritorna un numero random tra min e max */
function random(min, max){
    return Math.floor(Math.random() * (max - min +1) +min);
}

const NUMERO_BOMBE = 16;








const play = document.getElementById("play");
play.addEventListener("click", function(){

    let boxAzzeccati = -1; //serve a contare i box premuti correttamente, parte da -1 perchè nel conteggio viene considerato anche la casella bomba cliccata
    document.getElementById("risultato").innerHTML="";

    document.getElementById("grid").innerHTML = "";

    const boxCheck = document.getElementById("inserisci_aiuto");

    let livello = document.getElementById("difficolta").value;

    difficolta(livello);


    // eseguo append delle caselle in funzione della difficoltà
    const grid = document.getElementById("grid");
    createElement(grid, difficolta(livello)[0], difficolta(livello)[1]);



    //Invoco generaBombe() per generare le caselle bombe
    const bombeCreate = generaBombe(NUMERO_BOMBE, difficolta(livello)[0]);

   


    
     




// -----------------------------------------------------------------------------------------------------------------------------------------------------







    
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
    Si occupa di effettuare append dei box e non solo...*/ 
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
            // gestisco il caso in cui viene premuta più volte la stessa casella e il caso in cui viene premuta una casella bomba tramite la funzione boxCliccato
            box.addEventListener("click", boxCliccato);

        }
    }

    /*BoxCliccato() serve alla gestione degli eventi di click all'interno della funzione createElement() */
    function boxCliccato(){

        // gestisco click sulla stessa casella
        boxAzzeccati += +1;
        
        this.classList.add("clicked");
        this.removeEventListener("click", boxCliccato);

        //gestisco click su casella bomba
        const casella = parseInt(this.innerText);
        if(bombeCreate.includes(casella)){
            terminaGioco(boxAzzeccati);
        }else if(!bombeCreate.includes(casella)){
            if(boxCheck.checked){
                aiutoGioco(casella);
            }
        }
        
        if(boxAzzeccati == difficolta(livello)[0] - NUMERO_BOMBE -1){
            document.getElementById("risultato").innerHTML="Complimenti hai vinto!!!!";

            // smetto di ascoltare i click successivi
            const addClasse = document.getElementsByClassName("quadrato");
        
            for(let i=0; i<addClasse.length; i++){

                addClasse[i].removeEventListener("click", boxCliccato);

            }
        }

    }

    /*la funzione generaBombe() si occupa di creare un array di numeri casuali
    La dimensione dell'array è stabilito dall'argomento della funzione, primo argomento
    Il range dei valori ammessi è coerente con il livello di difficoltà scelto, tramite il secondo argomento*/
    function generaBombe(numeroBombe, numeroCaselle){
        const bombeGenerate = [];
        while(bombeGenerate.length != numeroBombe){

            //eseguo il push solo se il numero non è già presente nell'array
            const bomba = random(1, numeroCaselle);
            if(!bombeGenerate.includes(bomba)){
                bombeGenerate.push(bomba);
            }
            
        }
        console.log("array bombe " + bombeGenerate);
        return bombeGenerate;
    } 

    /*TerminaGioco() si occupa di inserire la classe ".bomba" in tutti i box designati come bomba, visualizzando tutte le bombe del gioco*/
    function terminaGioco(boxAzzeccati){

        const addClasse = document.getElementsByClassName("quadrato");
        
        for(let i=0; i<addClasse.length; i++){

            if(bombeCreate.includes(parseInt(addClasse[i].innerText))){
                addClasse[i].classList.add("bomba");

                document.getElementById("risultato").innerHTML=`Il gioco è terminato! Hai perso :( Hai azzeccato ${boxAzzeccati} caselle. Gioca ancora...`

            }

            addClasse[i].removeEventListener("click", boxCliccato);

        }
    }

    function aiutoGioco(casella){

        numeroCaselle = document.getElementsByClassName("quadrato").length;
        if(!bombeCreate.includes(casella)){

            if(bombeCreate.includes(casella+1)){
                document.getElementsByClassName("quadrato")[casella-1].classList.add("border_right");

            }
            if(bombeCreate.includes(casella-1)){
                document.getElementsByClassName("quadrato")[casella-1].classList.add("border_left");

            }
            if(bombeCreate.includes(casella+Math.sqrt(numeroCaselle))){
                document.getElementsByClassName("quadrato")[casella-1].classList.add("border_bottom");

            }
            if(bombeCreate.includes(casella-Math.sqrt(numeroCaselle))){
                document.getElementsByClassName("quadrato")[casella-1].classList.add("border_top");
            }
             
        }

    }
});



