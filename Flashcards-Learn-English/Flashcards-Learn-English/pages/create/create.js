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
            WinJS.Binding.processAll(element, { title: title });

            var addCardButton = document.getElementById("add-card");
            var createSetButton = document.getElementById("create-set-button");

            addCardButton.addEventListener("click", function () {
                var bgWord = document.getElementById("bg-word-input").value;
                var enWord = document.getElementById("en-word-input").value;
                var pronunciation = document.getElementById("pronunciation-input").value;
                var partOfSpeech = document.getElementById("part-of-speech-input").value;
                var enDefinition = document.getElementById("en-definition-input").value;

                ViewModels.addCard(bgWord, enWord, enDefinition, partOfSpeech, pronunciation);
                ViewModels.loadCards();
            });

            createSetButton.addEventListener("click", function () {
                var title = document.getElementById("set-title").value;
                var index = ViewModels.addSet(title);
                var cards = Data.getCards();
                for (var i = 0; i < cards.length; i++) {
                    Data.getSets()[index].decks[0].cards.push(cards[i]);
                }
                WinJS.Navigation.navigate("/pages/home/home.html");
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
