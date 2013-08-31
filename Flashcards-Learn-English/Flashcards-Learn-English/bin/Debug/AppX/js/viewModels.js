/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="models.js" />
/// <reference path="dataLayer.js" />
(function () {
    var setList = new WinJS.Binding.List([]);

    var loadSets = function () {
        var setDTOs = Data.getSets();

        var currentCount = setList.dataSource.list.length;
        setList.dataSource.list.splice(0, currentCount);

        for (var i = 0; i < setDTOs.length; i++) {
            setList.push(setDTOs[i]);
        }
    }

    WinJS.Namespace.define("ViewModels", {
        loadSets: loadSets,
        sets: setList,
        addSet: function (title, deckNumber, iconUrl) {
            Data.addSet(new Models.SetModel(title, deckNumber, iconUrl));
        }
    });
})();