// Variable para indicar si se tiene permiso de usar el micrófono.
let microAceptado = false;

// Referencias al modal de búsqueda por voz y al elemento donde se mostrarán los resultados.
let modal = document.getElementsByClassName('modal-voice-search')[0];
let resultText = document.getElementsByClassName('voice-search-result-text')[0];

// Variable para manejar la funcionalidad de reconocimiento de voz.
let recognition = null;

// Verifica el estado de permisos para el micrófono.
navigator.permissions.query(
    { name: 'microphone' } // Verifica el permiso del micrófono.
).then(function(permissionStatus) {
    // Registra el estado del permiso (granted, denied, prompt).
    console.log(permissionStatus.state);
    microAceptado = permissionStatus.state == 'granted';

    // Escucha los cambios en el estado del permiso.
    permissionStatus.onchange = function() {
        microAceptado = this.state == 'granted';
        console.log("Permission changed to " + this.state);
    }
});

// Función para abrir el modal de búsqueda por voz.
function voiceSearchModalOpen() {
    // Si el micrófono no está permitido, configura la API de reconocimiento de voz.
    if (microAceptado == false)
        window.SpeechRecognition = window?.webkitSpeechRecognition || window?.SpeechRecognition;

    // Verifica si la API de reconocimiento de voz está disponible.
    if (!('SpeechRecognition' in window)) {
        alert('No se pudo iniciar SpeechRecognition API');
    } else {
        // Muestra el modal.
        modal.classList.remove('hide-modal');
        modal.classList.remove('hide-modal-transition');
        modal.classList.add('show-modal');

        // Inicia el reconocimiento de voz.
        voiceRecognition();
    }
}

// Función para cerrar el modal de búsqueda por voz.
function voiceSearchModalClose() {
    // Oculta el modal.
    modal.classList.remove('show-modal');
    modal.classList.add('hide-modal-transition');

    // Detiene el reconocimiento de voz si está activo.
    if (recognition)
        recognition.stop();

    // Añade una transición para ocultar el modal completamente después de 250ms.
    setTimeout(() => {
        modal.classList.add('hide-modal');
    }, 250);
}

// Función para manejar el reconocimiento de voz.
function voiceRecognition() {
    // Muestra un mensaje en el modal indicando que el usuario debe hablar.
    resultText.innerHTML = 'Habla ahora.';

    // Inicializa el objeto de reconocimiento de voz.
    recognition = new window.SpeechRecognition();

    // Evento que se dispara cuando se detecta un resultado de voz.
    recognition.onresult = (event) => {
        // Obtiene el texto transcrito del resultado de voz.
        let voiceText = event.results[0][0].transcript;

        // Muestra el texto transcrito en el modal.
        resultText.innerHTML = voiceText;
        console.log(voiceText);

        // Detiene el reconocimiento de voz.
        recognition.stop();

        // Después de 1.8 segundos, abre una búsqueda en Google con el texto reconocido.
        setTimeout(() => {
            window.open('https://google.com/search?q=' + voiceText);
        }, 1800);
    };

    // Inicia el reconocimiento de voz.
    recognition.start();
}
