var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // REELITEM CLASS ++++++++++++++++++++++++++
    var ReelItem = (function (_super) {
        __extends(ReelItem, _super);
        // CONSTRUCTOR +++++++++++++++++++++
        function ReelItem(pathString, x, y) {
            _super.call(this, assets.getResult(pathString));
            this.itemName = pathString;
            this.x = x;
            this.y = y;
        }
        return ReelItem;
    })(createjs.Bitmap);
    objects.ReelItem = ReelItem;
})(objects || (objects = {}));
//# sourceMappingURL=reelItem.js.map