Python-Javascript Bridge
========================

A minimal example of calling Python functions asynchronously from the browser.
The idea here is to execute arbitrary server-side code and display the results
in the browser without refreshing the page. This allows for the creation of
interactive user interfaces for a wide range of applications. Hack it to suit
your needs!

Dependencies
------------

Some socket infrastructure is required.

```
pip install pyzmq tornado tornadio
```

Usage
-----

Once the dependencies are met, just run

```
python server.py
```

and then open http://localhost:8000/ in a browser. The example uses server-side
python to count numbers.

This code provides enough infrastructure to write your own methods by appending
files. Any function added to `methods.py` can be called from the client by
making a corresponding function in `static/client.js`, as well as some basic
logic to handle the server response. Follow the setup of the "count" function
to get this running.

There is also basic error handling - stack traces from the server are sent back
to the client and displayed in an alert window.
