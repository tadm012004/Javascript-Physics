define(["TimeLength", "AngularLength"], function(TimeLength, AngularLength){

	function AngularSpeed(s) {
		this.value = s; 
	}

	AngularSpeed.prototype = {
		constructor: AngularSpeed,
		setValue: function(s) {
			this.value = s; 
		},
		getValue: function() {
			return this.value; 
		},
		//---------------------------------------------------------
		//
		//	SETINRADIANSPERSECOND
		//
		/**	This method sets the angular speed in radians per second.
		 *
		 *	@param	rps			The angular speed in radians per second.
		 *
		 *	@return				The angular speed.
		 */
		//---------------------------------------------------------
		setInRadiansPerSecond: function(rps) {
			this.setValue(rps);
			return this;
		}, 
		//---------------------------------------------------------
		//
		//	SETINDEGREESPERSECOND
		//
		/**	This method sets the angular speed in degrees per second.
		 *
		 *	@param	dps			The angular speed in degrees per second.
		 *
		 *	@return				The angular speed.
		 */
		//---------------------------------------------------------
		setInDegreesPerSecond: function(dps) {
			this.setValue(dps * AngularSpeed.RADIANS_PER_SECOND_PER_DEGREE_PER_SECOND);
			return this;
		}, 
		//---------------------------------------------------------
		//
		//	SETINDEGREESPERMINUTE
		//
		/**	This method sets the angular speed in degrees per minute.
		 *
		 *	@param	dpm			The angular speed in degrees per minute.
		 *
		 *	@return				The angular speed.
		 */
		//---------------------------------------------------------
		setInDegreesPerMinute: function(dpm) {
			this.setValue(dpm * AngularSpeed.RADIANS_PER_SECOND_PER_DEGREE_PER_MINUTE);
			return this;
		}, 
		//---------------------------------------------------------
		//
		//	SETINREVOLUTIONSPERMINUTE
		//
		/**	This method sets the angular speed in revolutions per 
		 *  minute.
		 *
		 *	@param	rpm			The angular speed in revolutions 
		 *							per minute.
		 *
		 *	@return				The angular speed.
		 */
		//---------------------------------------------------------
		setInRevolutionsPerMinute: function(rpm) {
			this.setValue(rpm * AngularSpeed.RADIANS_PER_SECOND_PER_REVOLUTION_PER_MINUTE);
			return this;
		}, 
		//---------------------------------------------------------
		//
		//	GETINRADIANSPERSECOND
		//
		/**	This method gets the angular speed in radians per second.
		 *
		 *	@return				The angular speed in radians per second.
		 *
		 *	@throws				NotSetException if the value of
		 *							this AngularSpeed has not been set.
		 */
		//---------------------------------------------------------
		getInRadiansPerSecond: function() {
			return this.getValue();
		}, 
		//---------------------------------------------------------
		//
		//	GETINDEGREESPERSECOND
		//
		/**	This method gets the angular speed in degrees per second.
		 *
		 *	@return				The angular speed in degrees per second.
		 *
		 *	@throws				NotSetException if the value of
		 *							this AngularSpeed has not been set.
		 */
		//---------------------------------------------------------
		getInDegreesPerSecond: function() {
			return this.getValue() * AngularSpeed.DEGREES_PER_SECOND_PER_RADIAN_PER_SECOND;
		}, 
		//---------------------------------------------------------
		//
		//	GETINDEGREESPERMINUTE
		//
		/**	This method gets the angular speed in degrees per minute.
		 *
		 *	@return				The angular speed in degrees per minute.
		 *
		 *	@throws				NotSetException if the value of
		 *							this AngularSpeed has not been set.
		 */
		//---------------------------------------------------------
		getInDegreesPerMinute: function() {
			return this.getValue() * AngularSpeed.DEGREES_PER_MINUTE_PER_RADIAN_PER_SECOND;
		}, 
		//---------------------------------------------------------
		//
		//	GETINREVOLUTIONSPERMINUTE
		//
		/**	This method gets the angular speed in revolutions 
		 *  per minute.
		 *
		 *	@return				The angular speed in revolutions 
		 *							per minute.
		 *
		 *	@throws				NotSetException if the value of
		 *							this AngularSpeed has not been set.
		 */
		//---------------------------------------------------------
		getInRevolutionsPerMinute: function(){
			return this.getValue() * AngularSpeed.REVOLUTIONS_PER_MINUTE_PER_RADIAN_PER_SECOND;
		}, 
		
	};

	//------------------------------------------------------------
	//
	//	GETRADIANS_PER_SECOND_PER_DEGREE_PER_SECOND
	//
	/**	Returns the number of radians/sec in one degree/sec.
	 *
	 *	@return				The number of rad/sec in one deg/sec.
	 */
	//------------------------------------------------------------
	AngularSpeed.getRADIANS_PER_SECOND_PER_DEGREE_PER_SECOND = function() {
		var RADIANS_PER_SECOND_PER_DEGREE_PER_SECOND = AngularLength.getRADIANS_PER_DEGREE();
		return RADIANS_PER_SECOND_PER_DEGREE_PER_SECOND;
	}; 

		//------------------------------------------------------------
	//
	//	GETRADIANS_PER_SECOND_PER_DEGREE_PER_MINUTE
	//
	/**	Returns the number of radians/sec in one degree/min.
	 *
	 *	@return				The number of rad/sec in one deg/min.
	 */
	//------------------------------------------------------------
	AngularSpeed.getRADIANS_PER_SECOND_PER_DEGREE_PER_MINUTE = function() {
		var RADIANS_PER_SECOND_PER_DEGREE_PER_MINUTE =
			AngularLength.getRADIANS_PER_DEGREE() /
			TimeLength.getSECONDS_PER_MINUTE();
		return RADIANS_PER_SECOND_PER_DEGREE_PER_MINUTE;
	};
	//------------------------------------------------------------
	//
	//	GETRADIANS_PER_SECOND_PER_REVOLUTION_PER_MINUTE
	//
	/**	Returns the number of radians/sec in one revolution/minute.
	 *
	 *	@return				The number of rad/sec in one rev/min.
	 */
	//------------------------------------------------------------
	
	AngularSpeed.getRADIANS_PER_SECOND_PER_REVOLUTION_PER_MINUTE = function() {
		var RADIANS_PER_SECOND_PER_REVOLUTION_PER_MINUTE =
			AngularLength.getTWO_PI() / 
			TimeLength.getSECONDS_PER_MINUTE();
		return RADIANS_PER_SECOND_PER_REVOLUTION_PER_MINUTE;	
	};
	//------------------------------------------------------------
	//
	//	GETDEGREES_PER_SECOND_PER_RADIAN_PER_SECOND
	//
	/**	Returns the number of degrees/sec in one radian/sec.
	 *
	 *	@return				The number of deg/sec in one rad/sec.
	 */
	//------------------------------------------------------------
	
	AngularSpeed.getDEGREES_PER_SECOND_PER_RADIAN_PER_SECOND = function() {
		var DEGREES_PER_SECOND_PER_RADIAN_PER_SECOND = 1.0 / 
			AngularSpeed.getRADIANS_PER_SECOND_PER_DEGREE_PER_SECOND();
		return DEGREES_PER_SECOND_PER_RADIAN_PER_SECOND;
	}; 
	//------------------------------------------------------------
	//
	//	GETDEGREES_PER_MINUTE_PER_RADIAN_PER_SECOND
	//
	/**	Returns the number of degrees/min in one radian/sec.
	 *
	 *	@return				The number of deg/min in one rad/sec.
	 */
	//------------------------------------------------------------
	
	AngularSpeed.getDEGREES_PER_MINUTE_PER_RADIAN_PER_SECOND = function() {
		var DEGREES_PER_MINUTE_PER_RADIAN_PER_SECOND = 1.0 / 
			AngularSpeed.getRADIANS_PER_SECOND_PER_DEGREE_PER_MINUTE();
		return DEGREES_PER_MINUTE_PER_RADIAN_PER_SECOND;
	}; 
	//------------------------------------------------------------
	//
	//	GETREVOLUTIONS_PER_MINUTE_PER_RADIAN_PER_SECOND
	//
	/**	Returns the number of re:volutions/minute in one radian/sec.
	 *
	 *	@return				The number of rev/min in one rad/sec.
	 */
	//------------------------------------------------------------
	
	AngularSpeed.getREVOLUTIONS_PER_MINUTE_PER_RADIAN_PER_SECOND = function() {
		var REVOLUTIONS_PER_MINUTE_PER_RADIAN_PER_SECOND =
			1.0/ AngularSpeed.getRADIANS_PER_SECOND_PER_REVOLUTION_PER_MINUTE();
		return REVOLUTIONS_PER_MINUTE_PER_RADIAN_PER_SECOND;
	}; 

	AngularSpeed.getDefaultUnits = function() {
		return "radians/second"; 
	}; 
	AngularSpeed.getScalarName = function() {
		return "AngularSpeed";
	}; 

	AngularSpeed.RADIANS_PER_SECOND_PER_DEGREE_PER_SECOND =
		AngularSpeed.getRADIANS_PER_SECOND_PER_DEGREE_PER_SECOND();
	AngularSpeed.RADIANS_PER_SECOND_PER_DEGREE_PER_MINUTE =
		AngularSpeed.getRADIANS_PER_SECOND_PER_DEGREE_PER_MINUTE();
	AngularSpeed.RADIANS_PER_SECOND_PER_REVOLUTION_PER_MINUTE =
		AngularSpeed.getRADIANS_PER_SECOND_PER_REVOLUTION_PER_MINUTE();
	AngularSpeed.DEGREES_PER_SECOND_PER_RADIAN_PER_SECOND =
		AngularSpeed.getDEGREES_PER_SECOND_PER_RADIAN_PER_SECOND();
	AngularSpeed.DEGREES_PER_MINUTE_PER_RADIAN_PER_SECOND =
		AngularSpeed.getDEGREES_PER_MINUTE_PER_RADIAN_PER_SECOND();
	AngularSpeed.REVOLUTIONS_PER_MINUTE_PER_RADIAN_PER_SECOND =
		AngularSpeed.getREVOLUTIONS_PER_MINUTE_PER_RADIAN_PER_SECOND();

	return AngularSpeed; 

});