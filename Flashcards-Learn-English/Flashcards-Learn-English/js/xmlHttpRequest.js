(function () {
    "use strict";

    //Wordnik requests
    var _api_key = "f4e659dea9e47754a500f0ea1390f307e88894ff9224dec34";
    var _maxResults = 1;
    var _includeRelated = true;
    var _useCanonical = false;
    var _includeTags = false;
    var baseUrl = "http://api.wordnik.com/v4/word.json/";

    var getEnDeffinition = function (word) {
        var requestUrl = baseUrl + word + "/definitions?";
        requestUrl += "limit=" + _maxResults;
        requestUrl += "&includeRelated=" + _includeRelated;
        requestUrl += "&useCanonical=" + _useCanonical;
        requestUrl += "&includeTags=" + _includeTags;
        requestUrl += "&api_key=" + _api_key;

        return new WinJS.Promise(function (complete, error) {
            WinJS.xhr({
                type: "GET",
                url: requestUrl,
                headers: { "Content-type": "Application/json" },
                responseType: "json"
            }).then(function (response) {
                var jsonResult = JSON.parse(response.responseText);
                complete(jsonResult[0]['text']);
            }, function (error) {
                var errorPopup = new Windows.UI.Popups.MessageDialog("Error has occured while getting word deffinition");
                errorPopup.showAsync();
            });
        });
    }

    var getPronounciation = function (word) {
        var requestUrl = baseUrl + word + "/pronunciations?";
        requestUrl += "useCanonical=" + _useCanonical;
        requestUrl += "limit" + _maxResults;
        requestUrl += "&api_key=" + _api_key;

        return new WinJS.Promise(function (complete, error) {
            WinJS.xhr({
                type: "GET",
                url: requestUrl,
                headers: { "Content-type": "Application/json" },
                responseType: "json"
            }).then(function (response) {
                var jsonResult = JSON.parse(response.responseText);
                complete(jsonResult[0]['raw']);
            }, function (error) {
                var errorPopup = new Windows.UI.Popups.MessageDialog("Error has occured while getting word pronounciation");
                errorPopup.showAsync();
            });
        });
    }

    var getPartOfSpeech = function (word) {
        var requestUrl = baseUrl + word + "/definitions?";
        requestUrl += "limit=" + _maxResults;
        requestUrl += "&includeRelated=" + _includeRelated;
        requestUrl += "&useCanonical=" + _useCanonical;
        requestUrl += "&includeTags=" + _includeTags;
        requestUrl += "&api_key=" + _api_key;

        return new WinJS.Promise(function (complete, error) {
            WinJS.xhr({
                type: "GET",
                url: requestUrl,
                headers: { "Content-type": "Application/json" },
                responseType: "json"
            }).then(function (response) {
                var jsonResult = JSON.parse(response.responseText);
                complete(jsonResult[0]['partOfSpeech']);
            }, function (error) {
                var errorPopup = new Windows.UI.Popups.MessageDialog("Error has occured while getting word deffinition");
                errorPopup.showAsync();
            });
        });
    }

    //Glosbe requests
    var getEnTranslation = function (wordBG) {
        var requestUrl = "http://glosbe.com/gapi/translate?from=bul&dest=eng&format=json&phrase=" + encodeURIComponent(wordBG);

        return new WinJS.Promise(function (complete, error) {
            WinJS.xhr({
                type: "GET",
                url: requestUrl,
                headers: { "Content-type": "Application/json" },
                responseType: "json"
            }).then(function (response) {
                var jsonResult = JSON.parse(response.responseText);
                var tucJSON = jsonResult['tuc'];
                var tucSubJSON = tucJSON[0];
                var phraseJSON = tucSubJSON['phrase'];

                complete(phraseJSON['text']);
            }, function (error) {
                var errorPopup = new Windows.UI.Popups.MessageDialog("Error has occured while getting bgWord");
                errorPopup.showAsync();
            });
        });
    }

    var getBGTranslation = function (wordEn) {
        var requestUrl = "http://glosbe.com/gapi/translate?from=eng&dest=bul&format=json&phrase=" + encodeURIComponent(wordEn);

        return new WinJS.Promise(function (complete, error) {
            WinJS.xhr({
                type: "GET",
                url: requestUrl,
                headers: { "Content-type": "Application/json" },
                responseType: "json"
            }).then(function (response) {
                var jsonResult = JSON.parse(response.responseText);
                var tucJSON = jsonResult['tuc'];
                var tucSubJSON = tucJSON[0];
                var phraseJSON = tucSubJSON['phrase'];

                complete(phraseJSON['text']);
            }, function (error) {
                var errorPopup = new Windows.UI.Popups.MessageDialog("Error has occured while getting enWord");
                errorPopup.showAsync();
            });
        });
    }

    WinJS.Namespace.define("XMLRequests", {
        GetDefinition: getEnDeffinition,
        GetPronounciation: getPronounciation,
        GetEnTranslation: getEnTranslation,
        GetBGTranslation: getBGTranslation,
        GetPartOfSpeech: getPartOfSpeech
    });
})();