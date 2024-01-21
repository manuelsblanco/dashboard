window.addEventListener('DOMContentLoaded', (event) => {

    // Para chz.html
    document.getElementById("chz-results").addEventListener("click", function () {
        document.getElementById("CHZ-destination").scrollIntoView({behavior: "smooth"});
    });

    // Para ebw.html
    document.getElementById("ebw-results").addEventListener("click", function () {
        document.getElementById("EBW-destination").scrollIntoView({behavior: "smooth"});
    });

    // Para crd.html
    document.getElementById("crd-results").addEventListener("click", function () {
        document.getElementById("CRD-destination").scrollIntoView({behavior: "smooth"});
    });

    // Para kym.html
    document.getElementById("kym-results").addEventListener("click", function () {
        document.getElementById("KYM-destination").scrollIntoView({behavior: "smooth"});
    });

});