﻿// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;
    var appData = Windows.Storage.ApplicationData.current;

    //appData.localSettings.values["already-run"] = false;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {

                if (!appData.localSettings.values["already-run"]) {
                    //Logic.loadDefault().then(function () {
                    //    Logic.loadSetsAsync().then(function (files) {
                    //        files.forEach(function (file) {
                    //            Windows.Storage.FileIO.readTextAsync(file).then(function (text) {
                    //                var set = JSON.parse(text);
                    //                ViewModels.addSetObject(set);
                    //                Logic.loadIcon(set.iconToken);
                    //                ViewModels.loadSets();
                    //            });
                    //        });
                    //    });
                    //});
                }
                else {
                    
                }

                appData.localSettings.values["already-run"] = true;

            } else {
                
            }

            appData.localFolder.getFileAsync("SavedSets").then(function (file) {
                Windows.Storage.FileIO.readTextAsync(file).then(function (text) {
                    Data.setSets(JSON.parse(text));
                    Logic.loadIcons();
                    ViewModels.loadSets();
                });
            });

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));

            var appBar = document.getElementById("appbar").winControl;

            nav.addEventListener("navigated", function () {
                switch (nav.location) {
                    case "/pages/home/home.html":
                        appBar.disabled = false;
                        appBar.showCommands(["create-set", "import-set"]);
                        appBar.hideCommands(["change-set"]);
                        break;
                    case "/pages/set/set.html":
                        appBar.disabled = false;
                        appBar.showOnlyCommands(["change-set"]);
                        break;
                    case "/pages/create/create.html":
                        appBar.disabled = true;
                        break;
                }
            });
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;

        Logic.saveSetsAsync();
    };

    app.start();
})();
