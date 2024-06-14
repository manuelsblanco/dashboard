from pages.global_functions import SeleniumTest
import pytest


class TestGaming:

    gaming_stage = 'betatester' + ":" + 'betatester' + "@" + "stage2-gaming.ebaumsworld.com/gaming/"
    gaming_prod = "gaming.ebaumsworld.com/gaming/"
    gaming_title = "Gaming Videos and Pictures - All | eBaum's World"
    @pytest.fixture
    def setup(self):
        self.selenium_test = SeleniumTest()

    def test_open_url_stage(self, setup):
        try:
            self.selenium_test.open_url(self.selenium_test.main_url(self.gaming_stage))
            assert self.gaming_stage.split("@")[-1] in self.selenium_test.driver.current_url
        finally:
            self.selenium_test.driver.quit()

    def test_open_url_prod(self, setup):
        try:
            self.selenium_test.open_url(self.selenium_test.main_url(self.gaming_prod))
            assert self.gaming_prod in self.selenium_test.driver.current_url
        finally:
            self.selenium_test.driver.quit()

    def test_title_stage(self, setup):
        try:
            self.selenium_test.open_url_maximize(self.selenium_test.main_url(self.gaming_stage))
            assert self.selenium_test.driver.title == self.gaming_title
        finally:
            self.selenium_test.driver.quit()

    def test_title_prod(self, setup):
        try:
            self.selenium_test.open_url(self.selenium_test.main_url(self.gaming_prod))
        finally:
            self.selenium_test.driver.quit()

    def test_mosaic_area_stage(self, setup):
        try:
            self.selenium_test.mosaic_area(self.selenium_test.main_url(self.gaming_stage), "mosaicArea", "stage")
        finally:
            self.selenium_test.driver.quit()

    def test_mosaic_area_prod(self, setup):
        try:
            self.selenium_test.mosaic_area(self.selenium_test.main_url(self.gaming_prod), "mosaicArea", "prod")
        finally:
            self.selenium_test.driver.quit()

    def test_add_shemedia_stage(self, setup):
        try:
            self.selenium_test.search_ad_by_class_id(self.selenium_test.main_url(self.gaming_stage), "skm-ad-banner-1")
        finally:
            self.selenium_test.driver.quit()

    def test_add_shemedia_prod(self, setup):
        try:
            self.selenium_test.search_ad_by_class_id(self.selenium_test.main_url(self.gaming_prod), "skm-ad-banner-1")
        finally:
            self.selenium_test.driver.quit()

