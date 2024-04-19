import subprocess
import os

# Array de URLs
urls = [
    "https://knowyourmeme.com/photos?ab_test[split]=",
    "https://knowyourmeme.com/editorials/collections/15-adventure-time-memes-for-all-the-dedicated-fans?ab_test[split]=",
    "https://knowyourmeme.com/editorials/guides/what-does-nothing-ever-happens-mean-the-discourse-stagnation-meme-explained?ab_test[split]=",
    "https://knowyourmeme.com/memes/shroomjak-mushroom-wojak?ab_test[split]=",
    "https://knowyourmeme.com?ab_test[split]=",
    "https://knowyourmeme.com/news/widely-roasted-ai-animation-princess-jane-gets-a-sequel-gets-doubly-roasted?ab_test[split]=",
    "https://knowyourmeme.com/search?context=&sort=&q=test&ab_test[split]=",
    "https://knowyourmeme.com/memes/rickroll?ab_test[split]=",
    "https://knowyourmeme.com/memes?ab_test[split]="
]

# Directorio para guardar los resultados JSON
output_directory = "/Users/msb/Documents/Repos/QA_Automation/lighthouse/kym_benchmark"


# Función para ejecutar Lighthouse
def run_lighthouse(url, output_path):
    command = (f"lighthouse {url} --output json --output-path={output_path} --chrome-flags=\"--headless\" "
               f"--only-categories=performance")
    subprocess.run(command, shell=True)


# Verificar y crear el directorio de salida si no existe
if not os.path.exists(output_directory):
    os.makedirs(output_directory)

for url in urls:
    # Prueba de escritorio
    desktop_url = url + "redesign"
    desktop_output_path = os.path.join(output_directory,
                                       f"{desktop_url.replace('https://', '').replace('/', '_')}_desktop.json")
    run_lighthouse(desktop_url, desktop_output_path)

    # Prueba móvil
    mobile_url = url + "control"
    mobile_output_path = os.path.join(output_directory,
                                      f"{url.replace('https://', '').replace('/', '_')}_mobile.json")
    run_lighthouse(mobile_url, mobile_output_path)

