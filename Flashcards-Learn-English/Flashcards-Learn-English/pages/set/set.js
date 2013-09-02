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

            var appBar = document.getElementById("appbar").winControl;
            var changeSetButton = WinJS.Utilities.id("change-set");
            var correctButton = document.getElementById("current-correct");
            var incorrectButton = document.getElementById("current-incorrect");
            var playPronounciationButton = document.getElementById("playPronounciation");

            changeSetButton.listen("click", function (e) {
                e.preventDefault();
                WinJS.Navigation.navigate("/pages/create/create.html", { type: "change", setId: options.setId });
                appBar.hide();
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
                
                set.lastModified = Date.now();
                Logic.saveSet(set);
                SetCodeBehind.callUpdate(options.setId);
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

                set.lastModified = Date.now();
                Logic.saveSet(set);
                SetCodeBehind.callUpdate(options.setId);
            });

            
            playPronounciationButton.addEventListener("click", function (e) {
                e.preventDefault();
                var englishWordElement = document.getElementById("englishWord");
                var englishWord = englishWordElement.innerText.toLowerCase();
                XMLRequests.GetEnPronounciationAudioUrl(englishWord).then(function (audioUrl) {
                    var audtag = null;
                    if (!audtag) {
                        audtag = document.createElement('audio');
                        audtag.setAttribute("id", "audtag");
                        audtag.setAttribute("controls", "true");
                        audtag.setAttribute("msAudioCategory", "backgroundcapablemedia");
                        audtag.setAttribute("src", audioUrl);
                        
                        document.getElementById("enPronunciation").appendChild(audtag);
                        audtag.load();
                        audtag.play();
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