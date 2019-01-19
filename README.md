# CCReaderChromeExtensionJS
Classe JS para aceder a dados de cartão de cidadão através de plugin Chrome.

## Método disponíveis
 - read(fields, callback)
	 - fields: array com as fields a serem lidas (Address requer password de morada)
   - callback: função de callback que recebe os dados lidos
 - isCCReaderChromeExtensionInstalled
   - Devolve true ou false de acordo com a existência do plugin no chrome


## Utilização

    var ccReaderExt = new CCReaderChromeExtension();
    var fieldsToRead = [CCReaderChromeExtension.CCField.All];
    ccReaderExt.read(fieldsToRead, function(data){
        console.log(data);
    });

## Estrutura devolvida pelo método read

	{
	  "Number": "",
	  "CardNumber": "",
	  "Nationality": "",
	  "CardExpirationDate": "",
	  "Genre": "",
	  "Country": "",
	  "HealthSystemNumber": "",
	  "TaxNumber": "",
	  "BirthDate": "",
	  "LastName": "",
	  "FirstName": "",
	  "Address": {
	    "Street": "",
	    "District": "",
	    "Building": "",
	    "Country": "",
	    "Type": "",
	    "Door": "",
	    "Parish": "",
	    "Locality": "",
	    "Floor": "",
	    "ZipCode1": "",
	    "ZipCode2": "",
	    "StreetType": "",
	    "Postal": "",
	    "Municipality": "",
	    "Side": "",
	    "Place": ""
	  },
	  "Picture": "",
	  "Certificates": [
	    {
	      "Label": "",
	      "ExpirationDateString": "",
	      "KeyAlgorithm": "",
	      "PublicKey": ""
	    }
	  ]
	}

## Requisitos
 - Chrome Extension
   - [Download](https://chrome.google.com/webstore/detail/leitor-de-cart%C3%A3o-de-cidad/mmhaflpdheoiocihkjjjgcolajjnkjdf)
 - Aplicação .NET para leitura de dados
   - [Download](https://1drv.ms/f/s!AkLsBHidk5AH505kYAYRVOLJAoom)
   
**Nota**
É possível que o exemplo em Tester não funcione se abrirem a página localmente (com file:// no browser). É preferível transferir para um servidor web e testar a partir de lá.
