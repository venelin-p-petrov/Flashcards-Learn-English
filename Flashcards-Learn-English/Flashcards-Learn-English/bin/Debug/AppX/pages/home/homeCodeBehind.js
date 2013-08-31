/// <reference path="../../js/viewModels.js" />
(function () {
    var goToSetPage = function (invokeEvent) {
        WinJS.Navigation.navigate("/pages/set/set.html", {
            setId: invokeEvent.detail.itemIndex
        });
    }

    WinJS.Utilities.markSupportedForProcessing(goToSetPage);

    WinJS.Namespace.define("HomeCodeBehind", {
        callLoadSets: function () {
            ViewModels.loadSets();
        },
        goToSetPage: goToSetPage
    })
})();