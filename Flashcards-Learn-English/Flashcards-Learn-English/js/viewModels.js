/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="models.js" />
/// <reference path="dataLayer.js" />
(function () {
    var setList = new WinJS.Binding.List([]);
    var cardList = new WinJS.Binding.List([]);
    var currentCard = new WinJS.Binding.as({ card: {} });
    var redCards = new WinJS.Binding.as({ number: 0 });
    var yellowCards = new WinJS.Binding.as({ number: 0 });
    var greenCards = new WinJS.Binding.as({ number: 0 });
    var currentCards = new WinJS.Binding.as({ number: 0 });

    var setCurrentCard = function (setId) {
        currentCard.card = Data.getCurrentCard(setId);
    }

    var setCardState = function (setId) {
        redCards.number = Data.getRedCards(setId);
        yellowCards.number = Data.getYellowCards(setId);
        greenCards.number = Data.getGreenCards(setId);
        currentCards.number = Data.getCurrentCards(setId);
    }

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
        getCards: function () {
            return Data.getCards();
        },
        setCurrentCard: setCurrentCard,
        currentCard: currentCard,
        setCardState: setCardState,
        redCards: redCards,
        yellowCards: yellowCards,
        greenCards: greenCards,
        currentCards: currentCards,
        addSet: function (title, iconUrl) {
            var set = new Models.SetModel(title, iconUrl);
            Data.addSet(set);
            return set;
        },
        removeSet: function (index) {
            Data.removeSet(index);
        },
        addCard: function (bgWord, enWord, enDefinition, partOfSpeech, pronunciation) {
            Data.addCard(new Models.CardModel(bgWord, enWord, enDefinition, partOfSpeech, pronunciation));
        }
    });
})();