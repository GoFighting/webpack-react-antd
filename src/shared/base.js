window.getUrlParam = function(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if (r !== null) {
	        return r[2];
	    }
	    return null;
	}
import './promisePolyfill'