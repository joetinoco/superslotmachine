var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Button = (function (_super) {
        __extends(Button, _super);
        //CONSTRUCTOR
        function Button(pathString, x, y, isCentered) {
            _super.call(this, assets.getResult(pathString));
            this.isCentered = isCentered;
            this.x = x;
            this.y = y;
            // Center a button around the X/Y coords
            if (this.isCentered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getBounds().height * 0.5;
            }
            // Apply a simple mouseover effect
            this.on("mouseover", this.overButton, this);
            this.on("mouseout", this.outButton, this);
            this.enabled = true;
        }
        // PRIVATE METHODS
        // Event Handler for mouse over
        Button.prototype.overButton = function (event) {
            if (this.enabled) {
                event.currentTarget.alpha = 0.7;
            }
            else
                event.currentTarget.alpha = 0.3;
        };
        // Event Handler for mouse out
        Button.prototype.outButton = function (event) {
            if (this.enabled) {
                event.currentTarget.alpha = 1.0;
            }
            else
                event.currentTarget.alpha = 0.3;
        };
        // Enable/disable a button
        Button.prototype.disableButton = function () {
            this.alpha = 0.3;
            this.enabled = false;
        };
        Button.prototype.enableButton = function () {
            this.alpha = 1.0;
            this.enabled = true;
        };
        return Button;
    })(createjs.Bitmap);
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=button.js.map