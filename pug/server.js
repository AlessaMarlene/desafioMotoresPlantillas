const express = require("express");
const router = express.Router();
const pug = require('pug');
const Products = require('./class/productos');
const app = express();

const PORT = 8080;

const productos = new Products();
let vista = Boolean(true);

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/productos', router);

app.get('/', (req, res) => {
    vista = true;
    res.render('index', {vista});
})

router
    .get('/', (req, res) => {
        const listProd = productos.getAll();   
        vista = false;
        res.render('index', {listProd, vista});
    }) 

    .post('/', (req, res) => {
        productos.storeProduct(req.body);
        vista = true;
        res.redirect('/');
    })  

const server = app.listen(PORT, () => console.log(`Connected to port ${PORT}...`));
server.on('error', (err) => {throw new Error(err.message)});