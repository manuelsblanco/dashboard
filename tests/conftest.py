import pytest
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium import webdriver


@pytest.fixture(autouse=True)
def selenium_driver(request):
    """
    Fixture que inicializa el driver de Selenium según el modo especificado (desktop o mobile).
    Cierra el driver al finalizar las pruebas.
    """
    global driver
    modo = getattr(request.module, "modo", "desktop")  # Obtener el modo de ejecución del módulo de la prueba
    firefox_options = FirefoxOptions()

    if modo == "desktop":
        firefox_options.add_argument("--headless")
        driver = webdriver.Firefox(options=firefox_options)
    elif modo == "mobile":
        firefox_options.add_argument("--width=360")
        firefox_options.add_argument("--height=640")
        firefox_options.add_argument("--auto-open-devtools-for-tabs")
        firefox_options.add_argument(
            "--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, "
            "like Gecko) Version/15.0 Mobile/15E148 Safari/604.1")
        firefox_options.add_argument("--headless")
        driver = webdriver.Firefox(options=firefox_options)
        driver.execute_script("document.documentElement.style.width='360px'; "
                              "document.documentElement.style.height='640px';")

    yield driver

    # Cerrar el driver al finalizar las pruebas
    try:
        driver.quit()
    except Exception as e:
        print(f"Error al cerrar el driver: {str(e)}")
