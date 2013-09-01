/// <reference path="../../js/viewModels.js" />
(function () {
    WinJS.Namespace.define("CreateCodeBehind", {
        callLoadCards: function (setId) {
            ViewModels.loadCards(setId);
        }
    })
})();