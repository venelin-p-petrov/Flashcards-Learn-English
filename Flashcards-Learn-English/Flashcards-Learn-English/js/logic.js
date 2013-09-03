/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {

    var documentsLibrary = Windows.Storage.KnownFolders.documentsLibrary;
    var appFolder = null;

    var updateCurrentDeck = function (set) {
        if (set.currentDeck.cards.length == 0) {
            set.currentSession++;
        }
        for (var i = 0; i < set.decks.length; i++) {
            if (set.currentSession % (i + 1) == 0) {
                while (set.decks[i].cards.length > 0) {
                    set.currentDeck.cards.push(set.decks[i].cards.pop());
                }
            }
        }
        set.currentDeck.cards = shuffle(set.currentDeck.cards);

        if (set.currentDeck.cards.length == 0 && Logic.hasCards(set)) {
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

    var hasCards = function (set) {
        for (var i = 0; i < set.decks.length; i++) {
            if (set.decks[i].cards.length > 0) {
                return true;
            }
        }
        return false;
    }

    var saveSetToLocalData = function (set) {
        appFolder = documentsLibrary.createFolderAsync("Flashcards-Learn-English",
            Windows.Storage.CreationCollisionOption.openIfExists).done(function (folder) {
                folder.createFolderAsync("Saved Sets",
                   Windows.Storage.CreationCollisionOption.openIfExists).done(function (folder1) {
                       folder1.createFileAsync(set.title.toString() + ".flset",
                           Windows.Storage.CreationCollisionOption.replaceExisting).done(function (file) {
                               Windows.Storage.FileIO.writeTextAsync(file, JSON.stringify(set));
                           });
                    });
            });
    }

    var loadSetsFromLocalDataAsync = function () {
        return new WinJS.Promise(function (complete, error) {
            if (appFolder) {
                appFolder.getFolderAsync("Saved Sets").done(function (savedSetsFolder) {
                    savedSetsFolder.getFilesAsync().done(function (files) {
                        complete(files);
                    });
                });
            }
            else {
                appFolder = documentsLibrary.createFolderAsync("Flashcards-Learn-English",
                Windows.Storage.CreationCollisionOption.openIfExists).done(function (folder) {
                    folder.createFolderAsync("Saved Sets", Windows.Storage.CreationCollisionOption.openIfExists).done(function (savedSetsFolder) {
                        savedSetsFolder.getFilesAsync().done(function (files) {
                            complete(files);
                        });
                    });
                });
            }
           
        });
    }

    WinJS.Namespace.define("Logic", {
        addCardToDeck: addCardToDeck,
        removeCardFromDeck: removeCardFromDeck,
        updateCurrentDeck: updateCurrentDeck,
        hasCards: hasCards,
        saveSet: saveSetToLocalData,
        loadSetsAsync: loadSetsFromLocalDataAsync
    });
})();