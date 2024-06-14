from pages.global_functions import SeleniumTest
import pytest


class TestGalleries:

    galleries_stage = 'betatester' + ":" + 'betatester' + "@" + "stage2.ebaumsworld.com/pictures/"
    galleries_prod = "www.ebaumsworld.com/pictures/"
    galleries_title = "Funny Pictures - Featured | eBaum's World"

    @pytest.fixture
    def setup(self):
        self.selenium_test = SeleniumTest()

    def test_open_url_stage(self, setup):
        try:
            self.selenium_test.open_url(self.selenium_test.main_url(self.galleries_stage))
            assert self.galleries_stage.split('@')[-1] in self.selenium_test.driver.current_url
        finally:
            self.selenium_test.driver.quit()

    def test_open_url_prod(self, setup):
        try:
            self.selenium_test.open_url(self.selenium_test.main_url(self.galleries_prod))
            assert self.selenium_test.driver.current_url == self.selenium_test.main_url(self.galleries_prod)
        finally:
            self.selenium_test.driver.quit()

    def test_title_stage(self, setup):
        try:
            self.selenium_test.open_url(self.selenium_test.main_url(self.galleries_stage))
            assert self.selenium_test.driver.title == self.galleries_title
        finally:
            self.selenium_test.driver.quit()

    def test_title_prod(self, setup):
        try:
            self.selenium_test.open_url(self.selenium_test.main_url(self.galleries_prod))
            assert self.selenium_test.driver.title == self.galleries_title
        finally:
            self.selenium_test.driver.quit()

    def test_add_shemedia_stage(self, setup):
        try:
            self.selenium_test.search_ad_by_class_id(self.selenium_test.main_url(self.galleries_stage), "skm-ad"
                                                                                                        "-banner-1")
        finally:
            self.selenium_test.driver.quit()

    def test_add_shemedia_prod(self, setup):
        try:
            self.selenium_test.search_ad_by_class_id(self.selenium_test.main_url(self.galleries_prod), "skm-ad-banner-1")
        finally:
            self.selenium_test.driver.quit()
