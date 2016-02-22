var objects;
(function (objects) {
    var Sound = (function () {
        function Sound(_sfxName) {
            this._sfxName = _sfxName;
        }
        Sound.prototype.play = function () {
            var instance = createjs.Sound.play(this._sfxName);
            instance.volume = 0.5;
            instance.pan = 0.5;
        };
        return Sound;
    })();
    objects.Sound = Sound;
})(objects || (objects = {}));
//# sourceMappingURL=sound.js.map