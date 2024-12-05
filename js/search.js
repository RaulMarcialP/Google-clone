// Agrega un evento al documento que detecta cuando se presiona una tecla.
document.documentElement.addEventListener('keyup',(evt)=>{
    // Verifica si la tecla presionada es "Enter" (código 13).
    if (evt.which == 13) {
        // Llama a la función searchValue() si se presiona Enter.
        searchValue();
    }
})

// Función que toma el valor de un campo de texto con el id 'searchValue'
// y redirige al usuario a una búsqueda en Google con ese valor.
function searchValue() {
    // Obtiene el valor del campo de texto con id 'searchValue'.
    const voiceText = document.getElementById('searchValue').value;

    // Verifica que el campo no esté vacío.
    if (voiceText.length > 0)
        // Redirige al usuario a Google con la consulta ingresada.
        window.location.href = `https://google.com/search?q=${voiceText}`;
}

// Función que redirige al usuario a la página de los "doodles" de Google.
function luck() {
    window.location.href = 'https://www.google.com/doodles';
}
