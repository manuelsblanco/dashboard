async function readJSONFile(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error(`Error reading file from disk: ${err}`);
    return null;
  }
}

const jsonFile = "knowyourmeme.com_desktop_control.report.json";
const jsonFile2 = "knowyourmeme.com_desktop_redesign.report.json";
const jsonFile3 = "knowyourmeme.com_mobile_control.report.json";
const jsonFile4 = "knowyourmeme.com_mobile_redesign.report.json";
const jsonFile5 = "knowyourmeme.com_editorials_collections_15-adventure-time-memes-for-all-the-dedicated-fans_desktop_control.report.json";
const jsonFile6 = "knowyourmeme.com_editorials_collections_15-adventure-time-memes-for-all-the-dedicated-fans_desktop_redesign.report.json";
const jsonFile7 = "knowyourmeme.com_editorials_collections_15-adventure-time-memes-for-all-the-dedicated-fans_mobile_control.report.json";
const jsonFile8 = "knowyourmeme.com_editorials_collections_15-adventure-time-memes-for-all-the-dedicated-fans_mobile_redesign.report.json";
const jsonFile9 = "knowyourmeme.com_editorials_guides_what-does-nothing-ever-happens-mean-the-discourse-stagnation-meme-explained_desktop_control.report.json";
const jsonFile10 = "knowyourmeme.com_editorials_guides_what-does-nothing-ever-happens-mean-the-discourse-stagnation-meme-explained_desktop_redesign.report.json";
const jsonFile11 = "knowyourmeme.com_editorials_guides_what-does-nothing-ever-happens-mean-the-discourse-stagnation-meme-explained_mobile_control.report.json";
const jsonFile12 = "knowyourmeme.com_editorials_guides_what-does-nothing-ever-happens-mean-the-discourse-stagnation-meme-explained_mobile_redesign.report.json";
const jsonFile21 = "knowyourmeme.com_memes_shroomjak-mushroom-wojak_desktop_control.report.json";
const jsonFile22 = "knowyourmeme.com_memes_shroomjak-mushroom-wojak_desktop_redesign.report.json";
const jsonFile23 = "knowyourmeme.com_memes_shroomjak-mushroom-wojak_mobile_control.report.json";
const jsonFile24 = "knowyourmeme.com_memes_shroomjak-mushroom-wojak_mobile_redesign.report.json";
const jsonFile29 = "knowyourmeme.com_photos_desktop_control.report.json";
const jsonFile30 = "knowyourmeme.com_photos_desktop_redesign.report.json";
const jsonFile31 = "knowyourmeme.com_photos_mobile_control.report.json";
const jsonFile32 = "knowyourmeme.com_photos_mobile_redesign.report.json";

readJSONFile(jsonFile).then(jsonData => {
  if (jsonData) {
    document.getElementById("homepage_c_per_desktop").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
    document.getElementById("homepage_c_si_desktop").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
    document.getElementById("homepage_c_cls_desktop").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
    document.getElementById("homepage_c_tbt_desktop").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
    document.getElementById("homepage_c_lcp_desktop").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
    document.getElementById("homepage_c_fcp_desktop").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
  }
});

readJSONFile(jsonFile2).then(jsonData => {
  if (jsonData) {
    document.getElementById("homepage_r_per_desktop").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
    document.getElementById("homepage_r_si_desktop").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
    document.getElementById("homepage_r_cls_desktop").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
    document.getElementById("homepage_r_tbt_desktop").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
    document.getElementById("homepage_r_lcp_desktop").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
    document.getElementById("homepage_r_fcp_desktop").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
  }
});

readJSONFile(jsonFile3).then(jsonData => {
  if (jsonData) {
    document.getElementById("homepage_c_fcp_mobile").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
    document.getElementById("homepage_c_lcp_mobile").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
    document.getElementById("homepage_c_cls_mobile").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
    document.getElementById("homepage_c_si_mobile").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
    document.getElementById("homepage_c_tbt_mobile").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
    document.getElementById("homepage_c_per_mobile").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
  }
});

readJSONFile(jsonFile4).then(jsonData => {
    if (jsonData) {
        document.getElementById("homepage_r_fcp_mobile").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
        document.getElementById("homepage_r_lcp_mobile").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
        document.getElementById("homepage_r_cls_mobile").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
        document.getElementById("homepage_r_si_mobile").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
        document.getElementById("homepage_r_tbt_mobile").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
        document.getElementById("homepage_r_per_mobile").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
    }
});

readJSONFile(jsonFile5).then(jsonData => {
    if (jsonData) {
        document.getElementById("collections_c_fcp_desktop").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
        document.getElementById("collections_c_lcp_desktop").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
        document.getElementById("collections_c_cls_desktop").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
        document.getElementById("collections_c_si_desktop").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
        document.getElementById("collections_c_tbt_desktop").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
        document.getElementById("collections_c_per_desktop").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
    }
});

readJSONFile(jsonFile6).then(jsonData => {
    if (jsonData) {
        document.getElementById("collections_r_fcp_desktop").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
        document.getElementById("collections_r_lcp_desktop").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
        document.getElementById("collections_r_cls_desktop").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
        document.getElementById("collections_r_si_desktop").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
        document.getElementById("collections_r_tbt_desktop").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
        document.getElementById("collections_r_per_desktop").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
    }
});

readJSONFile(jsonFile7).then(jsonData => {
    if (jsonData) {
        document.getElementById("collections_c_fcp_mobile").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
        document.getElementById("collections_c_lcp_mobile").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
        document.getElementById("collections_c_cls_mobile").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
        document.getElementById("collections_c_si_mobile").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
        document.getElementById("collections_c_tbt_mobile").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
        document.getElementById("collections_c_per_mobile").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
    }
});

readJSONFile(jsonFile8).then(jsonData => {
    if (jsonData) {
        document.getElementById("collections_r_fcp_mobile").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
        document.getElementById("collections_r_lcp_mobile").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
        document.getElementById("collections_r_cls_mobile").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
        document.getElementById("collections_r_si_mobile").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
        document.getElementById("collections_r_tbt_mobile").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
        document.getElementById("collections_r_per_mobile").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
    }
});

readJSONFile(jsonFile9).then(jsonData => {
    if (jsonData) {
        document.getElementById("guides_c_fcp_desktop").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
        document.getElementById("guides_c_lcp_desktop").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
        document.getElementById("guides_c_cls_desktop").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
        document.getElementById("guides_c_si_desktop").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
        document.getElementById("guides_c_tbt_desktop").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
        document.getElementById("guides_c_per_desktop").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
    }
});

readJSONFile(jsonFile10).then(jsonData => {
    if (jsonData) {
        document.getElementById("guides_r_fcp_desktop").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
        document.getElementById("guides_r_lcp_desktop").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
        document.getElementById("guides_r_cls_desktop").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
        document.getElementById("guides_r_si_desktop").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
        document.getElementById("guides_r_tbt_desktop").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
        document.getElementById("guides_r_per_desktop").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
    }
});

readJSONFile(jsonFile11).then(jsonData => {
    if (jsonData) {
        document.getElementById("guides_c_fcp_mobile").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
        document.getElementById("guides_c_lcp_mobile").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
        document.getElementById("guides_c_cls_mobile").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
        document.getElementById("guides_c_si_mobile").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
        document.getElementById("guides_c_tbt_mobile").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
        document.getElementById("guides_c_per_mobile").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
    }
});

readJSONFile(jsonFile12).then(jsonData => {
    if (jsonData) {
        document.getElementById("guides_r_fcp_mobile").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
        document.getElementById("guides_r_lcp_mobile").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
        document.getElementById("guides_r_cls_mobile").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
        document.getElementById("guides_r_si_mobile").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
        document.getElementById("guides_r_tbt_mobile").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
        document.getElementById("guides_r_per_mobile").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
    }
});

readJSONFile(jsonFile21).then(jsonData => {
    if (jsonData) {
        document.getElementById("memes_c_fcp_desktop").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
        document.getElementById("memes_c_lcp_desktop").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
        document.getElementById("memes_c_cls_desktop").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
        document.getElementById("memes_c_si_desktop").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
        document.getElementById("memes_c_tbt_desktop").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
        document.getElementById("memes_c_per_desktop").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
    }
});

readJSONFile(jsonFile22).then(jsonData => {
    if (jsonData) {
        document.getElementById("memes_r_fcp_desktop").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
        document.getElementById("memes_r_lcp_desktop").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
        document.getElementById("memes_r_cls_desktop").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
        document.getElementById("memes_r_si_desktop").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
        document.getElementById("memes_r_tbt_desktop").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
        document.getElementById("memes_r_per_desktop").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
    }
});

readJSONFile(jsonFile23).then(jsonData => {
    if (jsonData) {
        document.getElementById("memes_c_fcp_mobile").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
        document.getElementById("memes_c_lcp_mobile").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
        document.getElementById("memes_c_cls_mobile").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
        document.getElementById("memes_c_si_mobile").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
        document.getElementById("memes_c_tbt_mobile").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
        document.getElementById("memes_c_per_mobile").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
    }
});

readJSONFile(jsonFile24).then(jsonData => {
    if (jsonData) {
        document.getElementById("memes_r_fcp_mobile").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
        document.getElementById("memes_r_lcp_mobile").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
        document.getElementById("memes_r_cls_mobile").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
        document.getElementById("memes_r_si_mobile").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
        document.getElementById("memes_r_tbt_mobile").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
        document.getElementById("memes_r_per_mobile").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
    }
});

readJSONFile(jsonFile29).then(jsonData => {
    if (jsonData) {
        document.getElementById("photos_c_fcp_desktop").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
        document.getElementById("photos_c_lcp_desktop").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
        document.getElementById("photos_c_cls_desktop").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
        document.getElementById("photos_c_si_desktop").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
        document.getElementById("photos_c_tbt_desktop").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
        document.getElementById("photos_c_per_desktop").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
    }
});

readJSONFile(jsonFile30).then(jsonData => {
    if (jsonData) {
        document.getElementById("photos_r_fcp_desktop").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
        document.getElementById("photos_r_lcp_desktop").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
        document.getElementById("photos_r_cls_desktop").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
        document.getElementById("photos_r_si_desktop").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
        document.getElementById("photos_r_tbt_desktop").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
        document.getElementById("photos_r_per_desktop").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
    }
});

readJSONFile(jsonFile31).then(jsonData => {
    if (jsonData) {
        document.getElementById("photos_c_fcp_mobile").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
        document.getElementById("photos_c_lcp_mobile").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
        document.getElementById("photos_c_cls_mobile").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
        document.getElementById("photos_c_si_mobile").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
        document.getElementById("photos_c_tbt_mobile").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
        document.getElementById("photos_c_per_mobile").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
    }
});

readJSONFile(jsonFile32).then(jsonData => {
    if (jsonData) {
        document.getElementById("photos_r_fcp_mobile").innerHTML = String(jsonData.audits?.["first-contentful-paint"].displayValue);
        document.getElementById("photos_r_lcp_mobile").innerHTML = String(jsonData.audits?.["largest-contentful-paint"].displayValue);
        document.getElementById("photos_r_cls_mobile").innerHTML = String(jsonData.audits?.["cumulative-layout-shift"].displayValue);
        document.getElementById("photos_r_si_mobile").innerHTML = String(jsonData.audits?.["speed-index"].displayValue);
        document.getElementById("photos_r_tbt_mobile").innerHTML = String(jsonData.audits?.["total-blocking-time"].displayValue);
        document.getElementById("photos_r_per_mobile").innerHTML = (jsonData.categories.performance.score * 100).toFixed(2);
    }
});
