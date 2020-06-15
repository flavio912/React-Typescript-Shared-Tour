var cryptoObj = window.crypto;

const generateId = () => {
  var buf = new Uint8Array(32);
  cryptoObj.getRandomValues(buf);
  return btoa(String.fromCharCode.apply(null, buf));
};

const mapValues = (obj) => {
  return Object.keys(obj).map(function (key) {return obj[key]});
};

const newSocket = (ns, transport) => {
  var socket = {
    id: generateId(),
    namespace: ns,
    actions: [],
    pending: [],
    emit: null,
    on: null,
    emitNow: null,
    emitLater: null,
    connect: null,
    disconnect: null,
    handleEvent: null,
  };

  socket.on = (event, fn) => {
    socket.actions[event] = fn;
  };

  socket.emitLater = (data) => {
    var args = mapValues(data);
    socket.pending.push(() => {
      socket.emit.apply(this, args);
    });
  };
  socket.emit = socket.emitLater;

  socket.emitNow = (event, data) => {
    var obj = data;
    var args = Object.keys(obj).map(function (key) {return obj[key]});
    args = args.slice(1);
    transport.ws.send(JSON.stringify({
      namespace: socket.namespace,
      socket: socket.id,
      event: event,
      args: args
    }));
  };

  socket.connect = () => {
    socket.emit = socket.emitNow;
    socket.emit("connection");
    socket.handleEvent("connect", []);
    while(socket.pending.length > 0) {
      socket.pending.shift()();
    }
  };

  socket.disconnect = () => {
    socket.emit = socket.emitLater;
    socket.handleEvent("disconnect", []);
  };

  socket.handleEvent = (event, args) => {
    if (event in socket.actions) {
      socket.actions[event].apply(this, args);
    }
  };

  transport.sockets.push(socket);
  return socket;
};

const newTransport = (url) =>{
  var transport = {
    sockets: [],
    duration: 1000,
    ws: null,
    connect: null,    
  };

  transport.connect = () => {
    var ws = new WebSocket(url);
    transport.ws = ws;
    transport.duration = transport.duration * 2;
    if (transport.duration > 32000) {
      transport.duration = 32000;
    }

    ws.onopen = () => {
      transport.duration = 1000;
      for (var i = 0; i < transport.sockets.length; i++){
        transport.sockets[i].connect();
      }
    };

    ws.onmessage = (frame) => {
      var obj = JSON.parse(frame.data);
      for (var i = 0; i < transport.sockets.length; i++){
        if (obj.namespace === "") {
          obj.namespace = "/";
        }
        if (transport.sockets[i].namespace === obj.namespace) {
          transport.sockets[i].handleEvent(obj.event, obj.args);
        };
      }
    };

    ws.onclose = () => {
      for (var i = 0; i < transport.sockets.length; i++) {
        transport.sockets[i].disconnect();
      }
      setTimeout(transport.connect, transport.duration);
    };
  };

  transport.connect();
  return transport;
};

var transports = {};
const getTransport = (url) => {
  if (url in transports) {
    return transports[url];
  } else {
    var transport = newTransport(url);
    transports[url] = transport;
    return transport;
  }
};

const io = (host) => {
  if ("WebSocket" in window) {
    var parts = host.split("/");
    var ns = "/"+parts.slice(1).join("/");
    var protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    var url = protocol+parts[0]+"/socket";

    var transport = getTransport(url);
    var socket = newSocket(ns, transport);
    
    return socket;
  } else {
    return {};
  }
};

export default io;