var objects;
(function (objects) {
    var Sound = (function () {
        function Sound(_sfxName) {
            this._sfxName = _sfxName;
        }
        Sound.prototype.play = function (loop) {
            if (loop === void 0) { loop = 0; }
            this._instance = createjs.Sound.play(this._sfxName);
            this._instance.loop = loop;
            this._instance.volume = 0.5;
            this._instance.pan = 0.5;
        };
        Sound.prototype.stop = function () {
            this._instance.stop();
        };
        return Sound;
    })();
    objects.Sound = Sound;
})(objects || (objects = {}));
//# sourceMappingURL=sound.js.map