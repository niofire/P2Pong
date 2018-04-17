function SimpleRTCDataChannel(simpleRTCPeerConnection) {
    this._peerConnection = simpleRTCPeerConnection;
    this._sendChannel = null;
    this._eventHandlers = {};

}


SimpleRTCDataChannel.prototype.Connect = function () {

    var dataChannelOptions = {
        ordered: false, // do not guarantee order
        maxRetransmitTime: 3000, // in milliseconds
    };

    this._sendChannel = this._peerConnection.createDataChannel("myLabel", dataChannelOptions);

    var handlers = this._eventHandlers;
    this._sendChannel.onerror = function (error) {
        console.log("Data Channel Error:", error);
        if (handlers.error) {
            handlers["error"].forEach((handler) => { handler(); });
        }
    };

    this._sendChannel.onmessage = function (event) {
        console.log("Got Data Channel Message:", event.data);
        if (handlers.message) {
            handlers["message"].forEach((handler) => { handler(event.data); });
        }
    };

    this._peerConnection.ondatachannel = function (event) {
        event.channel.onmessage = function (event) {
            console.log("Got Data Channel Message:", event.data);
            if (handlers.message) {
                handlers["message"].forEach((handler) => { handler(event.data); });
            }
        }
    }

    this._sendChannel.onopen = function () {
        console.log("Data Channel: Open.");
        if (handlers.open) {
            handlers["open"].forEach((handler) => { handler(); });
        }
    };

    this._sendChannel.onclose = function () {
        console.log("Data Channel: Closed.");
        if (handlers.close) {
            handlers["close"].forEach((handler) => { handler(); });
        }
    };
}

SimpleRTCDataChannel.prototype._onReceiveMessage = function (event) {
    event.channel.onmessage = (event) => console.log("Got Data Channel Message:", event.data);
}

SimpleRTCDataChannel.prototype.onmessage = function (event) {
    var handlers = this._eventHandlers;
    this._sendChannel.onmessage = function (event) {
        console.log("Got Data Channel Message:", event.data);
        if (handlers.message) {
            handlers["message"].forEach((handler) => { handler(event.data); });
        }
    };
}

SimpleRTCDataChannel.prototype.SendMessage = function (msg) {
    this._sendChannel.send(JSON.stringify(msg));
}

SimpleRTCDataChannel.prototype.PrintHealthReport = function () {
    console.log(this._sendChannel);
}

SimpleRTCDataChannel.prototype.AddEventListener = function (eventType, callback) {

    this._eventHandlers[eventType] = this._eventHandlers[eventType] || [];
    this._eventHandlers[eventType].push(callback);
}