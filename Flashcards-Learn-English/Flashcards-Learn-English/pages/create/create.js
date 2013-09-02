/// <reference path="../../js/viewModels.js" />
/// <reference path="createCodeBehind.js" />
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/create/create.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        init: function (element, options) {
            CreateCodeBehind.callLoadCards(options.setId);
        },
        ready: function (element, options) {
            var title = "";
            if (options.type == "create") {
                title = "Създай ново тесте";
            }
            else if (options.type == "change") {
                title = "Промени тестето"
            }
            if (!isNaN(options.setId)) {
                var set = ViewModels.getSetById(options.setId);
                WinJS.Binding.processAll(element, { title: title, setTitle: set.title, iconUrl: set.iconUrl });
            }
            else {
                WinJS.Binding.processAll(element, { title: title, setTitle: "", iconUrl: "" });
            }

            var appBar = document.getElementById("appbar").winControl;
            var addCardButton = document.getElementById("add-card");
            var createSetButton = document.getElementById("create-set-button");
            var generateWordButton = document.getElementById("generate-word");
            var cardList = document.getElementById("card-list").winControl;
            var deleteCardsButton = document.getElementById("delete-card");

            cardList.addEventListener("selectionchanged", function () {
                var cardSelectionCommands = document.querySelectorAll(".cardSelection");

                if (cardList.selection.count() > 0) {
                    appBar.disabled = false;
                    appBar.showOnlyCommands(cardSelectionCommands);

                    appBar.sticky = true;
                    if (appBar.hidden) {
                        appBar.show();
                    }
                }
                else if (cardList.selection.count() == 0) {
                    appBar.hideCommands(cardSelectionCommands);
                    appBar.sticky = false;
                    appBar.hide();
                    appBar.disabled = true;
                }
            });

            addCardButton.addEventListener("click", function (e) {
                e.preventDefault();
                var bgWordInput = document.getElementById("bg-word-input");
                var enWordInput = document.getElementById("en-word-input");
                var pronunciationInput = document.getElementById("pronunciation-input");
                var partOfSpeechInput = document.getElementById("part-of-speech-input");
                var enDefinitionInput = document.getElementById("en-definition-input");

                ViewModels.addCard(
                    bgWordInput.value,
                    enWordInput.value,
                    enDefinitionInput.value,
                    partOfSpeechInput.value,
                    pronunciationInput.value);
                ViewModels.loadCards(options.setId);

                bgWordInput.value = "";
                enWordInput.value = "";
                pronunciationInput.value = "";
                partOfSpeechInput.value = "";
                enDefinitionInput.value = "";
            });

            createSetButton.addEventListener("click", function (e) {
                e.preventDefault();
                var title = document.getElementById("set-title").value;
                var iconUrl = document.getElementById("set-icon").innerText;
                var set = null;
                var cards = [];
                if (options.type == "create") {
                    set = ViewModels.addSet(title, iconUrl);
                    set.lastModified = Date.now();
                    cards = ViewModels.getCards();
                    ViewModels.emptyNewCards();
                    for (var i = 0; i < cards.length; i++) {
                        Logic.addCardToDeck(cards[i], set.decks[cards[i].deckId]);
                    }

                    ViewModels.loadCards();
                }
                else if (options.type == "change") {
                    set = ViewModels.getSetById(options.setId);
                    set.title = title;
                    set.iconUrl = iconUrl;
                    set.lastModified = Date.now();
                    cards = ViewModels.getCards(options.setId)

                    for (var i = 0; i < set.decks.length; i++) {
                        set.decks[i].cards = new Array();
                    }
                    set.currentDeck.cards = new Array();

                    for (var i = 0; i < cards.length; i++) {
                        Logic.addCardToDeck(cards[i], set.decks[cards[i].deckId]);
                    }
                    ViewModels.emptyNewCards();
                    ViewModels.loadCards(options.setId);
                }
                
                Logic.updateCurrentDeck(set);
                Logic.saveSet(set);
                WinJS.Navigation.back();
            });

            generateWordButton.addEventListener("click", function (e) {
                e.preventDefault();
                var englishWordElement = document.getElementById("en-word-input");
                var englishWord = englishWordElement.value;
                if (englishWord) {
                    XMLRequests.GetBGTranslation(englishWord).then(function (wordBg) {
                        var bgWordElement = document.getElementById("bg-word-input");
                        bgWordElement.innerText = wordBg;
                    });
                    XMLRequests.GetDefinition(englishWord).then(function (definition) {
                        var englishWordDefinitionElement = document.getElementById("en-definition-input");
                        englishWordDefinitionElement.innerText = definition;
                    });

                    XMLRequests.GetPronounciation(englishWord).then(function (pronounciation) {
                        var englishWordPronounciationElement = document.getElementById("pronunciation-input");
                        englishWordPronounciationElement.innerText = pronounciation;
                    });

                    XMLRequests.GetPartOfSpeech(englishWord).then(function (partOfSpeech) {
                        var partOfSpeechElement = document.getElementById("part-of-speech-input");
                        partOfSpeechElement.innerText = partOfSpeech;
                    });
                }
                else {
                    var bgWordElement = document.getElementById("bg-word-input");
                    var wordBG = bgWordElement.value;
                    XMLRequests.GetEnTranslation(wordBG).then(function (englishWord) {
                        var englishWordElement = document.getElementById("en-word-input");
                        englishWordElement.innerText = englishWord;

                        XMLRequests.GetDefinition(englishWord).then(function (definition) {
                            var englishWordDefinitionElement = document.getElementById("en-definition-input");
                            englishWordDefinitionElement.innerText = definition;
                        });

                        XMLRequests.GetPronounciation(englishWord).then(function (pronounciation) {
                            var englishWordPronounciationElement = document.getElementById("pronunciation-input");
                            englishWordPronounciationElement.innerText = pronounciation;
                        });

                        XMLRequests.GetPartOfSpeech(englishWord).then(function (partOfSpeech) {
                            var partOfSpeechElement = document.getElementById("part-of-speech-input");
                            partOfSpeechElement.innerText = partOfSpeech;
                        });
                    });
                }
            });

            deleteCardsButton.addEventListener("click", function (e) {
                e.preventDefault();
                var cardList = document.getElementById("card-list").winControl;

                cardList.selection.getItems().done(function (cards) {
                    if (cards.length > 0) {
                        var msg = new Windows.UI.Popups.MessageDialog(
                            "Сигурни ли сте, че искате да изтриете.");

                        msg.commands.append(new Windows.UI.Popups.UICommand(
                            "Да", function () {
                                for (var i = cards.length - 1; i >= 0; i--) {
                                    ViewModels.removeCard(options.setId, cards[i].data);
                                }
                                ViewModels.loadCards(options.setId);
                                

                            }));
                        msg.commands.append(new Windows.UI.Popups.UICommand(
                            "Не", function () {

                            }));

                        msg.defaultCommandIndex = 0;
                        msg.cancelCommandIndex = 1;

                        msg.showAsync();
                    }
                });
            });
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />
            // TODO: Respond to changes in viewState.
        }
    });
})();
