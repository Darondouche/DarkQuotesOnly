//intégration de la lib express dans le fichier
const express = require("express");
//instanciation de l'objet Express nommé app qui contiendra le serveur
const app = express();
//on stocke le contenu de notre API dans une const pour manipuler plus facilement
const darkquotes = require('./darkquotes.json');

/*on commence par définir la route GET/darkquotes
qui récupérera toutes les quotes de la bdd
1er param : la string qui définit la route à écouter 
2e param : la fonction callback, ac req : objet contenant données fourniées par la requête
et res : objet fourni par express qui contient les méthodes pour répondre*/
app.get("/darkquotes", (req, res) => {
  res.status(200).json(darkquotes);
});

//route pour afficher les données d'une quote spécifique 
app.get("/darkquotes/:id", (req, res)=>{
    //on récup l'id dans les params de la requête
    const id = parseInt(req.params.id);
    const quote = darkquotes.find(quote => quote.id === id);
    res.status(200).json(quote);
});

/*pour lancer le serveur on utilise la méthode listen fournie ds app
on lui spécifie un port (8080, 3000, 8000...) peu importe tant qu'il est libre*/
app.listen(8080, () => {
  console.log(`serveur à l'écoute`);
});
