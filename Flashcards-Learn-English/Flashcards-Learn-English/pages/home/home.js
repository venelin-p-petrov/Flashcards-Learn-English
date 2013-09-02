/// <reference path="../../js/viewModels.js" />
/// <reference path="../../js/logic.js" />
(function () {
    "use strict";

    var appData = Windows.Storage.ApplicationData.current;
    var storagePermissions = Windows.Storage.AccessCache.StorageApplicationPermissions;
    var permissionTokens = appData.localSettings.values["permissionTokens"];
    if (permissionTokens) {
        permissionTokens = JSON.parse(permissionTokens);
    }
    else {
        permissionTokens = [];
        appData.localSettings.values["permissionTokens"] = JSON.stringify(permissionTokens);
    }


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
            var importSetButton = WinJS.Utilities.id("import-set");
            var exportSetButton = WinJS.Utilities.id("export-set");

            setList.addEventListener("selectionchanged", function () {
                var setSelectionCommands = document.querySelectorAll(".setSelection");

                if (setList.selection.count() > 0) {
                    if (setList.selection.count() == 1) {
                        appBar.showCommands(["export-set"]);
                    }
                    else {
                        appBar.hideCommands(["export-set"]);
                    }
                    appBar.showCommands(setSelectionCommands);
                    appBar.sticky = true;
                    if (appBar.hidden) {
                        appBar.show();
                    }
                }
                else if (setList.selection.count() == 0) {
                    appBar.hideCommands(setSelectionCommands);
                    appBar.hideCommands(["export-set"]);
                    appBar.sticky = false;
                    appBar.hide();
                }
            });

            createSetButton.listen("click", function (e) {
                e.preventDefault();
                WinJS.Navigation.navigate("/pages/create/create.html", { type: "create" });
                appBar.hide();
            });

            deleteSetButton.listen("click", function (e) {
                e.preventDefault();
                var setListView = document.getElementById("set-list").winControl;

                if (setListView) {
                    setListView.selection.getItems().done(function (sets) {
                        if (sets.length > 0) {
                            var msg = new Windows.UI.Popups.MessageDialog(
                                "Сигурни ли сте, че искате да изтриете.");

                            msg.commands.append(new Windows.UI.Popups.UICommand(
                                "Да", function () {
                                    for (var i = sets.length - 1; i >= 0; i--) {
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

            importSetButton.listen("click", function (e) {
                e.preventDefault();
                var openPicker = Windows.Storage.Pickers.FileOpenPicker();

                openPicker.fileTypeFilter.append(".flset");
                openPicker.pickSingleFileAsync().then(function (file) {
                    addSet(file);
                });
            });

            exportSetButton.listen("click", function (e) {
                e.preventDefault();
                var savePicker = Windows.Storage.Pickers.FileSavePicker();

                savePicker.defaultFileExtension = ".flset";
                savePicker.fileTypeChoices.insert("Flashcard set", [".flset"])
                savePicker.suggestedFileName = "New Flashcard set";

                savePicker.pickSaveFileAsync().then(function (file) {
                    setList.selection.getItems().done(function (sets) {
                        var set = ViewModels.getSetById(sets[0].index);

                        var textToWrite = JSON.stringify(set);
                        Windows.Storage.FileIO.writeTextAsync(file, textToWrite);
                    });
                });
            });

            var addSet = function (file) {
                var token = file.name + Date.now();
                storagePermissions.futureAccessList.addOrReplace(token, file);
                permissionTokens.push(token);
                appData.localSettings.values["permissionTokens"] = JSON.stringify(permissionTokens);

                Windows.Storage.FileIO.readTextAsync(file).then(function (text) {
                    ViewModels.addSetObject(JSON.parse(text));
                    ViewModels.loadSets();
                });
            }
        }
    });
})();
