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
                try {
                    var jsonResult = JSON.parse(response.responseText);
                    complete(jsonResult[0]['text']);
                }
                catch (e) {
                    complete("Дефиницията не е достъпна");
                }
            }, function (error) {
                complete("Дефиницията не е достъпна");
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
                try {
                    var jsonResult = JSON.parse(response.responseText);
                    complete(jsonResult[0]['raw']);
                }
                catch (e) {
                    complete("Произношението не е достъпно");
                }
            }, function (error) {
                complete("Произношението не е достъпно");
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
                try {
                    var jsonResult = JSON.parse(response.responseText);
                    complete(jsonResult[0]['partOfSpeech']);
                }
                catch (e) {
                    complete("Част на речта не е достъпна");
                }
            }, function (error) {
                complete("Част на речта не е достъпна");
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
                try {
                    var jsonResult = JSON.parse(response.responseText);
                    var tucJSON = jsonResult['tuc'];
                    var tucSubJSON = tucJSON[0];
                    var phraseJSON = tucSubJSON['phrase'];

                    complete(phraseJSON['text']);
                }
                catch (e) {
                    complete("Превода от български на английски език не е достъпен");
                }
            }, function (error) {
                complete("Превода от български на английски език не е достъпен");
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
                try {
                    var jsonResult = JSON.parse(response.responseText);
                    var tucJSON = jsonResult['tuc'];
                    var tucSubJSON = tucJSON[0];
                    var phraseJSON = tucSubJSON['phrase'];

                    complete(phraseJSON['text']);
                }
                catch (e) {
                    complete("Превода от английски на български език не е достъпен");
                }
            }, function (error) {
                complete("Превода от английски на български език не е достъпен");
            });
        });
    }

    var getEnPronounciationAudioUrl = function (word) {
        var requestUrl = baseUrl + word + "/audio?";
        requestUrl += "useCanonical=" + _useCanonical;
        requestUrl += "&limit=" + _maxResults;
        requestUrl += "&api_key=" + _api_key;

        return new WinJS.Promise(function (complete, error) {
            WinJS.xhr({
                type: "GET",
                url: requestUrl,
                headers: { "Content-type": "Application/json" },
                responseType: "json"
            }).then(function (response) {
                try {
                    var jsonResult = JSON.parse(response.responseText);
                    complete(jsonResult[0]['fileUrl']);
                }
                catch (e) {
                    complete("Аудио записа на произношението не е достъпен");
                }
            }, function (error) {
                complete("Аудио записа на произношението не е достъпен");
            });
        });
    }

    WinJS.Namespace.define("XMLRequests", {
        GetDefinition: getEnDeffinition,
        GetPronounciation: getPronounciation,
        GetEnTranslation: getEnTranslation,
        GetBGTranslation: getBGTranslation,
        GetPartOfSpeech: getPartOfSpeech,
        GetEnPronounciationAudioUrl: getEnPronounciationAudioUrl
    });
})();