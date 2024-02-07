from time import sleep
from datetime import datetime
import requests

url_CHZ_JSON = 'https://cheezburger.github.io/literally-qa-automation-results/pytest/chz.json'
url_EBW_JSON = 'https://cheezburger.github.io/literally-qa-automation-results/pytest/ebw.json'
date_EBW = ''
date_CHZ = ''

url_slack = 'https://hooks.slack.com/services/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'
texto_enlace_ebaum = '[eBaum\'s World](https://cheezburger.github.io/literally-qa-automation-results/pytest/ebw.json)'
texto_enlace_cheezburger = '[Cheezburger 🐱](https://cheezburger.github.io/literally-qa-automation-results/pytest/chz.json)'



def bot_message(message):
    requests.post(url_slack, json={'text': message})
    print(message)


def obtain_report_date(url):
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data:
            report_date = data.get("report", {}).get("created_at", "")
            if report_date:
                dt = datetime.strptime(report_date, "%Y-%m-%d %H:%M:%S.%f")
                formatted_date = dt.strftime("%m/%d/%Y %I:%M %p")
                return formatted_date


def obtain_report_performance(url):
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data:
            summary = data.get("report", {}).get("summary", {})
            if summary:
                bot_message("Report Summary:")
                for key, value in summary.items():
                    bot_message(f"{key.capitalize()}: {value}")
                total_tests = summary.get('num_tests', 0) - summary.get('skipped', 0)
                if total_tests > 0:
                    failed = summary.get('failed', 0)
                    failed_percentage = round((failed / total_tests) * 100, 2)
                    bot_message(f"Effectivity of Test Audit: {100 - failed_percentage}%")
                else:
                    bot_message("No tests run.")
            else:
                bot_message("Summary not found in the JSON report")
        else:
            bot_message("Data not found in the JSON report")


def failed_details(url, site):
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data:
            tests = data.get("report", {}).get("tests", [])
            if tests:
                failed_tests = [test for test in tests if test.get('outcome') == 'failed']
                if failed_tests:
                    bot_message(f"Failed Test Details: {len(failed_tests)} failed tests for {site} at {obtain_report_date(url)}")
                    for test in failed_tests:
                        bot_message(f"Test Name: {test.get('name')}")
                        bot_message("--------------------")
                else:
                    bot_message(f"🤖 Congratulations all the test passed for {site} at {obtain_report_date(url)}")
            else:
                bot_message("No tests found in the report 🤔.")
        else:
            bot_message("Data not found in the JSON report 😳")


while True:
    sleep(300)
    if date_EBW != obtain_report_date(url_EBW_JSON):
        date_EBW = obtain_report_date(url_EBW_JSON)
        failed_details(url_EBW_JSON, texto_enlace_ebaum)

    sleep(300)
    if date_CHZ != obtain_report_date(url_CHZ_JSON):
        date_CHZ = obtain_report_date(url_CHZ_JSON)
        failed_details(url_CHZ_JSON, texto_enlace_cheezburger)

