// Objeto global para almacenar los datos procesados
var lighthouseData = {};

function parseLighthouseData(json, prefix) {
  try {
    if (!json.categories || !json.categories.accessibility || !json.categories['best-practices'] || !json.categories.performance || !json.categories.seo) {
      throw new Error('Missing categories in JSON data');
    }

    const accessibilityScore = json.categories.accessibility.score;
    const bestPracticesScore = json.categories['best-practices'].score;
    const performanceScore = json.categories.performance.score;
    const seoScore = json.categories.seo.score;

    const accessibility = accessibilityScore * 100;
    const bestPractices = bestPracticesScore * 100;
    const performance = performanceScore * 100;
    const seo = seoScore * 100;

    // Almacenar los datos procesados en el objeto global
    lighthouseData[prefix] = { accessibility, bestPractices, performance, seo };

    return { accessibility, bestPractices, performance, seo };
  } catch (error) {
    console.error(`Error parsing Lighthouse data for prefix ${prefix}:`, error);
  }
}

function generateCharts() {
  // Seleccionar el elemento canvas donde se renderizarán los gráficos
  var ctx = document.getElementById('myChart').getContext('2d');

  // Configuración de los datos para el gráfico
  var data = {
    labels: ['Accessibility', 'Best Practices', 'Performance', 'SEO'],
    datasets: []
  };

  // Recorrer los datos almacenados en lighthouseData y agregarlos al conjunto de datos del gráfico
  Object.keys(lighthouseData).forEach(prefix => {
    var dataset = {
      label: prefix,
      backgroundColor: getRandomColor(), // Función para obtener un color aleatorio
      data: [
        lighthouseData[prefix].accessibility,
        lighthouseData[prefix].bestPractices,
        lighthouseData[prefix].performance,
        lighthouseData[prefix].seo
      ]
    };
    data.datasets.push(dataset);
  });

  // Configuración del gráfico
  var options = {
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      yAxes: [{
        stacked: true
      }]
    }
  };

  // Crear el gráfico de barras horizontales
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: data,
    options: options
  });

  // Imprimir los gráficos en el HTML
  Object.keys(lighthouseData).forEach(prefix => {
    document.getElementById(prefix + 'Performance').textContent = lighthouseData[prefix].performance.toFixed();
    document.getElementById(prefix + 'Accessibility').textContent = lighthouseData[prefix].accessibility.toFixed();
    document.getElementById(prefix + 'BestPractices').textContent = lighthouseData[prefix].bestPractices.toFixed();
    document.getElementById(prefix + 'SEO').textContent = lighthouseData[prefix].seo.toFixed();
  });
}

// Función para obtener un color aleatorio
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function loadAndProcessJSON(filename, prefix) {
  fetch(`./lighthouse/${filename}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${filename}: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(jsonData => {
        const parsedData = parseLighthouseData(jsonData, prefix);
        // Llamar a la función para generar los gráficos después de procesar los datos de cada archivo JSON
        generateCharts();
      })
      .catch(error => console.error(`Error fetching ${filename}:`, error));
}

const files = [
  { filename: 'audit-chz-desktop.report.json', prefix: 'chzDesktop' },
  { filename: 'audit-chz-mobile.report.json', prefix: 'chzMobile' },
  { filename: 'audit-ebw-desktop.report.json', prefix: 'ebwDesktop' },
  { filename: 'audit-ebw-mobile.report.json', prefix: 'ebwMobile' },
  { filename: 'audit-crd-desktop.report.json', prefix: 'crdDesktop' },
  { filename: 'audit-crd-mobile.report.json', prefix: 'crdMobile' },
  { filename: 'audit-kym-desktop.report.json', prefix: 'kymDesktop' },
  { filename: 'audit-kym-mobile.report.json', prefix: 'kymMobile' }
];

files.forEach(file => {
  loadAndProcessJSON(file.filename, file.prefix);
});
