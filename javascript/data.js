const fileNames = ['pytest/chz.html', 'pytest/ebw.html', 'pytest/crd.html', 'pytest/kym.html'];

const fetchPromises = fileNames.map(fileName => fetch(fileName).then(response => response.text()));

Promise.all(fetchPromises)
    .then(responses => {
        responses.forEach((htmlString, index) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');

            const failedElement = doc.querySelector('.failed');
            const passedElement = doc.querySelector('.passed');
            const skippedElement = doc.querySelector('.skipped');
            const xfailedElement = doc.querySelector('.xfailed');

            const failed = failedElement ? parseInt(failedElement.textContent.match(/\d+/)[0], 10) : 0;
            const passed = passedElement ? parseInt(passedElement.textContent.match(/\d+/)[0], 10) : 0;
            const skipped = skippedElement ? parseInt(skippedElement.textContent.match(/\d+/)[0], 10) : 0;
            const xfailed = xfailedElement ? parseInt(xfailedElement.textContent.match(/\d+/)[0], 10) : 0;

            const key = fileNames[index].split('.')[0].toUpperCase();

            document.getElementById(`totalTest-${key}`).textContent = failed + passed + skipped + xfailed;
            document.getElementById(`passed-${key}`).textContent = passed;
            document.getElementById(`failed-${key}`).textContent = failed;
            document.getElementById(`xfailed-${key}`).textContent = xfailed;
            document.getElementById(`skipped-${key}`).textContent = skipped;
        });
    });