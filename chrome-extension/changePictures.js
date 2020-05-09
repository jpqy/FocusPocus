{
  /**
   * Replaces all images from img tags and "background-image" css attributes
   * @param {String} newImg An image url to be used as the replacement
   */
  const replaceImages = function (
    newImg = "https://memegen.link/bad/get_back_to_work/lazy_bum.jpg"
  ) {
    // Replace images specified by img tags
    const imgTagElements = document.querySelectorAll("img");
    for (const imgTagElement of imgTagElements) {
      imgTagElement.setAttribute("src", newImg);
      imgTagElement.setAttribute("data-src", newImg);
    }

    // Replace images specified by background-image css
    const backgroundImageElements = document.querySelectorAll(
      // *= matches all style attribute containing "background-image" in its value
      '[style*="background-image"]'
    );
    for (const bgImageElement of backgroundImageElements) {
      bgImageElement.style.backgroundImage = `url("${newImg}")`;
    }
  };

  // Replacement of jQuery's document.ready
  function ready(fn) {
    if (document.readyState != "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }
  ready(replaceImages);
}
