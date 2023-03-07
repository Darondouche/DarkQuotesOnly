//intégration de la lib express dans le fichier 
const express = require('express');
//instanciation de l'objet Express nommé app qui contiendra le serveur 
const app = express();
/*pour lancer le serveur on utilise la méthode listen fournie ds app
on lui spécifie un port (8080, 3000, 8000...) peu importe tant qu'il est libre*/
app.listen(8080, ()=> {
    console.log(`serveur à l'écoute`);
});