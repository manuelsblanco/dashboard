from pages.global_functions import SeleniumTest
import pytest


class TestMain:

    main_stage = 'betatester' + ":" + 'betatester' + "@" + "stage2.ebaumsworld.com/"
    main_title = "Funny Pictures, Funny Videos | eBaum's World"
    main_prod = "www.ebaumsworld.com/"


    @pytest.fixture
    def setup(self):
        self.selenium_test = SeleniumTest()

    def test_login_stage(self, setup):
        try:
            print("test_login STAGE")
            self.selenium_test.sign_in(self.main_stage)
        finally:
            self.selenium_test.driver.quit()

    def test_open_url_stage(self, setup):
        try:
            print("test_open_url STAGE")
            self.selenium_test.open_url(self.selenium_test.main_url(self.main_stage))
            assert self.main_stage.split('@')[-1] in self.selenium_test.driver.current_url
        finally:
            self.selenium_test.driver.quit()

    def test_title_stage(self, setup):
        try:
            print("test_title STAGE")
            self.selenium_test.open_url(self.selenium_test.main_url(self.main_stage))
            assert self.selenium_test.driver.title == self.main_title
        finally:
            self.selenium_test.driver.quit()

    @pytest.mark.xfail
    def test_any_clip_stage(self, setup):
        try:
            print("test_any_clip STAGE")
            self.selenium_test.search_ad_by_class_name(self.selenium_test.main_url(self.main_stage), "mediaWidget")
        finally:
            self.selenium_test.driver.quit()

    def test_she_ads_conditional_stage(self, setup):
        try:
            print("test_she_ads_conditional STAGE")
            self.selenium_test.search_ad_by_class_name(self.selenium_test.main_url(self.main_stage), "mediumRect")
        finally:
            self.selenium_test.driver.quit()

    def test_login_prod(self, setup):
        try:
            print("test_login PROD")
            self.selenium_test.sign_in(self.main_prod)
        finally:
            self.selenium_test.driver.quit()

    def test_open_url_prod(self, setup):
        try:
            print("test_open_url PROD")
            self.selenium_test.open_url(self.selenium_test.main_url(self.main_prod))
            assert self.main_prod in self.selenium_test.driver.current_url
        finally:
            self.selenium_test.driver.quit()

    def test_title_prod(self, setup):
        try:
            print("test_title PROD")
            self.selenium_test.open_url(self.selenium_test.main_url(self.main_prod))
            assert self.selenium_test.driver.title == self.main_title
        finally:
            self.selenium_test.driver.quit()

    @pytest.mark.xfail
    def test_any_clip_prod(self, setup):
        try:
            print("test_any_clip PROD")
            self.selenium_test.search_ad_by_class_name(self.selenium_test.main_url(self.main_prod), "mediaWidget")
        finally:
            self.selenium_test.driver.quit()

    def test_she_ads_conditional_prod(self, setup):
        try:
            print("test_she_ads_conditional PROD")
            self.selenium_test.search_ad_by_class_name(self.selenium_test.main_url(self.main_prod), "mediumRect")
        finally:
            self.selenium_test.driver.quit()
