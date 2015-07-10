/*
 * PROZIUM.string
 */

var PROZIUM = {};

(function(PROZIUM) {
  PROZIUM.string = function(args) {
    this.inputTarget = $(args.inputTextClassName);
    this.inputString = '';
    this.outputTargetList = args.outputTargetList;
    this.outputDataList = {
      outputString: '',
      countedTotal: 0,
      countedRemovedTag: 0,
      countedRemovedCite: 0,
      countedRemovedEmbed: 0,
      countedPlainText: 0
    };
    this.trigger = $(args.triggerClassName);
    this.operationType = args.operationType;
    this._operationTypeList = ['count'];
    this._operationTypeNo = -1;

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

      self._inputValue(self.outputTargetList, self.outputDataList);

      return false;
    });
  }

  proto._count = function() {
    var self = this;
    var _rawInputString = self.inputString;
    var _formattedString = _rawInputString;
    var _htmlTagRegExp = /<\/*[^>]*>/igm;
    var _citeTextRegExp = /<blockquote[^>]*>.*<\/blockquote>\n/igm;
    var _snsEmbedRegExpList = {
      twitter: /<blockquote class="twitter-tweet"[^>]*>.*<\/blockquote>\n<script[^>]*><\/script>\n/gim,
      youtube: /<iframe[^>]*><\/iframe>\n/gim,
      instagram: /<blockquote class="instagram-media"[^>]*>.*<\/blockquote>\n*<script[^>]*><\/script>\n/gim
    };

    self.outputDataList.countedTotal = _rawInputString.length;
    self.outputDataList.countedRemovedTag = self._getReplacedString(_rawInputString, '', _htmlTagRegExp).length;
    self.outputDataList.countedRemovedCite = self._getReplacedString(_rawInputString, '', _citeTextRegExp).length;
    for (sns in _snsEmbedRegExpList) {
      _formattedString = self._getReplacedString(_formattedString, '', _snsEmbedRegExpList[sns]);
    }
    self.outputDataList.countedRemovedEmbed = _formattedString.length;
    _formattedString = self._getReplacedString(_formattedString, '', _citeTextRegExp);
    self.outputDataList.countedPlainText = self._getReplacedString(_formattedString, '', _htmlTagRegExp).length;
  }

  proto._getReplacedString = function(rawStr, replaceStr, regexp) {
    return rawStr.replace(regexp, replaceStr);
  }

  proto._inputValue = function(selectorList, valueList) {
    for (key in selectorList) {
      if ($(selectorList[key])) $(selectorList[key]).val(valueList[key]);
    }
  }
})(PROZIUM || (PROZIUM = {}));