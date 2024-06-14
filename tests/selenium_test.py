from selenium.common import TimeoutException, NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
import time
import tests.conftest as conftest


class SeleniumTest:
    def __init__(self, driver):
        self.driver = driver
        self.protocol = "https://"

    def open_url(self, url: str):
        """
        This function opens a specified URL in the browser.

        Args:
            url (str): The URL of the web page to open.
        """
        if self.driver.get(url):
            return True
        else:
            return False

    def sign_in(self, url: str, username: str, password: str):
        """
        This function is used to automate the sign in process in a web application.

        Args:
            url (str): The main URL of the web application.
            username (str): The username to use for login.
            password (str): The password to use for login.

        Raises:
            AssertionError: If the "adminPanel" web element is not found on the page after attempting to log in.
        """
        self.driver.get(self.main_url(url))
        self.driver.maximize_window()
        self.accept_cookies()
        self.driver.find_element(By.CLASS_NAME, "signIn").click()
        self.driver.find_element(By.ID, "input-username").send_keys(username)
        self.driver.find_element(By.ID, "input-password").send_keys(password)
        submit_button = self.driver.find_element(By.ID, "submitLoginBtn")
        submit_button.click()

        try:
            WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "adminPanel")))
        except TimeoutException:
            raise AssertionError("Login unsuccessful, adminPanel not found after login.")

    def main_url(self, url: str):
        """
        Returns a well-formed URL with the correct protocol.

        Args:
            url (str): The input URL that may be without a protocol.

        Returns:
            str: The URL with the correct protocol.
        """
        if "://" not in url:
            return self.protocol + url
        return url

    def open_url_maximize(self, url: str):
        """
        Opens a specified URL in the browser, maximizes the window, and waits for it to load.

        Args:
            url (str): The URL of the web page to open.
        """
        self.driver.get(url)
        self.driver.maximize_window()
        self.driver.implicitly_wait(10)

    def search_ad_by_class_id(self, url: str, id: str):
        """
        Opens the specified URL, maximizes the browser window,
        scrolls down the webpage, waits for up to 20 seconds for an element
        with the specified ID to appear, and asserts its presence on the page.

        Args:
            url (str): The URL to open.
            id (str): The ID of the element to search for.

        Returns:
            bool: True if the element is found, False otherwise.
        """
        self.open_url_maximize(self.main_url(url))
        self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        self.driver.implicitly_wait(20)
        try:
            self.driver.find_element(By.ID, id)
            return True
        except NoSuchElementException:
            return False

    def search_ad_by_class_name(self, url: str, classname: str):
        """
        Opens the specified URL, maximizes the browser window,
        scrolls down the webpage, waits for up to 20 seconds for an element
        with the specified class name to appear, and asserts its presence on the page.

        Args:
            url (str): The URL to open.
            classname (str): The class name of the element to search for.

        Raises:
            AssertionError: If the element with the specified class name is not found.

        Returns:
            bool: True if the element is found.
        """
        self.open_url_maximize(self.main_url(url))
        self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        self.driver.implicitly_wait(20)
        assert self.driver.find_element(By.CLASS_NAME, classname)

    def test_video_upload(self, link: str, title: str, description: str, tag: str):
        """
        Uploads a video to the web application and verifies its presence on the page.

        Args:
            link (str): The link to the video.
            title (str): The title of the video.
            description (str): The description of the video.
            tag (str): The tag associated with the video.
        """
        self.upload_button()
        self.driver.find_element(By.ID, "selectMedia-video").click()
        self.driver.find_element(By.ID, "input-youTubeLink").send_keys(link)
        self.add_listing(description, tag, title)
        self.view_content_and_assert(description, title)

        if "youtube" in link:
            assert self.driver.page_source.__contains__(link), f"The link {link} is not found on the page."
        elif "tiktok" in link:
            assert self.driver.page_source.__contains__("https://www.tiktok.com/embed.js"), "TikTok embed not found."
        elif "twitter" in link:
            assert self.driver.page_source.__contains__(
                "https://platform.twitter.com/widgets.js"), "Twitter embed not found."
        elif "instagram" in link:
            assert self.driver.page_source.__contains__(
                "https://www.instagram.com/embed.js"), "Instagram embed not found."

    def upload_button(self):
        """
        Clicks the upload button on the web page.
        """
        self.driver.find_element(By.XPATH, "//li[@class='upload']/a").click()
        self.driver.maximize_window()
        self.driver.implicitly_wait(10)

    def test_video_upload_embed(self, embed: str, title: str, description: str, tag: str):
        """
        Uploads a video embed code to the web application and verifies its presence on the page.

        Args:
            embed (str): The embed code of the video.
            title (str): The title of the video.
            description (str): The description of the video.
            tag (str): The tag associated with the video.
        """
        self.upload_button()
        self.driver.find_element(By.ID, "selectMedia-video").click()
        self.driver.find_element(By.ID, "input-embedCode").send_keys(embed)
        self.add_listing(description, tag, title)
        self.view_content_and_assert(description, title)

    def view_content_and_assert(self, description, title):
        """
        Views the content and asserts its presence on the page.

        Args:
            description (str): The expected description of the content.
            title (str): The expected title of the content.
        """
        self.driver.implicitly_wait(5)
        self.driver.find_element(By.LINK_TEXT, "Click here to view your content.").click()
        self.driver.implicitly_wait(5)
        assert self.driver.find_element(By.CLASS_NAME, "title").text == title
        assert self.driver.find_element(By.CLASS_NAME, "description").text == description

    def add_listing(self, description: str, tag: str, title: str):
        """
        Adds a listing to the web application.

        Args:
            description (str): The description of the listing.
            tag (str): The tag associated with the listing.
            title (str): The title of the listing.
        """
        self.driver.find_element(By.ID, "input-title").send_keys(title)
        self.driver.find_element(By.ID, "input-description_long").send_keys(description)
        self.driver.find_element(By.ID, "input-tag").send_keys(tag)
        self.driver.find_element(By.ID, "input-category").click()
        self.driver.find_element(By.ID, "category-37").click()
        self.driver.find_element(By.ID, "termsCheckBox").click()
        self.driver.find_element(By.ID, "submitBtn").click()

    def mosaic_area(self, page: str, classname: str, environment: str):
        """
        Performs actions in the mosaic area of the web application.

        Args:
            page (str): The URL of the page to perform actions on.
            classname (str): The class name to assert in the mosaic area.
            environment (str): The environment to perform actions in (stage or prod).

        Returns:
            bool: True if the actions were successful, False otherwise.
        """
        links = []
        links_id = []

        if environment == "stage":
            if self.open_url(page) and self.assert_mosaic(classname):
                return True

        elif environment == "prod":
            self.open_url(page)
            self.assert_mosaic(classname)

            try:
                wait = WebDriverWait(self.driver, 5)
                element = wait.until(EC.element_to_be_clickable((By.ID, "pmc-atlasmg-adhesion-close")))
                element.click()
            except TimeoutException:
                pass

            links.append(self.driver.find_element(By.ID, "bigMosaicLink").get_attribute("href"))
            for i in range(1, 5):
                links.append(self.driver.find_element(By.ID, f"smallMosaicLink-{i}").get_attribute("href"))

            actions = ActionChains(self.driver)
            for i in range(len(links) - 1):
                actions.key_down(Keys.COMMAND).click(
                    self.driver.find_element(By.ID, f"smallMosaicLink-{i + 1}")).key_up(Keys.COMMAND)
            actions.key_down(Keys.COMMAND).click(self.driver.find_element(By.ID, "bigMosaicLink")).key_up(Keys.COMMAND)
            actions.perform()
            time.sleep(3)

            for link in links:
                links_id.append(link.split("/")[-2])

            for i in range(1, min(len(links) + 1, len(self.driver.window_handles))):
                self.driver.switch_to.window(self.driver.window_handles[i])
                time.sleep(3)
                if self.driver.current_url.split("/")[-2] not in links_id:
                    return False
            return True

    def assert_mosaic(self, classname):
        """
        Asserts the presence of elements in the mosaic area.

        Args:
            classname (str): The class name to assert.

        Returns:
            bool: True if all elements are present, False otherwise.
        """
        try:
            self.driver.find_element(By.CLASS_NAME, classname)
            self.driver.find_element(By.ID, "bigMosaicLink")
            self.driver.find_element(By.ID, "smallMosaicLink-1")
            self.driver.find_element(By.ID, "smallMosaicLink-2")
            self.driver.find_element(By.ID, "smallMosaicLink-3")
            self.driver.find_element(By.ID, "smallMosaicLink-4")
            return True
        except NoSuchElementException:
            return False

    def accept_cookies(self):
        """
        Accepts cookies on the web page.

        Raises:
            TimeoutException: If the cookies dialog does not appear within 10 seconds.
        """
        try:
            wait = WebDriverWait(self.driver, 10)
            element = wait.until(EC.presence_of_element_located((By.ID, "save")))
            element.click()
        except TimeoutException:
            print("TimeoutException: Cookie dialog did not appear.")
        except Exception as e:
            print(f"Error al aceptar cookies: {str(e)}")
