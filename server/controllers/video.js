import { ERRORS_MESSAGES, STATUS, SUCCESS_MESSAGES } from "../constants.js";
import { YoutubeService } from "../services/youtube.js";
import logger from "../logger.js";

export class VideoController {
  async getYoutubeMetadata(req, res) {
    const youtubeService = new YoutubeService();
    const videoId = req.query.videoId;

    logger.info(`Getting metadata for videoId: ${videoId}`);

    if (!videoId) {
      logger.error(`Missing videoId: ${videoId}`);

      return res.status(400).json({
        status: STATUS.ERROR,
        code: 400,
        error: ERRORS_MESSAGES.MISSING_VIDEO_ID,
      });
    }

    if (typeof videoId !== "string") {
      logger.error(`Invalid videoId: ${videoId}`);

      return res.status(400).json({
        status: STATUS.ERROR,
        code: 400,
        error: ERRORS_MESSAGES.INVALID_VIDEO_ID,
      });
    }

    try {
      const metadata = await youtubeService.getMetadata(videoId);

      logger.info(`Metadata fetched successfully for videoId: ${videoId}`);

      res.status(200).json({
        status: STATUS.SUCCESS,
        code: 200,
        message: SUCCESS_MESSAGES.FETCHING_METADATA,
        data: metadata,
      });
    } catch (error) {
      logger.error(`Error fetching metadata for videoId: ${videoId}`);

      res.status(400).json({
        status: STATUS.ERROR,
        code: 400,
        error: ERRORS_MESSAGES.FETCHING_METADATA,
      });
    }
  }

  async downloadYoutubeVideo(req, res) {
    const youtubeService = new YoutubeService();
    const { videoId } = req.body;

    logger.info(`Downloading video for videoId: ${videoId}`);

    if (!videoId) {
      logger.error(`Missing videoId: ${videoId}`);

      return res.status(400).json({
        status: STATUS.ERROR,
        code: 400,
        error: ERRORS_MESSAGES.MISSING_VIDEO_ID,
      });
    }

    if (typeof videoId !== "string") {
      logger.error(`Invalid videoId: ${videoId}`);

      return res.status(400).json({
        status: STATUS.ERROR,
        code: 400,
        error: ERRORS_MESSAGES.INVALID_VIDEO_ID,
      });
    }

    try {
      const video = await youtubeService.downloadVideo(videoId);

      logger.info(`Video downloaded successfully for videoId: ${videoId}`);

      res.status(200).json({
        status: STATUS.SUCCESS,
        code: 200,
        message: SUCCESS_MESSAGES.DOWNLOADING_VIDEO,
        data: video,
      });
    } catch (error) {
      logger.error(`Error downloading video for videoId: ${videoId}`);

      res.status(400).json({
        status: STATUS.ERROR,
        code: 400,
        error: ERRORS_MESSAGES.DOWNLOADING_VIDEO,
      });
    }
  }
}
