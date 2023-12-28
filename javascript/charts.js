window.addEventListener('DOMContentLoaded', (event) => {
    const fileNames = ['chz.html', 'ebw.html', 'cracked.html', 'kym.html'];

    Promise.all(fileNames.map(filename =>
        fetch(filename).then(response => response.text())
    ))
        .then(dataArr => {
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(() => {
                dataArr.forEach((data, i) => {
                    let parser = new DOMParser();
                    let doc = parser.parseFromString(data, 'text/html');

                    let failed = doc.querySelector('.failed').textContent;
                    let passed = doc.querySelector('.passed').textContent;
                    let skipped = doc.querySelector('.skipped').textContent;

                    let numFailed = Number(failed.split(" ")[0]);
                    let numPassed = Number(passed.split(" ")[0]);
                    let numSkipped = Number(skipped.split(" ")[0]);
                    let title = fileNames[i].split('.')[0];

                    drawChart({numFailed, numPassed, numSkipped, title});
                });
            });

            function drawChart({numFailed, numPassed, numSkipped, title}) {
                const data = google.visualization.arrayToDataTable([
                    ['Result', 'Number of tests'],
                    ['Failed', numFailed],
                    ['Passed', numPassed],
                    ['Skipped', numSkipped]
                ]);

                const options = {colors: ['#FF0000', '#178017', '#c2c238']};

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