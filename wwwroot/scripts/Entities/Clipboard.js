__clipboard = function () {

    function copyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
      
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
          console.log('Copying text command was ' + msg);
        } catch (err) {
          console.log('Oops, unable to copy');
        }
        document.body.removeChild(textArea);
      }

    window.addEventListener("load", function (event) {
        var _clipboard = new ClipboardJS('.btn');
        _clipboard.on('success', function (e) {
            console.log(e);
        });
        _clipboard.on('error', function (e) {
            console.log(e);
        });
    })

    return {
        Copy: copyTextToClipboard
    }
}();