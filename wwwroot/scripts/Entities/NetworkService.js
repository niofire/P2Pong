var __networkService = function () {

    var _receivedMessages = {};
    var _messageBuffer = [];

    var wsConnection = new WsConnection("localhost", 6503);
    var rtcPeerConnection = new SimpleRTCPeerConnection(wsConnection);

    var _getMessages = function (messageType) {
        return _receivedMessages[messageType];
    }

    //Sends the message to the message buffer. It will wait there until it is flushed.
    var _sendMessageToBuffer = function (messageType) {

    }


    //Flush all of the accumulated messages in the buffer down the data channel to the peer.
    var _flushMessages = function () {

    }

    return {
        WebSocketServer: wsConnection,
        PeerConnection: rtcPeerConnection,
        FlushMessages: _flushMessages,
        SendMessagesToBuffer: _sendMessageToBuffer,
        GetMessages: _getMessages
    }
}();