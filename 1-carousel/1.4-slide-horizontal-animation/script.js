window.addEventListener("pageswap", async (e) => {
  if (e.viewTransition) {
    let transitionType = determineTransitionType(
      e.activation.from.url,
      e.activation.entry.url
    );

    e.viewTransition.types.add(transitionType);
  }
});

window.addEventListener("pagereveal", async (e) => {
  if (e.viewTransition) {
    // pagereveal does not expose the NavigationActivation object, we must get it from the gloabl object
    let transitionType = determineTransitionType(
      navigation.activation.from.url,
      navigation.activation.entry.url
    );

    e.viewTransition.types.add(transitionType);
  }
});

/* Compare the indexes of the source page and target page to determine if it is a "previous" type or "next" type */
function determineTransitionType(sourceURL, targetURL) {
  const sourcePageIndex = getIndex(sourceURL);
  const targetPageIndex = getIndex(targetURL);

  if (sourcePageIndex > targetPageIndex) {
    return "previous";
  } else if (sourcePageIndex < targetPageIndex) {
    return "next";
  }

  return "unknown";
}

/* Identify the index of the page in a set of pages based on its url. The pages are named
 according to a scheme. Every page aside from the first page has a number appended its 
 name e.g second page is page2.html, third is page3.html.
 */
function getIndex(url) {
  let index = -1;
  let filename = new URL(url).pathname.split("/").pop();

  if (filename === "index.html") {
    index = 1;
  }

  // extract a number from the filename
  let numberMatches = /\d+/g.exec(filename);
  if (numberMatches && numberMatches.length === 1) {
    index = numberMatches[0];
  }

  return index;
}
