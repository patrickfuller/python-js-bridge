/*global WebSocket, JSON, $, window, console, alert*/
"use strict";
/**
 * Function calls across the background TCP socket. Uses JSON RPC + a queue.
 * (I've added this extra logic to simplify expanding this)
 */
var client = {
    queue: {},

    // Connects to Python through the websocket
    connect: function (port) {
        var self = this;
        this.socket = new WebSocket("ws://" + window.location.hostname + ":" + port + "/websocket");

        this.socket.onopen = function () {
            console.log("Connected!");
        };

        this.socket.onmessage = function (messageEvent) {
            var router, current, updated, jsonRpc;

            jsonRpc = JSON.parse(messageEvent.data);
            router = self.queue[jsonRpc.id];
            delete self.queue[jsonRpc.id];
            self.result = jsonRpc.result;

            // If there's an error, display it in an alert window
            if (jsonRpc.error) {
                alert(jsonRpc.result);

            // If the response is from "count", do stuff
            } else if (router === "count") {
                current = $(".answer").html();
                if (current.length === 0) {
                    updated = jsonRpc.result;
                } else if (current.length > 100) {
                    updated = current.substring(current.length - 100) + ", " + jsonRpc.result;
                } else {
                    updated = current + ", " + jsonRpc.result;
                }
                $(".answer").html(updated);
                $(".number").val(jsonRpc.result);

            // If the response is from anything else, it's currently unsupported
            } else {
                alert("Unsupported function: " + router);
            }
        };
    },

    // Generates a unique identifier for request ids
    // Code from http://stackoverflow.com/questions/105034/
    // how-to-create-a-guid-uuid-in-javascript/2117523#2117523
    uuid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },

    // Placeholder function. It adds one to things.
    count: function (data) {
        var uuid = this.uuid();
        this.socket.send(JSON.stringify({method: "count", id: uuid, params: {number: data}}));
        this.queue[uuid] = "count";
    }
};

