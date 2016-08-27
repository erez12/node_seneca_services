function ServerConnection() {
    var _socket = io.connect();

    _socket.on('connect', function() {});

    return {
        on: (topic, callback) => {
            _socket.on(topic, callback);
        }
    }
}

function LocalConnection() {
    var callbacks = []

    return {
        on: (topic, callback) => {
            if (!callbacks[topic]) {
                callbacks[topic] = $.Callbacks();
            }

            callbacks[topic].add(callback);
        },
        notify: (topic, message) => callbacks[topic].fire(message)
    }
}

function ServerEventsService() {
    Object.assign(this, ServerConnection());
    // Object.assign(this, LocalConnection());
}