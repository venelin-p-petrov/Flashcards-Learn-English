﻿/// <reference path="setCodeBehind.js" />
/// <reference path="../../js/logic.js" />
/// <reference path="../../js/viewModels.js" />
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/set/set.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        init: function (element, options) {
            SetCodeBehind.callUpdate(options.setId);
        },
        ready: function (element, options) {
            WinJS.Binding.processAll(element, ViewModels.sets.getAt(options.setId));
            WinJS.Binding.processAll(document.getElementById("set-page"), ViewModels);

            var appBar = document.getElementById("appbar").winControl;
            var changeSetButton = WinJS.Utilities.id("change-set");
            var correctButton = document.getElementById("current-correct");
            var incorrectButton = document.getElementById("current-incorrect");
            var playPronounciationButton = document.getElementById("playPronounciation");
            var cardFront = document.getElementById("current-front");
            var cardBack = document.getElementById("current-back");

            changeSetButton.listen("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                WinJS.Navigation.navigate("/pages/create/create.html", { type: "change", setId: options.setId });
                appBar.hide();
            });

            cardFront.addEventListener("click", function () {
                cardFront.style.display = "none";
                cardBack.style.display = "-ms-grid";
                WinJS.UI.Animation.enterContent(cardBack,
                    { top: "0px", left: "50px", rtlflip: true },
                    { mechanism: "transition" });
            });

            correctButton.addEventListener("click", function (e) {
                e.preventDefault();
                var set = ViewModels.sets.getAt(options.setId);
                var card = ViewModels.currentCard.card;
                if (set.decks.length > card.deckId + 1) {
                    Logic.addCardToDeck(card, set.decks[card.deckId + 1]);
                }
                else {
                    Logic.addCardToDeck(card, set.decks[card.deckId]);
                }

                Logic.removeCardFromDeck(set.currentDeck, 0);
                if (set.currentDeck.cards.length == 0) {
                    Logic.updateCurrentDeck(set);
                }

                //Logic.saveSet(set);
                Logic.saveSetsAsync();
                SetCodeBehind.callUpdate(options.setId);

                cardFront.style.display = "-ms-grid";
                cardBack.style.display = "none";
                WinJS.UI.Animation.enterContent(cardFront,
                    { top: "0px", left: "50px", rtlflip: true },
                    { mechanism: "transition" });
            });

            incorrectButton.addEventListener("click", function (e) {
                e.preventDefault();
                var set = ViewModels.sets.getAt(options.setId);
                var card = ViewModels.currentCard.card;
                card.deckId = 0;
                Logic.addCardToDeck(card, set.decks[0]);

                Logic.removeCardFromDeck(set.currentDeck, 0);
                if (set.currentDeck.cards.length == 0) {
                    Logic.updateCurrentDeck(set);
                }

                //Logic.saveSet(set);
                Logic.saveSetsAsync();
                SetCodeBehind.callUpdate(options.setId);

                cardFront.style.display = "-ms-grid";
                cardBack.style.display = "none";
                WinJS.UI.Animation.enterContent(cardFront,
                    { top: "0px", left: "50px", rtlflip: true },
                    { mechanism: "transition" });
            });

            playPronounciationButton.addEventListener("click", function (e) {
                e.preventDefault();
                var englishWordElement = document.getElementById("englishWord");
                var englishWord = englishWordElement.innerText.toLowerCase();
                XMLRequests.GetEnPronounciationAudioUrl(englishWord).then(function (audioUrl) {
                    audtag = document.createElement('audio');
                    audtag.setAttribute("id", "audtag");
                    audtag.setAttribute("controls", "true");
                    audtag.setAttribute("msAudioCategory", "backgroundcapablemedia");
                    audtag.setAttribute("src", audioUrl);

                    document.getElementById("enPronunciation").appendChild(audtag);
                    audtag.load();
                    audtag.play();
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