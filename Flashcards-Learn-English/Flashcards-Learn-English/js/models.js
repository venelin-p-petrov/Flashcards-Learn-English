/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    var SetModel = WinJS.Class.define(function (title, iconUrl) {
        this.title = title;
        this.iconUrl = iconUrl;
        this.currentDeck = new Models.DeckModel();
        this.currentSession = 1;
        this.decks = new Array(new Models.DeckModel(0), new Models.DeckModel(1), new Models.DeckModel(2));
    }, {
        title: "",
        iconUrl: "",
        currentDeck: {},
        currentSession: 0,
        decks: {}
    });

    var DeckModel = WinJS.Class.define(function (deckId) {
        this.cards = new Array();
        this.deckId = deckId;
    }, {
        cards: {},
        deckId: 0
    });

    var CardModel = WinJS.Class.define(function (bgWord, enWord, enDefinition, enPartOfSpeech, enPronunciation) {
        this.bgWord = bgWord;
        this.enWord = enWord;
        this.enDefinition = enDefinition;
        this.enPartOfSpeech = enPartOfSpeech;
        this.enPronunciation = enPronunciation;
        this.deckId = 0;
    }, {
        bgWord: "",
        enWord: "",
        enDefinition: "",
        enPartOfSpeech: "",
        enPronunciation: "",
        deckId: 0
    });

    WinJS.Namespace.define("Models", {
        SetModel: SetModel,
        DeckModel: DeckModel,
        CardModel: CardModel
    });
})();