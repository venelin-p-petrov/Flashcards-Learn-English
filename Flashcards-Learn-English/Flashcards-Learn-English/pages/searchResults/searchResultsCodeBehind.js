/// <reference path="../../js/viewModels.js" />
(function () {
    var goToSetPage = function (invokeEvent) {
        var setIdValue = function () {
            var setItem = invokeEvent.detail.itemPromise._value.data;
            for (var i = 0; i < ViewModels.sets.length; i++) {
                if (ViewModels.getSetById(i).title == setItem.title) {
                    return i;
                }
            }
        };
        WinJS.Navigation.navigate("/pages/set/set.html", {       
            setId: setIdValue()
        });
    }
    
    WinJS.Utilities.markSupportedForProcessing(goToSetPage);

    WinJS.Namespace.define("SearchResultsCodeBehind", {
        
        goToSetPage: goToSetPage
    })
})();