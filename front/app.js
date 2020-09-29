const { response } = require("express");

const PORT = 'http://localhost:3001/compras';
function getAllCompras(){
    fetch(PORT).then(function(res){
        return res.json;
    }).then(function(response){
        const LISTA = document.querySelector(".compras-list");
        LISTA.innerHTML = '';
        response.compras.array.forEach(function(compra) {
            LISTA.innerHTML += `<li>${compra.id}
                                    ${compra.clientId}
                                    ${compra.products}
                                    ${compra.amount}
                                    ${compra.paymentMethod}
                                    ${compra.createdAt}
                                </li>`
        });

    });
}
getAllCompras();