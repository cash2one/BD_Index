function FindProxyForURL(url, host) {
   if (shExpMatch(url, "*/static/js/funs.js*"))
         return "PROXY localhost:8899";
   return "DIRECT";
}