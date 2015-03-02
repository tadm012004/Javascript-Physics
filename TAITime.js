//
//  Developed for Naval Sea Systems Command, Code SEA61, and the FACT/OSI
//  program at the Johns Hopkins University / Applied Physics Laboratory
//
//  Copyright (c) 2007 The Johns Hopkins University / Applied Physics Laboratory
//  All rights reserved.
//
//  This material may be used, modified, or reproduced by or for the
//  U.S. Government pursuant to the license rights granted under the clauses at
//  DFARS 252.227-7013/7014.  For any other permissions, please contact the
//  FACT Program Office at JHU/APL.
//
//  Project:                 Ocean Surveillance Initiative (OSI)
//  File:                    TAITime.C
//  Classification:          UNCLASSIFIED
//  Proprietary Information: NONE
//  Release:                 Controlled by NAVSEA61, Government Program Office
//
//  Programmer:  			 R. Conn            
//  Description:             see below
//
//  Reviewed By:             Tim McGee on March 21, 2007
//  Notes:                   
//
//========================================================================
//
//	TAITIME
//
/**	This class allows the creation and interpretation of absolute
 *	times in the Atomic International Time (TAI) standard.
 *	<br><br>
 *	TAI time is continuous (no leap seconds), and was coincident
 *	with UTC (civil) time on 1 January 1958.  The unit interval of TAI
 *	time is the SI second.
 *	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================

define(["Month", "Reference", "Time", "TimeLength", "TimeStandard"], function(Month, Reference, Time, TimeLength, TimeStandard){

//--------------------------------------------------------
//
//	TAITIME
//
/**	This constructor is never used by anyone; there
 *	is no need for a TAITime object.
 */
//--------------------------------------------------------
function TAITime() { }

//--------------------------------------------------------
//
//	TIME
//
/**	Creates a time given the TAI year, TAI month, TAI
 *	day, TAI hour (24-hour clock), TAI minute, and TAI
 *	seconds.
 *
 *	@param	yearTAI		The year of the time in the TAI
 *							standard, expressed according
 *							to the Gregorian calendar. 
 *							Must be greater than or equal
 *							to 1901 A.D.
 *	@param	monthTAI	The month of the time in the TAI
 *							standard (1-12).
 *	@param	dayTAI		The day of the time in the TAI
 *							standard (must be valid
 *							for the month and year).
 *	@param	hourTAI		The hour (24-hour clock) of the
 *							time in the TAI standard
 *							(0-23).
 *	@param	minuteTAI	The minute of the time in the
 *							TAI standard (0-59).
 *	@param	secondsTAI	The seconds of the time in the
 *							TAI standard (0-59.99999...).
 *
 *	@return				The time.
 *
 *	@throws				IllegalArgumentException if the supplied 
 *							year is less than 1901 or
 *							if other supplied values
 *							are non-sensical in some
 *							way.
 */
//--------------------------------------------------------
TAITime.time = function() {
	if (arguments.length == 6) {
		//  Check time-of-day params.
		if (arguments[1] == null) {	//monthTAI
			throw "IllegalArgumentException";
		}
		if ((arguments[3] < 0) || (arguments[3] > 23)) {	//hourTAI
			throw "IllegalArgumentException";
		}
		if ((arguments[4] < 0) || (arguments[4] > 59)) {	//minuteTAI
			throw "IllegalArgumentException";
		}
		if ((arguments[5] < 0.0) || (arguments[5] >= 60.0)) { //secondsTAI
			throw "IllegalArgumentException";
		}

		var	retval = null;
		try {
			retval = TAITime.time(
				TAITime.yearToMjdnTAI(arguments[0]) + 
				TAITime.monthDayToDayOfYear(arguments[0], arguments[1],arguments[2]) - 1,
				new TimeLength().setInHMS(arguments[3], arguments[4], arguments[5])
			);
		} catch (err) {
			// TODO: Log.warning("TimeLength not set, but we did set it ???");
		}
		return retval;
	}
			

	//--------------------------------------------------------
	//
	//	TIME
	//
	/**	Creates a time given the TAI year, TAI month, TAI
	 *	day, TAI hour (12-hour clock), TAI AM/PM designator,
	 *  TAI minute, and TAI seconds.
	 *
	 *	@param	yearTAI		The year of the time in the TAI
	 *							standard, expressed according
	 *							to the Gregorian calendar. 
	 *							Must be greater than or equal
	 *							to 1901 A.D.
	 *	@param	monthTAI	The month of the time in the TAI
	 *							standard (1-12).
	 *	@param	dayTAI		The day of the time in the TAI
	 *							standard (must be valid
	 *							for the month and year).
	 *	@param	hourTAI		The hour (12-hour clock) of the
	 *							time in the TAI standard
	 *							(1-12).
	 *	@param	ampmTAI		The AM/PM designator of the time
	 *							in the TAI standard.
	 *	@param	minuteTAI	The minute of the time in the
	 *							TAI standard (0-59).
	 *	@param	secondsTAI	The seconds of the time in the
	 *							TAI standard (0-59.99999...).
	 *
	 *	@return				The time.
	 *
	 *	@throws				IllegalArgumentException if the supplied 
	 *							year is less than 1901 or
	 *							if other supplied values
	 *							are non-sensical in some
	 *							way.
	 */
	//--------------------------------------------------------
	else if (arguments.length == 7) {
		//  Modify hour to 24-hour clock.
		var	hour = (arguments[3] == 12 ? 0 : arguments[3]); // hourTAI
		if (arguments[4] == TimeStandard.AMPM.PM) {		//ampmTAI
			hour += 12;
		}

		//  Use 24-hour functionality.
		return TAITime.time(
			arguments[0],	//yearTAI
			arguments[1],	//monthTAI
			arguments[2],	//dayTAI
			hour,
			arguments[5],	//minuteTAI
			arguments[6]	//secondsTAI
		);
	}


	//--------------------------------------------------------
	//
	//	TIME
	//
	/** Creates a time given the TAI Modified Julian Day Number
	 *  and the TAI time-of-day.  
	 *
	 *	@param	modJulianDayNumberTAI	
	 *								The Modified Julian Day Number
	 *									in the TAI standard.
	 *
	 *	@param	timeOfDayTAI		The time-of-day (elapsed 
	 *									time since midnight) 
	 *									in the TAI standard.
	 *
	 *	@return					The absolute time object 
	 *								representing the specified 
	 *								time.
	 *	
	 *	@throws					NotSetException if the supplied
	 *								time of day has not been
	 *								set.
	 */
	//--------------------------------------------------------
	else if (arguments.length == 2) {

		//  Just use the TimeStandard functionality.
		return TimeStandard.time(arguments[0],
								 arguments[1]);
	}
};

//--------------------------------------------------------
//
//	GETTAIDAYANDTIME
//
/**	This method returns the TAI Modified Julian Day Number
 *  corresponding to the supplied absolute time, and the
 *	TAI time of day on that day.  
 *
 *	@param	t			The supplied absolute time.
 *
 *	@param	mjdnTAI		After return, holds a reference to
 *							the TAI Modified Julian Day Number
 *							corresponding to the
 *							supplied absolute time.
 *	@param	todTAI		After return, holds a reference to
 *							the TAI time of day corresponding
 *							to the supplied absolute time.
 * 	@throws				NotSetException if the supplied time
 * 							is not set.
 */
//--------------------------------------------------------
TAITime.getTAIDayAndTime = function(t, mjdnTAI, todTAI) {
	
	//  Just use the TimeStandard functionality.
	TimeStandard.getTAIDayAndTime(t,mjdnTAI,todTAI);
};

//--------------------------------------------------------
//
//	MJDNTAITODAYOFWEEK
//
/**	This method converts the TAI Modified Julian Day Number
 *  to the day of the week (0 = Sunday, ..., 6 = Saturday).
 *
 *	@param	mjdnTAI		The supplied TAI Modified Julian
 *							Day Number.
 *
 *	@return				The day of the week.
 */
//--------------------------------------------------------
TAITime.mjdnTAIToDayOfWeek = function(mjdnTAI) {

	//  Just use the TimeStandard functionality.
	return TimeStandard.mjdnTAIToDayOfWeek(mjdnTAI);
};

//--------------------------------------------------------
//
//	MJDNTAITOYEAR
//
/**	This method returns the year corresponding to the
 *	supplied TAI Modified Julian Day Number, and the 
 *	TAI Modified Julian Day Number corresponding to the
 *  first day of that year.
 *
 *	@param	mjdnTAI		The supplied TAI Modified Julian	
 *							Day Number.  Must be greater than
 *							or equal to 15385 
 *							(1 January 1901, A.D.)
 *
 *	@param	year		After return, the year corresponding
 *							to the TAI Modified Julian
 *							Day Number.  The Year is returned
 *							according to the Gregorian 
 *							calendar.
 *	@param	startOfYear	After return, the TAI Modified Julian 
 *							Day Number corresponding to the 
 *							first day of the returned year.
 *
 *	@throws				IllegalArgumentException if the
 *							supplied MJDN is less than
 *							15385.
 */
//--------------------------------------------------------
TAITime.mjdnTAIToYear = function(mjdnTAI, year, startOfYear) {

	//  Use the TimeStandard functionality
	TimeStandard.mjdnTAIToYear(mjdnTAI,year,startOfYear);
};

//--------------------------------------------------------
//
//	YEARTOMJDNTAI
//
/**	This method returns the TAI Modified Julian Day Number
 *  corresponding to the first day of the supplied year.
 *
 *	@param	year		The supplied year, Gregorian 
 *							calendar.  Must be greater than
 *							or equal to 1901 A.D.
 *
 *	@return				The TAI Modified Julian Day Number
 *							of the first day of the supplied
 *							year.
 *
 *	@throws				IllegalArgumentException if the supplied
 *							year is less than 1901.
 */
//--------------------------------------------------------
TAITime.yearToMjdnTAI = function(year) {

	//  Use the TimeStandard functionality.
	return TimeStandard.yearToMjdnTAI(year);
};

//--------------------------------------------------------
//
//	DAYOFYEARTOMONTHDAY
//
/**	This method converts the day of the year (sometimes
 *  erroneously referred to as the Julian day; don't make
 *  that mistake with this package) to a month and day, 
 *  given the year in question.
 *
 *	@param	doy		The supplied day of the year.
 *	@param	year	The supplied year, Gregorian calendar.
 *						Must be greater than or equal to 
 *						1901 A.D.
 *	@param	month	After return, the month of the year
 *						corresponding to the supplied
 *						day of the year.
 *	@param	day		After return, the day of the month
 *						corresponding to the supplied day
 *						of the year.
 *
 *	@throws			IllegalArgumentException if the supplied day
 *						of the year is not valid, i.e.,
 *						between 1 and 365 for most years, and
 *						between 1 and 366 for leap years, or
 *						if the year is less than 1901.
 */
//--------------------------------------------------------
TAITime.dayOfYearToMonthDay = function(doy, year, month, day) {

	//  Use the TimeStandard functionality.
	TimeStandard.dayOfYearToMonthDay(doy,year,month,day);
};

//--------------------------------------------------------
//
//	MONTHDAYTODAYOFYEAR
//
/**	This method converts the month and day of the 
 *  supplied year to a day of the year (sometimes
 *  erroneously referred to as the Julian day; don't
 *	make that mistake with this package).
 *
 *	@param	year	The supplied year, Gregorian calendar.
 *						Must be greater than or equal to 
 *						1901 A.D.
 *	@param	month	The supplied month.
 *	@param	day		The supplied day of the month.
 *
 *	@return			The day of the year corresponding
 *						to the supplied data.
 *
 *	@throws			IllegalArgumentException if the supplied month
 *						and day are not valid for the supplied
 *						year, or if the year is less than
 *						1901.
 */
//--------------------------------------------------------
TAITime.monthDayToDayOfYear = function(year, month, day) {

	//  Use the TimeStandard functionality.
	return TimeStandard.monthDayToDayOfYear(year,month,day);
};
	return TAITime;
});
