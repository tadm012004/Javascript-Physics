define(function() {
	
	"use strict";
	function Reference(val) {
		this.value = val;
	}
	
	Reference.prototype.getValue = function() {
		return this.value;
	};
	
	Reference.prototype.set = function(val){
		this.value = val;
		
	};

	return Reference;
});