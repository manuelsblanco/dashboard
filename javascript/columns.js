document.addEventListener("DOMContentLoaded", function() {
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
});

// Reutiliza esta función para cada archivo JSON
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
        // Cuando los datos se han procesado, pasa los datos procesados y el prefijo al generador de gráficos
        generateChart(parsedData, prefix);
      })
      .catch(error => console.error(`Error fetching ${filename}:`, error));
}

// Utilice generateChart en lugar de generateCharts
function generateChart(data, prefix) {
  const ctx = document.getElementById(prefix + 'Canvas').getContext('2d');

  // Configuración de los datos para el gráfico
  const chartData = {
    labels: ['Accessibility', 'Best Practices', 'Performance', 'SEO'],
    datasets: [{
      label: prefix,
      backgroundColor: getRandomColor(),
      data: [
        data.accessibility,
        data.bestPractices,
        data.performance,
        data.seo
      ]
    }]
  };

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
  const myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: chartData,
    options: options
  });
}
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

    return { accessibility, bestPractices, performance, seo };
  } catch (error) {
    console.error(`Error parsing Lighthouse data for prefix ${prefix}:`, error);
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
