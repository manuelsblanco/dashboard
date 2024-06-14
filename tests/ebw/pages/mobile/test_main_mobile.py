import pytest

from pages.global_functions import SeleniumTest


class TestMain:

    main_stage = 'betatester' + ":" + 'betatester' + "@" + "stage2.ebaumsworld.com/"
    @pytest.fixture
    def setup(self):
        self.selenium_test = SeleniumTest("mobile")

    @pytest.mark.skip
    def test_login_stage(self, setup):
        print("test_login")
        self.selenium_test.sign_in(self.main_stage)
        self.selenium_test.driver.quit()
