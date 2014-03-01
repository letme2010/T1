$('#send').click(onSendBtnClick);

var SERVER_HOST = "127.0.0.1:9527";

function onSendBtnClick() {

	try {
		requestServer();
	} catch (e) {
		$('#err').html('error!!!');
	}

	$('#log').html("request watting...");

}

function requestServer() {
	var url = "http://" +SERVER_HOST;
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
	var _jqDiv = $('<div class="view-root"></div>');
        var _jqChildrenContainor = $('<div class="view-children-containor"></div>');
        var _jqSnap = $('<img/>');
        
        _jqDiv.append(_jqSnap).append(_jqChildrenContainor);
        _jqDiv.addClass(aNode.class);
	_jqDiv.css({
//		"border" : "1px solid black",
		"border" : "0px"
//		,"background-color" : getRandomColorChar(),
		,"position" : "absolute"
	});
        
        _jqChildrenContainor.css({
            "width" : "100%"
            ,"height" : "100%"
//            ,"background-color" : "red"
        });

	_jqDiv.offset({
		'top' : aNode.ltrb[1],
		'left' : aNode.ltrb[0]
	});
        
	_jqDiv.width(getWidth(aNode));
	_jqDiv.height(getHeight(aNode));

	for (var i = 0, len = aNode.children.length; i < len; i++) {
            var _oChildNode =aNode.children[i];
            if ((0 >= getWidth(aNode)) || 0 >= getHeight(aNode)) {
                continue;
            }
            var _jqChild = node2JQueryObj(_oChildNode);
            _jqChildrenContainor.append(_jqChild);
	}
        
        var imgPath = "http://" + SERVER_HOST + "/viewSnap/" + aNode.hashCode + ".png";
        console.log(imgPath);
        _jqSnap.attr('src', imgPath);

	return _jqDiv;

}

function getRandomColorChar() {
	var ret = "";

	for (var i = 6; i > 0; i--) {
		ret += sColorChars[random()];
	}

	return ret;
}

var sColorChars = "0123456789ABCDEF";

function getWidth(aNode) {
    return aNode.ltrb[2] - aNode.ltrb[0];
}

function getHeight(aNode) {
    return aNode.ltrb[3] - aNode.ltrb[1];
}

function random() {
	return Math.floor(Math.random(16) * 16);
}
