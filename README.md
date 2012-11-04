# stream.json

The geek's home media streaming server.

## What is this?

This is just the server, if you want a client you need to create or get one (I'll list them here when I create the first one, or someone does it). As described, this is the geek's home media streaming server, so the only thing that it does is get the video index from `videos.json` and send customized JSON for your client.

Think of it as a middleware for your HTTP server to make streaming videos more customizable than just directory listings. **:)**

## Clients

This is just a server so if you really want to have a great time with it I recommend you to check out these clients:

- [stream_json.php (Web)](http://nathanpc.github.com/stream_json.php/)
- [stream.json for Android](https://github.com/nathanpc/stream.json-android)
- [streamjson-cli (Linux and Mac)](https://github.com/nathanpc/streamjson-cli)

I'm going to develop clients for all major mobile platforms (iOS, Android, and BlackBerry), also I'll try to learn more about GTK+ (with Python) programming to create a Linux client.

If you want to develop a client don't forget to check [API Documentation](https://github.com/nathanpc/stream.json/wiki/API-Documentation).

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

- Create a file called `videos.json` in the same folder as `app.js`. This file will hold the index of movies/videos and their informations. Your `videos.json` file should look like this (if you want to know more about the video index file please read [Video-Index-File](https://github.com/nathanpc/stream.json/wiki/Video-Index-File)):

```
{
  "video": [
    {
      "id": "Unique-ID-Here",
      "title": "Awesome Movie Title Here",
      "poster": {
        "remote": false,
        "location": "/path/to/your/poster/LikeThis.jpg"
      },
      "file": {
        "remote": false,
        "location": "some_movie_name.mp4"
      },
      "description": {
        "format": "plain",
        "text": "Your description goes here."
      }
    }
  ]
}
```

- You should have a HTTP server running in order to stream the videos (defined at `config.json`).

- To start **stream.json** just run:

```
$ nohup node app.js > output.log &
```

## TODO

What I'm working on for the next releases:

 * Implement authentication (login/videos access)
 * Treat errors
 * Improve logging
 * More?

If you have a suggestion please open a Issue and I'll be pleased to implement it. Pull Requests are welcome too.

## Contact

I really appreciate people that stop to say "Thank You" to a developer. Also love to receive all kinds of feedback.

- [about.me](http://about.me/nathanpc)
- [Twitter](http://twitter.com/nathanpc)
- [Google+](https://plus.google.com/112969911133615369021)
- nathanpc [at] dreamintech [dot] net

If you really appreciated my work and want to donate, please send me an email and I'll give you a PayPal donation link.

## Changelog

- **v0.1:** First version (alpha)

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
