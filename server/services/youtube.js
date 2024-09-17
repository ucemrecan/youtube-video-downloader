import ytdl from "@distube/ytdl-core";
import fs from "fs";
import readline from "readline";

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

  async downloadVideo(videoId) {
    let startTime;
    const url = `https://www.youtube.com/watch?v=${videoId}`;

    const video = ytdl(url, {
      quality: "highest",
      filter: "audioandvideo",
    });

    if (!fs.existsSync("../downloads")) {
      fs.mkdirSync("../downloads");
    }

    video.pipe(fs.createWriteStream(`../downloads/${videoId}.mp4`));

    video.once("response", () => {
      startTime = Date.now();
      console.log(`Download started at ${startTime}`);
    });

    video.on("progress", (chunkLength, downloaded, total) => {
      const percent = downloaded / total;
      const downloadedMinutes = (Date.now() - startTime) / 1000 / 60;
      const estimatedDownloadTime =
        downloadedMinutes / percent - downloadedMinutes;

      readline.cursorTo(process.stdout, 0);

      process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
      process.stdout.write(
        `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
          total /
          1024 /
          1024
        ).toFixed(2)}MB)\n`
      );
      process.stdout.write(
        `running for: ${downloadedMinutes.toFixed(2)}minutes`
      );
      process.stdout.write(
        `, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `
      );

      readline.moveCursor(process.stdout, 0, -1);
    });

    video.on("end", () => {
      const endTime = Date.now();
      process.stdout.write("\n\n");
      console.log(`\nDownload finished at ${endTime}`);
    });

    return {
      id: videoId,
      filePath: `../downloads/${videoId}.mp4`,
    };
  }
}
