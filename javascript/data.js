// Un array con los nombres de los archivos o las URL que desees leer.
const fileNames = ['chz.html', 'ebw.html', 'cracked.html', 'kym.html'];

// Utiliza la función map para crear un nuevo array de Promesas que fetch cada archivo
const fetchPromises = fileNames.map(fileName => fetch(fileName).then(response => response.text()));

Promise.all(fetchPromises)
    .then(responses => {
        responses.forEach((htmlString, index) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');

            const failed = parseInt(doc.querySelector('.failed').textContent.match(/\d+/)[0], 10);
            const passed = parseInt(doc.querySelector('.passed').textContent.match(/\d+/)[0], 10);
            const skipped = parseInt(doc.querySelector('.skipped').textContent.match(/\d+/)[0], 10);

            // Just key to access the element by id in your document
            const key = fileNames[index].split('.')[0].toUpperCase();

            document.getElementById(`totalTest-${key}`).textContent = failed + passed + skipped;
            document.getElementById(`passed-${key}`).textContent = passed;
            document.getElementById(`failed-${key}`).textContent = failed;
            document.getElementById(`skipped-${key}`).textContent = skipped;
        });
    });
document.addEventListener("DOMContentLoaded", function() {
    var elementoFecha = document.getElementById("date");

    var fechaActual = new Date();

    // Obtén los componentes de la fecha que deseas mostrar
    var dia = fechaActual.getDate();
    var mes = fechaActual.toLocaleString('default', { month: 'short' }); // Abreviatura del mes
    var año = fechaActual.getFullYear();
    var hora = fechaActual.getHours();
    var minutos = fechaActual.getMinutes();
    var segundos = fechaActual.getSeconds();

    // Formatea la fecha como deseas
    var fechaFormateada = "Tests Results " + dia + " " + mes + " " + año + " " + hora + ":" + minutos + ":" + segundos;

    elementoFecha.textContent = fechaFormateada;
});

