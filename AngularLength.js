define(function() {
	"use strict";

	function AngularLength(val) {
		this.value = val; 
	}

	AngularLength.prototype = {
		constructor: AngularLength, 
		
		setValue: function(val) {
			this.value = val;
			this.setFlag = true;
			return this;
		},
		getValue: function() {
			if (!this.setFlag) {
				throw "NotSetException";
			}
			return this.value;
		},
		//---------------------------------------------------------
		//
		//	SETINRADIANS
		//
		/**	This method sets the angular length in radians.
		 *  One circuit of a circle is defined to be 2*PI
		 *  radians.
		 *
		 *	@param	radians		The angular length in radians.
		 *
		 *	@return				The angular length.
		 */
		//---------------------------------------------------------
		setInRadians: function(radians) {
			this.setValue(radians);
			return this;
		}, 
		//---------------------------------------------------------
		//
		//	SETINREVOLUTIONS
		//
		/**	This method sets the angular length in revolutions.
		 *  One circuit of a circle is defined to be one 
		 *	revolution.
		 *
		 *	@param	revs		The angular length in revolutions.
		 *
		 *	@return				The angular length.
		 */
		//---------------------------------------------------------
		setInRevolutions: function(revs) {
			this.setValue(revs * AngularLength.RADIANS_PER_REVOLUTION);
			return this;
		}, 
		//---------------------------------------------------------
		//
		//	SETINDEGREES
		//
		/**	This method sets the angular length in degrees.
		 *  One circuit of a circle is defined to be 360
		 *  degrees.
		 *
		 *	@param	degrees		The angular length in degrees.
		 *
		 *	@return				The angular length.
		 */
		//---------------------------------------------------------
		setInDegrees: function(degrees) {
			this.setValue(degrees*AngularLength.RADIANS_PER_DEGREE);
			return this;
		}, 
		//---------------------------------------------------------
		//
		//	SETINDMS
		//
		/**	This method sets the angular length in degrees,
		 *  minutes, and seconds.  One circuit of a circle is 
		 *	defined to be 360 degrees.  One minute is defined
		 *  to be 1/60th of one degree.  One second is defined
		 *  to be 1/60th of one minute.
		 *
		 *	@param	degrees		The angular length in degrees.
		 *	@param	minutes		The number of additional minutes
		 *							in the angular length.
		 *	@param	seconds		The number of additional seconds
		 *							in the angular length.
		 *
		 *	@return				The angular length.
		 */
		//---------------------------------------------------------
		setInDMS: function(degrees, minutes, seconds) {
			this.setValue ( AngularLength.RADIANS_PER_DEGREE *(degrees + AngularLength.DEGREES_PER_MINUTE * 
				 	(minutes + seconds * AngularLength.MINUTES_PER_SECOND)));
			return this;
		}, 
		//---------------------------------------------------------
		//
		//	SETINHMS
		//
		/**	This method sets the angular length in hours,
		 *  minutes, and seconds.  One circuit of a circle is 
		 *	defined to be 24 hours.  One minute is defined
		 *  to be 1/60th of one hour.  One second is defined
		 *  to be 1/60th of one minute.
		 *
		 *	@param	hours		The angular length in hours.
		 *	@param	minutes		The number of additional minutes
		 *							in the angular length.
		 *	@param	seconds		The number of additional seconds
		 *							in the angular length.
		 *
		 *	@return				The angular length.
		 */
		//---------------------------------------------------------
		setInHMS: function (hours, minutes, seconds) {
			this.setValue ( AngularLength.RADIANS_PER_HOUR *(hours + AngularLength.HOURS_PER_MINUTE * (minutes + seconds * AngularLength.MINUTES_PER_SECOND)));
			return this;
		}, 
		//---------------------------------------------------------
		//
		//	GETINRADIANS
		//
		/**	This method gets the angular length in radians.
		 *
		 *	@return				The angular length in radians.
		 *
		 *	@throws				NotSetException if the value of
		 *							this AngularLength has not been set.
		 */
		//---------------------------------------------------------
		getInRadians: function() {
			return this.getValue();
		}, 
		//---------------------------------------------------------
		//
		//	GETINREVOLUTIONS
		//
		/**	This method gets the angular length in revolutions.
		 *
		 *	@return				The angular length in revolutions.
		 *
		 *	@throws				NotSetException if the value of
		 *							this AngularLength has not been set.
		 */
		//---------------------------------------------------------
		getInRevolutions: function() {
			return (this.getValue()) * AngularLength.REVOLUTIONS_PER_RADIAN;
		}, 
		//---------------------------------------------------------
		//
		//	GETINDEGREES
		//
		/**	This method gets the angular length in degrees.
		 *
		 *	@return				The angular length in degrees.
		 *
		 *	@throws				NotSetException if the value of
		 *							this AngularLength has not been set.
		 */
		//---------------------------------------------------------
		getInDegrees: function() {
			return (this.getValue()*AngularLength.DEGREES_PER_RADIAN);
		}, 

		//---------------------------------------------------------
		//
		//	GETINDMS
		//
		/**	This method gets the angular length in degrees,
		 *  minutes, and seconds.  One circuit of a circle is 
		 *	defined to be 360 degrees.  One minute is defined
		 *  to be 1/60th of one degree.  One second is defined
		 *  to be 1/60th of one minute.
		 *  <br><br>
		 *  If the angle is negative, the returned values will
		 *  all be non-positive.  If the angle is positive, the
		 *  returned values will all be non-negative.
		 *
		 *	@param	degrees		After return, will hold the maximum 
		 *							number of whole degrees in 
		 *							the angular length.
		 *	@param	minutes		After return, will hold the maximum 
		 *							number of additional minutes 
		 *							in the angular length.
		 *	@param	seconds		After return, will hold the number of 
		 *							additional seconds in the 
		 *							angular length.
		 *
		 *	@throws				NotSetException if this AngularLength
		 *							is not set.
		 */
		//---------------------------------------------------------	
		getInDMS: function(degrees, minutes, seconds) {

			//  Take absolute value, but remember if
			//  negative.
			var	d = this.getValue() * AngularLength.DEGREES_PER_RADIAN;
			var	negative = (d < 0.0);
			if (negative) {
				d = -d;
			}

			//  Get degrees.
			degrees.set(parseInt(Math.floor(d)));

			//  Now less than one degree; change units to minutes.
			d = (d - degrees.getValue()) * AngularLength.MINUTES_PER_DEGREE;
			minutes.set(parseInt((Math.floor(d))));

			//  Now less than one minute; return seconds.
			seconds.set(parseFloat((d - minutes.getValue()) * AngularLength.SECONDS_PER_MINUTE));

			//  Choose correct signs if negative.
			if (negative) {
				degrees.set(parseInt(-degrees.get().intValue()));
				minutes.set(parseInt(-minutes.get().intValue()));
				seconds.set(parseFloat(-seconds.get().doubleValue()));
			}
		}, 
		
	
		//---------------------------------------------------------
		//
		//	GETINHMS
		//
		/**	This method gets the angular length in hours,
		 *  minutes, and seconds.  One circuit of a circle is 
		 *	defined to be 24 hours.  One minute is defined
		 *  to be 1/60th of one hour.  One second is defined
		 *  to be 1/60th of one minute.
		 *  <br><br>
		 *  If the angle is negative, the returned values will
		 *  all be non-positive.  If the angle is positive, the
		 *  returned values will all be non-negative.
		 *
		 *	@param	hours		After return, will hold the maximum 
		 *							number of whole hours in 
		 *							the angular length.
		 *	@param	minutes		After return, will hold the maximum 
		 *							number of additional minutes 
		 *							in the angular length.
		 *	@param	seconds		After return, will hold the number of 
		 *							additional seconds in the 
		 *							angular length.
		 *
		 *	@throws				NotSetException if this AngularLength
		 *							is not set.
		 */
		//---------------------------------------------------------
		getInHMS: function(hours, minutes, seconds) {
			//  Take absolute value, but remember if
			//  negative.
			var	h = this.getValue() * AngularLength.HOURS_PER_RADIAN;
			var	negative = (h < 0.0);
			if (negative) {
				h = -h;
			}

			//  Get hours.
			hours.set(new Integer((int)(Math.floor(h))));

			//  Now less than one hour; change units to minutes.
			h = (h - hours.get().intValue()) * AngularLength.MINUTES_PER_HOUR;
			minutes.set(new Integer((int)(Math.floor(h))));

			//  Now less than one minute; return seconds.
			seconds.set(new Double((h - minutes.get().intValue()) * AngularLength.SECONDS_PER_MINUTE));

			//  If negative, choose correct signs.
			if (negative) {
				hours.set(new Integer(-hours.get().intValue()));
				minutes.set(new Integer(-minutes.get().intValue()));
				seconds.set(new Double(-seconds.get().doubleValue()));
			}
		}, 
		//---------------------------------------------------------
		//
		//	RESTRICTED
		//
		/**	Returns a copy of this AngularLength with the return
		 *  value restricted to be positive and less than one circuit 
		 *  of the circle.  Does not modify this AngularLength.
		 *
		 *	@return			The restricted AngularLength
		 *
		 *	@throws			NotSetException if the value of this
		 *						AngularLength has not been set.
		 */
		//---------------------------------------------------------
		restricted: function(){

			//  Get the value of this AngularLength in radians.
			var	restricted = this.getValue();

			//  Make the angle positive.
			while (restricted < 0.0) {
				restricted += AngularLength.TWO_PI;
			}
			
			//  Limit to less than one circuit.
			while (restricted >= AngularLength.TWO_PI) {
				restricted -= AngularLength.TWO_PI;
			}

			//  Return an AngularLength containing the result.
			return new AngularLength().setValue(restricted);
		}, 
	};

	//---------------------------------------------------------
	//
	//	PI
	//
	/**	This static convenience method returns an AngularLength
	 *  with a value in radians of pi.
	 */
	//---------------------------------------------------------
	AngularLength.pi = function() {
		return new AngularLength().setValue(AngularLength.PI);
	}; 
	//---------------------------------------------------------
	//
	//	TWOPI
	//
	/** This static convenience method returns an AngularLength
	 *  with a value in radians of 2*pi
	 */
	//---------------------------------------------------------
	AngularLength.twoPi = function() {
		return new AngularLength().setValue(AngularLength.TWO_PI);
	}; 
	//---------------------------------------------------------
	//
	//	PIOVERTWO
	//
	/**	This static convenience method returns an AngularLength
	 *  with a value in radians of pi/2
	 */
	//---------------------------------------------------------
	AngularLength.piOverTwo = function() {
		return new AngularLength().setValue(AngularLength.PI_OVER_TWO);
	}; 
	//------------------------------------------------------------
	//
	//	GETPI
	//
	/**	Returns the number of radians in pi.
	 *
	 *	@return				The number of radians in pi.
	 */
	//------------------------------------------------------------
	AngularLength.getPI = function() {
		//  M_PI comes from the math package.
		var PI_ = Math.PI;
		return PI_;
	}; 
	//------------------------------------------------------------
	//
	//	GETTWO_PI
	//
	/**	Returns the number of radians in 2*pi.
	 *
	 *	@return				The number of radians in 2*pi.
	 */
	//------------------------------------------------------------
	AngularLength.getTWO_PI = function() {
		var TWO_PI = 2.0 * AngularLength.getPI();
		return TWO_PI;
	}; 
	//------------------------------------------------------------
	//
	//	GETPI_OVER_TWO
	//
	/**	Returns the number of radians in pi/2.
	 *
	 *	@return				The number of radians in pi/2.
	 */
	//------------------------------------------------------------
	AngularLength.getPI_OVER_TWO = function() {
		var PI_OVER_TWO = AngularLength.getPI() / 2.0;
		return PI_OVER_TWO;
	}; 
	//------------------------------------------------------------
	//
	//	GETRADIANS_PER_REVOLUTION
	//
	/**	Returns the number of radians in one revolution.
	 *
	 *	@return				The number of rad in one rev.
	 */
	//------------------------------------------------------------
	AngularLength.getRADIANS_PER_REVOLUTION = function() {
		var RADIANS_PER_REVOLUTION = AngularLength.getTWO_PI();
		return RADIANS_PER_REVOLUTION;
	}; 
	//------------------------------------------------------------
	//
	//	GETRADIANS_PER_DEGREE
	//
	/**	Returns the number of radians in one degree.
	 *
	 *	@return				The number of rad in one degree.
	 */
	//------------------------------------------------------------
	AngularLength.getRADIANS_PER_DEGREE = function() {
		var RADIANS_PER_DEGREE = AngularLength.getPI() / 180.0;
		return RADIANS_PER_DEGREE;
	}; 
	//------------------------------------------------------------
	//
	//	GETDEGREES_PER_RADIAN
	//
	/**	Returns the number of degrees in one radian.
	 *
	 *	@return				The number of deg in one radian.
	 */
	//------------------------------------------------------------
	AngularLength.getDEGREES_PER_RADIAN = function() {
		var DEGREES_PER_RADIAN = 1.0 / AngularLength.getRADIANS_PER_DEGREE();
		return DEGREES_PER_RADIAN;
	}; 
	//------------------------------------------------------------
	//
	//	GETMINUTESS_PER_DEGREE
	//
	/**	Returns the number of minutes in one degree.
	 *
	 *	@return				The number of minutes in one degree.
	 */
	//------------------------------------------------------------
	AngularLength.getMINUTES_PER_DEGREE = function() {
		var MINUTES_PER_DEGREE = 60.0;
		return MINUTES_PER_DEGREE;
	}; 
	//------------------------------------------------------------
	//
	//	GETSECONDS_PER_MINUTE
	//
	/**	Returns the number of seconds in one minute.
	 *
	 *	@return				The number of seconds in one minute.
	 */
	//------------------------------------------------------------
	AngularLength.getSECONDS_PER_MINUTE = function() {
		var SECONDS_PER_MINUTE = 60.0;
		return SECONDS_PER_MINUTE;
	}; 
	//------------------------------------------------------------
	//
	//	GETDEGREES_PER_MINUTE
	//
	/**	Returns the number of degrees in one minute.
	 *
	 *	@return				The number of degrees in one minute.
	 */
	//------------------------------------------------------------
	AngularLength.getDEGREES_PER_MINUTE = function() {
		var	DEGREES_PER_MINUTE = 1.0 / AngularLength.getMINUTES_PER_DEGREE();
		return DEGREES_PER_MINUTE;
	}; 

	//------------------------------------------------------------
	//
	//	GETMINUTES_PER_SECOND
	//
	/**	Returns the number of minutes in one second.
	 *
	 *	@return				The number of minutes in one second.
	 */
	//------------------------------------------------------------
	AngularLength.getMINUTES_PER_SECOND = function() {
		var MINUTES_PER_SECOND = 1.0 / AngularLength.getSECONDS_PER_MINUTE();
		return MINUTES_PER_SECOND;
	}; 
	//------------------------------------------------------------
	//
	//	GETREVOLUTIONS_PER_RADIAN
	//
	/**	Returns the number of revolutions in one radian.
	 *
	 *	@return				The number of revs in one radian.
	 */
	//------------------------------------------------------------
	AngularLength.getREVOLUTIONS_PER_RADIAN = function() {
		var REVOLUTIONS_PER_RADIAN = 1.0 / AngularLength.getRADIANS_PER_REVOLUTION();
		return REVOLUTIONS_PER_RADIAN;
	}; 
	//------------------------------------------------------------
	//
	//	GETRADIANS_PER_HOUR
	//
	/**	Returns the number of radians in one hour.
	 *
	 *	@return				The number of radians in one hour.
	 */
	//------------------------------------------------------------
	AngularLength.getRADIANS_PER_HOUR = function() {
		var RADIANS_PER_HOUR = AngularLength.getPI() / 12.0;
		return RADIANS_PER_HOUR;
	}; 

	//------------------------------------------------------------
	//
	//	GETHOURS_PER_RADIAN
	//
	/**	Returns the number of hours in one radian.
	 *
	 *	@return				The number of hours in one radian.
	 */
	//------------------------------------------------------------
	AngularLength.getHOURS_PER_RADIAN = function() {
		var HOURS_PER_RADIAN = 1.0 / AngularLength.getRADIANS_PER_HOUR();
		return HOURS_PER_RADIAN;
	};
		//------------------------------------------------------------
	//
	//	GETMINUTES_PER_HOUR
	//
	/**	Returns the number of minutes in one hour.
	 *
	 *	@return				The number of minutes in one hour.
	 */
	//------------------------------------------------------------
	AngularLength.getMINUTES_PER_HOUR = function() {
		var MINUTES_PER_HOUR = 60.0;
		return MINUTES_PER_HOUR;
	}; 
	//------------------------------------------------------------
	//
	//	GETHOURS_PER_MINUTE
	//
	/**	Returns the number of hours in one minute.
	 *
	 *	@return				The number of hours in one minute.
	 */
	//------------------------------------------------------------
	AngularLength.getHOURS_PER_MINUTE = function() {
		var HOURS_PER_MINUTE = 1.0 / AngularLength.getMINUTES_PER_HOUR();
		return HOURS_PER_MINUTE;
	}; 

	AngularLength.getScalarName = function() {
		return "AngularLength"; 
	}; 
	AngularLength.getDefaultUnits = function() {
		return "radians"; 
	};

	AngularLength.RADIANS_PER_REVOLUTION =
		AngularLength.getRADIANS_PER_REVOLUTION();
	AngularLength.RADIANS_PER_DEGREE =
		AngularLength.getRADIANS_PER_DEGREE();
	AngularLength.DEGREES_PER_MINUTE =
		AngularLength.getDEGREES_PER_MINUTE();
	AngularLength.MINUTES_PER_SECOND =
		AngularLength.getMINUTES_PER_SECOND();
	AngularLength.RADIANS_PER_HOUR =
		AngularLength.getRADIANS_PER_HOUR();
	AngularLength.HOURS_PER_MINUTE =
		AngularLength.getHOURS_PER_MINUTE();
	AngularLength.REVOLUTIONS_PER_RADIAN =
		AngularLength.getREVOLUTIONS_PER_RADIAN();
	AngularLength.DEGREES_PER_RADIAN =
		AngularLength.getDEGREES_PER_RADIAN();
	AngularLength.MINUTES_PER_DEGREE =
		AngularLength.getMINUTES_PER_DEGREE();
	AngularLength.SECONDS_PER_MINUTE =
		AngularLength.getSECONDS_PER_MINUTE();
	AngularLength.HOURS_PER_RADIAN = 
		AngularLength.getHOURS_PER_RADIAN();
	AngularLength.MINUTES_PER_HOUR =
		AngularLength.getMINUTES_PER_HOUR();
	AngularLength.PI = AngularLength.getPI();
	AngularLength.TWO_PI = AngularLength.getTWO_PI();
	AngularLength.PI_OVER_TWO = AngularLength.getPI_OVER_TWO();

	return AngularLength; 
});