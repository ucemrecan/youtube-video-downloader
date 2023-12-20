const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const ytdl = require("ytdl-core");
const readline = require("readline");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/", (req, res) => {
  const videoUrl = req.body.url;
  const videoQuality = req.body.quality;
  const videoFormat = req.body.format;

  downloadVideo(videoUrl, videoQuality, videoFormat, res);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const downloadVideo = (videoUrl, videoQuality, videoFormat, res) => {
  let url = videoUrl;
  let videoID = ytdl.getURLVideoID(url);

  const output = path.resolve(__dirname, `${videoID}.${videoFormat}`);
  const video = ytdl(url, {
    quality: videoQuality,
    format: videoFormat,
  });

  ytdl.getInfo(url, (err, info) => {
    if (err) throw err;
    console.log(`Title: ${info.videoDetails.title}`);
    console.log(`Author: ${info.videoDetails.author.name}`);
    console.log(`View: ${info.videoDetails.viewCount}`);
    console.log(`Length: ${info.videoDetails.lengthSeconds} seconds`);
  });

  video.pipe(fs.createWriteStream(output));

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
    process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
    process.stdout.write(
      `, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `
    );
    readline.moveCursor(process.stdout, 0, -1);
  });

  video.on("end", () => {
    process.stdout.write("\n\n");
    console.log(`\nDownload finished at ${Date.now()}`);
    res.send(
      "<h3 style='margin: 20px; color: #4caf50'>Your video has been downloaded successfully.<h1>"
    );
  });
};
