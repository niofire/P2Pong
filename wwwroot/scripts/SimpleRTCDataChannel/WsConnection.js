function WsConnection(hostName, port) {
    this.Id = createGuid();
    this.HostName = hostName;
    this._port = port;
    this._connection = null;
    this._eventHandlers = {};
}

WsConnection.prototype.SendToServer = function (msg) {
    var msgJson = JSON.stringify(msg);
    log("Sending '" + msg.type + "' message: " + msgJson);
    this._connection.send(msgJson);
}

WsConnection.prototype.Connect = function () {

    var scheme = "ws";
    var serverUrl = scheme + "://" + this.HostName + ":6503";
    this._connection = new WebSocket(serverUrl, "json");
    
    var self = this;
    this._connection.onopen = function (event) {
        log("Connection to server is OPEN.");
        self.SendToServer({
            id : self.Id,
            type : "registration"
        })
        
        if (handlers.open) {
            handlers["open"].forEach((handler) => { handler(event); });
        }
    };

    var handlers = this._eventHandlers;
    this._connection.onmessage = function (event) {
        let msg = JSON.parse(event.data);
        log("Message Received:" + msg);

        if (handlers.message) {
            handlers["message"].forEach((handler) => { handler(event); });
        }
    }

    this._connection.onerror = function (event) {
        log("Error connection to WebSocket Server!");
        if (handlers.error) {
            handlers["error"].forEach((handler) => { handler(event); });
        }
    }
}

WsConnection.prototype.AddEventListener = function (eventType, callback) {

    this._eventHandlers[eventType] = this._eventHandlers[eventType] || [];
    this._eventHandlers[eventType].push(callback);
}
