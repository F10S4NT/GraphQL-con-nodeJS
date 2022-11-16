const express = required("express");

const app = expres();

app.get('/', function(req, res){
    res.send(("Bienvenido"));
});

app.listen(8080, function(){
    console.log("Servidor inciado");
});