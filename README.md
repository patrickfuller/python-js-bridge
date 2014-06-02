Python-Javascript Communication
===============================

An example of using the [Tornado Web Server](http://www.tornadoweb.org/en/stable/)
enable running Python (as a "server") through a website (the "client") with
Javascript.

This example uses [websockets](http://en.wikipedia.org/wiki/WebSocket), a way
to create a "bridge" between the Python server and Javascript client. It has
multiple advantages over HTTP-based communication, and is especially preferable
in situations where you can tell your users to not use Internet Explorer.

This code provides enough infrastructure to write your own methods by appending
files. Any function added to `methods.py` can be called from the client by
making a corresponding function in `static/client.js`, as well as some basic
logic to handle the server response. Follow the setup of the "count" function
to get this running.

There is also basic error handling - stack traces from the server are sent back
to the client and displayed in an alert window.

Dependencies
------------

This program uses Tornado to handle the mess of communication.

```
pip install tornado
```

Usage
-----

Once the dependencies are met, just run

```
python server.py
```

and then open http://localhost:8000/ in a browser. The example uses server-side
python to count numbers.
