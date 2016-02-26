var objects;
(function (objects) {
    // SOUND CLASS ++++++++++++++++++++++++++
    //
    // Represent a game sound that can be controlled at runtime
    //
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
            this._instance.pan = 0.5; // Has to be this due to a SoundJS bug.
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