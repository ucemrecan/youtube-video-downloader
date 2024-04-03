export function extractVideoId(url) {
  if (url.includes("v=")) {
    return url.split("v=")[1];
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
