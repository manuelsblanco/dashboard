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

    // Check if the prefix indicates desktop or mobile
    if (prefix.endsWith('Desktop')) {
      // Write values to desktop HTML elements
      document.getElementById(`${prefix}P`).textContent = performance.toFixed();
      document.getElementById(`${prefix}A`).textContent = accessibility.toFixed();
      document.getElementById(`${prefix}BP`).textContent = bestPractices.toFixed();
      document.getElementById(`${prefix}SEO`).textContent = seo.toFixed();
    } else if (prefix.endsWith('Mobile')) {
      // Write values to mobile HTML elements
      document.getElementById(`${prefix}P`).textContent = performance.toFixed();
      document.getElementById(`${prefix}A`).textContent = accessibility.toFixed();
      document.getElementById(`${prefix}BP`).textContent = bestPractices.toFixed();
      document.getElementById(`${prefix}SEO`).textContent = seo.toFixed();
    }

    return { accessibility, bestPractices, performance, seo };
  } catch (error) {
    console.error(`Error parsing Lighthouse data for prefix ${prefix}:`, error);
  }
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
        // Additional processing if needed
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
