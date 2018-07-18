function CCReaderChromeExtension() {

    var EVENT_CHROME_EXTENSION_REQUEST  = 'CCReader_ChromeExtension_Request';
    var EVENT_CHROME_EXTENSION_RESPONSE = 'CCReader_ChromeExtension_Response';

    var CURRENT_REQUEST_ID  = 1;

    var listeners = {};
    
    document.addEventListener(EVENT_CHROME_EXTENSION_RESPONSE, function (e) {
        onExtensionResponse(e.detail);
    });

    /***************************************
     * private methods
     ***************************************/

	var buildListenerRequestId = function(requestId) {
		return 'request' + requestId;
	};

     var onExtensionResponse = function (response) {
        var jsonResponse    = JSON.parse(response);
        var data            = jsonResponse.data;
        var requestId       = data['RequestId'];
        var listenerId      = buildListenerRequestId(requestId);
        var callback        = listeners[listenerId];

        if (!callback) { // this shouldn't happen
            console.log('no callback set to request ' + requestId);
            return;
        }

        callback(data);

        delete listeners[listenerId];
    }
    
    /***************************************
     * public methods
     ***************************************/

    this.read = function(fieldToRead, callback) {
        if (!fieldToRead) {
            fieldToRead = [CCField.All];
        }

        var requestId = CURRENT_REQUEST_ID++;
		var listenerId = buildListenerRequestId(requestId);
		listeners[listenerId] = callback;

		var requestData = {
			'Data': fieldToRead,
			'RequestId': requestId,
			'RequestType': 1
		}
		
		document.dispatchEvent(new CustomEvent(EVENT_CHROME_EXTENSION_REQUEST, {
			'detail': requestData
		}));
    }
    
    this.isCCReaderChromeExtensionInstalled = function() {
        var element =  document.getElementById('ccreader-chrome-extension-check');
        return (typeof(element) != 'undefined' && element != null);
    }
}

/**
 * Possible field to read
 */
CCField = {
    All                 : -1,
    Certificates        : 1,
    Picture             : 2,
    Number              : 3,
    CardNumber          : 4,
    Nationality         : 5,
    ExpirationDate      : 6,
    Genre               : 7,
    Country             : 8,
    HealthSystemNumber  : 9,
    TaxNumber           : 10,
    LastName            : 11,
    FirstName           : 12,
    BirthDate			: 13,
    Address				: 14
}


CRReaderChromeExtensionError = {
    /** Codes sent from background/Native app **/
    AlreadyRunning          : 1,
    InvalidRequest          : 2,

    CouldNotAccessToCard        : 1104,
    CanceledByUser              : 1109,
    InvalidCard                 : 1210,
    Unknown                     : 1101,
    Unexpected                  : 1000,
    InvalidRequestType          : 1001
}
