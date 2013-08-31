/// <reference path="../../js/viewModels.js" />
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/create/create.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var title = "";
            if (options.type == "create") {
                title = "Create new set";
            }
            else if (options.type == "change") {
                title = "Change the set"
            }
            WinJS.Binding.processAll(element, { title: title });

            var createSetButton = document.getElementById("create-set-button");

            createSetButton.addEventListener("click", function () {
                var title = document.getElementById("set-title").value;
                ViewModels.addSet(title);
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
