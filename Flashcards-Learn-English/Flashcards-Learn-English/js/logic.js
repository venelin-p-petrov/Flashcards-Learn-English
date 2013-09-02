/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {

    var updateCurrentDeck = function (set) {
        set.currentSession++;
        for (var i = 0; i < set.decks.length; i++) {
            if (set.currentSession % (i + 1) == 0) {
                while (set.decks[i].cards.length > 0) {
                    set.currentDeck.cards.push(set.decks[i].cards.pop());
                }
            }
        }
        set.currentDeck.cards = shuffle(set.currentDeck.cards);

        if (set.currentDeck.cards.length == 0) {
            Logic.updateCurrentDeck(set);
        }
    }

    var addCardToDeck = function (card, deck) {
        card.deckId = deck.deckId;
        deck.cards.push(card);
    }

    var removeCardFromDeck = function (deck, index) {
        deck.cards.splice(index, 1);
    }

    var shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    WinJS.Namespace.define("Logic", {
        addCardToDeck: addCardToDeck,
        removeCardFromDeck: removeCardFromDeck,
        updateCurrentDeck: updateCurrentDeck
    });
})();