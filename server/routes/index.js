import { VideoController } from "../controllers/video.js";
import { Router } from "express";

const router = Router();

const videoController = new VideoController();

router.get("/healthz", (_req, res) => {
  res.status(200).send("ok");
});

/**
 * @swagger
 * /youtube/metadata:
 *   get:
 *     description: Get metadata of a youtube video
 *     parameters:
 *       - name: videoId
 *         description: The youtube video id
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Bad request
 */
router.get("/youtube/metadata", videoController.getYoutubeMetadata);

/**
 * @swagger
 * /youtube/download:
 *   post:
 *     description: Download a youtube video
 *     parameters:
 *      - in: body
 *        name: videoId
 *        description: The youtube video id
 *        schema:
 *          type: object
 *          properties:
 *            videoId:
 *             type: string
 *             required: true
 *             example: "wCoI2SGjaq4"
 *
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Bad request
 */
router.post("/youtube/download", videoController.downloadYoutubeVideo);

export default router;
