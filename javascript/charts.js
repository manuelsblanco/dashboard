window.addEventListener('DOMContentLoaded', (event) => {
    const fileNames = ['chz.html', 'ebw.html', 'crd.html', 'kym.html'];
    const basePath = 'pytest/'; // Ruta base donde se encuentran los archivos HTML

    Promise.all(fileNames.map(filename =>
        fetch(basePath + filename).then(response => response.text())
    ))
        .then(dataArr => {
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(() => {
                dataArr.forEach((data, i) => {
                    let parser = new DOMParser();
                    let doc = parser.parseFromString(data, 'text/html');

                    let failedElement = doc.querySelector('.failed');
                    let passedElement = doc.querySelector('.passed');
                    let skippedElement = doc.querySelector('.skipped');
                    let xfailElement = doc.querySelector('.xfailed');

                    let failed = failedElement?.textContent || "0";
                    let passed = passedElement?.textContent || "0";
                    let skipped = skippedElement?.textContent || "0";
                    let xfail = xfailElement?.textContent || "0";

                    let numFailed = Number(failed.split(" ")[0]);
                    let numPassed = Number(passed.split(" ")[0]);
                    let numSkipped = Number(skipped.split(" ")[0]);
                    let numXfail = Number(xfail.split(" ")[0]);
                    let title = fileNames[i].split('.')[0];

                    drawChart({numFailed, numPassed, numSkipped, numXfail, title});
                });
            });

            function drawChart({numFailed, numPassed, numSkipped, numXfail, title}) {
                const data = google.visualization.arrayToDataTable([
                    ['Result', 'Number of tests'],
                    ['Failed', numFailed],
                    ['Passed', numPassed],
                    ['Skipped', numSkipped],
                    ['Xfail', numXfail]
                ]);

                const options = {colors: ['#FF0000', '#178017', '#c2c238','#000000']};

                const targetElement = document.getElementById(title + '-results');
                const chartDiv = document.createElement('div');
                chartDiv.style.width = '370px';
                chartDiv.style.height = '370px';

                targetElement.appendChild(chartDiv);

                const chart = new google.visualization.PieChart(chartDiv);
                chart.draw(data, options);
            }
        })
        .catch(e => console.error(e));

});
