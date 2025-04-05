// Description: This file contains the client-side logic for the application.
import {
  extractVideoId,
  formatVideoDuration,
  cutDescription,
} from "./helpers.js";

// DOM elements
const url = document.getElementById("url");
const previewButton = document.getElementById("preview-button");
const errorMessage = document.getElementById("error-message");
const videoThumbnail = document.getElementById("thumbnail");
const id = document.getElementById("videoId");
const videoTitle = document.getElementById("title");
const videoDescription = document.getElementById("description");
const videoCategory = document.getElementById("category");
const videoDuration = document.getElementById("lengthSeconds");
const downloadButton = document.getElementById("download-btn");
const filePath = document.getElementById("file-path");
const loader = document.getElementById("loader");
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const step3 = document.getElementById("step-3");

// Base URL
const baseURL = "http://localhost:5000";

// API calls
async function getVideoDetails(videoId) {
  const response = await fetch(
    `${baseURL}/youtube/metadata?videoId=${videoId}`
  ).then((res) => res.json());

  console.log("response: ", response);

  return response;
}

async function downloadVideo(videoId) {
  const response = await fetch(`${baseURL}/youtube/download`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoId }),
  }).then((res) => res.json());

  return response;
}

// Event listener for step 1
const handlePreview = async () => {
  const videoId = extractVideoId(url.value);

  if (!videoId) {
    errorMessage.textContent = "Required url parameter is missing *";
    return;
  }

  try {
    loader.style.display = "block";
    step1.style.display = "none";

    const { status, data } = await getVideoDetails(videoId);
    loader.style.display = "none";

    if (status === "success") {
      step2.style.display = "flex";

      id.textContent = data.id || "-";
      videoTitle.textContent = data.title || "-";

      videoDescription.textContent = cutDescription(data.description || "-");
      videoCategory.textContent = data.category || "-";
      videoDuration.textContent = formatVideoDuration(
        data.lengthSeconds || "-"
      );
      videoThumbnail.src =
        data.thumbnails[data.thumbnails.length - 1].url ||
        "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=";
    } else {
      step1.style.display = "flex";

      errorMessage.textContent = "Video not found, please check the url !";
    }
  } catch (error) {
    console.error("error: ", error);

    step1.style.display = "flex";
    errorMessage.textContent =
      "An error occurred while fetching video metadata";
  }
};

previewButton.addEventListener("click", handlePreview);

url.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    handlePreview();
  }
});

// Event listener for step 2
downloadButton.addEventListener("click", async () => {
  const videoId = id.textContent;

  try {
    loader.style.display = "block";
    step2.style.display = "none";
    const { status, data } = await downloadVideo(videoId);

    loader.style.display = "none";

    if (status) {
      step3.style.display = "flex";

      filePath.textContent = data.filePath;
    } else {
      step2.style.display = "flex";
      errorMessage.textContent = "An error occurred while downloading video";
    }
  } catch (error) {
    console.error("error: ", error);
    errorMessage.textContent = "An error occurred while downloading video";
  }
});
