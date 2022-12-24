// raccolgo dalla pagina gli elementi necessari

const textArea = document.querySelector('textarea');
const playButton = document.querySelector('button');
const pitchBar = document.querySelector('.pitch-controls input');
const rateBar = document.querySelector('.rate-controls input');
const duckFigure = document.querySelector('figure');

// se qualcuno clicca il playButton esegui questa funzione

playButton.addEventListener('click', function() {
    const textLength = textArea.value.trim().length;
    if(textLength > 0) {
        talk()
    }
})
// !IMPORTANTE! per pulizia del codice evitare di inserire la logica direttamente dentro al blocco if, è prassi comune creare tutte le funzioni in fondo al codice in maniera tale di lasciare la logica principale il piu pulito possibile. In questo caso se la textLength è maggiore di 0 verrà eseguita la funzione talk() descritta sotto.






// dichiarazioni di funzione

const talk = () => {
    //1 - recupero tono di voce e testo
    const text = textArea.value;
    const pitch = pitchBar.value;
    const rate = rateBar.value;

    //2 - Preparo frase per sintetizzatore vocale. SpeechSynthesis è un metodo integrato, andare a vedere mdn doc
    const utterance = new SpeechSynthesisUtterance (text); // text è la variabile a cui è stato assegnato textArea.value

    //3 - Specifico altri dettagli della frase

    utterance.volume = 1; //volume standard
    utterance.rate = rate; // velocità di parlata
    utterance.pitch = pitch; //viene ripreso il valore impostato dall'utente sul pitchBar il quale a sua volta è stato assegnato alla variabile pitch

    //4 - Faccio parlare la paperella
    speechSynthesis.speak(utterance);

    //5 - Quando la paperella inizia a parlare cambio l'immagine con la gif dinamica e blocco tutti i controlli 
    utterance.addEventListener('start', function(){
        textArea.disabled = true;
        pitchBar.disabled = true;
        playButton.disabled = true;
        duckFigure.classList.add('talking');
    })

    //6 - quando la paperella finisce di parlare ritorna l'immagine statica e si sbloccano i controlli
    utterance.addEventListener('end', function(){
        textArea.disabled = false;
        pitchBar.disabled = false;
        playButton.disabled = false;
        duckFigure.classList.remove('talking');
    })

}