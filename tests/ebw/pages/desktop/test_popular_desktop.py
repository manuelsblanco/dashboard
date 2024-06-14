from pages.global_functions import SeleniumTest
import pytest


class TestPopular:

    popular_stage = 'betatester' + ":" + 'betatester' + "@" + "stage2.ebaumsworld.com/popular/"
    popular_prod = "www.ebaumsworld.com/popular/"
    popular_title = "Popular - Featured Videos and Pictures | eBaum's World"

    @pytest.fixture
    def setup(self):
        self.selenium_test = SeleniumTest()

    def test_open_url_stage(self, setup):
        try:
            self.selenium_test.open_url(self.selenium_test.main_url(self.popular_stage))
            assert self.popular_stage.split('@')[-1] in self.selenium_test.driver.current_url
        finally:
            self.selenium_test.driver.quit()

    def test_open_url_prod(self, setup):
        try:
            self.selenium_test.open_url(self.selenium_test.main_url(self.popular_prod))
            assert self.popular_prod in self.selenium_test.driver.current_url
        finally:
            self.selenium_test.driver.quit()

    def test_title_prod(self, setup):
        try:
            self.selenium_test.open_url_maximize(self.selenium_test.main_url(self.popular_prod))
            assert self.popular_title == self.selenium_test.driver.title
        finally:
            self.selenium_test.driver.quit()

    def test_title_stage(self, setup):
        try:
            self.selenium_test.open_url(self.selenium_test.main_url(self.popular_stage))
            assert self.popular_title == self.selenium_test.driver.title
        finally:
            self.selenium_test.driver.quit()

    def test_add_shemedia_stage(self, setup):
        try:
            self.selenium_test.search_ad_by_class_id(self.selenium_test.main_url(self.popular_stage), "skm-ad-banner-1")
        finally:
            self.selenium_test.driver.quit()

    def test_add_shemedia_prod(self, setup):
        try:
            self.selenium_test.search_ad_by_class_id(self.selenium_test.main_url(self.popular_prod), "skm-ad-banner-1")
        finally:
            self.selenium_test.driver.quit()

