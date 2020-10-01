// GET de todas las compras
const PORT = 'http://localhost:3001/compras';

    fetch(PORT,{
        headers:{
            'Accept':'application/json'
        }
    }).then(function(res){
        return res.json();
    }).then(function(response){
        console.log(response);
        const LISTA = document.querySelector(".compras-list");
        LISTA.innerHTML = '';
        response.compras.forEach(function(compra){
           LISTA.innerHTML +=  `<li>
                                    <strong>Id: </strong> ${compra.id}<br> 
                                    <strong>Cliente: </strong> ${compra.clientId}<br>
                                    <strong>Productos: </strong> ${compra.products}<br>
                                    <strong>Monto: </strong> $${compra.amount}<br>
                                    <strong>Metodo de Pago: </strong>${compra.paymentMethod}<br>
                                    <strong>Fecha: </strong> ${compra.createdAt}<br><br>
                                </li>` 
        });
    });

//POST compras
const FORMCOMPRA = document.querySelector(".formCompra");
FORMCOMPRA.addEventListener("submit", function (event){
    event.preventDefault();    

    let id = document.querySelector(".id").value;
    let clientId = document.querySelector(".clientId").value;
    let products = document.querySelector(".products").value;
    let amount = document.querySelector(".amount").value;
    let paymentMethod = document.querySelector(".paymentMethod").value;
    let compraGuardar = {
        'id': id,
        'clientId': clientId,
        'products': products,
        'amount': amount,
        'paymentMethod': paymentMethod
    };
    fetch(PORT,{
        'body': JSON.stringify(compraGuardar),
        'method': 'POST',
        'headers':{'Content-Type':'application/json'}
    }).then(function(res){
        return res.json();
    }).then(function(res){
        console.log("Respuesta procesada: ", res);
    })
});
