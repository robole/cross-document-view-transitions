// Write to storage on old page
window.addEventListener("pageswap", (event) => {
  if (event.viewTransition) {
    let skipCheckbox = document.querySelector("#skip");
    sessionStorage.setItem("skip", skipCheckbox.checked);
  }
});

// Read from storage on new page
window.addEventListener("pagereveal", (event) => {
  if (event.viewTransition) {
    let skip = sessionStorage.getItem("skip");
    let skipCheckbox = document.querySelector("#skip");

    if (skip === "true") {
      event.viewTransition.skipTransition();
      skipCheckbox.checked = true;
    } else {
      skipCheckbox.checked = false;
    }
  }
});
