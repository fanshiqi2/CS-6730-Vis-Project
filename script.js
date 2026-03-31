function resizeTableauViz(placeholderId) {
  const divElement = document.getElementById(placeholderId);
  if (!divElement) return;

  const vizElement = divElement.getElementsByTagName("object")[0];
  if (!vizElement) return;

  vizElement.style.width = "100%";

  if (window.innerWidth > 1200) {
    vizElement.style.height = "760px";
  } else if (window.innerWidth > 900) {
    vizElement.style.height = "680px";
  } else if (window.innerWidth > 600) {
    vizElement.style.height = "560px";
  } else {
    vizElement.style.height = "460px";
  }
}

function initializeTableauViz() {
  resizeTableauViz("viz1");
  resizeTableauViz("viz2");
  resizeTableauViz("viz3");
}

window.addEventListener("load", initializeTableauViz);
window.addEventListener("resize", initializeTableauViz);