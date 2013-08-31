/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    var sets = new Array(new Models.SetModel("new", 3));

    var getSets = function () {
        return sets;
    }

    var addSet = function (setModel) {
        sets.push(setModel);
    }

    var removeSet = function (index) {
        sets.splice(index, 1);
    }

    WinJS.Namespace.define("Data", {
        getSets: getSets,
        addSet: addSet,
        removeSet: removeSet
    });
})();