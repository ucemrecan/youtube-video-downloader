const url = document.getElementById("url");
const previewButton = document.getElementById("preview-button");
const errorMessage = document.getElementById("error-message");

function extractVideoId(url) {
  if (url.includes("v=")) {
    return url.split("v=")[1];
  }
}

previewButton.addEventListener("click", async () => {
  const videoId = extractVideoId(url.value);

  if (!videoId) {
    errorMessage.textContent = "Required url parameter is missing *";
    return;
  }
});
