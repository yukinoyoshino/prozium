/*
 * PROZIUM.string
 */

var PROZIUM = {};

(function(PROZIUM) {
  PROZIUM.string = function(args) {
    this.inputTarget = $(args.inputTextClassName);
    this.inputString = '';
    this.outputTarget = $(args.outputTextClassName);
    this.outputString = '';
    this.trigger = $(args.triggerClassName);
    this.operationType = args.operationType;
    this._operationTypeList = ['count'];
    this._operationTypeNo;

    this.init();
  }

  var proto = PROZIUM.string.prototype;

  proto.init = function() {
    var self = this;

    self.trigger.on('click', function() {

      self._operationTypeNo = ($.inArray(self.operationType, self._operationTypeList));
      var isOperatable = self._operationTypeNo < 0 ? false : true;
      if (!isOperatable) {
        console.warn('この処理は実行できません');
        return false;
      }

      self.inputString = self.inputTarget.val();

      switch (self._operationTypeNo) {
        case 0:
          self._count();
          break;
      }

      return false;
    });
  }

  proto._count = function() {
    var self = this;

    self.outputString = self.inputString.length;
    self.outputTarget.text(self.outputString);
  }
})(PROZIUM || (PROZIUM = {}));