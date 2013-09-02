/// <reference path="data.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    var sets = new Array(Data.Animals());
    var cards = new Array();

    for (var i = 0; i < sets.length; i++) {
        Logic.updateCurrentDeck(sets[i]);
    }

    var getSets = function () {
        return sets;
    }

    var getSetById = function (id) {
        return sets[id];
    }

    var getCards = function (setId) {
        if (setId) {
            var set = sets[setId];
            var cardsFromSet = new Array();
            for (var i = 0; i < set.decks.length; i++) {
                for (var j = 0; j < set.decks[i].cards.length; j++) {
                    cardsFromSet.push(set.decks[i].cards[j]);
                }
            }

            return cardsFromSet;
        }
        return cards;
    }

    var addCard = function (cardModel) {
        cards.push(cardModel);
    }

    var getCurrentCard = function (id) {
        return sets[id].currentDeck.cards[0];
    }

    var addSet = function (setModel) {
        sets.push(setModel);
    }

    var removeSet = function (index) {
        sets.splice(index, 1);
    }

    var getRedCards = function (setId) {
        var decks = sets[setId].decks;
        var number = decks[0].cards.length;

        return number;
    }

    var getYellowCards = function (setId) {
        var decks = sets[setId].decks;
        var number = 0;
        for (var i = 1; i < decks.length - 1; i++) {
            number += decks[i].cards.length;
        }

        return number;
    }

    var getGreenCards = function (setId) {
        var decks = sets[setId].decks;
        var number = decks[decks.length - 1].cards.length;

        return number;
    }

    var getCurrentCards = function (setId) {
        var number = sets[setId].currentDeck.cards.length;

        return number;
    }

    WinJS.Namespace.define("Data", {
        getSets: getSets,
        getSetById: getSetById,
        getCards: getCards,
        addCard: addCard,
        getCurrentCard: getCurrentCard,
        addSet: addSet,
        removeSet: removeSet,
        getRedCards: getRedCards,
        getYellowCards: getYellowCards,
        getGreenCards: getGreenCards,
        getCurrentCards: getCurrentCards
    });
})();