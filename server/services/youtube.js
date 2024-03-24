import ytdl from "ytdl-core";
import fs from "fs";
import path from "path";

export class YoutubeService {
  async getMetadata(videoId) {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const video = await ytdl.getInfo(url);
    const metadata = {
      id: video.videoDetails.videoId,
      title: video.videoDetails.title,
      description: video.videoDetails.description,
      category: video.videoDetails.category,
      lengthSeconds: video.videoDetails.lengthSeconds,
      publishDate: video.videoDetails.publishDate,
      keywords: video.videoDetails.keywords,
      thumbnails: video.videoDetails.thumbnails,
    };

    return metadata;
  }

  async downloadVideo(videoId, videoQuality, videoFormat, videoFilter) {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const video = ytdl(url, {
      quality: videoQuality,
      format: videoFormat,
      filter: videoFilter,
    });

    const output = path.resolve(__dirname, `${videoId}.${videoFormat}`);

    video.pipe(fs.createWriteStream(output));

    video.once("response", () => {
      console.log("Video download started");
    });

    video.on("progress", (chunkLength, downloaded, total) => {
      const percent = downloaded / total;
      console.log(`Downloaded: ${percent * 100}%`);
    });

    video.on("end", () => {
      console.log("Video download completed");
    });

    video.on("error", (error) => {
      console.error(`An error occurred: ${error}`);
    });

    return {
      id: videoId,
      filePath: output,
    };
  }
}
