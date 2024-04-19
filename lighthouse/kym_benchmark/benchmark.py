import subprocess
import os

# Array de URLs
urls = [
    "https://knowyourmeme.com/photos",
    "https://knowyourmeme.com/editorials/collections/15-adventure-time-memes-for-all-the-dedicated-fans",
    "https://knowyourmeme.com/editorials/guides/what-does-nothing-ever-happens-mean-the-discourse-stagnation-meme-explained",
    "https://knowyourmeme.com/memes/shroomjak-mushroom-wojak",
    "https://knowyourmeme.com",
    "https://knowyourmeme.com/news/widely-roasted-ai-animation-princess-jane-gets-a-sequel-gets-doubly-roasted",
    "https://knowyourmeme.com/search?context=&sort=&q=soccer",
    "https://knowyourmeme.com/memes/rickroll",
    "https://knowyourmeme.com/memes"
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
    # Prueba de escritorio - redesign
    desktop_url_redesign = url + "?ab_test[split]=redesign"
    desktop_output_path_redesign = os.path.join(output_directory,
                                       f"{desktop_url_redesign.replace('https://', '').replace('/', '_')}_desktop_redesign.json")
    run_lighthouse(desktop_url_redesign, desktop_output_path_redesign)

    # Prueba de móvil - redesign
    mobile_url_redesign = url + "?ab_test[split]=redesign"
    mobile_output_path_redesign = os.path.join(output_directory,
                                      f"{url.replace('https://', '').replace('/', '_')}_mobile_redesign.json")
    run_lighthouse(mobile_url_redesign, mobile_output_path_redesign)

    # Prueba de escritorio - control
    desktop_url_control = url + "?ab_test[split]=control"
    desktop_output_path_control = os.path.join(output_directory,
                                       f"{desktop_url_control.replace('https://', '').replace('/', '_')}_desktop_control.json")
    run_lighthouse(desktop_url_control, desktop_output_path_control)

    # Prueba de móvil - control
    mobile_url_control = url + "?ab_test[split]=control"
    mobile_output_path_control = os.path.join(output_directory,
                                      f"{url.replace('https://', '').replace('/', '_')}_mobile_control.json")
    run_lighthouse(mobile_url_control, mobile_output_path_control)
