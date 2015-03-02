
//  This is an absolute time at which the Mean Greenwich
//  Sidereal Time was known, and the rotation
//  at that time.  These values were obtained from
//	the Multi-Year Interactive Computer Almanac (MICA)
//	available online from the U.S. Naval Observatory at
//	http://aa.usno.navy.mil/AA/data/docs/WebMICA_2.html

//  The time corresponds to midnight, 1 January 2000 UTC.
//	We can't use UTC to construct the time because UTC
//	depends on us.
//var RotRefTime = new Time(883612832,0.0);
//var RotRef = Time.getRotationalReferenceAngle();

//  The mean rotational rate of the Earth is defined by
// 	the length of a sidereal day.
//var omega = new AngularSpeed();

//  This constant is the Modified Julian Day Number
//  of the origin of our internal time representation 
//  in the TAI standard.  The number given represents 
//  midnight (start of the day) 1 January 1972.
//var ORIGIN_MODIFIED_JULIAN_DAY_NUMBER_TAI = 41317;

define(["AngularLength","JavaTime", "Reference", "ScalarMath","TimeLength","UTCTime"], function(AngularLength,JavaTime, Reference, ScalarMath,TimeLength,UTCTime) {


function Time() {	
	if (arguments.length == 0) {
		//------------------------------------------------------
	//
	//	TIME
	//
	/**	This no-arg constructor creates an unset Time.
	 *	Such an unset Time is suitable for nothing except
	 *	as a socket into which a set Time can be assigned.
	 *
	 */
	//------------------------------------------------------
		this.seconds = 0;
		this.fractions = 0.0;
		this.setFlag = false;

	} else if (arguments.length == 1) {
		//------------------------------------------------------
		//
		//	TIME
		//
		/**	This copy constructor creates a new Time from the 
		 *	supplied Time.  It is an error to create a new Time
		 *	from an unset Time.
		 *
		 *	@param	t		The supplied Time to be copied.
		 *
		 *	@throws			NotSetException if the Time to
		 *						be copied has not been set.
		 */
		//------------------------------------------------------
		this.seconds = arguments[0].seconds;
		this.fractions = arguments[0].fractions;
		this.setFlag = arguments[0].setFlag;

	} else if (arguments.length == 2) {
		//-------------------------------------------------------
		//
		//	TIME
		//
		/**	This two-arg constructor creates an absolute time.
		 *  Cannot be called by the user.  The sum of the seconds
		 *  and fractional seconds must equal the total offset
		 *  in continuous SI seconds since midnight on 1 January
		 *  1972.
		 *
		 *	@param	secs		The number of whole seconds.
		 *	@param	fracs		The number of fractional seconds
		 *							(arbitrary)
		 */
		//-------------------------------------------------------
		this.seconds = arguments[0];
		this.fractions = arguments[1];
		this.setFlag = true;
		//  Modify values so that fractions are between 0 and 1.
		if (this.fractions <= -1 || this.fractions >= 1) {
			var wholeFracs = Math.floor(this.fractions);
			this.seconds += parseFloat(wholeFracs);
			this.fractions -= wholeFracs;
		}
		if (this.fractions < 0.0) {
			this.seconds -= 1;
			this.fractions += 1.0;
		}
	}
}

//------------------------------------------------------
//
//	OPASSIGN
//
/**	This method defines the assignment operator for a 
 *	Time.  It is an error to assign an unset Time to
 *	another Time.
 *
 *	@param		rhs		The supplied absolute Time that
 *							is to be assigned to this
 *							Time.
 *
 *	@throws				NotSetException if the Time 
 *							to be copied has not been set.
 */
//-------------------------------------------------------
Time.prototype.opAssign = function(rhs) {
	if (!rhs.setFlag) {
		throw "NotSetException";
	}
	this.seconds = rhs.seconds;
	this.fractions = rhs.fractions;
	this.setFlag = rhs.setFlag;

	return this;
};

//-------------------------------------------------------
//
//	GETSECONDS
//
/**	This method returns the number of whole seconds in
 *	the time.
 *
 *	@return				The number of whole seconds in
 *							the time.
 *
 *	@throws				NotSetException if this Time or
 *							the right-hand operand are unset.
 */
//-------------------------------------------------------
Time.prototype.getSeconds = function() {
	if (!this.setFlag) {
		throw "NotSetException";
	}
	return this.seconds;
};

//-------------------------------------------------------
//
//	GETFRACTIONS
//
/**	This method returns the number of fractional seconds
 *	in the time (always between 0 and 1).
 *
 *	@return				The number of fractional seconds
 *							in the time (always between 0
 *							and 1).
 *
 *	@throws				NotSetException if this Time or
 *							the right-hand operand are unset.
 */
//-------------------------------------------------------
Time.prototype.getFractions = function() {
	if (!this.setFlag) {
		throw "NotSetException";
	}
	return this.fractions;
};

//------------------------------------------------------
//
//	OPLESS
//
/**	Returns true if this absolute time precedes the supplied
 *  absolute time.
 *
 *	@param		rhs		The supplied absolute time.
 *
 *	@return				true if this absolute time precedes
 *							the supplied absolute time.
 *
 *	@throws				NotSetException if this Time or
 *							the right-hand operand are unset.
 */
//-------------------------------------------------------
Time.prototype.opLess = function(rhs) {
	if ((!this.setFlag) || (!rhs.setFlag)) {
		throw "NotSetException";
	}
	//  If the difference is larger than 1 second,
	//  the fractional seconds don't matter.
	//  Check that case first.
	if (this.seconds != rhs.seconds) {
		return this.seconds < rhs.seconds;

	//  If the difference is less than 1 second,
	//  then the whole seconds don't matter.
	} else {
		return this.fractions < rhs.fractions;
	}
};

//------------------------------------------------------
//
//	OPMIN
//
/**	Returns the minimum of this object and the rhs.
 *
 *	@param		rhs		The supplied absolute time.
 *
 *	@return				the minimum
 *	
 *	@throws				NotSetException if this Time or
 *							the right-hand operand are unset.
 */
//-------------------------------------------------------
Time.prototype.opMin = function(rhs) {
	if ((!this.setFlag) || (!rhs.setFlag)) {
		throw "NotSetException";
	}

	if (this.opLess(rhs)) {
		return this;
	} else {
		return rhs;
	}
};

//------------------------------------------------------
//
//	OPMAX
//
/**	Returns the maximum of this object and the rhs.
 *
 *	@param		rhs		The supplied absolute time.
 *
 *	@return				the maximum 
 *	
 *	@throws				NotSetException if this Time or
 *							the right-hand operand are unset.
 */
//-------------------------------------------------------
Time.prototype.opMax = function(rhs) {
	if ((!this.setFlag) || (!rhs.setFlag)) {
		throw "NotSetException";
	}
	if (this.opGreat(rhs)) {
		return this;
	} else {
		return rhs;
	}
};

//------------------------------------------------------
//
//	OPLESSEQ
//
/**	Returns true if this absolute time precedes or is
 *  coincident with the supplied absolute time.
 *
 *	@param		rhs		The supplied absolute time.
 *
 *	@return				true if this absolute time precedes
 *							or is coincident with the 
 *							supplied absolute time.
 *
 *	@throws				NotSetException if this Time or
 *							the right-hand operand are unset.
 */
//-------------------------------------------------------
Time.prototype.opLessEq = function(rhs) {
	if ((!this.setFlag) || (!rhs.setFlag)) {
		throw "NotSetException" ;
	}
	//  If the difference is larger than 1 second,
	//  the fractional seconds don't matter.
	//  Check that case first.
	if (this.seconds != rhs.seconds) {
		return this.seconds <= rhs.seconds;

	//  If the difference is less than 1 second,
	//  then the whole seconds don't matter.
	} else {
		return this.fractions <= rhs.fractions;
	}
};

//------------------------------------------------------
//
//	OPGREAT
//
/**	Returns true if this absolute time follows the supplied
 *  absolute time.
 *
 *	@param		rhs		The supplied absolute time.
 *
 *	@return				true if this absolute time follows
 *							the supplied absolute time.
 *
 *	@throws				NotSetException if this Time or
 *							the right-hand operand are unset.
 */
//-------------------------------------------------------
Time.prototype.opGreat = function(rhs) {
	if ((!this.setFlag) || (!rhs.setFlag)) {
		throw "NotSetException";
	}

	//  If the difference is larger than 1 second,
	//  the fractional seconds don't matter.
	//  Check that case first.
	if (this.seconds != rhs.seconds) {
		return this.seconds > rhs.seconds;

	//  If the difference is less than 1 second,
	//  then the whole seconds don't matter.
	} else {
		return this.fractions > rhs.fractions;
	}
};

//------------------------------------------------------
//
//	OPGREATEQ
//
/**	Returns true if this absolute time follows or is
 *  coincident with the supplied absolute time.
 *
 *	@param		rhs		The supplied absolute time.
 *
 *	@return				true if this absolute time follows
 *							or is coincident with the 
 *							supplied absolute time.
 *
 *	@throws				NotSetException if this Time or
 *							the right-hand operand are unset.
 */
//-------------------------------------------------------


Time.prototype.opGreatEq = function(rhs) {
	if ((!this.setFlag) || (!rhs.setFlag)) {
		throw "NotSetException";
	}

	//  If the difference is larger than 1 second,
	//  the fractional seconds don't matter.
	//  Check that case first.
	if (this.seconds != rhs.seconds) {
		return this.seconds >= rhs.seconds;

	//  If the difference is less than 1 second,
	//  then the whole seconds don't matter.
	} else {
		return this.fractions >= rhs.fractions;
	}
};

//------------------------------------------------------
//
//	
//
/**	Returns true if this absolute time is
 *  coincident with the supplied absolute time.
 *
 *	@param		rhs		The supplied absolute time.
 *
 *	@return				true if this absolute time 
 *							is coincident with the 
 *							supplied absolute time.
 *
 *	@throws				NotSetException if this Time or
 *							the right-hand operand are unset.
 */
//-------------------------------------------------------
Time.prototype.opEq = function(rhs) {
	if ((!this.setFlag) || (!rhs.setFlag)) {
		throw "NotSetException";
	}

	return ((this.seconds == rhs.seconds) &&
			(this.fractions == rhs.fractions));
};

//------------------------------------------------------
//
//	OPNOTEQ
//
/**	Returns true if this absolute time is
 *  not coincident with the supplied absolute time.
 *
 *	@param		rhs		The supplied absolute time.
 *
 *	@return				true if this absolute time 
 *							is not coincident with the 
 *							supplied absolute time.
 *
 *	@throws				NotSetException if this Time or
 *							the right-hand operand are unset.
 */
//-------------------------------------------------------
Time.prototype.opNotEq = function(rhs) {
	if ((!this.setFlag) || (!rhs.setFlag)) {
		throw new "NotSetException";
	}

	return ((this.seconds != rhs.seconds) ||
			(this.fractions != rhs.fractions));
};

//-------------------------------------------------------
//
//	OPSUB
//
/**	The difference of two absolute times is a TimeLength.
 *  The TimeLength may be negative, depending on the 
 *  ordering of the absolute times.  Note that the
 *  TimeLength class is a variable-accuracy class;
 *  see GenericScalar for more information about the
 *  limits of TimeLength.
 *
 *	@param		rhs		The supplied absolute time.
 *
 *	@return				The difference between the this
 *							absolute time and the supplied
 *							absolute time.
 *
 *	@throws				NotSetException if this Time or
 *							the right-hand operand are unset.
 */
//-------------------------------------------------------
Time.prototype.opSub = function(rhs) {
	if ((!this.setFlag) || (!rhs.setFlag)) {
		throw "NotSetException";
	}
	return new TimeLength().setInSeconds(
		(this.seconds - rhs.seconds) + (this.fractions - rhs.fractions));
};

//-------------------------------------------------------
//
//	OPADD
//
/**	Returns an absolute time that follows this
 *  absolute time by the specified TimeLength.  The
 *  TimeLength may be negative.
 *
 *	@param		rhs		The supplied TimeLength.
 *
 *	@return				The absolute time that follows
 *							this absolute time by the 
 *							supplied TimeLength.
 *
 *	@throws				NotSetException if this Time or
 *							the supplied TimeLength has 
 *							not been set.
 */
//-------------------------------------------------------
Time.prototype.opAdd = function(rhs) {
	if (!this.setFlag) {
		throw "NotSetException";
	}
	return new Time(this.seconds, this.fractions + rhs.getInSeconds());
};

//-------------------------------------------------------
//
//	OPADDASSIGN
//
/**	Modifies this absolute time to a value that is 
 *  TimeLength forward.  The TimeLength may be negative.
 *
 *	@param		rhs		The supplied TimeLength.
 *
 *	@return				This modified absolute time.
 *
 *	@throws				NotSetException if this Time or 
 *							the supplied TimeLength has 
 *							not been set.
 */
//-------------------------------------------------------
Time.prototype.opAddAssign = function(rhs) {
	if (!this.setFlag) {
		throw "NotSetException";
	}

	//  Add the time length to this time.
	this.fractions += rhs.getInSeconds();

	//  Don't need to do any additional work unless
	//  the time length was large and/or we were
	//  near a boundary.
	if ((this.fractions < 0.0) || (this.fractions >=1.0)) {
		var wholeFracs = Math.floor(this.fractions);
		this.seconds += wholeFracs;
		this.fractions -= wholeFracs;
		if (this.fractions < 0.0) {
			this.seconds -=1;
			this.fractions += 1.0;
		}
	}
	return this;
};

//-------------------------------------------------------
//
//	OPSUB
//
/**	Returns an absolute time that precedes this
 *  absolute time by the specified TimeLength.  The
 *  TimeLength may be negative.
 *
 *	@param		rhs		The supplied TimeLength.
 *
 *	@return				The absolute time that precedes
 *							this absolute time by the 
 *							supplied TimeLength.
 *
 *	@throws				NotSetException if this Time or
 *							the supplied TimeLength has 
 *							not been set.
 */
//-------------------------------------------------------
Time.prototype.opSub = function(rhs) {
	if (!this.setFlag) {
		throw "NotSetException";
	}
	return new Time(this.seconds, this.fractions - rhs.getInSeconds());
};

//-------------------------------------------------------
//
//	OPSUBASSIGN
//
/**	Modifies this absolute time to a value that is 
 *  TimeLength backward.  The TimeLength may be negative.
 *
 *	@param		rhs		The supplied TimeLength.
 *
 *	@return				This modified absolute time.
 *
 *	@throws				NotSetException if this Time or 
 *							the supplied TimeLength has 
 *							not been set.
 */
//-------------------------------------------------------
Time.prototype.opSubAssign = function(rhs) {
	if (!this.setFlag) {
		throw "NotSetException";
	}

	//  Subtract the time length from this time.
	this.fractions -= rhs.getInSeconds();

	//  Don't need to do any additional work unless
	//  the time length was large and/or we were
	//  near a boundary.
	if ((this.fractions < 0.0) || (this.fractions >= 1.0)) {
		var	wholeFracs = Math.floor(this.fractions);
		this.seconds += parseFloat(wholeFracs);
		this.fractions -= wholeFracs;
		if (this.fractions < 0.0) {
			this.seconds -= 1;
			this.fractions += 1.0;
		}
	}

	return this;
};

//------------------------------------------------------
//
//	GETMEANGREENWICHSIDEREALTIME
//
/**	This method returns the angle between 0 degrees
 *  longitude at this time and the line connecting the
 *  center of the Earth with the first point of Aires.
 *	The "mean" (versus "apparent") means that the
 *	effects of precession are ignored.	The angle is 
 *  increasing as time increases.
 *
 *	@return			The mean Greenwich sidereal time
 *						corresponding to this time.
 *						The returned angle is restricted
 *						to the range 0 .. 2 * pi.
 *
 *	@throws			NotSetException if this Time or
 *						the right-hand operand are unset.
 */
//------------------------------------------------------
Time.prototype.getMeanGreenwichSideralTime = function() {

	// Check to make sure this Time has been set.
	if (!this.setFlag) {
		throw "NotSetException";
	}

	//  Compute the mean Greenwich Sidereal Time.
	//
	//	Formula is mgst = RotRef + omega * (this - RotRefTime)
	//
	//	Java doesn't allow operator overloading, so it's
	//  hard "see" the formula in the code below.
	var mgst = new AngularLength(Time.getRotationalReferenceAngle());
	var ttmp = this.opSub(new Time(883612832,0.0));
	var atmp = ScalarMath.opMult(Time.getMeanEarthRotationRate(), ttmp);
	mgst.opAddAssign(atmp);

	// Return the angle restricted to 0..2*pi.
	return mgst.restricted();
};

//-------------------------------------------------------
//
//	ISSET
//
/**	This method returns true if the value of this
 *	Time has been set.
 *
 *	@return					True if the value of this
 *								time has been set,
 *								otherwise false.
 */
//------------------------------------------------------
Time.prototype.isSet = function() {
	return this.setFlag;
};

//------------------------------------------------------
//
//	GETROTATIONALREFERENCEANGLE
//
/**	Returns the reference rotation angle of the Earth.
 *
 *	@return					The reference rotation angle
 *							of the Earth.
 */
//-------------------------------------------------------
Time.getRotationalReferenceAngle = function() {
	var RotRef_1 = new AngularLength().setInRadians(0.0);
	RotRef_1 = new AngularLength().setInRevolutions(
			new TimeLength().setInSiderealHMS(6,39,53.2707).opDiv(
				new TimeLength().setInSiderealDays(1.0)));
	return RotRef_1;
};

//------------------------------------------------------
//
//	GETMEANEARTHROTATIONRATE
//
/**	This method is placed somewhat oddly, as you would
 *	more properly expect this function to be part of
 *	a geodesy model.  However, the rotational rate of
 *	the Earth is intimately connected with the definition
 *	of time.  Also, the mean rotation rate is needed
 *	for some of the base coordinate systems, and creating
 *	a circular dependency with the geodesy library is
 *	undesirable.
 *
 *	So why is this function not part of the TimeLength
 *	class?  AngularSpeed depends on TimeLength, and again
 *	creating the circular dependency is undesirable.
 *
 *	@return					The mean rotation rate of 
 *								the Earth. "Mean" in this
 *								context means ignoring
 *								the effects of precession.
 */
//-------------------------------------------------------
Time.prototype.getMeanEarthRotationRate = function() {
	// The mean rotational rate of the Earth is defined by
	// the length of a sidereal day.
	var omega_1 = new AngularSpeed().setInRadiansPerSecond(1.0);
	omega_1 = ScalarMath.opDiv(AngularLength.twoPi(),
			new TimeLength().setInSiderealDays(1.0));
	return omega_1;
};

//-------------------------------------------------------
//
//	DUMMY
//
/**	This method returns a valid, but unknown, time.  The
 *	time supplied may change from call to call.  Do not
 *	write any code that depends on the value returned
 *	from this method.
 *
 *	@return					A random, but valid, Time.
 */
//-------------------------------------------------------
Time.dummy = function() {
	return new Time(800000000, 0.0);
};

//-------------------------------------------------------
//
//	NOW
//
/**	This method returns the current time.  
 *	If an environment_id is passed in, this call will
 *	return the osi_time for that environment.
 *	If no environment_id is passed in, this call will 
 *	return the system's notion of the current time.
 *  The system's notion of time is not presently
 *	correlated with any external time source.
 *
 *	@return					The system's notion of the
 *								current time.
 */
//-------------------------------------------------------
Time.prototype.now = function() {
	var tnow = (new Date()).getTime();
	var retval;
	try {
		retval = JavaTime.time(tnow);
	} catch (err) {
		//log.server(iae.toString() + " - should not happen.");
	}

	if (retval == null) {
		retval = (new Time()).dummy();
	}
	return retval;
};

//-------------------------------------------------------
//
//	TOSTRING
//
/**	This method returns the state of this Time object as
 *	a string.  You are looking for the toFormattedString()
 *	method.
 *
 *	@return				The state of this Time object as
 *							a string.
 */
//-------------------------------------------------------
Time.prototype.toString = function() {
	return UTCTime.convertToShortString(this);
	/*
	//  Logs out the internal state of a Time.
	StringBuffer	retval = new StringBuffer();

	if (!this.setFlag) {
		retval.append("Not set.");
	} else {
		retval.append(this.seconds);
		retval.append(" + ");
		retval.append(this.fractions);
		retval.append(" SI seconds");
	}
	return retval.toString();
	*/
};

//------------------------------------------------------------
//
//	TOFORMATTEDSTRING
//
/**	This method returns a nicely formatted description
 *	of this Time object using the UTC time standard.
 *
 *	@return			A (lengthy) string representation 
 *						of the state of this object.
 */
//------------------------------------------------------------
Time.prototype.toFormattedString = function() {
	// Use UTC time standard.
	return UTCTime.convertToString(this);
};

//------------------------------------------------------------
//
//	FROMFORMATTEDSTRING
//
/**	This method sets this Time object from a string
 *	generated by the toFormattedString() method.
 *
 *	@param	tStr	The string, which must match the
 *						format generated by the
 *						toFormattedString() method,
 *						from which this Time is
 *						to be set.
 *
 *	@return			true on success, false on failure.
 */
//------------------------------------------------------------
Time.prototype.fromFormattedString = function(tStr) {
	// Use the UTC time standard.
	return UTCTime.convertFromString(tStr,  this);
};

Time.prototype.writeObject = function(buf, offset) {

	// Write the values.
	var numBytes = 0;
	numBytes += CPPSerializer.writeLong(buf, offset + numBytes, this.seconds);
	numBytes += CPPSerializer.writeDouble(buf, offset + numBytes, this.fractions);
	numBytes += CPPSerializer.writeBoolean(buf, offset + numBytes, this.setFlag);

	return numBytes;
};

Time.prototype.readObject = function(buf, offset) {
	//Read the seconds.
	var numBytes = 0;
	var size = new IntReference(0);
	this.seconds = CPPSerializer.readLong(buf, offset + numBytes, size);
	if (size.ref == 0) {
		// TODO: Log.warning("failed to read seconds")
		return 0;
	}
	numBytes += size.ref;

	//Read the fractions and check for sanity.
	this.fractions = CPPSerializer.readDouble(buf, offset + numBytes, size);
	if (size.ref == 0) {
		// TODO: Log.warning("failed to read fractions");
	}
	numBytes += size.ref;
	if ((this.fractions < 0.0) || (this.fractions > 1.0)) {
		// TODO: Log.warning("invalid fractions " + this.fractions);
		return 0;
	}

	// Read the set flag; it may be invalid/
	this.setFlag = CPPSerializer.readBoolean(buf, offset + numBytes, size);
	if (size.ref == 0) {
		// TODO: Log.warning("failed to read setFlag");
		return 0;
	}
	numBytes += size.ref;

	return numBytes;
};


//-------------------------------------------------------
//	
//	GETORIGINMODIFIEDJULIANDAYNUMBERTAI
//
/**	This method returns the Modified Julian Day Number
 *  of the origin of the internal time representation 
 *  in the TAI standard.
 *
 *	@return			The Modified Julian Day Number of
 *						the origin of the internal time 
 *						representation in the TAI standard.
 */
//-------------------------------------------------------
Time.getOriginModifiedJulianDayNumberTAI = function() {
	//return Time.ORIGIN_MODIFIED_JULIAN_DAY_NUMBER_TAI;
	return 41317
};

Time.prototype.calculateWriteSize = function() {

	// Sum the sizes of the fields.
	var size = 0;
	size += CPPSerializer.sizeOf(this.seconds);
	size += CPPSerializer.sizeOf(this.fractions);
	size += CPPSerializer.sizeOf(this.setFlag);

	// Return the answer.
	return size;
};

Time.prototype.fromXMLNode = function(tagNode) {
	var attributes = tagNode.getAttributes();
	var set = null;
	var utctime = null;
	for (var k = 0; k <attributes.getLength(); k++) {
		var attribue = attributes.item(k);
		var attrName = attribue.getNodeName();
		var attrVal = attribue.getNodeValue();
		if (attrName.equals("set")) {
			set = attrVal;
		} else if (attrName.equals("UTCTime")) {
			utctime = attrVal;
		} else {
			// TODO: Log.warning("unexpected attribute: " + attrName + " = " + attrVal + " in " + tagNode);
			return false;
		}		
	}

	// Check set flag.
	if (set == null) {
		// TODO: Log.warning("missing set attribute in " + tagNode);
		return false;
	}

	if (set.compareTo("N") == 0) {
		this.setFlag = false;
		this.seconds = 0;
		this.fractions = 0.0;
		if (utctime != null) {
			// TODO: Log.warning("spurious attributes after set in " + tagNode);
		}
		return true;		
	} else if (set.compareTo("Y") != 0) {
			//TODO : Log.warning("invalid set attribute in " + tagNode);
			return false;
		}
		
		//  Get and set the value.
		if (utctime == null) {
			// TODO: Log.warning("missing value attribute in " + tagNode);
			return false;
		}
		return UTCTime.convertFromString(utctime, this);
};

Time.prototype.fromXMLString = function(tagStr) {
	//	What follows is an absurd amount of machinery to
	//  process a one-line tag.  The only benefit brought
	//  by this machinery is immunity from white-space
	//  variations.
	
	//  Enclose the supplied tag in a document begin/end.
	var buf = new StringBuffer();
	buf.append("<xml>");
	buf.append(tagStr);
	buf.append("</xml>");

	//  Get the document as a byte array, and wrap
	//  into a ByteArrayInputStream.
	var tagBytes = buf.toString().getBytes();
	var tagBais = new ByteArrayInputStream(tagBytes);

	// Build a document parser and process the 
	// contents of the document.
	var dbf = DocumentBuilderFactory.newInstance();
	var db = null;

	try {
		db = dbf.newDocumentBuilder();
	} catch (err) {
		// TODO: Log.warning("could not build document " + "builder: " + pce);
			return false;
	}
	var doc = null;
	try {
			doc = db.parse(tagBais);
		} catch (err) {
			// TODO: Log.warning("could not parse document: " + saxe);
			return false;
		} /*catch (err) {
			// TODO: Log.warning("could not parse document: " + ioe);
			return false;
		}*/
		var  times = doc.getElementsByTagName(Time.XMLClassName);
		var	numTimes = times.getLength();
		if (numTimes <= 0) { 
			// TODO: Log.warning("no time listed in " + tagStr);
			return false;
		}
		if (numTimes > 1) {
			// TODO: Log.warning("more than one time listed in " + tagStr);
			return false;
		}
		var scalar = times.item(0);
		return this.fromXMLNode(scalar);
};

Time.prototype.toXMLString = function() {
	var	retval = new StringBuffer();
	retval.append("<");
	retval.append(Time.XMLClassName);
	retval.append(" set=\"");
	if (!this.setFlag) {
		retval.append("N\"/>");
		return retval.toString();
	}
	retval.append("Y\" UTCTime=\"");
	retval.append(UTCTime.convertToString(this));
	retval.append("\"/>");
	return retval.toString();
};

Time.prototype.isValueSet = function() {
	return this.isSet();
};

Time.prototype.compareTo = function(anotherTime) {
	return (this.opLess(anotherTime) ? -1 : (this.opEq(anotherTime) ? 0 : 1));
};

Time.min = function(times) {
	var result = Time.dummy();

	var t;
	for (t in times) {
		if (t != null && t.isValueSet() && !t.opEq(dummy())){
			if (!result.isValueSet()||result.opEq(dummy()) || result.opGreat(t)){
				result.opAssign(t);
			}
			
		}
	}
	return result;	
};

Time.max = function(times) {
	var result = Times.dummy();
	var t;
	for (t in times){
		if (t != null && t.isValueSet() && !t.opEq(dummy())){
			if (!result.isValueSet()||result.opEq(dummy()) || result.opLess(t)){
				result.opAssign(t);
			}
		}
	}
	return result;
};

	return Time;
})

