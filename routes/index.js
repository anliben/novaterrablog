var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const JSONdb = require('simple-json-db')
const multer = require('multer')
const multerconfig = require("../config/multer")

const poster_db = new JSONdb('models/models.json')
const poster_data = poster_db.JSON()


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { poster: poster_db.storage, title: 'hello world' });

});

router.get('/post/:id', (req, res, next) =>{
  // (nome, sobrenome, email, titulo, links, body, images)
  for (var i =0; i <poster_db.storage.length; i++ ){
    if (req.params.id == poster_db.storage[i].id){
      res.render('single', {content: poster_db.storage[i], fav: poster_db.storage[i].images[0], tag: poster_db.storage[i].tags[0]})
    }
  }
});

router.get('/create/', (req, res, next) => {
  res.render('create', {status: 'Criando postagem'});
});

router.post('/create/', multer(multerconfig).array('file', 5), async (req, res, next) => {

  imagearray = []
  req.files.forEach((value, index)=>{
    imagearray.push(value.filename)
  })

  prepare = {
    id: uuidv4(),
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    email: req.body.email,
    titulo: req.body.titulo,
    links: req.body.links,
    body: req.body.body,
    date: new Date(),
    tags: ['news', 'nova terra', 'post recentes'],
    images: imagearray
  }
  await poster_data.push(prepare)
  poster_db.JSON(poster_data)
  poster_db.sync()
  res.redirect(`/post/${prepare.id}`)
});


module.exports = router;
