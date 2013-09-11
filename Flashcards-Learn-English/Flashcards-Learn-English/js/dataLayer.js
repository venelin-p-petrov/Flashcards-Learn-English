/// <reference path="data.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    var sets = new Array();
    var cards = new Array();
    var newCards = new Array();

    var getSets = function () {
        return sets;
    }

    var setSets = function (obj) {
        sets = obj;
    }

    var getSetById = function (id) {
        return sets[id];
    }

    var addSet = function (setModel) {
        sets.push(setModel);
    }

    var removeSet = function (index) {
        sets.splice(index, 1);
    }

    var getCards = function (setId) {
        if (!isNaN(setId)) {
            Data.emptyCards();
            var set = sets[setId];
            for (var i = 0; i < set.decks.length; i++) {
                for (var j = 0; j < set.decks[i].cards.length; j++) {
                    cards.push(set.decks[i].cards[j]);
                }
            }
            for (var i = 0; i < set.currentDeck.cards.length; i++) {
                cards.push(set.currentDeck.cards[i]);
            }

            for (var i = 0; i < newCards.length; i++) {
                cards.push(newCards[i]);
            }

            return cards;
        }

        return newCards;
    }

    var emptyCards = function () {
        cards = new Array();
    }

    var emptyNewCards = function () {
        newCards = new Array();
    }

    var addCard = function (cardModel) {
        newCards.push(cardModel);
        cards.push(cardModel);
    }

    var removeCard = function (setId, card) {
        if (setId) {
            var set = sets[setId];
            for (var i = 0; i < set.decks.length; i++) {
                var ind = set.decks[i].cards.indexOf(card);
                if (ind >= 0) {
                    Logic.removeCardFromDeck(set.decks[i], ind);
                }
            }

            var indc = set.currentDeck.cards.indexOf(card);
            if (indc >= 0) {
                Logic.removeCardFromDeck(set.currentDeck, indc);
            }

            cards.splice(cards.indexOf(card), 1);
        } else {
            newCards.splice(newCards.indexOf(card), 1);
            cards.splice(cards.indexOf(card), 1);
        }
    }

    var getCurrentCard = function (id) {
        return sets[id].currentDeck.cards[0];
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
        setSets: setSets,
        getSetById: getSetById,
        addSet: addSet,
        removeSet: removeSet,
        getCards: getCards,
        emptyCards: emptyCards,
        emptyNewCards: emptyNewCards,
        addCard: addCard,
        removeCard: removeCard,
        getCurrentCard: getCurrentCard,
        getRedCards: getRedCards,
        getYellowCards: getYellowCards,
        getGreenCards: getGreenCards,
        getCurrentCards: getCurrentCards
    });
})();