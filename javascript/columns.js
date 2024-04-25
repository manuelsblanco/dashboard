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
  fetch(`./lighthouse/files/${filename}`)
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

  // Configuración del gráfico
  const options = {
    indexAxis: 'y', // Cambio aquí para hacer el gráfico horizontal
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        stacked: true
      }
    }
  };

  // Configuración de los datos para el gráfico
  const chartData = {
    labels: ['Performance', 'Accessibility', 'Best Practices', 'SEO'],
    datasets: [{
      label: prefix,
      data: [
        data.performance,
        data.accessibility,
        data.bestPractices,
        data.seo
      ],
      backgroundColor: [
        getColorForScore(data.performance),
        getColorForScore(data.accessibility),
        getColorForScore(data.bestPractices),
        getColorForScore(data.seo)
      ],
      borderColor: [
        getBorderColorForScore(data.performance),
        getBorderColorForScore(data.accessibility),
        getBorderColorForScore(data.bestPractices),
        getBorderColorForScore(data.seo)
      ],
      borderWidth: 0,
      borderRadius: 10 // Ajusta el valor del radio de borde según tu preferencia
    }]
  };

  // Crear el gráfico de barras horizontales
  const config = {
    type: 'bar',
    data: chartData,
    options: options
  };

  // Crear el gráfico con Chart.js
  const myChart = new Chart(ctx, config);

  document.getElementById(prefix + 'Canvas')
  document.getElementById(prefix + 'Canvas')
}

function parseLighthouseData(json, prefix) {
  try {
    if (!json.categories || !json.categories.accessibility || !json.categories['best-practices'] || !json.categories.performance || !json.categories.seo) {
      throw new Error('Missing categories in JSON data');
    }

    const accessibilityScore = json.categories.accessibility.score * 100;
    const bestPracticesScore = json.categories['best-practices'].score * 100;
    const performanceScore = json.categories.performance.score * 100;
    const seoScore = json.categories.seo.score * 100;

    return { accessibility: accessibilityScore, bestPractices: bestPracticesScore, performance: performanceScore, seo: seoScore };
  } catch (error) {
    console.error(`Error parsing Lighthouse data for prefix ${prefix}:`, error);
  }
}

function getColorForScore(score) {
  if (score <= 49) {
    return '#f33'; // Rojo para valores bajos
  } else if (score <= 89) {
    return '#fa3'; // Amarillo para valores intermedios
  } else {
    return '#0c6'; // Verde para valores altos
  }
}

function getBorderColorForScore(score) {
  if (score <= 49) {
    return '#f33'; // Rojo para valores bajos
  } else if (score <= 89) {
    return '#fa3'; // Amarillo para valores intermedios
  } else {
    return '#0c6'; // Verde para valores altos
  }
}
