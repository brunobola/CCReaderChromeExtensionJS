function CitizenCardReaderTest() {
    var chromeExtension;

    $(document).ready(function () {
        chromeExtension = new CCReaderChromeExtension();

        $(document).on('click', '#load-card-data', onLoadSmartCardDataClicked);
		
		if(!chromeExtension.isCCReaderChromeExtensionInstalled()){
			$('body').prepend('<p style="background-color: red;">!!! EXTENSION NOT INSTALLED OR DISABLED !!! DOWNLOAD IT <a target="_blank" href="https://chrome.google.com/webstore/detail/leitor-de-cart%C3%A3o-de-cidad/mmhaflpdheoiocihkjjjgcolajjnkjdf">HERE</a></p>');
		}
    });


    var parseExtensionErrors = function (errorCode) {
        if (!errorCode) return;

        switch (errorCode) {
            case CCReaderChromeExtensionError.CouldNotAccessToCard:
                alert('ERROR_COULD_NOT_ACCESS_TO_CARD');
                break;
            case CCReaderChromeExtensionError.CanceledByUser:
                alert('ERROR_CANCELED_BY_USER');
                break;
            case CCReaderChromeExtensionError.InvalidCard:
                alert('ERROR_INVALID_CARD');
                break;
            case CCReaderChromeExtensionError.Unknown:
                alert('ERROR_UNKNOWN');
                break;
            case CCReaderChromeExtensionError.AlreadyRunning:
                alert('ALREADY_RUNNING');
                break;
            case CCReaderChromeExtensionError.InvalidRequest:
                alert('INVALID_REQUEST');
                break;
            case CCReaderChromeExtensionError.Unexpected:
                alert('ERROR_UNEXPECTED');
                break;
            case CCReaderChromeExtensionError.InvalidRequestType:
                alert('INVALID_REQUEST_TYPE');
                break;
        }
        return;
    }

    var clearCitizenData = function() {
        $('#citizen-card-data input').val('');
        $('#citizen-card-certificates,#citizen-card-picture').empty();
    }

    var clearSignaturesData = function () {
        $('#signatures-data').hide();
        $('#signatures').empty();
    }

    /***********************************
     * CC/SmarCard functions
     ***********************************/

    var onLoadSmartCardDataClicked = function () {
        clearCitizenData();

        chromeExtension.read([CCField.All], onSmartCardReaded);
    }

    var onSmartCardReaded = function (response) {
        if (response.Error) { // erros related with the request it self
            parseExtensionErrors(response.Error.Code);
            return;
        }

        if (response.Data.ErrorCode) { // errors related with the citizen card
            parseExtensionErrors(response.Data.ErrorCode);
            return;
        }

        var citizenData = response.Data.Citizen;
		console.log(citizenData);

        $('#citizen-card-first-name').val(citizenData.FirstName);
        $('#citizen-card-last-name').val(citizenData.LastName);
        $('#citizen-card-number').val(citizenData.CardNumber);
        $('#citizen-card-tax-number').val(citizenData.TaxNumber);
        $('#citizen-card-sns-number').val(citizenData.HealthSystemNumber);
        $('#citizen-card-genre').val(citizenData.Genre);
        $('#citizen-card-nationality').val(citizenData.Nationality);
        $('#citizen-card-country').val(citizenData.Country);
        $('#citizen-card-birth-date').val(citizenData.BirthDate);
		$('#citizen-card-picture').attr('src', 'data:image/png;base64,' +citizenData.Picture);
        $('#citizen-card-expiration-date').val(citizenData.CardExpirationDate);

        if (!citizenData.Certificates || citizenData.Certificates.length == 0) return;

        var certificatesElement = $('#citizen-card-certificates');
        citizenData.Certificates.forEach(function(certificate) {
            var expirationDateRow   = $('<tr><td>Data de validade</td><td>' + certificate.ExpirationDateString + '</td></tr>');
            var keyAlgorithmRow     = $('<tr><td>Algoritmo</td><td>' + certificate.KeyAlgorithm + '</td></tr>');
            var labelRow            = $('<tr><td>Nome</td><td>' + certificate.Label + '</td></tr>');
            var publicKeyRow        = $('<tr><td>Chave pública</td><td>' + certificate.PublicKey + '</td></tr>');

            certificatesElement.append(expirationDateRow);
            certificatesElement.append(keyAlgorithmRow);
            certificatesElement.append(labelRow);
            certificatesElement.append(publicKeyRow);
            certificatesElement.append($('<tr><td>&nbsp;</td></tr>'));
        });
    }
}

var citizenCardReaderTest = new CitizenCardReaderTest();
