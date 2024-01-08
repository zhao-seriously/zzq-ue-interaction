function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, function (t) {
    return (
      t ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (t / 4)))
    ).toString(16);
  });
}

(function ueSetup() {
  window.ue4 = (function (r) {
    "object" != typeof window.ue && (window.ue = {});
    return "object" != typeof ue.interface ||
      "function" != typeof ue.interface.broadcast
      ? ((ue.interface = {}),
        function (t, e, n, o) {
          var u, i;
          "string" == typeof t &&
            ("function" == typeof e && ((o = n), (n = e), (e = null)),
            (u = [t, "", r(n, o)]),
            void 0 !== e && (u[1] = e),
            (i = encodeURIComponent(JSON.stringify(u))),
            "object" == typeof history && "function" == typeof history.pushState
              ? (history.pushState({}, "", "#" + i),
                history.pushState({}, "", "#" + encodeURIComponent("[]")))
              : ((document.location.hash = i),
                (document.location.hash = encodeURIComponent("[]"))));
        })
      : ((i = ue.interface),
        (ue.interface = {}),
        function (t, e, n, o) {
          var u;
          "string" == typeof t &&
            ("function" == typeof e && ((o = n), (n = e), (e = null)),
            (u = r(n, o)),
            void 0 !== e
              ? i.broadcast(t, JSON.stringify(e), u)
              : i.broadcast(t, "", u));
        });
    var i;
  })(function (t, e) {
    if ("function" != typeof t) return "";
    var n = uuidv4();
    return (
      (ue.interface[n] = t),
      setTimeout(function () {
        delete ue.interface[n];
      }, 1e3 * Math.max(1, parseInt(e) || 0)),
      n
    );
  });
})();

/**
 * 发送事件给UE
 * @param {string} eventName 事件名称
 * @param {object} data 事件数据
 * @param {object} options 选项
 */
const ueSend = (eventName, data, options = { isJson: true }) => {
  if (options.isJson) {
    data = JSON.stringify(data);
  }
  ue4(eventName, data);
};

/**
 * UE接收事件
 * @param {string} eventName 事件名称
 * @param {function} callback 回调函数
 */
const ueReceive = (eventName, callback) => {
  window.ue.interface[eventName] = callback;
};

export { ueSend, ueReceive };
