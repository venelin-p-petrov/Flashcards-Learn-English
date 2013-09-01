/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="models.js" />
/// <reference path="dataLayer.js" />
(function () {
    var setList = new WinJS.Binding.List([]);
    var cardList = new WinJS.Binding.List([]);

    var loadSets = function () {
        var setDTOs = Data.getSets();

        var currentCount = setList.dataSource.list.length;
        setList.dataSource.list.splice(0, currentCount);

        for (var i = 0; i < setDTOs.length; i++) {
            setList.push(setDTOs[i]);
        }
    }

    var loadCards = function (setId) {
        var cardDTOs = Data.getCards(setId);

        var currentCount = cardList.dataSource.list.length;
        cardList.dataSource.list.splice(0, currentCount);

        for (var i = 0; i < cardDTOs.length; i++) {
            cardList.push(cardDTOs[i]);
        }
    }

    WinJS.Namespace.define("ViewModels", {
        loadSets: loadSets,
        sets: setList,
        loadCards: loadCards,
        cards: cardList,
        addSet: function (title, iconUrl) {
            Data.addSet(new Models.SetModel(title, iconUrl));
            return Data.getSets().length - 1;
        },
        removeSet: function (index) {
            Data.removeSet(index);
        },
        addCard: function (bgWord, enWord, enDefinition, enPartOfSpeech, enPronunciation) {
            Data.addCard(new Models.CardModel(bgWord, enWord, enDefinition, enPartOfSpeech, enPronunciation));
            return Data.getCards().length - 1;
        }
    });
})();