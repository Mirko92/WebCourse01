function encodeHTMLEntities(text) {
  var textArea = document.createElement('textarea');
  textArea.innerText = text;
  return textArea.innerHTML;
}

function cleanPreContent(text) {
  return text.split("\n")
    .map(row => {
      if (row.includes('<')) {
        const length = row.split('<')[0].length;
        const spaces = length >= 4 ? length - 4 : 0;

        const x = row.replace(/^\s+/, " ".repeat(spaces))
        return `${x}\n`;
      }
      else {
        return ""
      }
    })
    .join("")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}