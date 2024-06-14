from pages.global_functions import SeleniumTest
import pytest


class TestNewest:

    newest_stage = 'betatester' + ":" + 'betatester' + "@" + "stage2.ebaumsworld.com/newest/"
    newest_title = "Funny Videos and Pictures - All | eBaum's World"
    newest_prod = "www.ebaumsworld.com/newest/"
    @pytest.fixture
    def setup(self):
        self.selenium_test = SeleniumTest()

    def test_open_url_stage(self, setup):
        try:
            self.selenium_test.open_url(self.selenium_test.main_url(self.newest_stage))
            assert self.newest_stage.split('@')[1] in self.selenium_test.driver.current_url
        finally:
            self.selenium_test.driver.quit()

    def test_title_stage(self, setup):
        try:
            self.selenium_test.open_url(self.selenium_test.main_url(self.newest_stage))
            assert self.newest_title == self.selenium_test.driver.title
        finally:
            self.selenium_test.driver.quit()

    def test_open_url_prod(self, setup):
        try:
            self.selenium_test.open_url(self.selenium_test.main_url(self.newest_prod))
            assert self.newest_prod in self.selenium_test.driver.current_url
        finally:
            self.selenium_test.driver.quit()

    def test_title_prod(self, setup):
        try:
            self.selenium_test.open_url(self.selenium_test.main_url(self.newest_prod))
            assert self.selenium_test.driver.title == self.newest_title
        finally:
            self.selenium_test.driver.quit()

    def test_add_shemedia_stage(self, setup):
        try:
            self.selenium_test.search_ad_by_class_id(self.selenium_test.main_url(self.newest_stage), "skm-ad-banner-1")
        finally:
            self.selenium_test.driver.quit()

    def test_add_shemedia_prod(self, setup):
        try:
            self.selenium_test.search_ad_by_class_id(self.selenium_test.main_url(self.newest_prod), "skm-ad-banner-1")
        finally:
            self.selenium_test.driver.quit()