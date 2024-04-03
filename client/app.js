import {
  extractVideoId,
  formatVideoDuration,
  cutDescription,
} from "./helpers.js";

const url = document.getElementById("url");
const previewButton = document.getElementById("preview-button");
const errorMessage = document.getElementById("error-message");
const videoThumbnail = document.getElementById("thumbnail");
const id = document.getElementById("videoId");
const videoTitle = document.getElementById("title");
const videoDescription = document.getElementById("description");
const videoCategory = document.getElementById("category");
const videoDuration = document.getElementById("lengthSeconds");

const baseURL = "http://localhost:5000";
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");

async function getVideoDetails(videoId) {
  const response = await fetch(
    `${baseURL}/youtube/metadata?videoId=${videoId}`
  ).then((res) => res.json());

  return response;
}

// Event listener for step 1
previewButton.addEventListener("click", async () => {
  let isLoaded = false;
  const videoId = extractVideoId(url.value);

  if (!videoId) {
    errorMessage.textContent = "Required url parameter is missing *";
    return;
  }

  try {
    const { status, data } = await getVideoDetails(videoId);
    isLoaded = true;

    if (status) {
      step1.style.display = "none";
      step2.style.display = "flex";

      id.textContent = data.videoId;
      videoTitle.textContent = data.title;
      videoDescription.textContent = cutDescription(data.description);
      videoCategory.textContent = data.category;
      videoDuration.textContent = formatVideoDuration(data.lengthSeconds);
      videoThumbnail.src = data.thumbnails[0].url;
    } else {
      errorMessage.textContent =
        "An error occurred while fetching video metadata";
    }
  } catch (error) {
    console.error("error: ", error);
    isLoaded = true;
    errorMessage.textContent =
      "An error occurred while fetching video metadata";
  }
});
