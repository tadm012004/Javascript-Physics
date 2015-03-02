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
//  File:                    TimeLengthSquared.C
//  Classification:          UNCLASSIFIED
//  Proprietary Information: NONE
//  Release:                 Controlled by NAVSEA61, Government Program Office
//
//  Programmer:				 R. Conn              
//  Description:             see below
//
//  Reviewed By:             Tim McGee on March 21, 2007
//  Notes:                   
//
//========================================================================
//
//	TIMELENGTHSQUARED
//
/**	This class encapsulates the concept of a quantity that has units
 *	of time^2.  The quantity may be algebraically positive or negative.
 * 	<br><br>
 *	The TimeLengthSquared class will store time lengths internally in SI
 *	seconds squared.
 *	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================
define(["TimeLength"], function(TimeLength) {


TimeLengthSquared.prototype.setValue = function(val) {
	//Sets the value;
	this.value = val;
	
	//  Remember that we've set the value.
	this.setFlag = true;
	
	//  This cast will always be valid since GenericScalar is
	//  abstract and self-bounded, and all sub-classes are final.
	return this;
};

TimeLengthSquared.prototype.getValue = function() {
	if (!this.setFlag) {
		throw "NotSetException";
	}
	return this.value;
};

function TimeLengthSquared() {
	//---------------------------------------------------------
	//
	//	TIMELENGTHSQUARED
	//
	/**	We must explicitly define the ordinarily default 
	 *  constructor since we define a copy constructor below.
	 */
	//---------------------------------------------------------
	if (arguments.length == 0) {
		this.value = 0.0
		this.value = false;		
	} 
	//---------------------------------------------------------
	//
	//	TIMELENGTHSQUARED
	//
	/**	This copy constructor is a user-defined conversion
	 *  from GenericScalar<TimeLengthSquared> to 
	 *  TimeLengthSquared.  
	 *
	 *	@param	s		The GenericScalar<TimeLengthSquared> to be 
	 *						converted.
	 */
	//---------------------------------------------------------
	//---------------------------------------------------------
	//
	//	TIMELENGTHSQUARED
	//
	/**	Copy constructor.
	 *
	 *	@param	s		The TimeLengthSquared to be copied
	 */
	//---------------------------------------------------------
	else if (arguments.length == 1) {
		this.setValue(arguments[0]);
	}
}

//---------------------------------------------------------
//
//	SETINSECONDSSQUARED
//
/**	This method sets the time length in SI seconds^2.
 *  The SI second is the "second" that is in general 
 *  civil use.
 *
 *	@param	s2			The time length in SI seconds^2.
 *
 *	@return				The time length.
 */
//---------------------------------------------------------
TimeLengthSquared.prototype.setInSecondsSquared = function(s2) {
	this.setValue(s2);
	return this;
};

//---------------------------------------------------------
//
//	SETINSIDEREALSECONDSSQAURED
//
/**	This method sets the time length in sidereal seconds^2.
 *  A sidereal second is 1/86400th of a sidereal day.
 *  Since the Earth is slowing down, the relationship
 *	between a sidereal second and an SI second is not
 *	constant.  The length of a sidereal second increases
 *  by about 10 SI nanoseconds each century.  If you're
 *  reading this in the year 2100 A.D., the conversions
 *  in this class might be off by as much as 10 ns / sec.
 *
 *	@param	ss2				The time length in 
 *								sidereal seconds^2.
 *
 *	@return					The time length.
 */
//---------------------------------------------------------
TimeLengthSquared.prototype.setInSiderealSecondsSquared = function(ss2) {
	this.setValue(ss2 * TimeLengthSquared.getSI_SEC_SQ_PER_SIDEREAL_SEC_SQ());
	return this;
};

//---------------------------------------------------------
//
//	GETINSECONDSSQUARED
//
/**	This method gets the time length in SI seconds^2.
 *  This is the "second" that is in general civil use.
 *
 *	@return				The time-length-squared in SI seconds^2.
 *
 *	@throws				NotSetException if this 
 *							TimeLengthSquared is not set.
 */
//---------------------------------------------------------
TimeLengthSquared.prototype.getInSecondsSquared = function() {
	return this.getValue();
};

//---------------------------------------------------------
//
//	GETINSIDEREALSECONDSSQUARED
//
/**	This method gets the time length in sidereal seconds^2.
 *  A sidereal second is 1/86400 of a sidereal day.
 *  Since the Earth is slowing down, the relationship
 *	between a sidereal second and an SI second is not
 *	constant.  The length of a sidereal second increases
 *  by about 10 SI nanoseconds each century.  If you're
 *  reading this in the year 2100 A.D., the conversions
 *  in this class might be off by as much as 10 ns / sec.
 *
 *	@return			The time-length-squared in 
 *						sidereal seconds^2.
 *
 *	@throws			NotSetException if this TimeLengthSquared
 *						has not been set.
 */
//---------------------------------------------------------
TimeLengthSquared.prototype.getInSiderealSecondsSquared = function() {

	return this.getValue() * TimeLengthSquared.getSIDEREAL_SEC_SQ_PER_SI_SEC_SQ();
};

//------------------------------------------------------------
//
//	GETSI_SEC_SQ_PER_SIDEREAL_SEC_SQ
//
/**	Returns the number of SI seconds^2 in one sidereal second^2
 *
 *	@return				The number of SI seconds^2 in one 
 *						sidereal second^2.
 */
//------------------------------------------------------------
TimeLengthSquared.getSI_SEC_SQ_PER_SIDEREAL_SEC_SQ = function() {
	var SI_SEC_SQ_PER_SIDEREAL_SEC_SQ = 
		TimeLength.getSI_SECONDS_PER_SIDEREAL_SECOND() *
		TimeLength.getSI_SECONDS_PER_SIDEREAL_SECOND();
	return SI_SEC_SQ_PER_SIDEREAL_SEC_SQ;
};

//------------------------------------------------------------
//
//	GETSIDEREAL_SEC_SQ_PER_SI_SEC_SQ
//
/**	Returns the number of sidereal seconds^2 in one SI second^2
 *
 *	@return				The number of sidereal seconds^2 in one 
 *						SI second^2.
 */
//------------------------------------------------------------
TimeLengthSquared.getSIDEREAL_SEC_SQ_PER_SI_SEC_SQ = function() {
	var SIDEREAL_SEC_SQ_PER_SI_SEC_SQ =
		TimeLength.getSIDEREAL_SECONDS_PER_SI_SECOND() *
		TimeLength.getSIDEREAL_SECONDS_PER_SI_SECOND();
	return SIDEREAL_SEC_SQ_PER_SI_SEC_SQ;
};

TimeLengthSquared.getDefaultUnits = function() {
	return "seconds^2";
};

TimeLengthSquared.ScalarTypeConstructorSurrogate = function(s) {
	return new TimeLengthSquared(s);
};

TimeLengthSquared.getScalarName = function() {
	return "TimeLengthSquared";
};

//---------------------------------------------------------
//
//	ZERO
//
/**	This static method returns a set zero-valued scalar
 *  of this scalar type.  Cannot be part of GenericScalar
 *  due to type erasure.
 *  
 *  @return				A set zero-valued scalar of this
 *  					scalar type.
 */
//--------------------------------------------------------
TimeLengthSquared.zero = function() {
	return new TimeLengthSquared().setValue(0.0);
};

	return TimeLengthSquared;

 });
