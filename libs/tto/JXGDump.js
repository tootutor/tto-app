/*
		A modified version by Witoon S. for TTO system
*/

function minimizeObject(instance, s) {
  var p, pl, i,
    def = {},
    copy = JXG.deepCopy(instance),
    defaults = [];

  for (i = 1; i < arguments.length; i++) {
    defaults.push(arguments[i]);
  }

  for (i = defaults.length; i > 0; i--) {
    def = JXG.deepCopy(def, defaults[i - 1], true);
  }

  for (p in def) {
    if (def.hasOwnProperty(p)) {
      pl = p.toLowerCase();

  		if (def[p] == null && copy[pl] == null) {
        delete copy[pl];
  		} else {
	      if (typeof def[p] !== 'object' && def[p] === copy[pl]) {
	        delete copy[pl];
	      }
      }
    }
  }

  return copy;
}

function prepareAttributes(obj) {
  var a, s;

  a = minimizeObject(obj.getAttributes(), JXG.Options[obj.elType]);

  for (s in obj.subs) {
    if (obj.subs.hasOwnProperty(s)) {
      a[s] = minimizeObject(obj.subs[s].getAttributes(), JXG.Options[obj.elType][s], JXG.Options[obj.subs[s].elType]);
      a[s].id = obj.subs[s].id;
      a[s].name = obj.subs[s].name;
    }
  }

  a.id = obj.id;
  a.name = obj.name;

  return a;
}

function dumpAll(board) {
  var e, obj, element, s,
      props = [],
      methods = [],
      elementList = [],
      len = board.objectsList.length;

  for (e = 0; e < len; e++) {
    obj = board.objectsList[e];
    element = {};

    if (obj.dump) {
      
      element.type = obj.getType();

			switch (element.type) {
				case 'point':
					element.parents = [];
					element.parents.push(obj.X());				
					element.parents.push(obj.Y());				
					break;
				case 'text':
		      element.parents = JSON.parse(JSON.stringify(obj.getParents())); 
		      element.parents = element.parents.slice(1);
					break;
				case 'image':
					element.parents = [];
					element.parents.push('\'' + obj.url + '\'');
					element.parents.push('[' + obj.XEval() + ',' + obj.YEval() + ']');				
					element.parents.push('[' + obj.W() + ',' + obj.H() + ']');				
					break;
				case 'tapemeasure':
					var parentObjs = obj.getParents();
					element.parents = [];
					element.parents.push('[' + parentObjs[0].join(',') + ']');				
					element.parents.push('[' + parentObjs[1].join(',') + ']');				
					break;
				default:
		      element.parents = JSON.parse(JSON.stringify(obj.getParents())); 
					break;
			}

			if (element.type != 'image' && element.type != 'tapemeasure') {
	      for (s = 0; s < element.parents.length; s++) {
	        if (typeof element.parents[s] === 'string') {
	          element.parents[s] = '\'' + element.parents[s] + '\'';
	        }
	      }
			}

      element.attributes = prepareAttributes(obj);
      if (element.type === 'glider' && obj.onPolygon) {
        props.push({
          obj: obj.id,
          prop: 'onPolygon',
          val: true
        });
      }

      elementList.push(element);
    }
  }

  return {
    elements: elementList,
    props: props,
    methods: methods
  };
}

function arrayToParamStr(a, converter) {
  var i,
      s = [];

  for (i = 0; i < a.length; i++) {
    s.push(converter.call(this, a[i]));
  }

  return s.join(', ');
}

function toJCAN(obj) {
  var s, i, list, prop;

  switch (typeof obj) {
  case 'object':
    if (obj) {
      list = [];

      if (JXG.isArray(obj)) {
        for (i = 0; i < obj.length; i++) {
          list.push(toJCAN(obj[i]));
        }

        return '[' + list.join(',') + ']';
      }

      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          list.push(prop + ': ' + toJCAN(obj[prop]));
        }
      }

      return '<<' + list.join(', ') + '>> ';
    }
    return 'null';
  case 'string':
    return '\'' + obj.replace(/(["'])/g, '\\$1') + '\'';
  case 'number':
  case 'boolean':
    return obj.toString();
  case 'null':
    return 'null';
  }
}

function toJessie(board) {
  var i, elements,
      dump = dumpAll(board),
      script = [];

	console.log(dump);
  elements = dump.elements;

  for (i = 0; i < elements.length; i++) {
    if (elements[i].attributes.name.length > 0) {
      script.push('// ' + elements[i].attributes.name);
    }

    script.push('s' + i + ' = ' + elements[i].type + '(' + elements[i].parents.join(', ') + ') ' + toJCAN(elements[i].attributes).replace(/\n/, '\\n') + ';');
    script.push('');
  }

  for (i = 0; i < dump.props.length; i++) {
    script.push(dump.props[i].obj + '.' + dump.props[i].prop + ' = ' + toJCAN(dump.props[i].val) + ';');
    script.push('');
  }

  return script.join('\n');
}

