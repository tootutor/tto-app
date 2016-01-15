function ASCIIMathKaTeXHTML(content) {
  var regExp = /\$\$(.*?)\$\$/g;
  return content.replace(regExp, getMath);
}

function getMath(str, match1) {
	var kaTexStr = AMTparseAMtoTeX(match1);
	var html = "KaTeX Error !!!";
	try {
		html = katex.renderToString(kaTexStr);
	}
	catch (err) {
		html = err + ' : ' + match1;
	}
	return html;
}