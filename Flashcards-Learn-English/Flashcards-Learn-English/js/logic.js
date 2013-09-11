/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {

    var localFolder = Windows.Storage.ApplicationData.current.localFolder;
    var storagePermissions = Windows.Storage.AccessCache.StorageApplicationPermissions;
    var setIcons = {};

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

    //var saveSetAsync = function (set) {
    //    return new WinJS.Promise(function (complete, error) {
    //        documentsLibrary.createFolderAsync("Flashcards-Learn-English",
    //            Windows.Storage.CreationCollisionOption.openIfExists).done(function (folder) {
    //                folder.createFolderAsync("Saved Sets",
    //                   Windows.Storage.CreationCollisionOption.openIfExists).done(function (folder1) {
    //                       folder1.createFileAsync(set.title.toString() + ".flset",
    //                           Windows.Storage.CreationCollisionOption.replaceExisting).done(function (file) {
    //                               Windows.Storage.FileIO.writeTextAsync(file, JSON.stringify(set));
    //                           });
    //                   });
    //            });
    //    });
    //}

    var saveIconAsync = function (fileToSave) {
        return new WinJS.Promise(function (complete, error) {
            if (fileToSave) {
                localFolder.createFolderAsync("Icons",
                    Windows.Storage.CreationCollisionOption.openIfExists).then(function (iconsFolder) {
                        fileToSave.copyAsync(iconsFolder, fileToSave.name,
                            Windows.Storage.NameCollisionOption.generateUniqueName).then(function (iconCopy) {
                                var token = iconCopy.name;
                                storagePermissions.futureAccessList.addOrReplace(token, iconCopy);
                                complete(token);
                            },
                            function (msg) {
                                error("Иконата не можа да бъде запазена");
                            });
                    });
            }
            else {
                error("Няма подадена икона за запазване.");
            }
        });
    }

    var deleteIconAsync = function (token) {
        return new WinJS.Promise(function (complete, error) {
            localFolder.createFolderAsync("Icons",
                    Windows.Storage.CreationCollisionOption.openIfExists).then(function (iconsFolder) {
                        iconsFolder.getFileAsync(token).then(function (iconFile) {
                            iconFile.deleteAsync().then(function () {
                                storagePermissions.futureAccessList.remove(token);
                                complete();
                            },
                            function () {
                                error("Възникна грешка при изтриването на иконата.");
                            });
                        },
                        function () {
                            complete();
                        });
                    });
        });
    }

    var loadIcon = function (token) {
        if (storagePermissions.futureAccessList.containsItem(token)) {
            storagePermissions.futureAccessList.getFileAsync(token).then(function (iconFile) {
                setIcons[token] = URL.createObjectURL(iconFile);
            });
        }
    }

    var loadIcons = function () {
        var sets = Data.getSets();
        for (var i = 0; i < sets.length; i++) {
            Logic.loadIcon(sets[i].iconToken);
        }
    }

    //var loadSetsAsync = function () {
    //    return new WinJS.Promise(function (complete, error) {
    //        documentsLibrary.createFolderAsync("Flashcards-Learn-English",
    //            Windows.Storage.CreationCollisionOption.openIfExists).done(function (folder) {
    //                folder.createFolderAsync("Saved Sets", Windows.Storage.CreationCollisionOption.openIfExists).done(function (savedSetsFolder) {
    //                    savedSetsFolder.getFilesAsync().done(function (files) {
    //                        complete(files);
    //                    });
    //                });
    //            });
    //    });
    //}

    //var loadDefault = function () {
    //    return new WinJS.Promise(function (complete, error) {
    //        if (!Windows.Storage.ApplicationData.current.localSettings.values["already-run"]) {
    //            Data.sets.push(Data.Animals());
    //            Data.sets.push(Data.AtHome());
    //            Data.sets.push(Data.AtSchool());

    //            for (var i = 0; i < Data.sets.length; i++) {
    //                Logic.updateCurrentDeck(Data.sets[i]);
    //                //Logic.saveSet(Data.sets[i]).then(complete);
    //            }
    //        }
    //    });
    //}

    var deleteSetAsync = function (index) {
        return new WinJS.Promise(function (complete, error) {
            var set = Data.getSetById(index);
            Logic.deleteIconAsync(set.iconToken).then(function () {
                Data.removeSet(index);
                Logic.saveSetsAsync().then(function () {
                    complete();
                });
            },
            function () {
                error("Възникна грешка при изтриването на тестето.");
            });
        });
    }

    var converterFileTokenToUrl = WinJS.Binding.converter(function (token) {
        if (setIcons[token]) {
            return setIcons[token];
        }
        else {
            return "ms-appx:///images/card-file-icon.png";
        }
    });

    var saveSetsToLocalDataAsync = function () {
        return new WinJS.Promise(function (complete, error) {
            localFolder.createFileAsync("SavedSets",
                Windows.Storage.CreationCollisionOption.replaceExisting).then(function (file) {
                    var sets = Data.getSets();
                    Windows.Storage.FileIO.writeTextAsync(file, JSON.stringify(sets));
                    complete();
                },
                function () {
                    error("Възникна грешка при запазването на тестетата.");
                });
        });
    }

    WinJS.Namespace.define("Logic", {
        addCardToDeck: addCardToDeck,
        removeCardFromDeck: removeCardFromDeck,
        updateCurrentDeck: updateCurrentDeck,
        hasCards: hasCards,
        //saveSet: saveSetAsync,
        //loadSetsAsync: loadSetsAsync,
        saveIconAsync: saveIconAsync,
        deleteIconAsync: deleteIconAsync,
        loadIcon: loadIcon,
        loadIcons: loadIcons,
        //loadDefault: loadDefault,
        deleteSetAsync: deleteSetAsync,
        tokenToUrl: converterFileTokenToUrl,
        saveSetsAsync: saveSetsToLocalDataAsync
    });
})();