/* ============================================================
   ELENCO DEI PARTECIPANTI (condiviso da tutte le tappe)
   Modificalo UNA volta sola: le pagine delle tappe lo leggono da qui.

   - nome:    come appare nelle coppie (usa gli stessi nomi della home)
   - conosce: facoltativo. Chi ha lo STESSO valore (es. "rossi") si conosce
              già e non viene accoppiato nella tappa 2.
              Lascia '' se non serve.
   ============================================================ */
window.PARTECIPANTI = [
  { nome: 'Marta', aggettivo: 'Curiosa',conosce: '' },
  { nome: 'Silvio', aggettivo: 'Presidente',conosce: '' },
  { nome: 'Giorgia', aggettivo: 'Selvaggia',conosce: '' },
  { nome: 'Sebastiano', aggettivo: 'Di Milano',conosce: '' },
  { nome: 'Bernardo', aggettivo: 'Birichino',conosce: '' },
  { nome: 'Glauco', aggettivo: 'Bizzarro',conosce: '' },
  { nome: 'Tiziana',aggettivo: 'Romantica', conosce: '' },
  { nome: 'Nerina',aggettivo: 'Misterioso', conosce: '' }
];

/* CODICE DEL GIRO (facoltativo)
   Le coppie sono "casuali" ma calcolate dallo stesso codice su ogni telefono,
   così tutti vedono le stesse coppie. Se lo lasci a null il codice è la data
   di oggi (AAAA-MM-GG). Per rifare l'estrazione cambia il codice, oppure
   aggiungi ?giro=qualcosa all'indirizzo della pagina. */
window.GIRO = null;

/* INVIO DELLE SCELTE (tappa 7: "Chi vuoi risentire")
   Indirizzo che riceve le scelte: le legge solo l'organizzatore, nessun partecipante.
   Esempio: un modulo Formspree ("https://formspree.io/f/xxxxxxx") che ti inoltra
   ogni scelta per email. La pagina invia questi campi:
     giro, chi, scelte ("Nome 2, Nome 3") e riga ("Nome 1: Nome 2, Nome 3"),
   dove "riga" si può incollare così com'è in organizzatore.html.
   Se lo lasci '' la pagina NON invia nulla e lo dice chiaramente. */
window.SCELTE_ENDPOINT = '';