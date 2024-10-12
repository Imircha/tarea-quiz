const inicioPantalla = document.getElementById('inicio-pantalla');
const preguntasPantalla = document.getElementById('preguntas-pantalla');
const resultadosPantalla = document.getElementById('resultados-pantalla');
const preguntaTexto = document.getElementById('pregunta-texto');
const opcionesContainer = document.getElementById('opciones-container');
const siguienteBtn = document.getElementById('siguiente-btn');
const puntajeFinal = document.getElementById('puntaje-final');
const totalPreguntas = document.getElementById('total-preguntas');
const mensajeFinal = document.getElementById('mensaje-final');
const feedbackIncorrecto = document.getElementById('feedback-incorrecto');
const barraProgreso = document.getElementById('barra-progreso');
const reiniciarBtn = document.getElementById('reiniciar-btn');

let preguntas = [];
let preguntaActual = 0;
let puntaje = 0;
let respuestasUsuario = [];
let categoriaSeleccionada = '';
let niveles = [0, 5, 10]; // Niveles de puntaje

const preguntasPorCategoria = {
    HTML: [
        { pregunta: "¿Qué es HTML?", opciones: ["Lenguaje de programación", "Lenguaje de marcado"], respuesta: "Lenguaje de marcado" },
        { pregunta: "¿Cuál es la etiqueta correcta para un enlace?", opciones: ["<link>", "<a>"], respuesta: "<a>" },
        { pregunta: "¿Qué significa HTML?", opciones: ["Hyper Text Markup Language", "High Text Markup Language"], respuesta: "Hyper Text Markup Language" },
        // Más preguntas...
    ],
    CSS: [
        { pregunta: "¿Qué es CSS?", opciones: ["Hoja de estilo", "Lenguaje de programación"], respuesta: "Hoja de estilo" },
        { pregunta: "¿Cómo se aplica un estilo a un elemento?", opciones: ["element.style", "document.getElementById('elemento').style"], respuesta: "element.style" },
        // Más preguntas...
    ],
    JavaScript: [
        { pregunta: "¿Cómo se declara una variable?", opciones: ["var", "let", "const"], respuesta: "var" },
        { pregunta: "¿Qué significa DOM?", opciones: ["Document Object Model", "Document Online Model"], respuesta: "Document Object Model" },
        // Más preguntas...
    ]
};

// Selector de categorías
const categoriaBtns = document.querySelectorAll('.categoria-btn');
categoriaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoriaSeleccionada = btn.getAttribute('data-categoria');
        preguntas = preguntasPorCategoria[categoriaSeleccionada];
        iniciarQuiz();
    });
});

function iniciarQuiz() {
    inicioPantalla.classList.add('ocultar');
    preguntasPantalla.classList.remove('ocultar');
    puntaje = 0;
    preguntaActual = 0;
    respuestasUsuario = [];
    mostrarPregunta();
}

function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];
    preguntaTexto.textContent = pregunta.pregunta;
    opcionesContainer.innerHTML = '';

    pregunta.opciones.forEach((opcion) => {
        const button = document.createElement('button');
        button.textContent = opcion;
        button.classList.add('opcion');
        button.addEventListener('click', () => seleccionarOpcion(opcion));
        opcionesContainer.appendChild(button);
    });

    actualizarBarraProgreso();
}

function seleccionarOpcion(opcion) {
    const pregunta = preguntas[preguntaActual];
    const esCorrecto = opcion === pregunta.respuesta;
    respuestasUsuario.push({
        pregunta: pregunta.pregunta,
        seleccionada: opcion,
        correcta: pregunta.respuesta,
        esCorrecto: esCorrecto
    });

    if (esCorrecto) {
        puntaje++;
    }

    preguntaActual++;
    if (preguntaActual < preguntas.length) {
        mostrarPregunta();
    } else {
        mostrarResultados();
    }
}

function mostrarResultados() {
    preguntasPantalla.classList.add('ocultar');
    resultadosPantalla.classList.remove('ocultar');
    puntajeFinal.textContent = puntaje;
    totalPreguntas.textContent = preguntas.length;

    const porcentaje = (puntaje / preguntas.length) * 100;
    if (porcentaje === 100) {
        mensajeFinal.textContent = "¡Excelente! Respondiste todas las preguntas correctamente.";
    } else if (porcentaje >= 70) {
        mensajeFinal.textContent = "¡Muy bien! Tienes un buen conocimiento.";
    } else if (porcentaje >= 40) {
        mensajeFinal.textContent = "¡Sigue practicando!";
    } else {
        mensajeFinal.textContent = "No te desanimes, ¡intenta de nuevo!";
    }

    mostrarFeedbackIncorrecto();
    actualizarBarraProgreso();
}

function mostrarFeedbackIncorrecto() {
    feedbackIncorrecto.innerHTML = ''; // Limpiar feedback previo
    const detalles = respuestasUsuario.filter(res => !res.esCorrecto);
    if (detalles.length > 0) {
        feedbackIncorrecto.innerHTML += '<h3>Revisa tus respuestas incorrectas:</h3>';
        detalles.forEach(det => {
            feedbackIncorrecto.innerHTML += `
                <p><strong>Pregunta:</strong> ${det.pregunta}</p>
                <p><strong>Tu respuesta:</strong> ${det.seleccionada}</p>
                <p><strong>Respuesta correcta:</strong> ${det.correcta}</p>
            `;
        });
    }
}

function actualizarBarraProgreso() {
    const progreso = ((preguntaActual) / preguntas.length) * 100;
    barraProgreso.style.width = progreso + '%';
}

reiniciarBtn.addEventListener('click', () => {
    resultadosPantalla.classList.add('ocultar');
    inicioPantalla.classList.remove('ocultar');
});