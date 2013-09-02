(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        init: function (element, options) {
            HomeCodeBehind.callLoadSets();
        },
        ready: function (element, options) {
            var setList = document.getElementById("set-list").winControl;
            var appBar = document.getElementById("appbar").winControl;
            var createSetButton = WinJS.Utilities.id("create-set");
            var deleteSetButton = WinJS.Utilities.id("delete-set");

            setList.addEventListener("selectionchanged", function () {
                var setSelectionCommands = document.querySelectorAll(".setSelection");

                if (setList.selection.count() > 0 && appBar.hidden) {
                    appBar.showCommands(setSelectionCommands);
                    appBar.sticky = true;
                    appBar.show();
                }
                else if (setList.selection.count() == 0) {
                    appBar.hideCommands(setSelectionCommands);
                    appBar.sticky = false;
                    appBar.hide();
                }
            });

            createSetButton.listen("click", function (event) {
                WinJS.Navigation.navigate("/pages/create/create.html", { type: "create" });
                appBar.hide();
            });

            deleteSetButton.listen("click", function () {
                var setListView = document.getElementById("set-list").winControl;

                if (setListView) {
                    setListView.selection.getItems().done(function (sets) {
                        if (sets.length > 0) {
                            var msg = new Windows.UI.Popups.MessageDialog(
                                "Сигурни ли сте, че искате да изтриете.");

                            msg.commands.append(new Windows.UI.Popups.UICommand(
                                "Да", function () {
                                    for (var i = sets.length - 1; i >= 0; i--) {
                                        console.log(sets[i].index);
                                        ViewModels.removeSet(sets[i].index);
                                    }

                                    ViewModels.loadSets();
                                }));
                            msg.commands.append(new Windows.UI.Popups.UICommand(
                                "Не", function () {

                                }));

                            msg.defaultCommandIndex = 0;
                            msg.cancelCommandIndex = 1;

                            msg.showAsync();
                        }
                    });
                }
            });
        }
    });
})();
