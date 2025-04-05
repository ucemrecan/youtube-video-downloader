export function extractVideoId(url) {
  if (url.includes("watch?v=")) {
    return url.split("watch?v=")[1];
  } else if (url.includes("shorts/")) {
    return url.split("shorts/")[1];
  } else {
    return url;
  }
}

export function cutDescription(description) {
  if (description.length > 100) {
    return description.substring(0, 100) + "...";
  }
  return description;
}

export function formatVideoDuration(lengthSeconds) {
  const minutes = Math.floor(lengthSeconds / 60);
  const seconds = lengthSeconds % 60;

  return `${minutes} minutes, ${seconds} seconds`;
}
