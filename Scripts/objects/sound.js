var objects;
(function (objects) {
    // SOUND CLASS ++++++++++++++++++++++++++
    var Sound = (function () {
        // CONSTRUCTOR +++++++++++++++++++++
        function Sound(_sfxName) {
            this._sfxName = _sfxName;
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start audio playback
        Sound.prototype.play = function (loop) {
            if (loop === void 0) { loop = 0; }
            this._instance = createjs.Sound.play(this._sfxName);
            this._instance.loop = loop; // Defaults to 0 (not looping)
            this._instance.volume = 0.5;
            this._instance.pan = 0.5;
        };
        // Stop audio playback
        Sound.prototype.stop = function () {
            this._instance.stop();
        };
        return Sound;
    })();
    objects.Sound = Sound;
})(objects || (objects = {}));
//# sourceMappingURL=sound.js.map