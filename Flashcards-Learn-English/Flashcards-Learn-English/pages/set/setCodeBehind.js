/// <reference path="../../js/viewModels.js" />
(function () {
    WinJS.Namespace.define("SetCodeBehind", {
        callUpdate: function (setId) {
            ViewModels.setCurrentCard(setId);
            ViewModels.setCardState(setId);
        }
    });
})();