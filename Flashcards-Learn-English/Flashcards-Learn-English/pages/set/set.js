/// <reference path="setCodeBehind.js" />
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

            var correctButton = document.getElementById("current-correct");
            var incorrectButton = document.getElementById("current-incorrect");

            correctButton.addEventListener("click", function () {
                var set = ViewModels.sets.getAt(options.setId);
                var card = ViewModels.currentCard.card;
                if (set.decks.length > card.deckId + 1) {
                    Logic.addCardToDeck(card, set.decks[card.deckId + 1]);
                } else {
                    Logic.addCardToDeck(card, set.decks[card.deckId]);
                }

                Logic.removeCardFromDeck(set.currentDeck, 0);
                if (set.currentDeck.cards.length == 0) {
                    Logic.updateCurrentDeck(set);
                }
                
                SetCodeBehind.callUpdate(options.setId);
            });

            incorrectButton.addEventListener("click", function () {
                var set = ViewModels.sets.getAt(options.setId);
                var card = ViewModels.currentCard.card;
                card.deckId = 0;
                Logic.addCardToDeck(card, set.decks[0]);

                Logic.removeCardFromDeck(set.currentDeck, 0);
                if (set.currentDeck.cards.length == 0) {
                    Logic.updateCurrentDeck(set);
                }

                SetCodeBehind.callUpdate(options.setId);
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
