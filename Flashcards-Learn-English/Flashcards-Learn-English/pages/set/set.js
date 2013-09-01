/// <reference path="setCodeBehind.js" />
/// <reference path="../../js/viewModels.js" />
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/set/set.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        init: function (element, options) {
            
        },
        ready: function (element, options) {
            WinJS.Binding.processAll(element, ViewModels.sets.getAt(options.setId));

            var correctButton = document.getElementById("current-correct");
            var incorrectButton = document.getElementById("current-incorrect");

            correctButton.addEventListener("click", function () {
                var set = Data.getSets()[options.setId];
                var card = set.getCurrentCard;
                var deck = set.decks[card.deckId];
                deck.removeCard(deck.cards.indexOf(card));
                if (set.decks.length > card.deckId) {
                    set.decks[card.deckId + 1].addCard(card);
                } else {
                    set.decks[card.deckId].addCard(card);
                }

                set.updateCurrentDeck();
                WinJS.Binding.processAll(element, ViewModels.sets.getAt(options.setId));
            });

            incorrectButton.addEventListener("click", function () {
                var set = Data.getSets()[options.setId];
                var card = set.getCurrentCard;
                var deck = set.decks[card.deckId];
                deck.removeCard(deck.cards.indexOf(card));
                set.decks[0].addCard(card);

                set.updateCurrentDeck();
                WinJS.Binding.processAll(element, ViewModels.sets.getAt(options.setId));
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
