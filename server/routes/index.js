import { VideoController } from "../controllers/video.js";
import { Router } from "express";

const router = Router();

const videoController = new VideoController();

router.get("/healthz", (req, res) => {
  res.status(200).send("ok");
});

router.get("/youtube/metadata", videoController.getYoutubeMetadata);

router.post("/youtube/download", videoController.downloadYoutubeVideo);

export default router;
