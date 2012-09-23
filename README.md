# stream.json

The geek's home media streaming server.

## What is this?

This is just the server, if you want a client you need to create or get one (I'll list them here when I create the first one, or someone does it). As described, this is the geek's home media streaming server, so the only thing that it does is get the video index from `videos.json` and send customized JSON for your client.

## Setup

**stream.json** is really easy to setup (for a geek).

- Create a file called `config.json` inside the `/config` folder. Here's an example (if you want to know more about the configurations file please read [Configuration-File](https://github.com/nathanpc/stream.json/wiki/Configuration-File)):

```
{
  "server_port": 4881,
  "video_server": {
    "local": true,
    "ip": "",
    "port": 80,
    "suffix": "~Nathan/"
  },
  "auth": {
    "required": false,
    "users": [
      {
        "username": "admin",
        "password": "admin"
      }
    ]
  }
}
```

- Create a file called `videos.json` in the same folder as `app.js`. This file will hold the index of movies/videos and their informations. Your `videos.json` file should look like this (if you want to know more about the video index file please read <<<**Link to the wiki here**>>>):

```
{
  "video": [
    {
      "id": "Unique-ID-Here",
      "title": "Awesome Movie Title Here",
      "poster": "/path/to/your/poster/LikeThis.jpg",
      "location": "some_movie_name.mp4",
      "description": {
        "format": "plain",
        "text": "Your description goes here."
      }
    }
  ]
}
```

- You should have a HTTP server running in order to stream the videos (defined at `config.json`).

## TODO

What I'm working on for the next releases:

 * Implement authentication (login/videos access)
 * Treat errors
 * Logging

## License

**stream.json** is licensed under GPLv3, which means I'll love your Feedback/Pull Requests. **:)**

```
stream.json - The geek's home media streaming server.
Copyright (C) 2012  Nathan Campos

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```