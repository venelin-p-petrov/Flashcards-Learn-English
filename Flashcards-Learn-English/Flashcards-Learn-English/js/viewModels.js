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
    var searchQuery = WinJS.Binding.as({ title: "" });

    var filteredSets = setList.createFiltered(function (item) {

        var queryIndexInItemString =
        JSON.stringify(item).toLowerCase().indexOf(searchQuery.title.toLowerCase());

        var isSelected = queryIndexInItemString > -1 &&
                         item.title.toLowerCase() == searchQuery.title.toLowerCase();

        return isSelected;
    });

    var changeSearchQuery = function (text) {
        searchQuery.title = text;
        setList.notifyReload();
    }

    WinJS.Namespace.define("ViewModels", {
        loadSets: loadSets,
        sets: setList,
        loadCards: loadCards,
        cards: cardList,
        getCards: function (setId) {
            return Data.getCards(setId);
        },
        emptyNewCards: function () {
            Data.emptyNewCards();
        },
        getSetById: function (id) {
            return Data.getSetById(id);
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
        addSetObject: function(set){
            Data.addSet(set);
        },
        removeSet: function (index) {
            Data.removeSet(index);
        },
        addCard: function (bgWord, enWord, enDefinition, partOfSpeech, pronunciation) {
            Data.addCard(new Models.CardModel(bgWord, enWord, enDefinition, partOfSpeech, pronunciation));
        },
        removeCard: function (setId, card) {
            Data.removeCard(setId, card);
        },
        searchSets: filteredSets,
        submitSearchText: changeSearchQuery,
        searchQuery: searchQuery
    });
})();