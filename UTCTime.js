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
//  File:                    UTCTime.C
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
//	UTCTIME
//
/**	This class allows the creation and interpretation of absolute
 *	times in the Coordinated Universal Time (UTC) standard.  UTC
 *	is an atomic time that is the basis for "civil" time.
 *	<br><br>
 *	UTC time is defined to maintain an integer number 
 *	of seconds offset from TAI.  When the difference between the 
 *	UTC time and a solar-based UT clock exceeds 0.9 seconds, 
 *  UTC time is delayed by a leap second to adjust it to the
 *	solar time.  Currently such an adjustment is needed about
 *	every 500 days.
 * 	<br><br>
 *	UTC time was coincident with TAI time on 1 January 1958,
 *	and the difference TAI-UTC was 32 seconds in 1 January 1999.
 *	The unit interval of UTC time is nominally the SI second.
 *	<br><br>
 *	The integer-second bias between UTC time and TAI time varies
 *	as leap seconds are added.  This class contains a variable-
 *	length table of leap seconds.  This table should more properly
 *	reside in a database file to facilitate updates.  With certainty,
 *	leap seconds will be added to UTC during the lifespan of OSI.
 *	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================

/*
 * static constructor 

 	static {
		//  Read the list of leap seconds from the installed DB
		//  location.  Would be better to use a resolver-like
		//  feature so we could get from a view if needed, but
		//  that's not available in Java right now.
		final String leapSecDB =
			ProjectDefs.PROJ_DB_INST_DIR + "physics" + 
			ProjectDefs.SEP + "LeapSeconds.xml";
		final StringBuffer	 buf = new StringBuffer();
		BufferedReader		 reader = null;
		try {
			reader = new BufferedReader(new FileReader (leapSecDB));
			buf.append("<xml>\n");
			String				 line = null;
			while ((line = reader.readLine()) != null) {
				buf.append(line);
				buf.append("\n");
			}
			buf.append("</xml>");
			reader.close();
		} catch (final FileNotFoundException fnfe) {
			Log.severe("Could not find leap second DB in " +
						leapSecDB);
		} catch (final IOException ioe) {
			Log.severe("" + ioe);
		} catch (final Exception ee) {
			Log.severe("" + ee);
		}

		//  Get the document as a byte array, and wrap
		//  into a ByteArrayInputStream.
		final String leapSecondsXMLString = buf.toString();
		byte[] leapBytes = leapSecondsXMLString.getBytes();
		ByteArrayInputStream	leapBais = new ByteArrayInputStream(leapBytes);
		
		//  Build a document parser and process the
		//  contents of the document.
		final DocumentBuilderFactory	dbf = 
			DocumentBuilderFactory.newInstance();
		DocumentBuilder					db = null;
		try {
			db = dbf.newDocumentBuilder();
    		Document						doc = null;
    		try {
    			doc = db.parse(leapBais);
        		NodeList  leaps = doc.getElementsByTagName("LeapSecond");
        		final int	numLeaps = leaps.getLength();
        		if (numLeaps > 0) { 
            		for (int i=0; i<numLeaps; i++) {
            			final Node leap = leaps.item(i);
            			final NamedNodeMap	attributes = leap.getAttributes();
                		String				mjdnStr = null;
                		String				offsetStr = null;
                		for (int k=0; k<attributes.getLength(); k++) {
                			final Node		attribute = attributes.item(k);
                			final String	attrName = attribute.getNodeName();
                			final String	attrVal = attribute.getNodeValue();
                			if (attrName.equals("mjdn")) {
                				mjdnStr = attrVal;
                			} else if (attrName.equals("offset")) {
                				offsetStr = attrVal;
                			}
                		}
                		
                		//  Check mjdn
                		if (mjdnStr == null) {
                			Log.warning("missing mjdn attribute in line " + i +
                					 " of " + leapSecondsXMLString);
                			continue;
                		}
                		
                		//  Check offset
                		if (offsetStr == null) {
                			Log.warning("missing offset attribute in line " + i + 
                						" of " + leapSecondsXMLString);
                			continue;
                		} 
                		
                		final int mjdn = Integer.parseInt(mjdnStr);
                		final double offset = Double.parseDouble(offsetStr);
            
            			//  Add to table.
            			UTCTime.mjdnIndex[UTCTime.numEntries] = mjdn;
            			UTCTime.offsetTable[UTCTime.numEntries] = new TimeLength().setInSeconds(offset);
            			UTCTime.numEntries++;
            			if (UTCTime.numEntries == UTCTime.MAX_ENTRIES) {
            				Log.warning("maximum number of leap seconds exceeded.");
            				break;
            			}
            		}
        		} else {
        			Log.warning("no leap seconds listed in " + leapSecondsXMLString);
        		}
    		} catch (SAXException saxe) {
    			Log.warning("could not parse document: " + saxe);
    		} catch (IOException ioe) {
    			Log.warning("could not parse document: " + ioe);
    		}
		} catch (ParserConfigurationException pce) {
			Log.warning("could not build document " +
						"builder: " + pce);
		}

		//  There were 36 entries when this code was
		//  updated (July 2012); there can be no 
		//	fewer in the future.
		if (UTCTime.numEntries < 36) {
			Log.warning("incomplete table (" + UTCTime.numEntries + ")");
		}
		Log.info("Read UTC leap seconds from " +
					leapSecDB);
	}
*/

define(["Month", "Reference", "TAITime", "Time", "TimeLength", "TimeStandard"], function(Month, Reference, TAITime, Time, TimeLength, TimeStandard) {
//--------------------------------------------------------
//
//	UTCTIME
//
/**	This constructor is never used by anyone; there
 *	is no need for a UTCTime object.
 */
//--------------------------------------------------------

function UTCTime() { }


UTCTime.convertToString = function(t) {
	if (!t.isSet()) {
		return "Not set.";
	}

	var	year = new Reference(0);
	var	day = new Reference(0);
	var	hour = new Reference(0);
	var	minute = new Reference(0);
	var	seconds = new Reference(0);
	var month = new Reference(Month.January);

	try {
		UTCTime.getUTCClockTime(t, year, month, day, hour, minute, seconds);
	} catch (err) {
		// TODO: Log.severe(iae.toString() + " - should not happen");
	}

	// Get the MJDN and the time-of-day
	var mjdnUTC = new Reference(0);
	var todUTC = new TimeLength().setInSeconds(1.0);
	try {
		UTCTime.getUTCDayAndTime(t, mjdnUTC, todUTC);
	} catch (err) {
		// TODO: Log.severe(nse.toString() + "- should not happen");
	}

	var dow = UTC.mjdnUTCToDayOfWeek(mjdnUTC.get().intValue());

	var baos = "";

	switch (dow) {
		case 0: 
			baos += "Sunday";
			break;
		case 1:
			baos += "Monday";
			break;
		case 2:
			baos += "Tuesday";
			break;
		case 3:
			baos += "Wednesday";
			break;
		case 4:
			baos += "Thursday";
			break;
		case 5:
			baos += "Friday";
			break;
		case 6:
			baos += "Saturday";
			break;
		default:
			baos += "ERROR";
			break;
	}
	baos += day + " " + month + " " + year + 
		" " + hour + ":" + minute + ":" + seconds + " UTC";
	return baos;
};

//--------------------------------------------------------
//
//  CONVERTTOSTRING
//
/** This method converts the supplied time to a String
 *  using the UTC time standard.
 *
 *  @param  t       The time to convert.
 *
 *  @return         The String representation of the supplied
 *                      Time.
 *
 */
//--------------------------------------------------------
UTCTime.convertToMediumString = function(t) {
	//  Confirm sensibility of the request.
    if (!t.isSet()) {
        return "Not set.";
    }

    var year = new Reference(0);
    var day = new Reference(0);
    var hour = new Reference(0);
    var minute = new Reference(0);
    var seconds = new Reference(0);
    var month = new Reference(Month.January);

    try {
        UTCTime.getUTCClockTime(t, year, month, day, hour, minute, seconds );
    } catch (err) {
        // TODO: Log.severe(iae.toString() + " - should not happen");
    }

    //  Get the MJDN and the time-of-day.
    var  mjdnUTC = new Reference(0);
    var  todUTC = new TimeLength().setInSeconds(1.0);
    try {
        UTCTime.getUTCDayAndTime(t,mjdnUTC,todUTC);
    } catch (err) {
        //TODO: Log.severe(nse.toString() + " - should not happen");
    }

    var baos = new ByteArrayOutputStream();
    var ps = new PrintStream(baos);
    
    year.set(year % 100);
    
    
    if (Math.round(seconds) == 60) {
        seconds.set(0.0);
        minute.set(minute.intValue() + 1);
    }

    baos += day + " " + month.toString().substring(0,3) + " " + year +
 		 " " + hour + ":" + minute + ":" + seconds + "Z";

    return baos.toString();
};

//--------------------------------------------------------
//
//	CONVERTTOSHORTSTRING
//
/**	This method converts the supplied time to a 
 *	short String using the UTC time standard.
 *
 *	@param	t		The time to convert.
 *
 *	@return			The String representation of the supplied
 *						Time.
 */
//--------------------------------------------------------
UTCTime.convertToShortString = function(t) {

	//  Confirm sensibility of the request.
	if (!t.isSet()) {
		return "Not set.";
	}

	var	year = new Reference(0);
	var	day = new Reference(0);
	var	hour = new Reference(0);
	var	minute = new Reference(0);
	var	seconds = new Reference(0);
	var	month = new Reference(Month.January);

	try {
		UTCTime.getUTCClockTime(t, year, month, day, hour, minute, seconds );
	} catch (err) {
		// TODO: Log.severe(nse.toString() + " - should not happen");
	} /*catch (IllegalArgumentException iae) {
		// TODO: Log.severe(iae.toString() + " - should not happen");
	}*/

	//  Start building time string.
	var	baos = "";
	

	baos += month.getMonthNumber() + "/" + day + "/" + year + 
		" " + hour + ":" + minute + ":" + seconds + "UTC";

	return baos.toString();
};

//--------------------------------------------------------
//
//	CONVERTFROMSHORTSTRING
//
/**	This method converts the supplied time from a String
 *	using the UTC time standard.  The String must have
 *	been generated by convertToShortString().
 *
 *	@param	tStr	The time string to convert.
 *
 *	@param	t		On output, the converted time.
 *
 *	@return			true on success, false on failure.
 */
//--------------------------------------------------------
UTCTime.convertFromShortString = function(tStr, t) {
	var tmp = tStr.trim();
	var toks = tStr.split("/|\\s|:");
	var tok = new String[toks.length];
	var year=0,dom=0,hour=0,minute=0,monthNum=0;
	var seconds=0;
	
	var j = 0;
	for (var i = 0; i<toks.length; i++) {
		if (toks[i].isEmpty()) {
			continue;
		}
		tok[j++] = toks[i];
	}
	
	if (tok.length == 1) {
	    if (tok[0].toLowerCase().indexOf("z") > -1) {
	        tok[0] = tok[0].substring(0, tok[0].toLowerCase().indexOf("z"));
	    }
	    if (tok[0].length() != 4) {
	        return false;
	    }
	    hour = parseInt(tok[0].substring(0, 2));
	    minute = parseInt(tok[0].substring(2, tok[0].length()));
	    seconds = 0;
	    monthNum = Calendar.getInstance().get(Calendar.MONTH + 1);
	    dom = Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
	    year = Calendar.getInstance().get(Calendar.YEAR);
	} else if (tok.length == 2) {
	    if (tok[1].toLowerCase().contains("z")) {
            tok[1] = tok[1].substring(0, tok[1].toLowerCase().indexOf("z"));
        }
	    hour = parseInt(tok[0]);
	    minute = parseInt(tok[1]);
	    seconds = 0;
        monthNum = Calendar.getInstance().get(Calendar.MONTH + 1);
        dom = Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
        year = Calendar.getInstance().get(Calendar.YEAR);
	} else {
        monthNum = parseInt(tok[0]);
        dom = parseInt(tok[1]);
        year = parseInt(tok[2]);
        hour = parseInt(tok[3]);
        minute = parseInt(tok[4]);
        seconds = parseFloat(tok[5]);
    } 
	var month = Month.getMonthByNumber(monthNum);
	if (dom > 31) {
		return false;
	}
	if (hour > 23) {
		return false;
	}
	if (minute > 59) {
		return false;
	}
	if ( !(seconds<60) ) {
		return false;
	}
//		if (!tok[6].toLowerCase().equals("utc")) {
//			return false;
//		}		
	try {
		t.opAssign(UTCTime.time(year,month,dom,hour,minute,seconds));
	} catch (err) {
		throw "IllegalStateException";
	}
	if (!t.isSet()) {
		return false;
	}
	return true;
};

//--------------------------------------------------------
//
//	CONVERTFROMSTRING
//
/**	This method converts the supplied time from a String
 *	using the UTC time standard.  The String must have
 *	been generated by convertToString().
 *
 *	@param	tStr	The time string to convert.
 *
 *	@param	t		On output, the converted time.
 *
 *	@return			true on success, false on failure.
 */
//--------------------------------------------------------
UTCTime.convertFromString = function(tStr, t) {

	var	tmp = tStr.trim();

	//  Remove day of week.
	 var spInd = tmp.indexOf(' ');
	if (spInd < 0) {
		return false;
	}
	tmp = tmp.substring(spInd+1).trim();
	
	//  Get day of month.
	var dInd = tmp.indexOf(' ');
	if ((dInd != 1) && (dInd != 2)) {
		return false;
	}
	var domStr = tmp.substring(0, dInd);
	var dom = Integer.parseInt(domStr);
	tmp = tmp.substring(dInd+1).trim();

	//  Get month.
	var	mInd = tmp.indexOf(' ');
	if (mInd < 0) {
		return false;
	}
	var	mStr = tmp.substring(0,mInd);
	var	mNum = -1;
	mStr = mStr.toLowerCase();
	if (mStr === "january") {
		mNum = 1;
	} else if (mStr === "february") {
		mNum = 2;
	} else if (mStr === "march") {
		mNum = 3;
	} else if (mStr === "april") {
		mNum = 4;
	} else if (mStr === "may") {
		mNum = 5;
	} else if (mStr === "june") {
		mNum = 6;
	} else if (mStr === "july") {
		mNum = 7;
	} else if (mStr === "august") {
		mNum = 8;
	} else if (mStr === "september") {
		mNum = 9;
	} else if (mStr === "october") {
		mNum = 10;
	} else if (mStr === "november") {
		mNum = 11;
	} else if (mStr === "december") {
		mNum = 12;
	}
	if (mNum < 0) {
		return false;
	}
	var month = Month.getMonthByNumber(mNum);
	tmp = tmp.substring(mInd+1).trim();

	//  Get year.
	var yInd = tmp.indexOf(' ');
	if (yInd != 4) {
		return false;
	}
	var  yearStr = tmp.substring(0, yInd);
	var year = parseInt(yearStr);
	tmp = tmp.substring(yInd+1).trim();

	//  Get hour.
	var	hInd = tmp.indexOf(':');
	if (hInd != 2) {
		return false;
	}
	var hourStr = tmp.substring(0, hInd);
	var  hour = parseInt(hourStr);
	tmp = tmp.substring(hInd+1).trim();

	//  Get minute.
	var minInd = tmp.indexOf(':');
	if (minInd != 2) {
		return false;
	}
	var minStr = tmp.substring(0, minInd);
	var minute = parseInt(minStr);
	tmp = tmp.substring(minInd+1).trim();

	//  Get seconds.
	var	sInd = tmp.indexOf(' ');
	if (sInd < 4) {
		return false;
	}
	var secStr = tmp.substring(0, sInd);
	var seconds = parseFloat(secStr);
	tmp = tmp.substring(sInd+1).trim();

	//  Finally, check the time standard.
	if (tmp.toLowerCase().indexOf("utc") != 0) {
		return false;
	}

	//  OK, we should be able to make the time now.
	try {
		t.opAssign(UTCTime.time(year,month,dom,hour,minute,seconds));
	} catch (err) {
		throw "IllegalStateException(UTCTime";
	}

	if (!t.isSet()) {
		return false;
	}

	//  It seems we've succeeded.
	return true;
};

//--------------------------------------------------------
//
//	TIME
//
/**	Creates a time given the UTC year, UTC month, UTC
 *	day, UTC hour (24-hour clock), UTC minute, and UTC
 *	seconds.
 *
 *	@param	yearUTC		The year of the time in the UTC
 *							standard, expressed according
 *							to the Gregorian calendar. 
 *							Must be greater than or equal
 *							to 1901 A.D.
 *	@param	monthUTC	The month of the time in the UTC
 *							standard (1-12).
 *	@param	dayUTC		The day of the time in the UTC
 *							standard (must be valid
 *							for the month and year).
 *	@param	hourUTC		The hour (24-hour clock) of the
 *							time in the UTC standard
 *							(0-23).
 *	@param	minuteUTC	The minute of the time in the
 *							UTC standard (0-59).
 *	@param	secondsUTC	The seconds of the time in the
 *							UTC standard (0-59.99999...).
 *
 *	@return				The time.
 *
 *	@throws				IllegalArgumentException if the supplied 
 *							year is less than 1980 or
 *							if other supplied values
 *							are non-sensical in some
 *							way.
 */
//--------------------------------------------------------
UTCTime.time = function() {
	if (arguments.length == 6) {
		//  Use TAI functionality, then offset.
		try {
			return TAITime.time(arguments[0],
								arguments[1],
								arguments[2],
								arguments[3],
								arguments[4],
								arguments[5]).opAdd( 
					UTCTime.getTAIMinusUTC(UTCTime.yearToMjdnUTC(arguments[0]) +
								   		   UTCTime.monthDayToDayOfYear(arguments[0],
																	   arguments[1],
																	   arguments[2]) - 1));
		} catch (err) {
			// TODO: Log.severe(nse.toString() + " - should not happen");
		}
		return new Time().dummy();
		

	//--------------------------------------------------------
	//
	//	TIME
	//
	/**	Creates a time given the UTC year, UTC month, UTC
	 *	day, UTC hour (12-hour clock), UTC AM/PM designator,
	 *  UTC minute, and UTC seconds.
	 *
	 *	@param	yearUTC		The year of the time in the UTC
	 *							standard, expressed according
	 *							to the Gregorian calendar. 
	 *							Must be greater than or equal
	 *							to 1901 A.D.
	 *	@param	monthUTC	The month of the time in the UTC
	 *							standard (1-12).
	 *	@param	dayUTC		The day of the time in the UTC
	 *							standard (must be valid
	 *							for the month and year).
	 *	@param	hourUTC		The hour (12-hour clock) of the
	 *							time in the UTC standard
	 *							(1-12).
	 *	@param	ampmUTC		The AM/PM designator of the time
	 *							in the UTC standard.
	 *	@param	minuteUTC	The minute of the time in the
	 *							UTC standard (0-59).
	 *	@param	secondsUTC	The seconds of the time in the
	 *							UTC standard (0-59.99999...).
	 *
	 *	@return				The time.
	 *
	 *	@throws				IllegalArgumentException if the supplied 
	 *							year is less than 1980 or
	 *							if other supplied values
	 *							are non-sensical in some
	 *							way.
	 */
	//--------------------------------------------------------
	} else if (arguments.length == 7) {
		//  Use TAI functionality, then offset.
		try {
			return TAITime.time(arguments[0],
								 arguments[1],
								 arguments[2],
								 arguments[3],
								 arguments[4],
								 arguments[5],
								 arguments[6]).opAdd(
					UTCTime.getTAIMinusUTC(UTCTime.yearToMjdnUTC(arguments[0]) +
								   		   UTCTime.monthDayToDayOfYear(arguments[0],
															   		   arguments[1],
															   		   arguments[2]) - 1));
		} catch (err) {
			//  Should never happen.
			// TODO: Log.severe(nse.toString() + " - should not happen");
		}
		return new Time().dummy();
	

	//--------------------------------------------------------
	//
	//	TIME
	//
	/** Creates a time given the UTC Modified Julian Day Number
	 *  and the UTC time-of-day.  
	 *
	 *	@param	modJulianDayNumberUTC	
	 *								The Modified Julian Day Number
	 *									in the UTC standard.
	 *
	 *	@param	timeOfDayUTC		The time-of-day (elapsed 
	 *									time since midnight) 
	 *									in the UTC standard.
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
	} else if (arguments.length == 2) {

		//  Use TAI functionality, then offset.
		return TAITime.time(arguments[0], 
							arguments[1]).opAdd(
				UTCTime.getTAIMinusUTC(arguments[0]));
	}
};

//--------------------------------------------------------
//
//	GETUTCDAYANDTIME
//
/**	This method returns the UTC Modified Julian Day Number
 *  corresponding to the supplied absolute time, and the
 *	UTC time of day on that day.  
 *
 *	@param	t			The supplied absolute time.
 *
 *	@param	mjdnUTC		After return, holds a reference to
 *							the UTC Modified Julian Day Number
 *							corresponding to the
 *							supplied absolute time.
 *	@param	todUTC		After return, holds a reference to
 *							the UTC time of day corresponding
 *							to the supplied absolute time.
 *
 *	@throws				NotSetException if the supplied time
 *							is not set.
 */
//--------------------------------------------------------
UTCTime.getUTCDayAndTime = function(t, mjdnUTC, todUTC) {

	//  Get TAI data first.
	var mjdnTAI = new Reference(0);
	var	todTAI = new TimeLength();
	TAITime.getTAIDayAndTime(t, mjdnTAI, todTAI);

	//  Get offset for TAI MJDN, interpreted as UTC.
	var	offset = UTCTime.getTAIMinusUTC(mjdnTAI.getValue());

	//  If the offset is less than the TOD,
	//  then the TAI MJDN is the same as the UTC MJDN.
	if (offset.opLessEq(todTAI)) {

		mjdnUTC.set(mjdnTAI.getValue());
		todUTC.opAssign(todTAI.opSub(offset));

	//  If offset is such that it will change the
	//  MJDN, then use the offset of the previous day
	//  to compute the UTC data.
	} else {
		TAITime.getTAIDayAndTime(t.opSub(UTCTime.getTAIMinusUTC(mjdnTAI.getValue()-1)),
								  mjdnUTC,
								  todUTC);
	}
};

//--------------------------------------------------------
//
//	GETUTCCLOCKTIME
//
/**	This method returns the Clock time ( year, month,
 *  day, hour, minute, and second ) from the given
 *	absolute UTC time.
 *
 *	@param	t		The time to convert.
 *
 *	@param	yearUTC		The year of the time in the UTC
 *							standard, expressed according
 *							to the Gregorian calendar. 
 *							Must be greater than or equal
 *							to 1901 A.D.
 *	@param	monthUTC	The month of the time in the UTC
 *							standard.
 *	@param	dayUTC		The day of the time in the UTC
 *							standard (must be valid
 *							for the month and year).
 *	@param	hourUTC		The hour (24-hour clock) of the
 *							time in the UTC standard
 *							(0-23).
 *	@param	minuteUTC	The minute of the time in the
 *							UTC standard (0-59).
 *	@param	secondsUTC	The seconds of the time in the
 *							UTC standard (0-59.99999...).
 *
 *	@throws				IllegalArgumentException if the 
 *							supplied year is less than 1901 or
 *							if other supplied values
 *							are non-sensical in some
 *							way.
 *
 *	@throws				NotSetException if the supplied time
 *							is not set.
 */
//--------------------------------------------------------
UTCTime.getUTCClockTime  = function(t, yearUTC, monthUTC, dayUTC, hourUTC, minuteUTC, secondsUTC) {

	//  Get the MJDN and the time-of-day.
	var	mjdnUTC = new Reference(0);
	var	todUTC = new TimeLength();
	UTCTime.getUTCDayAndTime( t, mjdnUTC, todUTC );
	dayUTC.set(new Integer(UTCTime.mjdnUTCToDayOfWeek(mjdnUTC.getValue())));

	var	startOfYear = new Reference(0);
	UTCTime.mjdnUTCToYear( mjdnUTC.getValue(), yearUTC, startOfYear );

	var	dayOfYear = mjdnUTC.getValue() - startOfYear.getValue() + 1;
	UTCTime.dayOfYearToMonthDay( dayOfYear, yearUTC.get().intValue(), monthUTC, dayUTC);

	//  Break time-of-day into HMS.
	todUTC.getInHMS( hourUTC, minuteUTC, secondsUTC );
};

//--------------------------------------------------------
//
//	GETYEAR
//
/**	This method returns year from the given
 *	absolute UTC time.
 *
 *	@param	t		The time to convert.
 *
 *	@return			The year.
 *
 *	@throws				IllegalArgumentException if the 
 *							supplied year is less than 1901 or
 *							if other supplied values
 *							are non-sensical in some
 *							way.
 *
 *	@throws				NotSetException if the supplied time
 *							is not set.
 */
//--------------------------------------------------------
UTCTime.getYear = function(t) {
	var year = new Reference(1901);
	var day = new Reference(0);
	var hour = new Reference(0);
	var minute = new Reference(0);
	var month = new Reference(Month.January);
	var seconds = new Reference(0);
	getUTCClockTime(t, year, month, day, hour, minute, seconds);
	return year;
};

//--------------------------------------------------------
//
//	GETMONTH
//
/**	This method returns month from the given
 *	absolute UTC time.
 *
 *	@param	t		The time to convert.
 *
 *	@return			The month.
 *
 *	@throws				IllegalArgumentException if the 
 *							supplied year is less than 1901 or
 *							if other supplied values
 *							are non-sensical in some
 *							way.
 *
 *	@throws				NotSetException if the supplied time
 *							is not set.
 */
//--------------------------------------------------------
UTCTime.getMonth = function(t) {
	var year = new Reference(1901);
	var day = new Reference(0);
	var hour = new Reference(0);
	var minute = new Reference(0);
	var month = new Reference(Month.January);
	var seconds = new Reference(0);
	getUTCClockTime(t, year, month, day, hour, minute, seconds);
	return month;
};

//--------------------------------------------------------
//
//	GETDAY
//
/**	This method returns day from the given
 *	absolute UTC time.
 *
 *	@param	t		The time to convert.
 *
 *	@return			The day.
 *
 *	@throws				IllegalArgumentException if the 
 *							supplied year is less than 1901 or
 *							if other supplied values
 *							are non-sensical in some
 *							way.
 *
 *	@throws				NotSetException if the supplied time
 *							is not set.
 */
//--------------------------------------------------------
UTCTime.getDay = function(t) {
	var year = new Reference(1901);
	var day = new Reference(0);
	var hour = new Reference(0);
	var minute = new Reference(0);
	var month = new Reference(Month.January);
	var seconds = new Reference(0);
	getUTCClockTime(t, year, month, day, hour, minute, seconds);
	return day;
};

//--------------------------------------------------------
//
//	GETHOUR
//
/**	This method returns hour from the given
 *	absolute UTC time.
 *
 *	@param	t		The time to convert.
 *
 *	@return			The hour.
 *
 *	@throws				IllegalArgumentException if the 
 *							supplied year is less than 1901 or
 *							if other supplied values
 *							are non-sensical in some
 *							way.
 *
 *	@throws				NotSetException if the supplied time
 *							is not set.
 */
//--------------------------------------------------------
UTCTime.getHour = function(t) {
	var year = new Reference(1901);
	var day = new Reference(0);
	var hour = new Reference(0);
	var minute = new Reference(0);
	var month = new Reference(Month.January);
	var seconds = new Reference(0);
	getUTCClockTime(t, year, month, day, hour, minute, seconds);
	return hour;
};

//--------------------------------------------------------
//
//	GETMINUTE
//
/**	This method returns minute from the given
 *	absolute UTC time.
 *
 *	@param	t		The time to convert.
 *
 *	@return			The minute.
 *
 *	@throws				IllegalArgumentException if the 
 *							supplied year is less than 1901 or
 *							if other supplied values
 *							are non-sensical in some
 *							way.
 *
 *	@throws				NotSetException if the supplied time
 *							is not set.
 */
//--------------------------------------------------------
UTCTime.getMinute = function(t) {
	var year = new Reference(1901);
	var day = new Reference(0);
	var hour = new Reference(0);
	var minute = new Reference(0);
	var month = new Reference(Month.January);
	var seconds = new Reference(0);
	getUTCClockTime(t, year, month, day, hour, minute, seconds);
	return minute;
};

//--------------------------------------------------------
//
//	GETSECONDS
//
/**	This method returns seconds from the given
 *	absolute UTC time.
 *
 *	@param	t		The time to convert.
 *
 *	@return			The seconds.
 *
 *	@throws				IllegalArgumentException if the 
 *							supplied year is less than 1901 or
 *							if other supplied values
 *							are non-sensical in some
 *							way.
 *
 *	@throws				NotSetException if the supplied time
 *							is not set.
 */
//--------------------------------------------------------
UTCTime.getSeconds = function(t) {
	var year = new Reference(1901);
	var day = new Reference(0);
	var hour = new Reference(0);
	var minute = new Reference(0);
	var month = new Reference(Month.January);
	var seconds = new Reference(0);
	getUTCClockTime(t, year, month, day, hour, minute, seconds);
	return seconds;
};

//--------------------------------------------------------
//
//	MJDNUTCTODAYOFWEEK
//
/**	This method converts the UTC Modified Julian Day Number
 *  to the day of the week (0 = Sunday, ..., 6 = Saturday).
 *
 *	@param	mjdnUTC		The supplied UTC Modified Julian
 *							Day Number.
 *
 *	@return				The day of the week.
 */
//--------------------------------------------------------
UTCTime.mjdnUTCToDayOfWeek = function(mjdnUTC) {
	//  Use TAI functionality.
	return TAITime.mjdnTAIToDayOfWeek(mjdnUTC);
};

//--------------------------------------------------------
//
//	MJDNUTCTOYEAR
//
/**	This method returns the year corresponding to the
 *	supplied UTC Modified Julian Day Number, and the 
 *	UTC Modified Julian Day Number corresponding to the
 *  first day of that year.
 *
 *	@param	mjdnUTC		The supplied UTC Modified Julian	
 *							Day Number.  Must be greater than
 *							or equal to 15385 
 *							(1 January 1901, A.D.)
 *
 *	@param	year		After return, the year corresponding
 *							to the UTC Modified Julian
 *							Day Number.  The Year is returned
 *							according to the Gregorian 
 *							calendar.
 *	@param	startOfYear	After return, the UTC Modified Julian 
 *							Day Number corresponding to the 
 *							first day of the returned year.
 *
 *	@throws				IllegalArgumentException if the
 *							supplied MJDN is less than
 *							15385.
 */
//--------------------------------------------------------
UTCTime.mjdnUTCToYear = function(mjdnUTC, year, startOfYear) {
	//  Use the TAI functionality.
	TAITime.mjdnTAIToYear (mjdnUTC, year, startOfYear);
};

//--------------------------------------------------------
//
//	YEARTOMJDNUTC
//
/**	This method returns the UTC Modified Julian Day Number
 *  corresponding to the first day of the supplied year.
 *
 *	@param	year		The supplied year, Gregorian 
 *							calendar.  Must be greater than
 *							or equal to 1901 A.D.
 *
 *	@return				The UTC Modified Julian Day Number
 *							of the first day of the supplied
 *							year.
 *
 *	@throws				IllegalArgumentException if the
 *							supplied year is less than 1901.
 */
//--------------------------------------------------------
UTCTime.yearToMjdnUTC = function(year) {
	//  Use the TAI functionality.
	return TAITime.yearToMjdnTAI(year);
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
UTCTime.dayOfYearToMonthDay = function(doy, year, month, day) {
	//  Use TAI functionality.
	TAITime.dayOfYearToMonthDay(doy,year,month,day);
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
UTCTime.monthDayToDayOfYear = function(year, month, day) {
	//  Use TAI functionality.
	return TAITime.monthDayToDayOfYear(year,month,day);
};

//--------------------------------------------------------
//
//	GETTAIMINUSUTC
//
/**	This method returns a TimeLength that represents the
 *	integral offset between UTC time and TAI time.
 *	This method uses an internal static table 
 *	to ensure that the table is initialized before
 *	it is used.  
 *
 *	@param	mjdnUTC	The UTC Modified Julian Day Number
 *						of the absolute time.
 *	
 *	@return			The TimeLength representing the
 *						integral offset between UTC time
 *						and TAI time.
 */
//--------------------------------------------------------
UTCTime.getTAIMinusUTC = function(mjdnUTC) {
	//  Determine the offset based on the MJDN.
	var	index = UTCTime.numEntries - 1;
	while (index >= 0) {
		if (mjdnUTC >= UTCTime.mjdnIndex[index]) {
			return UTCTime.offsetTable[index];
		}
		index--;
	}
	
	//  Evidently prior to tabulation.
	return UTCTime.noOffset;
};

return UTCTime;
    });