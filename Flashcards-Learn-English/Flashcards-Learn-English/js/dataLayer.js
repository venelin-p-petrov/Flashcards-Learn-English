/// <reference path="data.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    var sets = new Array(Data.Animals(), Data.AtHome(), Data.AtSchool());
    var cards = new Array();

    for (var i = 0; i < sets.length; i++) {
        sets[i].updateCurrentDeck();
    }

    var getSets = function () {
        return sets;
    }

    var getCards = function (setId) {
        //var cards = new Array();
        //var set = sets[setId];
        //for (var i = 0; i < set.decks.length; i++) {
        //    for (var j = 0; j < set.decks[i].cards.length; j++) {
        //        cards.push(set.decks[i].cards[j]);
        //    }
        //}

        return cards;
    }

    var addSet = function (setModel) {
        sets.push(setModel);
        sets[sets.length - 1].updateCurrentDeck();
    }

    var addCard = function (cardModel) {
        cards.push(cardModel);
    }

    var removeSet = function (index) {
        sets.splice(index, 1);
    }

    WinJS.Namespace.define("Data", {
        getSets: getSets,
        getCards: getCards,
        addSet: addSet,
        addCard: addCard,
        removeSet: removeSet
    });
})();