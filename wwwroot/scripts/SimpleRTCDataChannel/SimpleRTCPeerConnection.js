function SimpleRTCPeerConnection(msgSocketServerConnection) {
    this._wsConnection = msgSocketServerConnection;
    this._rtcPeerConnection = null;
    this._dataChannel = null;
    var self = this;

    var onMessage = function (event) {
        var msg = JSON.parse(event.data);

        switch (msg.type) {
            case "connection-offer":
                self._receiveP2PConnectionOffer(msg);
                break;
            case "connection-answer":
                self._receiveP2PConnectionAnswer(msg);
                break;
            case "new-ice-candidate":
                self._handleNewICECandidateMsg(msg);
                break;
        }
    }

    this._wsConnection.AddEventListener('message', onMessage);
}

//Attempts a P2P connection with target ID.
SimpleRTCPeerConnection.prototype.Connect = function (targetId) {
    this._targetId = targetId;

    if (this._wsConnection.Id == targetId) {
        log_error("Don't connect to yourself fool.");
        return;
    }

    if (this._rtcPeerConnection)
        return;

    this._rtcPeerConnection = this._createP2PConnection();

    this._dataChannel = new SimpleRTCDataChannel(this._rtcPeerConnection);
    this._dataChannel.Connect();
    
    if(this.onDataChannelCreate)
        this.onDataChannelCreate(this._dataChannel);

    return this._dataChannel;
}

SimpleRTCPeerConnection.prototype.PrintHealthReport = function () {
    console.log(this._rtcPeerConnection);
    this._dataChannel.PrintHealthReport();
}

SimpleRTCPeerConnection.prototype.CloseConnection = function () {

    if (!this._rtcPeerConnection)
        return;

    log("--> Closing the peer connection");

    this._rtcPeerConnection.onicecandidate = null;
    this._rtcPeerConnection.oniceconnectionstatechange = null;
    this._rtcPeerConnection.onicegatheringstatechange = null;
    this._rtcPeerConnection.onsignalingstatechange = null;
    this._rtcPeerConnection.onnegotiationneeded = null;
    this._rtcPeerConnection.ondatachannel = null;
    this._rtcPeerConnection.close();
    this._rtcPeerConnection = null;
}

//Second step, User2 receives the connection offer, creates an answer and replies!
SimpleRTCPeerConnection.prototype._receiveP2PConnectionOffer = function (msg) {
    log("-->Receiving DataChannel Connection Offer");
    targetId = msg.name;
    log("Received invitation to connect from: " + msg.name);

    this._rtcPeerConnection = this._createP2PConnection();

    this._dataChannel = new SimpleRTCDataChannel(this._rtcPeerConnection);
    this._dataChannel.Connect();

    if(this.onDataChannelCreate)
        this.onDataChannelCreate(this._dataChannel);

    var wsConnection = this._wsConnection;
    var rtcPeerConnection = this._rtcPeerConnection;
    var user1Sdp = new RTCSessionDescription(msg.sdp);

    rtcPeerConnection.setRemoteDescription(user1Sdp)
        .then(function () { console.log("Creating Answer"); return rtcPeerConnection.createAnswer(); })
        .then(function (answer) { console.log("Setting Local Description"); console.log(answer); return rtcPeerConnection.setLocalDescription(answer); })
        .then(function () {
            console.log("Sending the connection answer to the offerer.");
            console.log(rtcPeerConnection.localDescription);
            wsConnection.SendToServer({
                name: wsConnection.Id,
                target: targetId,
                type: "connection-answer",
                sdp: rtcPeerConnection.localDescription
            });
        }
        )
        .catch(this.ReportError);
}

//Third step, User1 receive the connection answer. Almost there!
SimpleRTCPeerConnection.prototype._receiveP2PConnectionAnswer = function (msg) {
    log("-->Receiving Data Channel Answer <--");
    var user2Sdp = new RTCSessionDescription(msg.sdp);
    this._rtcPeerConnection.setRemoteDescription(user2Sdp)
        .catch(this.ReportError)
}

SimpleRTCPeerConnection.prototype._createP2PConnection = function () {
    var rtcPeerConnection = new RTCPeerConnection({
        iceServers: [
            {
                urls: "turn:" + this._wsConnection.HostName,
                username: "webrtc",
                credential: "turnserver"
            }
        ]
    });

    var wsConnection = this._wsConnection;
    var targetId = this._targetId;

    var handleICECandidateEvent = function (event) {
        if (event.candidate) {
            log("Outgoing ICE candidate: " + event.candidate.candidate);

            wsConnection.SendToServer({
                type: "new-ice-candidate",
                target: targetId,
                candidate: event.candidate
            });
        }
    }
    
    var self = this;

    var handleICEConnectionStateChangeEvent = function (event) {
        log("*** ICE connection state changed to " + rtcPeerConnection.iceConnectionState);
        switch(rtcPeerConnection.iceConnectionState) {
            case "closed":
            case "failed":
            case "disconnected":
              self.CloseConnection();
              break;
          }
    }

    var handleICEGatheringStateChangeEvent = function (event) {
        log("*** ICE gathering state changed to: " + rtcPeerConnection.iceGatheringState);
    }

    var handleSignalingStateChangeEvent = function (event) {
        log("*** WebRTC signaling state changed to: " + rtcPeerConnection.signalingState);
        switch(rtcPeerConnection.signalingState){
            case "closed":
            self.CloseConnection();
            break;
        }
    }

    //First step, User1 wants to connect to User2, hence sends a connection offer.
    var handleNegotiationNeededEvent = function (event) {
        log("*** Negotiation needed");
        log("---> Creating offer");

        this.createOffer()
            .then((offer) => this.setLocalDescription(offer))
            .then(function () {
                log("---> Sending offer to remote peer.");
                wsConnection.SendToServer({
                    name: wsConnection.Id,
                    target: targetId,
                    type: "connection-offer",
                    sdp: rtcPeerConnection.localDescription
                });
            })
            .catch(this.ReportError);
    }

    rtcPeerConnection.onicecandidate = handleICECandidateEvent;
    rtcPeerConnection.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    rtcPeerConnection.onicegatheringstatechange = handleICEGatheringStateChangeEvent;
    rtcPeerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;
    rtcPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
    return rtcPeerConnection;
}

var handleDataChannel = function(event) {
  };

SimpleRTCPeerConnection.prototype.ReportError = function (errMsg) {
    log_error("Error " + errMsg.name + ": " + errMsg.message);
}