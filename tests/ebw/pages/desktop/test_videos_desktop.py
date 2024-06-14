from pages.global_functions import SeleniumTest
import pytest


class TestVideos:

    videos_stage = 'betatester' + ":" + 'betatester' + "@" + "stage2.ebaumsworld.com/videos/"
    videos_prod = "www.ebaumsworld.com/videos/"
    videos_title = "Funny Videos - Featured | eBaum's World"

    @pytest.fixture
    def setup(self):
        self.selenium_test = SeleniumTest()

    def test_open_url_stage(self, setup):
        try:
            self.selenium_test.open_url(self.selenium_test.main_url(self.videos_stage))
            assert self.videos_stage.split('/')[-1] in self.selenium_test.driver.current_url
        finally:
            self.selenium_test.driver.quit()

    def test_open_url_prod(self, setup):
        try:
            self.selenium_test.open_url(self.selenium_test.main_url(self.videos_prod))
            assert self.videos_prod in self.selenium_test.driver.current_url
        finally:
            self.selenium_test.driver.quit()

    def test_title_stage(self, setup):
        try:
            self.selenium_test.open_url(self.selenium_test.main_url(self.videos_stage))
            assert self.selenium_test.driver.title == self.videos_title
        finally:
            self.selenium_test.driver.quit()

    def test_title_prod(self, setup):
        try:
            self.selenium_test.open_url(self.selenium_test.main_url(self.videos_prod))
            assert self.selenium_test.driver.title == self.videos_title
        finally:
            self.selenium_test.driver.quit()

    def test_add_shemedia_stage(self, setup):
        try:
            self.selenium_test.search_ad_by_class_id(self.selenium_test.main_url(self.videos_stage), "skm-ad-banner-1")
        finally:
            self.selenium_test.driver.quit()

    def test_add_shemedia_prod(self, setup):
        try:
            self.selenium_test.search_ad_by_class_id(self.selenium_test.main_url(self.videos_prod), "skm-ad-banner-1")
        finally:
            self.selenium_test.driver.quit()
