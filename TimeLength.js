define(function() {
	 "use strict";

	 function TimeLength (val) {
	 	this.value = val; 
	 }

	 TimeLength.prototype = {
	 	constructor: TimeLength, 
	 	setValue: function(s) {
	 		this.value = s; 
	 		return this; 
	 	},
	 	setInSeconds: function(s) {
	 		this.setValue(s);
	 		return this; 
	 	},
	 	setInMilliSeconds: function(msec) {
			this.setValue(msec * TimeLength.SECONDS_PER_MILLISECOND);
			return this;
		},
		setInMicroSeconds: function(microsec) {
			this.setValue(microsec * TimeLength.SECONDS_PER_MICROSECOND);
			return this;
		}, 
		setInHMS: function(hours, minutes, seconds) {
			this.setValue(hours * TimeLength.SECONDS_PER_HOUR + minutes * TimeLength.SECONDS_PER_MINUTE + seconds);
			return this;
		},
		setInSiderealSeconds: function(siderealSeconds) {
			this.setValue(siderealSeconds * TimeLength.SI_SECONDS_PER_SIDEREAL_SECOND);
			return this;
		},
		setInSiderealHMS:function(siderealHours, siderealMinutes, siderealSeconds) {
			this.setValue(siderealHours * 
								TimeLength.SI_SECONDS_PER_SIDEREAL_HOUR +
						  siderealMinutes * 
						  		TimeLength.SI_SECONDS_PER_SIDEREAL_MINUTE +
						  siderealSeconds * 
						  		TimeLength.SI_SECONDS_PER_SIDEREAL_SECOND);
			return this;
		},
		setInCalendarDays: function(calDays) {
			this.setValue(calDays * TimeLength.SI_SECONDS_PER_CALENDAR_DAY);
			return this;
		},
		setInMeanSolarDays: function(solDays) {
			this.setValue(solDays * TimeLength.SI_SECONDS_PER_MEAN_SOLAR_DAY_1999);
			return this;
		},
		setInMeanSolarSeconds: function(solSecs) {
			this.setValue(solSecs * TimeLength.SI_SECONDS_PER_MEAN_SOLAR_SECOND_1999);
			return this;
		},
		setInSiderealDays: function(sideDays) {
			this.setValue(sideDays * TimeLength.SI_SECONDS_PER_SIDEREAL_DAY);
			return this;
		},
		setInJulianCenturies: function (julCent) {
			this.setValue(julCent * TimeLength.SI_SECONDS_PER_JULIAN_CENTURY);
			return this;
		},
		getValue: function() {
			return this.value; 
		},
		getInSeconds: function(){
			return this.getValue();
		},
		getInMilliSeconds: function(){
			return (this.getValue() * TimeLength.MILLISECONDS_PER_SECOND);
		},
		getInMicroSeconds: function(){
			return (this.getValue() * TimeLength.MICROSECONDS_PER_SECOND);
		},
		getInHMS: function(hours, minutes, seconds){
			var s = this.getValue();

			var negative_time_length = false;
			if ( s < 0.0 ) {
				negative_time_length = true;
				s *= -1.0;
			}

			hours.set(new Integer((int)(Math.floor(s / TimeLength.SECONDS_PER_HOUR))));
			s -= hours.get().intValue() * TimeLength.SECONDS_PER_HOUR;
			minutes.set(new Integer((int)(Math.floor(s / TimeLength.SECONDS_PER_MINUTE))));
			seconds.set(new Double(s - minutes.get().intValue() * TimeLength.SECONDS_PER_MINUTE));

			if ( negative_time_length == true ) {
				hours.set(new Integer(-hours.get().intValue()));
				minutes.set(new Integer(-minutes.get().intValue()));
				seconds.set(new Double(-seconds.get().doubleValue()));
			}
		}, 
		getInSiderealSeconds: function() {
			return (this.getValue() * TimeLength.SIDEREAL_SECONDS_PER_SI_SECOND);
		},
		getInSiderealHMS: function(siderealHours, siderealMinutes, siderealSeconds) {
			var s = this.getInSiderealSeconds();
			var negative_time_length = false;
			if ( s < 0.0 ) {
				negative_time_length = true;
				s *= -1.0;
			}

			siderealHours.set(
				new Integer((int)(Math.floor(s / TimeLength.SECONDS_PER_HOUR))));
			s -= siderealHours.get().intValue() * TimeLength.SECONDS_PER_HOUR;
			siderealMinutes.set( 
				new Integer((int)(Math.floor(s/TimeLength.SECONDS_PER_MINUTE))));
			siderealSeconds.set( 
				new Double(s - siderealMinutes.get().intValue() * TimeLength.SECONDS_PER_MINUTE));

			if ( negative_time_length == true ) {
				siderealHours.set(new Integer(-siderealHours.get().intValue()));
				siderealMinutes.set(new Integer(-siderealMinutes.get().intValue()));
				siderealSeconds.set(new Double(-siderealSeconds.get().doubleValue()));
			}
		},
		getInCalendarDays: function() {
			return (this.getValue()) * TimeLength.CALENDAR_DAYS_PER_SI_SECOND;
		},
		getInMeanSolarDays: function() {
				return (this.getValue() * TimeLength.MEAN_SOLAR_DAYS_PER_SI_SECOND_1999);
		},	
 		getInMeanSolarSeconds: function() {
			return (this.getValue() * TimeLength.MEAN_SOLAR_SECONDS_PER_SI_SECOND_1999);
		},
		getInSiderealDays: function() {
			return (this.getValue() * TimeLength.SIDEREAL_DAYS_PER_SI_SECOND);
		},
		getInJulianCenturies: function() {
			return (this.getValue() * TimeLength.JULIAN_CENTURIES_PER_SI_SECOND);
		},
	 };
	//------------------------------------------------------------
	//
	//	GETMEAN_SOLAR_DAYS_PER_SIDEREAL_DAY
	//
	/**	Returns the number of mean solar days in one sidereal day.
	 *
	 *	@return				The number of mean solar days in
	 *						one sidereal day.
	 */
	//------------------------------------------------------------
	 TimeLength.getMEAN_SOLAR_DAYS_PER_SIDEREAL_DAY = function() {
		//  This value is exact, and will remain exact, since 
		//  as the Earth's rotation slows, the mean solar day
		//  and the sidereal day will be affected (proportionally)
		//  in the same way.  This value is taken from IERS Technical
		//	Note 21, "IERS Conventions (1996)", by Dennis D. McCarthy
		//	of the U.S. Naval Observatory.  The value is the inverse
		//	of the ratio of universal time to sidereal time provided
		// 	on page 21.
		var MEAN_SOLAR_DAYS_PER_SIDEREAL_DAY = 0.997269566329;
		return MEAN_SOLAR_DAYS_PER_SIDEREAL_DAY;
	}; 
	//------------------------------------------------------------
	//
	//	GETSI_SECONDS_PER_MEAN_SOLAR_DAY_1999
	//
	/**	Returns the number of SI seconds in one 
	 *	mean solar day in 1999.
	 *
	 *	@return				The number of SI seconds in
	 *						one mean solar day in 1999.
	 */
	//------------------------------------------------------------
	TimeLength.getSI_SECONDS_PER_MEAN_SOLAR_DAY_1999 = function() {
		//  This value is approximate, and is time-varying.  The
		//  mean solar day increases by about 1.1 SI msec per century.
		//  This value was obtained from 
		//  http://tycho.usno.navy.mil/leapsec.html,
		//  a Web page at the US Navy Observatory.
		var SI_SECONDS_PER_MEAN_SOLAR_DAY_1999 = 86400.002;
		return SI_SECONDS_PER_MEAN_SOLAR_DAY_1999;
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
	TimeLength.getSECONDS_PER_MINUTE = function() {
		//  These values are definitional, and are relative
		//  notions (e.g., apply within SI, sidereal, or
		//  mean solar, not across them).  To be more explicit,
		//  SECONDS_PER_MINUTE == SIDEREAL_SECONDS_PER_SIDEREAL_MINUTE,
		//  and SECONDS_PER_MINUTE == SI_SECONDS_PER_SI_MINUTE, but
		//  SECONDS_PER_MINUTE != SI_SECONDS_PER_SIDEREAL_MINUTE.
		var SECONDS_PER_MINUTE = 60.0;
		return SECONDS_PER_MINUTE;
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
	TimeLength.getMINUTES_PER_HOUR = function() {
		//  These values are definitional, and are relative
		//  notions (e.g., apply within SI, sidereal, or
		//  mean solar, not across them).  To be more explicit,
		//  MINUTES_PER_HOUR == SIDEREAL_MINUTES_PER_SIDEREAL_HOUR,
		//  and MINUTES_PER_HOUR == SI_MINUTES_PER_SI_HOUR, but
		//  MINUTES_PER_HOUR != SI_MINUTES_PER_SIDEREAL_HOUR.
		var MINUTES_PER_HOUR = 60.0;
		return MINUTES_PER_HOUR;
	};
		//------------------------------------------------------------
	//
	//	GETHOURS_PER_DAY
	//
	/**	Returns the number of hours in one day.
	 *
	 *	@return				The number of hours in one day.
	 */
	//------------------------------------------------------------
	TimeLength.getHOURS_PER_DAY = function() {
		//  These values are definitional, and are relative
		//  notions (e.g., apply within SI, sidereal, or
		//  mean solar, not across them).  To be more explicit,
		//  HOURS_PER_DAY == SIDEREAL_HOURS_PER_SIDEREAL_DAY,
		//  and HOURS_PER_DAY == SI_HOURS_PER_SI_DAY, but
		//  HOURS_PER_DAY != SI_HOURS_PER_SIDEREAL_DAY.
		var HOURS_PER_DAY = 24.0;
		return HOURS_PER_DAY;
	};

	//------------------------------------------------------------
	//
	//	GETCALENDAR_DAYS_PER_JULIAN_CENTURY
	//
	/**	Returns the number of calendar days in one Julian century.
	 *
	 *	@return				The number of calendar days in one
	 *						Julian century.
	 */
	//------------------------------------------------------------
	TimeLength.getCALENDAR_DAYS_PER_JULIAN_CENTURY = function() {
		var CALENDAR_DAYS_PER_JULIAN_CENTURY = 36525.0;
		return CALENDAR_DAYS_PER_JULIAN_CENTURY;
	};
	//------------------------------------------------------------
	//
	//	GETSECONDS_PER_HOUR
	//
	/**	Returns the number of seconds in one hour.
	 *
	 *	@return				The number of seconds in one hour.
	 */
	//------------------------------------------------------------
	TimeLength.getSECONDS_PER_HOUR = function() {
		var SECONDS_PER_HOUR = TimeLength.getSECONDS_PER_MINUTE() * TimeLength.getMINUTES_PER_HOUR();
		return SECONDS_PER_HOUR;
	};

	//------------------------------------------------------------
	//
	//	GETSECONDS_PER_DAY
	//
	/**	Returns the number of seconds in one day.
	 *
	 *	@return				The number of seconds in one day.
	 */
	//------------------------------------------------------------
	TimeLength.getSECONDS_PER_DAY = function() {
		var SECONDS_PER_DAY = TimeLength.getSECONDS_PER_HOUR() * TimeLength.getHOURS_PER_DAY();
		return SECONDS_PER_DAY;
	}; 
	//------------------------------------------------------------
	//
	//	GETSI_SECONDS_PER_MEAN_SOLAR_SECOND_1999
	//
	/**	Returns the number of SI seconds in one mean solar 
	 *	second in 1999.
	 *
	 *	@return				The number of SI seconds in one 
	 *						mean solar second in 1999.
	 */
	//------------------------------------------------------------
	TimeLength.getSI_SECONDS_PER_MEAN_SOLAR_SECOND_1999 = function() {
		var SI_SECONDS_PER_MEAN_SOLAR_SECOND_1999 = TimeLength.getSI_SECONDS_PER_MEAN_SOLAR_DAY_1999() /TimeLength.getSECONDS_PER_DAY();
		return SI_SECONDS_PER_MEAN_SOLAR_SECOND_1999;
	}; 
	//------------------------------------------------------------
	//
	//	GETMEAN_SOLAR_SECONDS_PER_SI_SECOND_1999
	//
	/**	Returns the number of mean solar seconds in one SI
	 *	second in 1999.
	 *
	 *	@return				The number of mean solar seconds in one 
	 *						SI second in 1999.
	 */
	//------------------------------------------------------------
	TimeLength.getMEAN_SOLAR_SECONDS_PER_SI_SECOND_1999 = function() {
		var MEAN_SOLAR_SECONDS_PER_SI_SECOND_1999 = 1.0 / TimeLength.getSI_SECONDS_PER_MEAN_SOLAR_SECOND_1999();
		return MEAN_SOLAR_SECONDS_PER_SI_SECOND_1999;
	};

	//------------------------------------------------------------
	//
	//	GETSECONDS_PER_MILLISECOND
	//
	/**	Returns the number of seconds in one millisecond.
	 *
	 *	@return				The number of seconds in one 
	 *						millisecond.
	 */
	//------------------------------------------------------------
	TimeLength.getSECONDS_PER_MILLISECOND = function() {
		var SECONDS_PER_MILLISECOND = 1.0 / TimeLength.getMILLISECONDS_PER_SECOND();
		return SECONDS_PER_MILLISECOND;
	}; 

	//------------------------------------------------------------
	//
	//	GETSECONDS_PER_MICROSECOND
	//
	/**	Returns the number of seconds in one microsecond.
	 *
	 *	@return				The number of seconds in one 
	 *						millisecond.
	 */
	//------------------------------------------------------------
	TimeLength.getSECONDS_PER_MICROSECOND = function() {
		var SECONDS_PER_MICROSECOND = 1.0 / TimeLength.getMICROSECONDS_PER_SECOND();
		return SECONDS_PER_MICROSECOND;
	}; 

	//------------------------------------------------------------
	//
	//	GETSI_SECONDS_PER_SIDEREAL_SECOND
	//
	/**	Returns the number of SI seconds in one sidereal second.
	 *
	 *	@return				The number of SI seconds in one 
	 *						sidereal second.
	 */
	//------------------------------------------------------------
	TimeLength.getSI_SECONDS_PER_SIDEREAL_SECOND = function() {
		var SI_SECONDS_PER_SIDEREAL_SECOND = TimeLength.getMEAN_SOLAR_DAYS_PER_SIDEREAL_DAY() * TimeLength.getSI_SECONDS_PER_MEAN_SOLAR_SECOND_1999();
		return SI_SECONDS_PER_SIDEREAL_SECOND;
	}; 
	//------------------------------------------------------------
	//
	//	GETSI_SECONDS_PER_SIDEREAL_MINUTE
	//
	/**	Returns the number of SI seconds in one sidereal minute.
	 *
	 *	@return				The number of SI seconds in one 
	 *						sidereal minute.
	 */
	//------------------------------------------------------------
	TimeLength.getSI_SECONDS_PER_SIDEREAL_MINUTE = function() {
		var SI_SECONDS_PER_SIDEREAL_MINUTE = TimeLength.getSI_SECONDS_PER_SIDEREAL_SECOND() * TimeLength.getSECONDS_PER_MINUTE();
		return SI_SECONDS_PER_SIDEREAL_MINUTE;
	};
	//------------------------------------------------------------
	//
	//	GETSI_SECONDS_PER_SIDEREAL_HOUR
	//
	/**	Returns the number of SI seconds in one sidereal hour.
	 *
	 *	@return				The number of SI seconds in one 
	 *						sidereal hour.
	 */
	//------------------------------------------------------------
	TimeLength.getSI_SECONDS_PER_SIDEREAL_HOUR = function() {
		var SI_SECONDS_PER_SIDEREAL_HOUR = TimeLength.getSI_SECONDS_PER_SIDEREAL_SECOND() *TimeLength.getSECONDS_PER_HOUR();
		return SI_SECONDS_PER_SIDEREAL_HOUR;
	}; 
	//------------------------------------------------------------
	//
	//	GETMILLISECONDS_PER_SECOND
	//
	/**	Returns the number of milliseconds in one second.
	 *
	 *	@return				The number of milliseconds in one 
	 *						second.
	 */
	//------------------------------------------------------------
	TimeLength.getMILLISECONDS_PER_SECOND = function() {
		var MILLISECONDS_PER_SECOND = 1000.0;
		return MILLISECONDS_PER_SECOND;
	};

	//------------------------------------------------------------
	//
	//	GETSIDEREAL_SECONDS_PER_SI_SECOND
	//
	/**	Returns the number of sidereal seconds in one SI second.
	 *
	 *	@return				The number of sidereal seconds in one 
	 *						SI second.
	 */
	//------------------------------------------------------------
	TimeLength.getSIDEREAL_SECONDS_PER_SI_SECOND = function() {
		var SIDEREAL_SECONDS_PER_SI_SECOND = 1.0 / TimeLength.getSI_SECONDS_PER_SIDEREAL_SECOND();
		return SIDEREAL_SECONDS_PER_SI_SECOND;
	}; 

	//------------------------------------------------------------
	//
	//	GETSI_SECONDS_PER_CALENDAR_DAY
	//
	/**	Returns the number of SI seconds in one calendar day.
	 *
	 *	@return				The number of SI seconds in one 
	 *						calendar day.
	 */
	//------------------------------------------------------------
	TimeLength.getSI_SECONDS_PER_CALENDAR_DAY = function() {
		var SI_SECONDS_PER_CALENDAR_DAY = TimeLength.getSECONDS_PER_DAY();
		return SI_SECONDS_PER_CALENDAR_DAY;
	}; 
		//------------------------------------------------------------
	//
	//	GETCALENDAR_DAYS_PER_SI_SECOND
	//
	/**	Returns the number of calendar days in one SI second.
	 *
	 *	@return				The number of calendar days in one 
	 *						SI second.
	 */
	//------------------------------------------------------------
	TimeLength.getCALENDAR_DAYS_PER_SI_SECOND = function() {
		var CALENDAR_DAYS_PER_SI_SECOND = 1.0 / TimeLength.getSI_SECONDS_PER_CALENDAR_DAY();
		return CALENDAR_DAYS_PER_SI_SECOND;
	}; 
	//------------------------------------------------------------
	//
	//	GETMEAN_SOLAR_DAYS_PER_SI_SECOND_1999
	//
	/**	Returns the number of mean solar days in one SI second
	 *	in 1999.
	 *
	 *	@return				The number of mean solar days in one 
	 *						SI second in 1999.
	 */
	//------------------------------------------------------------
	TimeLength.getMEAN_SOLAR_DAYS_PER_SI_SECOND_1999 = function() {
		var MEAN_SOLAR_DAYS_PER_SI_SECOND_1999 = 1.0 / TimeLength.getSI_SECONDS_PER_MEAN_SOLAR_DAY_1999();
		return MEAN_SOLAR_DAYS_PER_SI_SECOND_1999;
	};
	//------------------------------------------------------------
	//
	//	GETSI_SECONDS_PER_SIDEREAL_DAY
	//
	/**	Returns the number of SI seconds in one sidereal day.
	 *
	 *	@return				The number of SI seconds in one 
	 *						sidereal day.
	 */
	//------------------------------------------------------------
	TimeLength.getSI_SECONDS_PER_SIDEREAL_DAY = function() {
		var SI_SECONDS_PER_SIDEREAL_DAY = TimeLength.getSECONDS_PER_DAY() * TimeLength.getSI_SECONDS_PER_SIDEREAL_SECOND();
		return SI_SECONDS_PER_SIDEREAL_DAY;
	}; 

	//------------------------------------------------------------
	//
	//	GETSIDEREAL_DAYS_PER_SI_SECOND
	//
	/**	Returns the number of sidereal days in one SI second.
	 *
	 *	@return				The number of sidereal days in one 
	 *						SI second.
	 */
	//------------------------------------------------------------
	TimeLength.getSIDEREAL_DAYS_PER_SI_SECOND = function() {
		var SIDEREAL_DAYS_PER_SI_SECOND = 1.0 / TimeLength.getSI_SECONDS_PER_SIDEREAL_DAY();
		return SIDEREAL_DAYS_PER_SI_SECOND;
	}; 

	//------------------------------------------------------------
	//
	//	GETSI_SECONDS_PER_JULIAN_CENTURY
	//
	/**	Returns the number of SI seconds in one Julian century.
	 *
	 *	@return				The number of SI seconds in one 
	 *						Julian century.
	 */
	//------------------------------------------------------------
	TimeLength.getSI_SECONDS_PER_JULIAN_CENTURY = function() {
		var SI_SECONDS_PER_JULIAN_CENTURY = TimeLength.getSI_SECONDS_PER_CALENDAR_DAY() * TimeLength.getCALENDAR_DAYS_PER_JULIAN_CENTURY();
		return SI_SECONDS_PER_JULIAN_CENTURY;
	}; 
	//------------------------------------------------------------
	//
	//	GETJULIAN_CENTURIES_PER_SI_SECOND
	//
	/**	Returns the number of Julian centuries in one SI second.
	 *
	 *	@return				The number of Julian centuries in one 
	 *						SI second.
	 */
	//------------------------------------------------------------
	TimeLength.getJULIAN_CENTURIES_PER_SI_SECOND = function() {
		var JULIAN_CENTURIES_PER_SI_SECOND = 1.0 / TimeLength.getSI_SECONDS_PER_JULIAN_CENTURY();
		return JULIAN_CENTURIES_PER_SI_SECOND;
	}; 

	//------------------------------------------------------------
	//
	//	GETMICROSECONDS_PER_SECOND
	//
	/**	Returns the number of microseconds in one second.
	 *
	 *	@return				The number of microseconds in one
	 *						second.
	 */
	//------------------------------------------------------------
	TimeLength.getMICROSECONDS_PER_SECOND = function() {
		var MICROSECONDS_PER_SECOND = 1000000.0;
		return MICROSECONDS_PER_SECOND;
	}; 

	TimeLength.getDefaultUnits = function() {
		return "SI seconds"; 
	};
	TimeLength.getScalarName = function() {
		return "AngularLength";
	}; 
	//---------------------------------------------------------
	//
	//	SETINSECONDSSTATIC
	//
	/**	Static version of setInSeconds.
	 *  
	 *  @return				A set TimeLength object.
	 */
	//--------------------------------------------------------
	TimeLength.setInSecondsStatic = function (seconds){
		return new TimeLength().setInSeconds(seconds);
	}; 

	//static variables
	TimeLength.SI_SECONDS_PER_MEAN_SOLAR_DAY_1999 =
		TimeLength.getSI_SECONDS_PER_MEAN_SOLAR_DAY_1999();
	TimeLength.SECONDS_PER_MINUTE =
		TimeLength.getSECONDS_PER_MINUTE();
	TimeLength.SECONDS_PER_HOUR =
		TimeLength.getSECONDS_PER_HOUR();
	TimeLength.SI_SECONDS_PER_MEAN_SOLAR_SECOND_1999 =
		TimeLength.getSI_SECONDS_PER_MEAN_SOLAR_SECOND_1999();
	TimeLength.MEAN_SOLAR_SECONDS_PER_SI_SECOND_1999 =
		TimeLength.getMEAN_SOLAR_SECONDS_PER_SI_SECOND_1999();
	TimeLength.SECONDS_PER_MILLISECOND =
		TimeLength.getSECONDS_PER_MILLISECOND();
	TimeLength.SECONDS_PER_MICROSECOND =
		TimeLength.getSECONDS_PER_MICROSECOND();
	TimeLength.SI_SECONDS_PER_SIDEREAL_SECOND =
		TimeLength.getSI_SECONDS_PER_SIDEREAL_SECOND();
	TimeLength.SI_SECONDS_PER_SIDEREAL_MINUTE =
		TimeLength.getSI_SECONDS_PER_SIDEREAL_MINUTE();
	TimeLength.SI_SECONDS_PER_SIDEREAL_HOUR =
		TimeLength.getSI_SECONDS_PER_SIDEREAL_HOUR();
	TimeLength.MILLISECONDS_PER_SECOND =
		TimeLength.getMILLISECONDS_PER_SECOND();
	TimeLength.MICROSECONDS_PER_SECOND =
		TimeLength.getMICROSECONDS_PER_SECOND();
	TimeLength.SIDEREAL_SECONDS_PER_SI_SECOND =
		TimeLength.getSIDEREAL_SECONDS_PER_SI_SECOND();
	TimeLength.SI_SECONDS_PER_CALENDAR_DAY =
		TimeLength.getSI_SECONDS_PER_CALENDAR_DAY();
	TimeLength.CALENDAR_DAYS_PER_SI_SECOND =
		TimeLength.getCALENDAR_DAYS_PER_SI_SECOND();
	TimeLength.MEAN_SOLAR_DAYS_PER_SI_SECOND_1999 =
		TimeLength.getMEAN_SOLAR_DAYS_PER_SI_SECOND_1999();
	TimeLength.SI_SECONDS_PER_SIDEREAL_DAY =
		TimeLength.getSI_SECONDS_PER_SIDEREAL_DAY();
	TimeLength.SIDEREAL_DAYS_PER_SI_SECOND =
		TimeLength.getSIDEREAL_DAYS_PER_SI_SECOND();
	TimeLength.SI_SECONDS_PER_JULIAN_CENTURY =
		TimeLength.getSI_SECONDS_PER_JULIAN_CENTURY();
	TimeLength.JULIAN_CENTURIES_PER_SI_SECOND =
		TimeLength.getJULIAN_CENTURIES_PER_SI_SECOND();

	 return TimeLength; 
});