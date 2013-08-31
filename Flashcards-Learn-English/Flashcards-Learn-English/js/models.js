/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    var SetModel = WinJS.Class.define(function (title, iconUrl) {
        this.title = title;
        this.deckNumber = 3;
        this.iconUrl = iconUrl;
        this.currentDeck = new Models.DeckModel();
        this.lang = "bg-en";
        this.decks = new Array(this.deckNumber);

        for (var i = 0; i < this.deckNumber; i++) {
            this.decks[i] = new Models.DeckModel();
        }
    }, {

    }, {

    });

    var DeckModel = WinJS.Class.define(function () {
        this.cards = new Array(new Models.CardModel("Котка", "Cat"));
    }, {
        first: {
            get: function () { return this.cards[0]; }
        },
        addCard: function (card) {
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
    }, {

    }, {

    });

    WinJS.Namespace.define("Models", {
        SetModel: SetModel,
        DeckModel: DeckModel,
        CardModel: CardModel
    });
})();