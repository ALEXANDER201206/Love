function verificar(){

    let valor = document.getElementById("respuesta").value;
    let mensaje = document.getElementById("mensaje");

    if(valor == 3){

        mensaje.innerHTML = "A ok,Respuesta correcta 🙂👍";
        mensaje.style.color = "green";

        setTimeout(function(){
            window.location.href = "final.html";
        },5000);

    }else{

        mensaje.innerHTML = "Respuesta incorrecta... ahora podras contestar únicamente Sí 😈 TE REGRESAS AL PRINCIPIO.";
        mensaje.style.color = "red";

        setTimeout(function(){
            sessionStorage.setItem("noBloqueado","true");
            window.location.href = "index.html";
        },5000);
    }
}