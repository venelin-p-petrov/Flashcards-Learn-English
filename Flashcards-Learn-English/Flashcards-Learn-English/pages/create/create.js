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

            var createSetButton = document.getElementById("create-set-button");

            createSetButton.addEventListener("click", function () {
                var title = document.getElementById("set-title").value;
                ViewModels.addSet(title);
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
