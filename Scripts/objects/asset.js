var objects;
(function (objects) {
    // ASSET CLASS ++++++++++++++++++++++++++
    //
    // Used to preload and store game assets
    // 
    var Asset = (function () {
        // CONSTRUCTOR +++++++++++++++++++++
        function Asset(id, src) {
            this.id = id;
            this.src = src;
        }
        return Asset;
    })();
    objects.Asset = Asset;
})(objects || (objects = {}));
//# sourceMappingURL=asset.js.map