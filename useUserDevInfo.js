import { useState, useEffect } from "react";

const osData = [
  { name: "Windows Phone", value: "Windows Phone", version: "OS" },
  { name: "Windows", value: "Win", version: "NT" },
  { name: "iPhone", value: "iPhone", version: "OS" },
  { name: "iPad", value: "iPad", version: "OS" },
  { name: "Kindle", value: "Silk", version: "Silk" },
  { name: "Android", value: "Android", version: "Android" },
  { name: "PlayBook", value: "PlayBook", version: "OS" },
  { name: "BlackBerry", value: "BlackBerry", version: "/" },
  { name: "Macintosh", value: "Mac", version: "OS X" },
  { name: "Linux", value: "Linux", version: "rv" },
  { name: "Palm", value: "Palm", version: "PalmOS" }
];

const browserData = [
  { name: "Chrome", value: "Chrome", version: "Chrome" },
  { name: "Firefox", value: "Firefox", version: "Firefox" },
  { name: "Safari", value: "Safari", version: "Version" },
  { name: "Internet Explorer", value: "MSIE", version: "MSIE" },
  { name: "Opera", value: "Opera", version: "Opera" },
  { name: "BlackBerry", value: "CLDC", version: "CLDC" },
  { name: "Mozilla", value: "Mozilla", version: "Mozilla" }
];

const headerData = [
  navigator.platform,
  navigator.userAgent,
  navigator.appVersion,
  navigator.vendor,
  window.opera
];

function checkBrowser(string, data) {
  var i = 0,
    j = 0,
    regex,
    regexv,
    match,
    matches,
    version;

  for (i = 0; i < data.length; i += 1) {
    regex = new RegExp(data[i].value, "i");
    match = regex.test(string);
    if (match) {
      regexv = new RegExp(data[i].version + "[- /:;]([d._]+)", "i");
      matches = string.match(regexv);
      version = "";
      if (matches) {
        if (matches[1]) {
          matches = matches[1];
        }
      }
      if (matches) {
        matches = matches.split(/[._]+/);
        for (j = 0; j < matches.length; j += 1) {
          if (j === 0) {
            version += matches[j] + ".";
          } else {
            version += matches[j];
          }
        }
      } else {
        version = "0";
      }
      return {
        name: data[i].name,
        version: parseFloat(version)
      };
    }
  }
  return { name: "unknown", version: 0 };
}

function getDeviceType() {
  if (navigator.userAgent.match(/mobile/i)) {
    return "Mobile";
  } else if (navigator.userAgent.match(/iPad|Android|Touch/i)) {
    return "Tablet";
  } else {
    return "Desktop";
  }
}
function isTouchDevice() {
  return "ontouchstart" in document.documentElement;
}

const useUserDevInfo = () => {
  const [info, setInfo] = useState({
    size: [0, 0],
    os: "unknown",
    browser: "unknown",
    device: "unkown",
    isTouch: "unknown",
    isOnline: "unknown"
  });

  const updateSize = () => {
    setInfo({
      ...info,
      size: [window.innerWidth, window.innerHeight]
    });
  };

  useEffect(() => {
    const agent = headerData.join(" ");
    window.addEventListener("resize", updateSize);
    updateSize();

    setInfo({
      ...info,
      os: checkBrowser(agent, osData),
      browser: checkBrowser(agent, browserData),
      device: getDeviceType(),
      isTouch: isTouchDevice(),
      isOnline: navigator.onLine
    });

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return info;
};

export default useUserDevInfo;
