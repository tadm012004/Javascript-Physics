define(["Length", "TimeLength"], function(Length, TimeLength) {

	function Speed(val) {
		if (arguments.length == 0) {
			this.s = 0; 
		}else if (arguments.length == 1) {
			this.s = val;
 		}
		return (this); 
	}

	Speed.speedOfLightInAVacuum= function() {
		return new Speed().setInFractionOfc(1.0);
	}; 

Speed.prototype = { 
	constructor: Speed, 
	setInMetersPerSecond: function(mps) {
		this.s = mps; 
		return this; 
	},
	setInFractionOfc:  function(cFrac) {
		this.s = cFrac * Speed.METERS_PER_SECOND_PER_C;
		return this; 
	},
	setInKilometersPerHour: function(kmph) {
		this.s = kmph * Speed.METERS_PER_SECOND_PER_KILOMETER_PER_HOUR; 
		return this; 
	},
	setInKilometersPerSecond: function(kmps) {
		this.s = kmps * Speed.METERS_PER_SECOND_PER_KILOMETER_PER_SECOND;
		return this;
	}, 
	setInFeetPerSecond: function(fps) {
		this.s = fps * Speed.METERS_PER_SECOND_PER_FOOT_PER_SECOND;
		return this;
	},
	setInKiloyardsPerHour: function(kyph) {
		this.s = kyph * Speed.METERS_PER_SECOND_PER_KILOYARD_PER_HOUR;
		return this;
	},
	setInDataMilesPerHour: function(dmph) {
		this.s = dmph * Speed.METERS_PER_SECOND_PER_DATA_MILE_PER_HOUR;
		return this;
	},
	setInDataMilesPerSecond: function(dmps) {
		this.s = dmps * Speed.METERS_PER_SECOND_PER_DATA_MILE_PER_SECOND;
		return this;
	}, 
	setInStatuteMilesPerHour: function(mph) {
		this.s = mph * Speed.METERS_PER_SECOND_PER_STATUTE_MILE_PER_HOUR;
		return this;
	}, 
	setInKnots: function(knots) {
		this.s = knots * Speed.METERS_PER_SECOND_PER_KNOT;
		return this;
	},
	getInMetersPerSecond: function() {
		return this.s;
	},
	getInKilometersPerHour: function() {
		return (this.s * Speed.KILOMETERS_PER_HOUR_PER_METER_PER_SECOND);
	},
	getInKilometersPerSecond: function() {
		return (this.s * Speed.KILOMETERS_PER_SECOND_PER_METER_PER_SECOND);
	}, 
	getInFeetPerSecond: function() {
		return (this.s * Speed.FEET_PER_SECOND_PER_METER_PER_SECOND);
	}, 
	getInKiloyardsPerHour: function() {
		return (this.s * Speed.KILOYARDS_PER_HOUR_PER_METER_PER_SECOND);
	}, 
	getInDataMilesPerHour: function() {
		return (this.s * Speed.DATA_MILES_PER_HOUR_PER_METER_PER_SECOND);
	},
	getInDataMilesPerSecond: function() {
		return (this.s * Speed.DATA_MILES_PER_SECOND_PER_METER_PER_SECOND);
	}, 
	getInStatuteMilesPerHour: function(){
		return (this.s * Speed.STATUTE_MILES_PER_HOUR_PER_METER_PER_SECOND);
	}, 
	getInKnots: function() {
		return (this.s * Speed.KNOTS_PER_METER_PER_SECOND);
	},
	getInFractionOfc: function() {
		return (this.s * Speed.CS_PER_METER_PER_SECOND);
	},
};

	Speed.getFEET_PER_SECOND_PER_METER_PER_SECOND = function() {
		var FEET_PER_SECOND_PER_METER_PER_SECOND = 1.0 / Speed.getMETERS_PER_SECOND_PER_FOOT_PER_SECOND();
		return FEET_PER_SECOND_PER_METER_PER_SECOND;
	}, 


	Speed.getMETERS_PER_SECOND_PER_FOOT_PER_SECOND = function() {
		METERS_PER_SECOND_PER_FOOT_PER_SECOND = Length.getMETERS_PER_FOOT();
		return METERS_PER_SECOND_PER_FOOT_PER_SECOND;
	}; 
	Speed.getMETERS_PER_SECOND_PER_KILOYARD_PER_HOUR= function() {
		var METERS_PER_SECOND_PER_KILOYARD_PER_HOUR = Length.getMETERS_PER_KILOYARD() / TimeLength.getSECONDS_PER_HOUR();
		return METERS_PER_SECOND_PER_KILOYARD_PER_HOUR;
	};
	Speed.getMETERS_PER_SECOND_PER_KILOMETER_PER_HOUR = function() {
		var METERS_PER_SECOND_PER_KILOMETER_PER_HOUR = Length.getMETERS_PER_KILOMETER() / TimeLength.getSECONDS_PER_HOUR();
		return METERS_PER_SECOND_PER_KILOMETER_PER_HOUR;
	}; 
	Speed.getMETERS_PER_SECOND_PER_KILOMETER_PER_SECOND = function() {
		var METERS_PER_SECOND_PER_KILOMETER_PER_SECOND = Length.getMETERS_PER_KILOMETER();
		return METERS_PER_SECOND_PER_KILOMETER_PER_SECOND;
	};
	Speed.getMETERS_PER_SECOND_PER_STATUTE_MILE_PER_HOUR = function() {
		var METERS_PER_SECOND_PER_STATUTE_MILE_PER_HOUR = Length.getMETERS_PER_STATUTE_MILE() / TimeLength.getSECONDS_PER_HOUR();
		return METERS_PER_SECOND_PER_STATUTE_MILE_PER_HOUR;
	};
	Speed.getMETERS_PER_SECOND_PER_DATA_MILE_PER_HOUR = function() {
		var METERS_PER_SECOND_PER_DATA_MILE_PER_HOUR = Length.getMETERS_PER_DATA_MILE() / TimeLength.getSECONDS_PER_HOUR();
		return METERS_PER_SECOND_PER_DATA_MILE_PER_HOUR;
	};
	Speed.getMETERS_PER_SECOND_PER_DATA_MILE_PER_SECOND = function() {
		var METERS_PER_SECOND_PER_DATA_MILE_PER_SECOND = Length.getMETERS_PER_DATA_MILE();
		return METERS_PER_SECOND_PER_DATA_MILE_PER_SECOND;
	};
	Speed.getMETERS_PER_SECOND_PER_KNOT = function() {
		var METERS_PER_SECOND_PER_KNOT = Length.getMETERS_PER_NAUTICAL_MILE() / TimeLength.getSECONDS_PER_HOUR();
		return METERS_PER_SECOND_PER_KNOT;
	};
	Speed.getMETERS_PER_SECOND_PER_C = function() {
		// This value is obtained from the "CRC Standard Mathematical
		//   tables", CRC Press, 27th Edition, 1986, p. 5.
		var METERS_PER_SECOND_PER_C = 2.997925e+08;
		return METERS_PER_SECOND_PER_C;
	};


	Speed.getKILOYARDS_PER_HOUR_PER_METER_PER_SECOND= function() {
		var KILOYARDS_PER_HOUR_PER_METER_PER_SECOND = 1.0 / Speed.getMETERS_PER_SECOND_PER_KILOYARD_PER_HOUR();
		return KILOYARDS_PER_HOUR_PER_METER_PER_SECOND;
	}; 


	Speed.getKILOMETERS_PER_HOUR_PER_METER_PER_SECOND= function() {
		var KILOMETERS_PER_HOUR_PER_METER_PER_SECOND = 1.0 / Speed.getMETERS_PER_SECOND_PER_KILOMETER_PER_HOUR();
		return KILOMETERS_PER_HOUR_PER_METER_PER_SECOND;
	};  
	Speed.getKILOMETERS_PER_SECOND_PER_METER_PER_SECOND= function() {
		var KILOMETERS_PER_SECOND_PER_METER_PER_SECOND = 1.0 / Speed.getMETERS_PER_SECOND_PER_KILOMETER_PER_SECOND();
		return KILOMETERS_PER_SECOND_PER_METER_PER_SECOND;
	};


	Speed.getSTATUTE_MILES_PER_HOUR_PER_METER_PER_SECOND= function() {
		var	STATUTE_MILES_PER_HOUR_PER_METER_PER_SECOND = 1.0 / Speed.getMETERS_PER_SECOND_PER_STATUTE_MILE_PER_HOUR();
		return STATUTE_MILES_PER_HOUR_PER_METER_PER_SECOND;
	};

	Speed.getDATA_MILES_PER_HOUR_PER_METER_PER_SECOND= function() {
		var DATA_MILES_PER_HOUR_PER_METER_PER_SECOND = 1.0 / Speed.getMETERS_PER_SECOND_PER_DATA_MILE_PER_HOUR();
		return DATA_MILES_PER_HOUR_PER_METER_PER_SECOND;
	}, 
	Speed.getDATA_MILES_PER_SECOND_PER_METER_PER_SECOND= function() {
		var DATA_MILES_PER_SECOND_PER_METER_PER_SECOND = 1.0 / Speed.getMETERS_PER_SECOND_PER_DATA_MILE_PER_SECOND();
		return DATA_MILES_PER_SECOND_PER_METER_PER_SECOND;
	}; 
	Speed.getDATA_MILES_PER_SECOND_PER_METER_PER_SECOND= function() {
		var DATA_MILES_PER_SECOND_PER_METER_PER_SECOND = 1.0 / Speed.getMETERS_PER_SECOND_PER_DATA_MILE_PER_SECOND();
		return DATA_MILES_PER_SECOND_PER_METER_PER_SECOND;
	};

	Speed.getKNOTS_PER_METER_PER_SECOND= function() {
		var KNOTS_PER_METER_PER_SECOND = 1.0 / Speed.getMETERS_PER_SECOND_PER_KNOT();
		return KNOTS_PER_METER_PER_SECOND;
	}; 

	Speed.getCS_PER_METER_PER_SECOND= function() {
		var CS_PER_METER_PER_SECOND = 1.0 / Speed.getMETERS_PER_SECOND_PER_C();
		return CS_PER_METER_PER_SECOND;
	};
	Speed.getDefaultUnits= function() {
		return "meters/second";
	};
	Speed.getScalarName = function() {
		return "Speed";
	};
	Speed.getValue= function() {
		return this.s;
	}; 
	Speed.setInMetersPerSecondStatic= function(mps) {
		return new Speed().setInMetersPerSecond(mps);
	}; 


	//Static Variables
	Speed.METERS_PER_SECOND_PER_C= 2.997925e+08;
	Speed.METERS_PER_SECOND_PER_FOOT_PER_SECOND= Speed.getMETERS_PER_SECOND_PER_FOOT_PER_SECOND();
	Speed.METERS_PER_SECOND_PER_KILOYARD_PER_HOUR= Speed.getMETERS_PER_SECOND_PER_KILOYARD_PER_HOUR();
	Speed.METERS_PER_SECOND_PER_KILOMETER_PER_HOUR= Speed.getMETERS_PER_SECOND_PER_KILOMETER_PER_HOUR();
	Speed.METERS_PER_SECOND_PER_KILOMETER_PER_SECOND= Speed.getMETERS_PER_SECOND_PER_KILOMETER_PER_SECOND();
	Speed.METERS_PER_SECOND_PER_STATUTE_MILE_PER_HOUR= Speed.getMETERS_PER_SECOND_PER_STATUTE_MILE_PER_HOUR();
	Speed.METERS_PER_SECOND_PER_DATA_MILE_PER_HOUR= Speed.getMETERS_PER_SECOND_PER_DATA_MILE_PER_HOUR();
	Speed.METERS_PER_SECOND_PER_DATA_MILE_PER_SECOND= Speed.getMETERS_PER_SECOND_PER_DATA_MILE_PER_SECOND();
	Speed.METERS_PER_SECOND_PER_KNOT= Speed.getMETERS_PER_SECOND_PER_KNOT();
	Speed.FEET_PER_SECOND_PER_METER_PER_SECOND= Speed.getFEET_PER_SECOND_PER_METER_PER_SECOND();
	Speed.KILOYARDS_PER_HOUR_PER_METER_PER_SECOND= Speed.getKILOYARDS_PER_HOUR_PER_METER_PER_SECOND();
	Speed.KILOMETERS_PER_HOUR_PER_METER_PER_SECOND= Speed.getKILOMETERS_PER_HOUR_PER_METER_PER_SECOND();
	Speed.KILOMETERS_PER_SECOND_PER_METER_PER_SECOND= Speed.getKILOMETERS_PER_SECOND_PER_METER_PER_SECOND();
	Speed.STATUTE_MILES_PER_HOUR_PER_METER_PER_SECOND= Speed.getSTATUTE_MILES_PER_HOUR_PER_METER_PER_SECOND();
	Speed.DATA_MILES_PER_HOUR_PER_METER_PER_SECOND= Speed.getDATA_MILES_PER_HOUR_PER_METER_PER_SECOND();
	Speed.DATA_MILES_PER_SECOND_PER_METER_PER_SECOND= Speed.getDATA_MILES_PER_SECOND_PER_METER_PER_SECOND();
	Speed.KNOTS_PER_METER_PER_SECOND= Speed.getKNOTS_PER_METER_PER_SECOND();
	Speed.CS_PER_METER_PER_SECOND= Speed.getCS_PER_METER_PER_SECOND();
	
return Speed;
}); 
