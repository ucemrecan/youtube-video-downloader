const url = document.getElementById("url");
const previewButton = document.getElementById("preview-button");
const errorMessage = document.getElementById("error-message");

const baseURL = "http://localhost:5000";

function extractVideoId(url) {
  if (url.includes("v=")) {
    return url.split("v=")[1];
  }
}

previewButton.addEventListener("click", async () => {
  let isLoaded = false;
  const videoId = extractVideoId(url.value);

  if (!videoId) {
    errorMessage.textContent = "Required url parameter is missing *";
    return;
  }

  const response = await fetch(
    `${baseURL}/youtube/metadata?videoId=${videoId}`
  );
  const data = await response.json();
  isLoaded = true;
});
