$('#send').click(onSendBtnClick);

function onSendBtnClick() {

	try {
		requestServer();
	} catch (e) {
		$('#err').html('error!!!');
	}

	$('#log').html("request watting...");

}

function requestServer() {
	var url = "http://127.0.0.1:9527";
	$.get(url, function(data) {

		try {

			var ret = eval('(' + data + ")");

			$('#json').html(ret.bottom);
			$('#log').html("");

			var rootNode = node2JQueryObj(ret);
			$('#phone').append(rootNode);
		} catch (e) {
			console.error(e);
		}
	});

}

var count = 0;

function node2JQueryObj(aNode) {
	var _jqDiv = $('<div></div>');

	_jqDiv.css({
		"border" : "0px solid black",
		"background-color" : getRandomColorChar(),
		"position" : "absolute"
	});

	_jqDiv.offset({
		'top' : aNode.top,
		'left' : aNode.left
	});

	_jqDiv.html(count++);

	_jqDiv.width(aNode.right - aNode.left);
	_jqDiv.height(aNode.bottom - aNode.top);

	for (var i = 0, len = aNode.children.length; i < len; i++) {
		var _jqChild = node2JQueryObj(aNode.children[i]);
		console.log(aNode.children[i]);
		_jqDiv.append(_jqChild);
	}

	return _jqDiv;

}

function getRandomColorChar() {
	var ret = "";

	for (var i = 6; i > 0; i--) {
		ret += sColorChars[random()];
	}

	return ret;
}

var sColorChars = "0123456789ABCDEF"

function random() {
	return Math.floor(Math.random(16) * 16);
}
