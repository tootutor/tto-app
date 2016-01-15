function ttoRegExp(content) {
  var i=0;
  var result = "";
  var regExps = [
  	{regExp: /\.red\{(.*?)\}/g, result:'<span style="color:red"> $1 </span>'},
  	{regExp: /\.del\{(.*?)\}/g, result:'<span class="cross"> $1 </span>'}
  ];
  
  result = content;
  for (i=0; i<regExps.length; i++) {
  	result = result.replace(regExps[i].regExp, regExps[i].result);
  }
  return result;
}
