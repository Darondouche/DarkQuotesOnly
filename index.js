//intégration de la lib express dans le fichier
const express = require("express");
//instanciation de l'objet Express nommé app qui contiendra le serveur
const app = express();
//on stocke le contenu de notre API dans une const pour manipuler plus facilement
const darkquotes = require('./darkquotes.json');
//ajout d'un body parser 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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
    //on cherche dans les quotes la quote dont l'id est égal à celui de la requête
    const quote = darkquotes.find(quote => quote.id === id);
    res.status(200).json(quote);
});

//route post permettant d'ajouter une quote dans la base de données
app.post("/darkquotes", (req, res) => {
  //on push le 'body' de la requête ds notre BDD
  //à noter que dans un cas concret, l'id serait généré tout seul
  darkquotes.push(req.body);
  res.status(200).json(darkquotes);
});

//route put pour modifier une entrée quote
app.put("/darkquotes/:id", (req, res) => {
  //on récupère l'id depuis ce qui est indiqué dans les params
  const id = parseInt(req.params.id);
  let quote = darkquotes.find(quote => quote.id === id);
  //par contre ces infos là viennent du body de la requête
  //on peut aussi les récup depuis l'url à condition de renseigner un chemin adapté :
  //"/darkquotes/:id/:author/:theme/:text" + req.params.author etc. 
  quote.author = req.body.author;    
  quote.theme = req.body.theme;
  quote.text = req.body.text;
  res.status(200).json(darkquotes);
});

app.delete("/darkquotes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let quote = darkquotes.find(quote => quote.id === id);
  darkquotes.splice(darkquotes.indexOf(quote), 1);
  res.status(200).json(darkquotes);
});

/*pour lancer le serveur on utilise la méthode listen fournie ds app
on lui spécifie un port (8080, 3000, 8000...) peu importe tant qu'il est libre*/
app.listen(8080, () => {
  console.log(`serveur à l'écoute`);
});

