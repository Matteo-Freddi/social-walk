/* ============================================================
   ELENCO DEI PARTECIPANTI (condiviso da tutte le tappe)
   Modificalo UNA volta sola: le pagine delle tappe lo leggono da qui.

   - nome:    come appare nelle coppie (usa gli stessi nomi della home)
   - conosce: facoltativo. Chi ha lo STESSO valore (es. "rossi") si conosce
              già e non viene accoppiato nella tappa 2.
              Lascia '' se non serve.
   ============================================================ */
window.PARTECIPANTI = [
  { nome: 'Nome 1', conosce: '' },
  { nome: 'Nome 2', conosce: '' },
  { nome: 'Nome 3', conosce: '' },
  { nome: 'Nome 4', conosce: '' },
  { nome: 'Nome 5', conosce: '' },
  { nome: 'Nome 6', conosce: '' },
  { nome: 'Nome 7', conosce: '' },
  { nome: 'Nome 8', conosce: '' }
];

/* CODICE DEL GIRO (facoltativo)
   Le coppie sono "casuali" ma calcolate dallo stesso codice su ogni telefono,
   così tutti vedono le stesse coppie. Se lo lasci a null il codice è la data
   di oggi (AAAA-MM-GG). Per rifare l'estrazione cambia il codice, oppure
   aggiungi ?giro=qualcosa all'indirizzo della pagina. */
window.GIRO = null;