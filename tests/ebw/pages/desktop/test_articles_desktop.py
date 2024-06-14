from tests.selenium_test import SeleniumTest
import pytest


class TestArticles:
    articles_stage = 'betatester' + ":" + 'betatester' + "@" + "stage2.ebaumsworld.com/articles/"
    articles_prod = "www.ebaumsworld.com/articles/"
    articles_title = "Funny Videos - Featured | eBaum's World"

    @pytest.fixture(autouse=True)
    def setup(self, selenium_driver):  # Usa el driver proporcionado por la fixture de conftest.py
        self.selenium_test = SeleniumTest(selenium_driver)  # Pasa el driver a SeleniumTest
        yield

    def test_open_url_stage(self):
        for _ in range(3):
            self.selenium_test.open_url(self.selenium_test.main_url(self.articles_stage))
            assert self.selenium_test.driver.current_url == self.selenium_test.main_url(
                self.articles_stage), "URL did not match"

    def test_open_url_prod(self):
        for _ in range(3):
            self.selenium_test.open_url(self.selenium_test.main_url(self.articles_prod))
            assert self.selenium_test.driver.current_url == self.selenium_test.main_url(
                self.articles_prod), "URL did not match"

    def test_title_stage(self):
        for _ in range(3):
            self.selenium_test.open_url(self.selenium_test.main_url(self.articles_stage))
            assert self.selenium_test.driver.title == self.articles_title, "Title did not match"

    def test_title_prod(self):
        for _ in range(3):
            self.selenium_test.open_url(self.selenium_test.main_url(self.articles_prod))
            assert self.selenium_test.driver.title == self.articles_title, "Title did not match"

    def test_mosaic_area_stage(self):
        for _ in range(3):
            assert self.selenium_test.mosaic_area(self.selenium_test.main_url(self.articles_stage), "mosaicArea",
                                                  "stage"), "Mosaic area not found"

    def test_mosaic_area_prod(self):
        for _ in range(3):
            assert self.selenium_test.mosaic_area(self.selenium_test.main_url(self.articles_prod), "mosaicArea",
                                                  "prod"), "Mosaic area not found"

    def test_add_shemedia_stage(self):
        for _ in range(3):
            assert self.selenium_test.search_ad_by_class_id(self.selenium_test.main_url(self.articles_stage),
                                                            "skm-ad-banner-1"), "Shemedia ad not found"

    def test_add_shemedia_prod(self):
        for _ in range(3):
            assert self.selenium_test.search_ad_by_class_id(self.selenium_test.main_url(self.articles_prod),
                                                            "skm-ad-banner-1"), "Shemedia ad not found"
