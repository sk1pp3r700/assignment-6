const express = require('express');
const app = express();
const PORT = process.env.PORT || 2500;
let products = require('./model/product.js')
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//READ
app.get('/', (req, res) =>{
    res.json(products)})
app.get('/products', (req, res) =>{
    res.json(products)})
app.get('/products/:id', (req, res) =>{
        let productId = Number(req.params.id);
        let getProduct = products.find((product) => product.id === productId);
        if(!getProduct){
            res.status(404).send(`Cannot find product with id of ${productId}`);
        }else {
            res.json(getProduct);}});
//CREATE
app.post('/products', (req, res) =>{
    let newProduct = {
        id: products.length + 1,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price}
    products.push(newProduct);
    res.json(products)})
//UPDATE
app.put('/products/:id', (req, res) =>{
        let productId = Number(req.params.id);
        let body = req.body;
        let product = products.find((product) => product.id === productId);
        let indexOfProduct = products.indexOf(product);
    if(!product){
        res.status(404).send(`Product with id of ${productId} not found`)
    }else{let updateProduct = {...product, ...body};
    products[indexOfProduct] = updateProduct;
    res.json(updateProduct)}})
//DELETE
app.delete('/products/:id',(req,res) =>{
        let productId = Number(req.params.id);
        let deleteProduct = products.filter((product) => product.id !== productId);
        if(!deleteProduct){
            res.status(404).send(`Product with id of ${productId} not found`);
        }else{ products = deleteProduct;
            res.json(products);}})
//listen
app.listen(PORT, ()=>{
                console.log(`Server broadcasting on http://127.0.0.1:${PORT}`)})