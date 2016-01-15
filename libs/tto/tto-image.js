function extractDataURI(content) {
	var regExp = /xlink\:href="(.*?)"/;
	var matchText = content.match(regExp);
	
	if (matchText) {
		return matchText[1];		
	} else {
		return null;
	}
}

function svg2DataURI(content) {
	return 'data:image/svg+xml;utf8,' + content;
}