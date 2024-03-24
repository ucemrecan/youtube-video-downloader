export const STATUS = {
  SUCCESS: "success",
  ERROR: "error",
};

export const CODES = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
};

export const SUCCESS_MESSAGES = {
  FETCHING_METADATA: "Video metadata fetched successfully",
  DOWNLOADING_VIDEO: "Video downloaded successfully",
};

export const ERRORS_MESSAGES = {
  MISSING_VIDEO_ID: "Missing videoId parameter",
  FETCHING_METADATA: "An error occurred while fetching video metadata",
  DOWNLOADING_VIDEO: "An error occurred while downloading video",
  INVALID_VIDEO_ID: "videoId must be a string",
};
