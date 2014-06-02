"""
Creates an HTTP server with basic websocket communication.
"""
import argparse
import json
import os
import traceback
import webbrowser

import tornado.web
import tornado.websocket

import methods


class IndexHandler(tornado.web.RequestHandler):

    def get(self):
        self.render("index.html", port=args.port)


class WebSocket(tornado.websocket.WebSocketHandler):

    def on_message(self, message):
        """Evaluates the function pointed to by json-rpc."""
        json_rpc = json.loads(message)

        try:
            # The only available method is `count`, but I'm generalizing
            # to allow other methods without too much extra code
            result = getattr(methods,
                             json_rpc["method"])(**json_rpc["params"])
            error = None
        except:
            # Errors are handled by enabling the `error` flag and returning a
            # stack trace. The client can do with it what it will.
            result = traceback.format_exc()
            error = 1

        self.write_message(json.dumps({"result": result, "error": error,
                                       "id": json_rpc["id"]},
                                      separators=(",", ":")))


parser = argparse.ArgumentParser(description="Starts a webserver for stuff.")
parser.add_argument("--port", type=int, default=8000, help="The port on which "
                    "to serve the website.")
args = parser.parse_args()

handlers = [(r"/", IndexHandler), (r"/websocket", WebSocket),
            (r'/static/(.*)', tornado.web.StaticFileHandler,
             {'path': os.path.normpath(os.path.dirname(__file__))})]
application = tornado.web.Application(handlers)
application.listen(args.port)

webbrowser.open("http://localhost:%d/" % args.port, new=2)

tornado.ioloop.IOLoop.instance().start()
