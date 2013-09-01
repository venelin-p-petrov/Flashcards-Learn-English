// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

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
            var createSetButton = WinJS.Utilities.id("create-set");
            var deleteSetButton = WinJS.Utilities.id("delete-set");

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
                                "Сигурни ли сте, че искате да изтриете тези тестета.");

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

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();
