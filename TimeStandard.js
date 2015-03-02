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
//  File:                    TimeStandard.C
//  Classification:          UNCLASSIFIED
//  Proprietary Information: NONE
//  Release:                 Controlled by NAVSEA61, Government Program Office
//
//  Programmer: 			 R. Conn             
//  Description:             see below
//
//  Reviewed By:             Tim McGee on March 21, 2007
//  Notes:                   
//
//========================================================================
//
//	TIMESTANDARD
//
/**	This class provides a portal to the time standard support functionality
 *	provided by the Time class.  The presence of this class allows Time
 *	to have a single friend (this class), instead of multiple friends
 *	(all of the TimeStandard sub-classes).
 * 	<br><br>
 *	The Julian Day Number is a count of days elapsed since Greenwich mean
 *	noon on 1 January 4713 B.C., Julian proleptic calendar.  The Julian
 *	Date is the Julian Day Number followed by the fraction of the
 *	day elapsed since the preceding noon.
 *	<br><br>
 *	Since modern civil time tends to consider the day to start with
 *	midnight, and since 4713 B.C. was a long time ago no matter whose
 *  calendar you're using, it is somewhat more convenient to define
 *	the Modified Julian Date, which is MJD = JD - 2400000.5.  This means
 *	that we can define the Modified Julian Day Number as the integral
 *	part of the Modified Julian Date.
 *	<br><br>
 *	By way of example, the MJDN of 1 January 1972 was 41317.  The MJDN
 *	of 1 January 1999 was 51179, the MJDN of 1 January 2000 was 51544,
 *	and the MJDN of 1 January 2001 will be 51910.
 *	<br><br>
 *	Since the length of a day is constantly changing (albiet slowly),
 *	and history is full of strange behavior (1900 was not a leap year;
 *	September of 1752 was shortened by 11 days to make up for unadjusted
 *	leap days; etc.), the conversions from MJDN to absolute time applied 
 *	by this package are to be considered valid for 1901 A.D. forward
 *  only (Gregorian calendar).
 *	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================

define(["Month","Reference", "Time", "TimeLength"], function(Month, Reference, Time, TimeLength) {

//--------------------------------------------------------
//
//	TIMESTANDARD
//
/**	Pass-through constructor for sub-classes.
 */
//--------------------------------------------------------
function TimeStandard() {}

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
TimeStandard.time = function(modJulianDayNumberTAI, timeOfDayTAI) {
	return new Time(parseFloat(modJulianDayNumberTAI) - TimeStandard.getORIGIN_MODIFIED_JULIAN_DAY_NUMBER_TAI() *
					parseFloat(TimeStandard.getSECONDS_PER_DAY()),
			 	timeOfDayTAI.getInSeconds());
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
 *
 *  @throws				NotSetException if the supplied Time
 *  					is not set.
 */
//--------------------------------------------------------
TimeStandard.getTAIDayAndTime = function(t, mjdnTAI, todTAI) {

	var	secs = t.getSeconds();
	var	mjd = parseInt(secs/TimeStandard.getSECONDS_PER_DAY());
	secs -= parseFloat(mjd * TimeStandard.getSECONDS_PER_DAY());

	if (secs < 0) {
		mjd -= 1;
		secs += parseFloat(TimeStandard.getSECONDS_PER_DAY());
	}

	mjdnTAI.set(new Integer(mjd + TimeStandard.getORIGIN_MODIFIED_JULIAN_DAY_NUMBER_TAI()));

	todTAI.setInSeconds(secs + t.getFractions());
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
TimeStandard.mjdnTAIToDayOfWeek = function(mjdnTAI) {
	//  The 7 is the number of days in a week.  The 3
	//  is the offset required to start the week on Sunday
	//  (MJD % 7 yields 0 = Wed, 1 = Thurs, etc.)
	return ((mjdnTAI + 3) % TimeStandard.getDAYS_PER_WEEK());
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
 *							15385 (1 January 1901, A.D.)
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
TimeStandard.mjdnTAIToYear = function(mjdnTAI, year, startOfYear) {
	//  Check the input parameter.
	if (mjdnTAI < TimeStandard.getMJDN_1_JANUARY_1901()) {
		throw "IllegalArgumentException";
	}

	//  Reference the year to 1901 A.D.  15385 is the MDJN
	//  of 1 January 1901.
	var	tmpYear = 1901;
	var offset = mjdnTAI - TimeStandard.getMJDN_1_JANUARY_1901();

	//  There are 365*4+1 = 1461 days in every 4-year period.
	var		fourYearPeriods = offset/TimeStandard.getDAYS_PER_FOUR_YEARS();
	offset -= fourYearPeriods * TimeStandard.getDAYS_PER_FOUR_YEARS();
	tmpYear += fourYearPeriods * 4;

	//  Explicitly handle the last 0-3 years offset.
	if (offset <= (TimeStandard.getDAYS_PER_NON_LEAP_YEAR()*1-1)) {
		// Do nothing, we're already in the correct year.
	} else if (offset <= (TimeStandard.getDAYS_PER_NON_LEAP_YEAR()*2-1)) {
		offset -= TimeStandard.getDAYS_PER_NON_LEAP_YEAR()*1;
		tmpYear += 1;
	} else if (offset <= (TimeStandard.getDAYS_PER_NON_LEAP_YEAR()*3-1)) {
		offset -= TimeStandard.getDAYS_PER_NON_LEAP_YEAR()*2;
		tmpYear += 2;
	} else {
		//  Years that fall into this case are leap years,
		//  but that makes no difference to our calculations.
		offset -= TimeStandard.getDAYS_PER_NON_LEAP_YEAR()*3;
		tmpYear += 3;
	}

	//  Calculate the MJDN of the start of the returned year.
	// 	1 January is day 1, etc.
	year.set(parseInt(tmpYear));
	startOfYear.set(parseInt( mjdnTAI - offset));
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
 *	@throws				IllegalArgumentException if the
 *							supplied year is less than 
 *							1901.
 */
//--------------------------------------------------------
TimeStandard.yearToMjdnTAI = function(year) {

	//  Check the input parameter.
	if (year < 1901) {
		throw "IllegalArgumentException";
	}

	//  Reference return value to 1901.
	var		tmpYear = year - 1901;
	var		mjdnTAI = TimeStandard.getMJDN_1_JANUARY_1901();

	//  Add in the four-year blocks.
	var		fourYearPeriods = tmpYear / 4;
	tmpYear -= fourYearPeriods * 4;
	mjdnTAI += fourYearPeriods * TimeStandard.getDAYS_PER_FOUR_YEARS();

	//  Handle remaining cases.
	if (tmpYear == 0) {
		// we're done.
	} else if (tmpYear == 1) {
		mjdnTAI += TimeStandard.getDAYS_PER_NON_LEAP_YEAR()*1;
	} else if (tmpYear == 2) {
		mjdnTAI += TimeStandard.getDAYS_PER_NON_LEAP_YEAR()*2;
	} else if (tmpYear == 3) {
		mjdnTAI += TimeStandard.getDAYS_PER_NON_LEAP_YEAR()*3;
	}

	//  Return the MJDN of the first day of the year.
	return mjdnTAI;
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
 *	@param	month	After return, the month in which the 
 *						supplied day of the year falls.
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
TimeStandard.dayOfYearToMonthDay = function(doy, year, month, day) {

	//  Determine whether we have a leap year.   Not strictly
	//  correct, but it works from 1901 to 2099.
	var	leap = ((year % 4) == 0);

	//  Check input parameters.
	if (year < 1901) {
		throw "IllegalArgumentException";
	}

	if ((doy > TimeStandard.getDAYS_PER_NON_LEAP_YEAR()) && (!leap)) {
		throw "IllegalArgumentException";
	} else if ((doy > (TimeStandard.getDAYS_PER_NON_LEAP_YEAR() + 1)) && 
			   (leap)) {
		throw "IllegalArgumentException";
	}

	//  Make a copy of the day of the year.
	var		myDOY = doy;

	//  Determine month and day.
	if (myDOY <= TimeStandard.getLAST_DAY_OF_JANUARY()) {
		month.set(Month.January);
		day.set(parseInt(myDOY));
	} else if (((!leap) && 
				(myDOY <= TimeStandard.getLAST_DAY_OF_NON_LEAP_FEBRUARY())) ||
			   ((leap) && 
				(myDOY <= (TimeStandard.getLAST_DAY_OF_NON_LEAP_FEBRUARY()+1)))) {
		month.set(Month.February);
		day.set(parseInt(myDOY - TimeStandard.getLAST_DAY_OF_JANUARY()));
	} else {
		//  Adjust day for leap year if necessary.
		if (leap) {
			myDOY -= 1;
		}
		if (myDOY <= TimeStandard.getLAST_DAY_OF_NON_LEAP_MARCH()) {
			month.set(Month.March);
			day.set(parseInt(myDOY - TimeStandard.getLAST_DAY_OF_NON_LEAP_FEBRUARY()));
		} else if (myDOY <= TimeStandard.getLAST_DAY_OF_NON_LEAP_APRIL()) {
			month.set(Month.April);
			day.set(parseInt(myDOY - TimeStandard.getLAST_DAY_OF_NON_LEAP_MARCH()));
		} else if (myDOY <= TimeStandard.getLAST_DAY_OF_NON_LEAP_MAY()) {
			month.set(Month.May);
			day.set(parseInt(myDOY - TimeStandard.getLAST_DAY_OF_NON_LEAP_APRIL()));
		} else if (myDOY <= TimeStandard.getLAST_DAY_OF_NON_LEAP_JUNE()) {
			month.set(Month.June);
			day.set(parseInt(myDOY - TimeStandard.getAST_DAY_OF_NON_LEAP_MAY()));
		} else if (myDOY <= TimeStandard.getLAST_DAY_OF_NON_LEAP_JULY()) {
			month.set(Month.July);
			day.set(parseInt(myDOY - TimeStandard.getLAST_DAY_OF_NON_LEAP_JUNE()));
		} else if (myDOY <= TimeStandard.getLAST_DAY_OF_NON_LEAP_AUGUST()) {
			month.set(Month.August);
			day.set(parseInt(myDOY - TimeStandard.getLAST_DAY_OF_NON_LEAP_JULY()));
		} else if (myDOY <= TimeStandard.getLAST_DAY_OF_NON_LEAP_SEPTEMBER()){
			month.set(Month.September);
			day.set(parseInt(myDOY - TimeStandard.getLAST_DAY_OF_NON_LEAP_AUGUST()));
		} else if (myDOY <= TimeStandard.getLAST_DAY_OF_NON_LEAP_OCTOBER()) {
			month.set(Month.October);
			day.set(parseInt(myDOY - TimeStandard.getLAST_DAY_OF_NON_LEAP_SEPTEMBER()));
		} else if (myDOY <= TimeStandard.getLAST_DAY_OF_NON_LEAP_NOVEMBER()) {
			month.set(Month.November);
			day.set(parseInt(myDOY - TimeStandard.getLAST_DAY_OF_NON_LEAP_OCTOBER()));
		} else {
			month.set(Month.December);
			day.set(parseInt(myDOY - TimeStandard.getLAST_DAY_OF_NON_LEAP_NOVEMBER()));
		}
	}
};

//--------------------------------------------------------
//
//	MONTHDAYTODAYOFYEAR
//
/**	This method converts the month and day of the 
 *  supplied year to a day of the year (sometimes
 *  erroneously referred to as the Julian day; don't
 *  make that mistake with this package).
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
TimeStandard.monthDayToDayOfYear = function(year, month, day) {

	//  Determine whether we have a leap year.
	var	leap = ((year % 4) == 0);

	//  Check input parameters.
	if (month == null) {
		throw "IllegalArgumentException";
	}
	if (year < 1901) {
		throw "IllegalArgumentException";
	}
	if ((day < 1) || (day > 31)) {
		throw "IllegalArgumentException";
	}

	//  Make a temporary return value.
	var		retval = 0;

	//  Determine the day of the year.
	if (month == Month.January) {
		retval = day;
	} else if (month == Month.February) {
		if (((!leap) && (day > 28)) || 
			((leap) && (day > 29))) {			
			throw  "IllegalArgumentException";
		}
		retval = TimeStandard.getLAST_DAY_OF_JANUARY() + day;
	} else if (month == Month.March) {
		retval = TimeStandard.getLAST_DAY_OF_NON_LEAP_FEBRUARY() + day;
	} else if (month == Month.April) {
		if (day > 30) {
			throw "IllegalArgumentException";				
		}
		retval = TimeStandard.getLAST_DAY_OF_NON_LEAP_MARCH() + day;
	} else if (month == Month.May) {
		retval = TimeStandard.getLAST_DAY_OF_NON_LEAP_APRIL() + day;
	} else if (month == Month.June) {
		if (day > 30) {
			throw "IllegalArgumentException";				
		}
		retval = TimeStandard.getLAST_DAY_OF_NON_LEAP_MAY() + day;
	} else if (month == Month.July) {
		retval = TimeStandard.getLAST_DAY_OF_NON_LEAP_JUNE() + day;
	} else if (month == Month.August) {
		retval = TimeStandard.getLAST_DAY_OF_NON_LEAP_JULY() + day;
	} else if (month == Month.September) {
		if (day > 30) {
			throw "IllegalArgumentException";
		}
		retval = TimeStandard.getLAST_DAY_OF_NON_LEAP_AUGUST() + day;
	} else if (month == Month.October) {
		retval = TimeStandard.getLAST_DAY_OF_NON_LEAP_SEPTEMBER() + day;
	} else if (month == Month.November) {
		if (day > 30) {
			throw "IllegalArgumentException";
		}
		retval = TimeStandard.getLAST_DAY_OF_NON_LEAP_OCTOBER() + day;
	} else if (month == Month.December) {
		retval = TimeStandard.getLAST_DAY_OF_NON_LEAP_NOVEMBER() + day;
	} else {
			throw "IllegalArgumentException";
	}

	//  Adjust for leap year, if necessary.
	if ((leap) && (month.opGreat(Month.February))) {
		retval += 1;
	}

	//  Return the doy
	return retval;
};

//------------------------------------------------------------
//
//	GETMJDN_1_JANUARY_1901
//
/**	Returns the Modified Julian Day Number of 1 January 1901.
 *
 *	@return				The Modified Julian Day Number of
 *						1 January 1901.
 */
//------------------------------------------------------------
TimeStandard.getMJDN_1_JANUARY_1901 = function() {
	var MJDN_1_JANUARY_1901 = 15385;
	return MJDN_1_JANUARY_1901;
};

//------------------------------------------------------------
//
//	GETDAYS_PER_FOUR_YEARS
//
/**	Returns the number of calendar days in four years.
 *
 *	@return				The number of calendar days in 
 *						four years.
 */
//------------------------------------------------------------
TimeStandard.getDAYS_PER_FOUR_YEARS = function() {
	var DAYS_PER_FOUR_YEARS = 
		4 * TimeStandard.getDAYS_PER_NON_LEAP_YEAR() + 1;
	return DAYS_PER_FOUR_YEARS;
};

//------------------------------------------------------------
//
//	GETDAYS_PER_NON_LEAP_YEAR
//
/**	Returns the number of calendar days in a non-leap year.
 *
 *	@return				The number of calendar days in 
 *						a non-leap year.
 */
//------------------------------------------------------------
TimeStandard.getDAYS_PER_NON_LEAP_YEAR = function() {
	var DAYS_PER_NON_LEAP_YEAR = 
		TimeStandard.getLAST_DAY_OF_NON_LEAP_DECEMBER();
	return DAYS_PER_NON_LEAP_YEAR;
};

//------------------------------------------------------------
//
//	GETDAYS_PER_WEEK
//
/**	Returns the number of calendar days in a week.
 *
 *	@return				The number of calendar days in 
 *						a week.
 */
//------------------------------------------------------------
TimeStandard.getDAYS_PER_WEEK = function() {
	var DAYS_PER_WEEK = 7;
	return DAYS_PER_WEEK;
};

//------------------------------------------------------------
//
//	GETLAST_DAY_OF_JANUARY
//
/**	Returns the day-of-the-year of the last day of January.
 *
 *	@return				The day-of-the-year of the last
 *						day of January.
 */
//------------------------------------------------------------
TimeStandard.getLAST_DAY_OF_JANUARY = function() {
	var LAST_DAY_OF_JANUARY = 31;
	return LAST_DAY_OF_JANUARY;
};

//------------------------------------------------------------
//
//	GETLAST_DAY_OF_NON_LEAP_FEBRUARY
//
/**	Returns the day-of-the-year of the last day of February
 *	in a non-leap year.
 *
 *	@return				The day-of-the-year of the last
 *						day of February in a non-leap year.
 */
//------------------------------------------------------------
TimeStandard.getLAST_DAY_OF_NON_LEAP_FEBRUARY = function() {
	var LAST_DAY_OF_NON_LEAP_FEBRUARY = 
		TimeStandard.getLAST_DAY_OF_JANUARY() + 28;
	return LAST_DAY_OF_NON_LEAP_FEBRUARY;
};

//------------------------------------------------------------
//
//	GETLAST_DAY_OF_NON_LEAP_MARCH
//
/**	Returns the day-of-the-year of the last day of March
 *	in a non-leap year.
 *
 *	@return				The day-of-the-year of the last
 *						day of March in a non-leap year.
 */
//------------------------------------------------------------
TimeStandard.getLAST_DAY_OF_NON_LEAP_MARCH = function() {
	var LAST_DAY_OF_NON_LEAP_MARCH = 
		TimeStandard.getLAST_DAY_OF_NON_LEAP_FEBRUARY() + 31;
	return LAST_DAY_OF_NON_LEAP_MARCH;
};

//------------------------------------------------------------
//
//	GETLAST_DAY_OF_NON_LEAP_APRIL
//
/**	Returns the day-of-the-year of the last day of April
 *	in a non-leap year.
 *
 *	@return				The day-of-the-year of the last
 *						day of April in a non-leap year.
 */
//------------------------------------------------------------
TimeStandard.getLAST_DAY_OF_NON_LEAP_APRIL = function() {
	var LAST_DAY_OF_NON_LEAP_APRIL = 
		TimeStandard.getLAST_DAY_OF_NON_LEAP_MARCH() + 30;
	return LAST_DAY_OF_NON_LEAP_APRIL;
};

//------------------------------------------------------------
//
//	GETLAST_DAY_OF_NON_LEAP_MAY
//
/**	Returns the day-of-the-year of the last day of May
 *	in a non-leap year.
 *
 *	@return				The day-of-the-year of the last
 *						day of May in a non-leap year.
 */
//------------------------------------------------------------
TimeStandard.getLAST_DAY_OF_NON_LEAP_MAY = function() {
	var LAST_DAY_OF_NON_LEAP_MAY = 
		TimeStandard.getLAST_DAY_OF_NON_LEAP_APRIL() + 31;
	return LAST_DAY_OF_NON_LEAP_MAY;
};

//------------------------------------------------------------
//
//	GETLAST_DAY_OF_NON_LEAP_JUNE
//
/**	Returns the day-of-the-year of the last day of June
 *	in a non-leap year.
 *
 *	@return				The day-of-the-year of the last
 *						day of June in a non-leap year.
 */
//------------------------------------------------------------
TimeStandard.getLAST_DAY_OF_NON_LEAP_JUNE = function() {
	var LAST_DAY_OF_NON_LEAP_JUNE = 
		TimeStandard.getLAST_DAY_OF_NON_LEAP_MAY() + 30;
	return LAST_DAY_OF_NON_LEAP_JUNE;
};

//------------------------------------------------------------
//
//	GETLAST_DAY_OF_NON_LEAP_JULY
//
/**	Returns the day-of-the-year of the last day of July
 *	in a non-leap year.
 *
 *	@return				The day-of-the-year of the last
 *						day of July in a non-leap year.
 */
//------------------------------------------------------------
TimeStandard.getLAST_DAY_OF_NON_LEAP_JULY = function() {
	var LAST_DAY_OF_NON_LEAP_JULY = 
		TimeStandard.getLAST_DAY_OF_NON_LEAP_JUNE() + 31;
	return LAST_DAY_OF_NON_LEAP_JULY;
};

//------------------------------------------------------------
//
//	GETLAST_DAY_OF_NON_LEAP_AUGUST
//
/**	Returns the day-of-the-year of the last day of August
 *	in a non-leap year.
 *
 *	@return				The day-of-the-year of the last
 *						day of August in a non-leap year.
 */
//------------------------------------------------------------
TimeStandard.getLAST_DAY_OF_NON_LEAP_AUGUST = function() {
	var LAST_DAY_OF_NON_LEAP_AUGUST = 
		TimeStandard.getLAST_DAY_OF_NON_LEAP_JULY() + 31;
	return LAST_DAY_OF_NON_LEAP_AUGUST;
};

//------------------------------------------------------------
//
//	GETLAST_DAY_OF_NON_LEAP_SEPTEMBER
//
/**	Returns the day-of-the-year of the last day of September
 *	in a non-leap year.
 *
 *	@return				The day-of-the-year of the last
 *						day of September in a non-leap year.
 */
//------------------------------------------------------------
TimeStandard.getLAST_DAY_OF_NON_LEAP_SEPTEMBER = function() {
	var LAST_DAY_OF_NON_LEAP_SEPTEMBER = 
		TimeStandard.getLAST_DAY_OF_NON_LEAP_AUGUST() + 30;
	return LAST_DAY_OF_NON_LEAP_SEPTEMBER;
};

//------------------------------------------------------------
//
//	GETLAST_DAY_OF_NON_LEAP_OCTOBER
//
/**	Returns the day-of-the-year of the last day of October
 *	in a non-leap year.
 *
 *	@return				The day-of-the-year of the last
 *						day of October in a non-leap year.
 */
//------------------------------------------------------------
TimeStandard.getLAST_DAY_OF_NON_LEAP_OCTOBER = function() {
	var LAST_DAY_OF_NON_LEAP_OCTOBER = 
		TimeStandard.getLAST_DAY_OF_NON_LEAP_SEPTEMBER() + 31;
	return LAST_DAY_OF_NON_LEAP_OCTOBER;
};

//------------------------------------------------------------
//
//	GETLAST_DAY_OF_NON_LEAP_NOVEMBER
//
/**	Returns the day-of-the-year of the last day of November
 *	in a non-leap year.
 *
 *	@return				The day-of-the-year of the last
 *						day of November in a non-leap year.
 */
//------------------------------------------------------------
TimeStandard.getLAST_DAY_OF_NON_LEAP_NOVEMBER = function() {
	var LAST_DAY_OF_NON_LEAP_NOVEMBER = 
		TimeStandard.getLAST_DAY_OF_NON_LEAP_OCTOBER() + 30;
	return LAST_DAY_OF_NON_LEAP_NOVEMBER;
};

//------------------------------------------------------------
//
//	GETLAST_DAY_OF_NON_LEAP_DECEMBER
//
/**	Returns the day-of-the-year of the last day of December
 *	in a non-leap year.
 *
 *	@return				The day-of-the-year of the last
 *						day of December in a non-leap year.
 */
//------------------------------------------------------------
TimeStandard.getLAST_DAY_OF_NON_LEAP_DECEMBER = function() {
	var LAST_DAY_OF_NON_LEAP_DECEMBER = 
		TimeStandard.getLAST_DAY_OF_NON_LEAP_NOVEMBER() + 31;
	return LAST_DAY_OF_NON_LEAP_DECEMBER;
};

    return TimeStandard;
});
