from pages.global_functions import SeleniumTest
import pytest



class TestUpload:

    main_stage = 'betatester' + ":" + 'betatester' + "@" + "stage2.ebaumsworld.com/upload"
    youtube_link = "https://www.youtube.com/watch?v=3vG5Zb1UQOk"
    upload_tag = "TEST"
    x_link = "https://x.com/i/status/1704927659208380520"
    tik_tok_link = "https://www.tiktok.com/@riverplate/video/7183407819452910853?is_from_webapp=1&sender_device=pc&web_id" \
                   "=7247620722397431302"
    instagram_link = "https://www.instagram.com/reel/Co-sVi7pJg7/"

    @pytest.fixture
    def setup(self):
        self.selenium_test = SeleniumTest()

    @pytest.mark.skip
    def test_video_youtube_stage(self, setup):
        try:
            self.selenium_test.sign_in(self.main_stage)
            title = "Test Video Youtube River Plate Title"
            description = "Test Video Youtube River Plate Description"
            self.selenium_test.test_video_upload(self.youtube_link, title, description, self.upload_tag)
        finally:
            self.selenium_test.driver.quit()

    @pytest.mark.skip
    def test_video_twitter_stage(self, setup):
        try:
            self.selenium_test.sign_in(self.main_stage)
            title = "Test Video Twitter Spider Web"
            description = "Test Video Twitter a huge Spider Web in Australia"
            self.selenium_test.test_video_upload(self.x_link , title, description, self.upload_tag)
        finally:
            self.selenium_test.driver.quit()

    @pytest.mark.skip
    def test_video_tik_tok_stage(self, setup):
        try:
            self.selenium_test.sign_in(self.main_stage)
            title = "Test Video Tik Tok River Plate"
            description = "Test Video Tik Tok Julian Alvarez"
            self.selenium_test.test_video_upload(self.tik_tok_link, title, description, self.upload_tag)
        finally:
            self.selenium_test.driver.quit()

    @pytest.mark.skip
    def test_video_instagram_stage(self, setup):
        try:
            self.selenium_test.sign_in(self.main_stage)
            title = "Test Video Instagram River Plate"
            description = "Test Video Instagram River Plate"
            self.selenium_test.test_video_upload(self.instagram_link, title, description, self.upload_tag)
        finally:
            self.selenium_test.driver.quit()

