# YouTube Video Downloader

This repository provides a tool for downloading YouTube videos. It consists of both a server and a client side. The server is built using `Express.js` and the `ytdl` library, while the client utilizes HTML, CSS, and JavaScript. Docker is included for containerized deployment, and Swagger is integrated for API documentation.

## Features

- Download YouTube videos effortlessly.
- Simple user interface.
- Server-client architecture for seamless interaction.
- Docker support for easy deployment.
- Swagger API documentation.

## Prerequisites

Before running the application, make sure you have the following installed:

- Docker (if running via Docker)
- Node.js & npm (if running without Docker)

## Installation

1. Clone this repository to your local machine.
   ```bash
   git clone https://github.com/ucemrecan/youtube-video-downloader.git
   ```
2. Navigate to the project directory.
   ```bash
   cd youtube-video-downloader
   ```

### Running with Docker

1. Build and start the Docker containers.
   ```bash
   docker-compose up --build
   ```

### Running without Docker

#### Server Setup

1. Navigate to the `server` directory.
   ```bash
   cd server
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Start the server.
   ```bash
   npm run start
   ```

#### Client Setup

1. Navigate to the `client` directory.
   ```bash
   cd client
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Start the client.
   ```bash
   npm run start
   ```
4. Open the client application in your browser.
   ```bash
   http://127.0.0.1:8080
   ```

## Swagger Documentation

To view the Swagger API documentation, navigate to the following URL while the server is running:

```bash
http://127.0.0.1:3000/api-docs
```

## Usage

Once the server and client are running, you can access the YouTube video downloader through your browser. Enter the URL of the YouTube video you wish to download, and follow the prompts to initiate the download.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -am 'Add some feature').
4. Push to the branch (git push origin feature/your-feature).
5. Create a new Pull Request.
