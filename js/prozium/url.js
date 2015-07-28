/*
 * PROZIUM.url
 */

(function(PROZIUM) {
  PROZIUM.url = function(args) {
    this.url = args.url;
    this.protocol = '';
    this.domain = '';
    this.path = '';
    this.file = '';
    this.paramString = '';
    this.paramHash = {};
    this.anchor = '';

    this.init();
  }

  var proto = PROZIUM.url.prototype;

  proto.init = function() {
    var self = this;

    self.protocol = this._getProtocol;

    console.log(self.url);
    console.log(self.protocol);
  }

  proto._setValue = function() {
    var self = this;

    var regexp = /^([a-z]+\:\/\/)([\w\.-]*)/;
  }

})(PROZIUM || (PROZIUM = {}));