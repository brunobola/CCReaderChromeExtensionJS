# CCReaderChromeExtensionJS
Classe JS para aceder a dados de cartão de cidadão através de plugin Chrome.

Método disponíveis:
 - read(fields, callback)
	 - fields: array com as fields a serem lidas (Address requer password de morada)
   - callback: função de callback que recebe os dados lidos
 - isCCReaderChromeExtensionInstalled
   - Devolve true ou false de acordo com a existência do plugin no chrome


Utilização:

    var ccReaderExt = new CCReaderChromeExtension();
    var fieldsToRead = [CCReaderChromeExtension.CCField.All];
    ccReaderExt.read(fieldsToRead, function(data){
        console.log(data);
    });


Requisitos:
 - Chrome Extension
   - [Download](https://chrome.google.com/webstore/detail/leitor-de-cart%C3%A3o-de-cidad/mmhaflpdheoiocihkjjjgcolajjnkjdf)
 - Aplicação .NET para leitura de dados
   - [Download](https://1drv.ms/f/s!AkLsBHidk5AH505kYAYRVOLJAoom)
