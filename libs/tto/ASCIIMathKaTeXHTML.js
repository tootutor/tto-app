function ASCIIMathKaTeXHTML(content) {
  var regDisplayExp = /\$\$\n(.*?)\n\$\$/g;
  var htmlDisplay = content.replace(regDisplayExp, getDisplayMath);
  var regInlineExp = /\$(.*?)\$/g;
  return htmlDisplay.replace(regInlineExp, getInlineMath);
}

function getDisplayMath(str, match1) {
	var kaTexStr = AMTparseAMtoTeX(match1);
	var html = "KaTeX Error !!!";
	try {
		html = katex.renderToString(kaTexStr, { displayMode: true });
	}
	catch (err) {
		html = err + ' : ' + match1;
	}
	return html;
}

function getInlineMath(str, match1) {
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