import { ERRORS_MESSAGES, STATUS, SUCCESS_MESSAGES } from "../constants.js";
import { YoutubeService } from "../services/youtube.js";

export class VideoController {
  async getYoutubeMetadata(req, res) {
    const youtubeService = new YoutubeService();
    const { videoId } = req.params;

    if (!videoId) {
      return res.status(400).json({
        status: STATUS.ERROR,
        code: 400,
        error: ERRORS_MESSAGES.MISSING_VIDEO_ID,
      });
    }

    if (typeof videoId !== "string") {
      return res.status(400).json({
        status: STATUS.ERROR,
        code: 400,
        error: ERRORS_MESSAGES.INVALID_VIDEO_ID,
      });
    }

    try {
      const metadata = await youtubeService.getMetadata(videoId);

      res.status(200).json({
        status: STATUS.SUCCESS,
        code: 200,
        message: SUCCESS_MESSAGES.FETCHING_METADATA,
        data: metadata,
      });
    } catch (error) {
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

    if (!videoId) {
      return res.status(400).json({
        status: STATUS.ERROR,
        code: 400,
        error: ERRORS_MESSAGES.MISSING_VIDEO_ID,
      });
    }

    if (typeof videoId !== "string") {
      return res.status(400).json({
        status: STATUS.ERROR,
        code: 400,
        error: ERRORS_MESSAGES.INVALID_VIDEO_ID,
      });
    }

    try {
      const video = await youtubeService.downloadVideo(videoId);

      res.status(200).json({
        status: STATUS.SUCCESS,
        code: 200,
        message: SUCCESS_MESSAGES.DOWNLOADING_VIDEO,
        data: video,
      });
    } catch (error) {
      res.status(400).json({
        status: STATUS.ERROR,
        code: 400,
        error: ERRORS_MESSAGES.DOWNLOADING_VIDEO,
      });
    }
  }
}
