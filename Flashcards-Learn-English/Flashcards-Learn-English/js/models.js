/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    var SetModel = WinJS.Class.define(function (title, iconUrl) {
        this.title = title;
        this.deckNumber = 3;
        this.iconUrl = iconUrl;
        this.currentDeck = new Models.DeckModel();
        this.currentSession = 1;
        this.lang = "bg-en";
        this.decks = new Array(this.deckNumber);

        for (var i = 0; i < this.deckNumber; i++) {
            this.decks[i] = new Models.DeckModel(i);
        }
    }, {
        updateCurrentDeck: function () {
            this.currentDeck.cards = new Array();

            for (var i = 0; i < this.decks.length; i++) {
                if (this.currentSession % (i + 1) == 0) {
                    for (var j = 0; j < this.decks[i].cards.length; j++) {
                        this.currentDeck.cards.push(this.decks[i].cards[j]);
                    }
                }
            }

            this.currentDeck.cards = shuffle(this.currentDeck.cards);
        },
        getCurrentCard: {
            get: function () {
                if (this.currentDeck.cards.length == 0) {
                    this.currentSession++;
                    this.updateCurrentDeck();
                }
                return this.currentDeck.first;
            }
        }
    }, {

    });

    var DeckModel = WinJS.Class.define(function (deckId) {
        this.cards = new Array();
        this.deckId = deckId;
    }, {
        first: {
            get: function () { return this.cards[0]; }
        },
        addCard: function (card) {
            card.deckId = this.deckId;
            this.cards.push(card);
        },
        removeCard: function (index) {
            this.cards.splice(index, 1);
        }
    }, {

    });

    var CardModel = WinJS.Class.define(function (bgWord, enWord, enDefinition, enPartOfSpeech, enPronunciation) {
        this.bgWord = bgWord;
        this.enWord = enWord;
        this.enDefinition = enDefinition;
        this.enPartOfSpeech = enPartOfSpeech;
        this.enPronunciation = enPronunciation;
        this.deckId = 0;
    }, {

    }, {

    });

    WinJS.Namespace.define("Models", {
        SetModel: SetModel,
        DeckModel: DeckModel,
        CardModel: CardModel
    });

    function shuffle(array) {
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
})();