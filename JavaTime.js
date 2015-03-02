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
//  File:                    UnixTime.C
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
//	JAVATIME
//
/**	This class allows the creation and interpretation of absolute
 *	times in the Java time standard.  Java time is a way
 *	of numerically describing time on Java-based systems.
 *	<br><br>
 *	Java time states that it is the "difference, measured in 
 *	milliseconds, between the current time and midnight,
 *	January 1, 1970 UTC".
 *	<br><br>
 *	Difficulty with this definition start immediately.  UTC was 
 *	delayed by a leap second on 1 January 1970; it is therefore 
 *	not clear _which_ 00:00:00 UTC January 1, 1970 is meant for the 
 *	reference.
 *	<br><br>
 *	Further, Java is ignorant of leap seconds, and so presumably
 *	the Java time does not include any UTC delays subsequent to
 *	1970.  However, almost no (none of our) Java systems have
 *	been in continuous operation since 1 January 1970.  In practice,
 *	a new Java system is purchased, and the current UTC time is 
 *	used to set the clock.  If one is exceptionally fortunate,
 *	the system time is adjusted by a time server to maintain
 *	correspondence with UTC time.  Since the system is ignorant of leap
 *	seconds, this process drops a number of leap seconds equal to
 *	the number inserted into UTC between 1970 and the time at which
 *	the clock was last set.  
 *	<br><br>
 *	The end effect seems to be that the Java time should be converted
 *	to years, months, days, hours, minutes, and seconds ignoring
 *	leap seconds, and then the years, months, days, hours, minutes
 *	and seconds should be re-interpreted directly as UTC.
 *	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================

//extends TimeStandard
//  Cache these values for efficiency.
/*
var MJDN_UTC_1_JAN_1970 = JavaTime.getMJDN_UTC_1_JAN_1970();
var MILLISECONDS_PER_SECOND = TimeLength.getMILLISECONDS_PER_SECOND();
var SECONDS_PER_DAY = TimeLength.getSECONDS_PER_DAY();
*/

define(["Reference", "Time", "TimeLength", "UTCTime"], function(Reference, Time, TimeLength,UTCTime) {


//--------------------------------------------------------
//
//	TIME
//
/**	Creates a time given a Java long, which represents
 *	milliseconds since 00:00:00 UTC January 1, 1970.
 *	
 *	@param		tt		The Java time for which to create
 *							a Time.
 *
 *	@throws				IllegalArgumentException if the 
 *							supplied time is less than 0.
 */
//--------------------------------------------------------
JavaTime.time = function(tt) {
	if (typeof tt == "number") {
	// Sanity check.
		if (tt < 0) {
			throw "IllegalArgumentException";
		}

		// Convert to whole seconds and fractions.
		var	secs = (tt / TimeLength.getMILLISECONDS_PER_SECOND());
		var	fracs = (tt - secs * TimeLength.getMILLISECONDS_PER_SECOND()) / TimeLength.getMILLISECONDS_PER_SECOND();

		// Convert to day and time-of-day, ignoring
		// leap seconds.
		var mjdn = JavaTime.getMJDN_UTC_1_JAN_1970() + parseInt((secs - (secs % parseFloat(TimeLength.getSECONDS_PER_DAY()))) / TimeLength.getSECONDS_PER_DAY());
		var timeOfDay = new TimeLength().setInSeconds(parseFloat(secs % parseFloat(TimeLength.getSECONDS_PER_DAY())) + fracs)

		// Interpret as UTC day and time.
		var retval = null;
		try {
			retval = UTCTime.time(mjdn,timeOfDay);
		} catch (err) {
			// TODO: Log.severe(nse.toString() + " - should not happen");
		}
		if (retval == null) {	
			console.log(retval);
			console.log(Time.dummy());
			retval = Time.dummy();
			console.log(retval);
		}
		return retval;

	//--------------------------------------------------------
	//
	//	TIME
	//
	/**	Creates a time given a Java Date, which represents
	 *	milliseconds since 00:00:00 UTC January 1, 1970.
	 *	
	 *	@param		dt		The Java Date for which to create
	 *							a Time.
	 *
	 *	@throws				IllegalArgumentException if the 
	 *							supplied Date precedes Jan 1, 1970.
	 */
	//--------------------------------------------------------
	} else if (typeof tt == "object") {
		//  Convert to a millisecond counter.

		return JavaTime.time(tt.getTime());
		
//		//  Sanity check.
//		if (tt < 0) {
//			throw new IllegalArgumentException(JavaTime.class.getName() +
//				".time(" + dt + ") -- value prior to Jan 1 1970 not allowed");
//		}
//
//		//  Convert to whole seconds and fractions.
//		long	secs = (long)(tt / JavaTime.MILLISECONDS_PER_SECOND);
//		double	fracs = (tt - secs) / JavaTime.MILLISECONDS_PER_SECOND;
//
//		//  Convert to days and time-of-day, ignoring
//		//  leap seconds.
//		int			mjdn = JavaTime.MJDN_UTC_1_JAN_1970 + 
//			(int)( (secs - (secs % (long)JavaTime.SECONDS_PER_DAY)) / 
//				  JavaTime.SECONDS_PER_DAY );
//		TimeLength	timeOfDay = new TimeLength().setInSeconds(
//			(double)(secs % (long)JavaTime.SECONDS_PER_DAY) + 
//			fracs);
//
//		//  Interpret as UTC day and time.
//		Time	retval = null;
//		try {
//			retval = UTCTime.time(mjdn,timeOfDay);
//		} catch (NotSetException nse) {
//			Log.severe(nse.toString() + " - should not happen");
//		}
//		if (retval == null) {
//			retval = new Time().dummy();
//		}
//		return retval;
	}
};

//--------------------------------------------------------
//
//	GETJAVATIME
//
/**	This method returns the Java long number of milliseconds
 *  corresponding to the supplied absolute Time.
 *
 *	@param	t			The supplied absolute time.
 *
 *	@return				The Java long number of milliseconds
 *							corresponding to the supplied absolute Time.
 *
 *	@throws				IllegalArgumentException if the 
 *							resulting time would be less
 *							than 0 (i.e., if the supplied
 *							time is prior to 00:00:00 UTC
 *							January 1, 1970).
 *
 *	@throws				NotSetException if the supplied
 *							time is not set.
 */
//--------------------------------------------------------
JavaTime.getJavaTime = function(t) {
	// Get UTC MJDN and time of day..
	//Reference<Integer>	mjdn = new Reference<Integer>(new Integer(0));
	var mjdn = new Reference(0);
	var tod = new TimeLength();
	UTCTime.getUTCDayAndTime(t, mjdn, tod);

	// Convert day part to seconds and check for sanity..
	var dnSecs = parseFloat(mjdn - JavaTime.getMJDN_UTC_1_JAN_1970()) * 
		parseFloat(JavaTime.getSECOND_PER_DAY());
	if (dnSecs < 0) {
		throw "IllegalArgumentException";
	}

	// Break time of day into seconds and fractions.
	var fracs = tod.getInSeconds();
	var todSecs = parseInt(fracs);
	fracs -= todSecs;

	var retval = parseFloat((dnSecs + todSecs) * TimeLength.getMILLISECONDS_PER_SECOND());
	retval += parseFloat(fracs * JavaTime.getMILISECONDS_PER_SECOND());
	return retval;
};

//--------------------------------------------------------
//
//	GETJAVADATE
//
/**	This method returns a Java Date corresponding
 *	to the supplied absolute Time.
 *
 *	@param	t			The supplied absolute time.
 *
 *	@return				The Java Date corresponding
 *							to the supplied absolute Time.
 *
 *	@throws				IllegalArgumentException if the 
 *							resulting time would be less
 *							than 0 (i.e., if the supplied
 *							time is prior to 00:00:00 UTC
 *							January 1, 1970).
 *
 *	@throws				NotSetException if the supplied
 *							time is not set.
 */
//--------------------------------------------------------
JavaTime.getJavaDate = function(t) {
	var tt = JavaTime.getJavaTime(t);
	return new Date(tt);
};

//--------------------------------------------------------
//
//	JAVATIME
//
/**	This constructor is never used by anyone; there
 *	is no need for a JavaTime object.
 */
//--------------------------------------------------------
function JavaTime() { }


//------------------------------------------------------------
//
//	GETMJDN_UTC_1_JAN_1970
//
/**	Returns the Modified Julian Day Number of 
 *	1 January 1970 UTC.
 *
 *	@return				The Modified Julian Day Number of
 *						1 January 1970 UTC.
 */
//------------------------------------------------------------
JavaTime.getMJDN_UTC_1_JAN_1970 = function() {
	var MJDN_UTC_1_JAN_1970_1 = 40587;
	return MJDN_UTC_1_JAN_1970_1;
};
	return JavaTime;
});
