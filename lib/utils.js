
function Utils (name) {
  this.fileName = "[" + name + "] ";
}

Utils.prototype.prepare = function (option) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    var date = new Date();
    args.unshift(this.getFileName());
    args.unshift("(" + date.getMonth() +
    "-" + date.getDate() + "-" + date.getHours() +
     ":" + date.getMinutes() + ")");
    if (option) {
      console.log(option, args.join(""));
    } else {
      console.log(args.join(""));
    }
  };
};
Utils.prototype.getFileName = function () { return this.fileName; };

Utils.prototype.print = Utils.prototype.prepare("");

Utils.prototype.printRed = Utils.prototype.prepare("\x1b[31m%s\x1b[0m");

Utils.prototype.printBlue = Utils.prototype.prepare("\x1b[34m%s\x1b[0m");

Utils.prototype.printYellow = Utils.prototype.prepare("\x1b[33m%s\x1b[0m");

Utils.prototype.printGreen = Utils.prototype.prepare("\x1b[32m%s\x1b[0m");

Utils.prototype.printMagenta = Utils.prototype.prepare("\x1b[35m%s\x1b[0m");

Utils.prototype.printBlink = Utils.prototype.prepare("\x1b[5m%s\x1b[0m");

Utils.prototype.printGray = Utils.prototype.prepare("\x1b[90m%s\x1b[0m");

Utils.prototype.printCyan = Utils.prototype.prepare("\x1b[96m%s\x1b[0m");

module.exports = Utils;
