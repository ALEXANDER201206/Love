function mostrarPregunta(){
        let intro = document.getElementById("intro");
        let pregunta = document.getElementById("pregunta");
        intro.classList.add("oculta");

        setTimeout(()=>{
            intro.style.display="none";
            pregunta.style.display="flex";
            pregunta.classList.remove("oculta");
            pregunta.classList.add("visible");
        },600);
    }

    function respuestaSi(){
        let audioPrincipal = document.getElementById("musica");
        audioPrincipal.play();
        crearCorazones();

        let pregunta = document.getElementById("pregunta");
        let pantallaMusica = document.getElementById("pantallaMusica");

        pregunta.classList.add("oculta");

        setTimeout(()=>{
            pregunta.style.display="none";
            pantallaMusica.style.display="flex";
            pantallaMusica.classList.remove("oculta");
            pantallaMusica.classList.add("visible");
        },600);
    }

    function reproducir(id){
        let audioPrincipal = document.getElementById("musica");

        let fade = setInterval(function(){
            if(audioPrincipal.volume > 0.1){
                audioPrincipal.volume -= 0.1;
            } else {
                audioPrincipal.pause();
                audioPrincipal.currentTime = 0;
                audioPrincipal.volume = 1;
                clearInterval(fade);
            }
        },100);

        let audios = document.querySelectorAll("audio");
        audios.forEach(function(audio){
            if(audio.id !== id){
                audio.pause();
                audio.currentTime = 0;
            }
        });

        let seleccionada = document.getElementById(id);
        seleccionada.play();
    }

    let contadorNo = 0;

    /* 🔒 Bloqueo del botón No si falló el acertijo */
    if(sessionStorage.getItem("noBloqueado") === "true"){
        let botonNo = document.getElementById("botonNo");
        if(botonNo){
            botonNo.style.display = "none";
        }
    }

    /* 🎯 Movimiento del botón No */
    let botonNo = document.getElementById("botonNo");

    if(botonNo){
        botonNo.addEventListener("mouseover", function(){
            botonNo.style.position = "absolute";
            botonNo.style.left = Math.random() * 80 + "vw";
            botonNo.style.top = Math.random() * 80 + "vh";

            contadorNo++;

            if(contadorNo >= 12){
                window.location.href = "acertijo.html";
            }
        });
    }

    function crearCorazones(){
        for(let i = 0; i < 100; i++){
            let corazon = document.createElement("div");
            corazon.innerHTML = "💖";
            corazon.style.position = "absolute";
            corazon.style.left = Math.random() * 100 + "vw";
            corazon.style.bottom = Math.random() * 40 + "px";
            corazon.style.fontSize = (Math.random() * 25 + 15) + "px";
            let duracion = Math.random() * 3 + 3;
            corazon.style.animation = `flotar ${duracion}s linear forwards`;
            corazon.style.animationDelay = Math.random() * 1 + "s";
            document.body.appendChild(corazon);
            setTimeout(function(){
                corazon.remove();
            }, duracion * 1000 + 1000);
        }
    }

    function reproducirCarta(id){
        let audios = document.querySelectorAll("audio");
        audios.forEach(a => {
            a.pause();
            a.currentTime = 0;
        });

        let audio = document.getElementById(id);
        audio.play();

        setTimeout(() => {
            ocultarTodo();
            let carta = document.getElementById("pantallaCarta");
            carta.classList.remove("oculta");
            carta.classList.add("visible");
        }, 600);
    }

    function volverMusica(){
        ocultarTodo();
        let pantallaMusica = document.getElementById("pantallaMusica");
        pantallaMusica.classList.remove("oculta");
        pantallaMusica.classList.add("visible");
    }

    function mostrarPoema(){
        reproducir('c2');
        ocultarTodo();
        let pantalla = document.getElementById("pantallaPoema");
        pantalla.classList.remove("oculta");
        pantalla.classList.add("visible");

        let versos = [
            "Rosa es tu sonrisa en la mañana,",
            "Sol que ilumina mi corazón,",
            "Cada latido susurra tu nombre,",
            "Eres mi dulce inspiración."
        ];

        let contenedor = document.getElementById("poema");
        contenedor.innerHTML = "";

        let i = 0;

        function mostrarSiguienteVerso(){
            contenedor.innerHTML = "";
            let p = document.createElement("p");
            p.textContent = versos[i];
            contenedor.appendChild(p);
            setTimeout(() => { p.classList.add("mostrar"); }, 50);

            i++;
            if(i < versos.length){
                setTimeout(mostrarSiguienteVerso, 1500);
            } else {
                setTimeout(() => {
                    contenedor.innerHTML = "";
                    versos.forEach(verso => {
                        let p = document.createElement("p");
                        p.textContent = verso;
                        p.classList.add("mostrar");
                        contenedor.appendChild(p);
                    });
                }, 1500);
            }
        }
        mostrarSiguienteVerso();
    }

    function ocultarTodo(){
        let pantallas = document.querySelectorAll(".pantalla");
        pantallas.forEach(p => {
            p.classList.remove("visible");
            p.classList.add("oculta");
        });
    }

    // Botón 3: interactiva
    function mostrarInteractiva(){
        ocultarTodo();
        let pantalla = document.getElementById("pantallaInteractiva");
        pantalla.classList.remove("oculta");
        pantalla.classList.add("visible");
        reproducir('c3');

        // Resetear input y mostrar botones iniciales
        document.getElementById("preguntaInteractiva").classList.add("oculta");
        document.getElementById("respuestaUsuario").value = "";
        document.querySelectorAll("#pantallaInteractiva .opcion-btn").forEach(btn => btn.style.display = "inline-block");
    }

    function hacerPregunta(opcion){
        document.querySelectorAll("#pantallaInteractiva .opcion-btn").forEach(btn => btn.style.display = "none");
        document.getElementById("preguntaInteractiva").classList.remove("oculta");
    }

    function generarPDF(){
        const { jsPDF } = window.jspdf;
        let respuesta = document.getElementById("respuestaUsuario").value || "Sin respuesta";
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.setTextColor(255, 51, 102);
        doc.text("¡Tu diploma 💖", 105, 30, null, null, "center");
        doc.setFontSize(18);
        doc.text("Esta persona respondió:", 105, 50, null, null, "center");
        doc.text(respuesta, 105, 70, null, null, "center");
        doc.save("diploma.pdf");
    }
