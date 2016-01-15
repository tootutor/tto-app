function extractBase64(content) {
	var regExp = /xlink\:href="(.*?)"/;
	var matchText = content.match(regExp);
	
	if (matchText) {
		return matchText[1];		
	} else {
		return null;
	}
}