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
//  File:                    AngularAcceleration.C
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
//	ANGULARACCELERATION
//
/**	This class encapsulates the concept of an angular acceleration.  The 
 *	acceleration may be positive or negative, indicating direction from some
 *  (unencapsulated) reference.
 * 	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================

define(["AngularLength"], function(AngularLength) {

AngularAcceleration.prototype.setValue = function(val) {
	//Sets the value;
	this.value = val;
	
	//  Remember that we've set the value.
	this.setFlag = true;
	
	//  This cast will always be valid since GenericScalar is
	//  abstract and self-bounded, and all sub-classes are final.
	return this;
};

AngularAcceleration.prototype.getValue = function() {
	if (!this.setFlag) {
		throw "NotSetException";
	}
	return this.value;
};

function AngularAcceleration() {
	//---------------------------------------------------------
	//
	//	ANGULARACCELERATION
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
	//	ANGULARACCELERATION
	//
	/**	This copy constructor is a user-defined conversion
	 *  from GenericScalar<AngularAcceleration> to 
	 *  AngularAcceleration.  
	 *
	 *	@param	s		The GenericScalar<AngularAcceleration> 
	 *						to be converted.
	 *
	 *	@throws			NotSetException if the supplied
	 *					GenericScalar<AngularAcceleration>
	 *					is not set.
	 */
	//---------------------------------------------------------
	//---------------------------------------------------------
	//
	//	ANGULARACCELERATION
	//
	/**	Copy constructor.
	 *
	 *	@param	s		The AngularAcceleration to be copied.
	 *
	 *	@throws			NotSetException if the supplied
	 *					AngularAcceleration
	 *					is not set.
	 */
	//---------------------------------------------------------
	else if (arguments.length == 1) {
		this.setValue(arguments[0]);
	}
}

//---------------------------------------------------------
//
//	SETINRADIANSPERSECONDPERSECOND
//
/**	This method sets the angular acceleration in radians 
 *  per second^2.
 *
 *	@param	rps2		The angular acceleration in 
 *							radians per second^2.
 *
 *	@return				The angular acceleration.
 */
//---------------------------------------------------------
AngularAcceleration.prototype.setInRadiansPerSecondPerSecond = function(rps2) {
	this.setValue(rps2);
	return this;
};

//---------------------------------------------------------
//
//	SETINDEGREESPERSECONDPERSECOND
//
/**	This method sets the angular acceleration in 
 *  degrees per second^2.
 *
 *	@param	dps2		The angular acceleration in 
 *							degrees per second^2.
 *
 *	@return				The angular acceleration.
 */
//---------------------------------------------------------
AngularAcceleration.prototype.setInDegreesPerSecondPerSecond = function(dps2) {
	this.setValue(dps2 * AngularAcceleration.getRPS2_PER_DPS2());
	return this;
};

//---------------------------------------------------------
//
//	GETINRADIANSPERSECONDPERSECOND
//
/**	This method gets the angular acceleration in 
 *	radians per second^2.
 *
 *	@return				The angular acceleration in 
 *							radians per second^2.
 *
 *	@throws				NotSetException if the value of
 *							this AngularAcceleration has 
 *							not been set.
 */
//---------------------------------------------------------
AngularAcceleration.prototype.getInRadiansPerSecondPerSecond = function() {
	return this.getValue();
};

//---------------------------------------------------------
//
//	GETINDEGREESPERSECONDPERSECOND
//
/**	This method gets the angular acceleration in 
 *	degrees per second^2.
 *
 *	@return				The angular acceleration in 
 *							degrees per second^2.
 *
 *	@throws				NotSetException if the value of
 *							this AngularAcceleration has 
 *							not been set.
 */
//---------------------------------------------------------
AngularAcceleration.prototype.getInDegreesPerSecondPerSecond = function() {
	return (this.getValue() * AngularAcceleration.getDPS2_PER_RPS2());
};

//------------------------------------------------------------
//
//	GETRPS2_PER_DPS2
//
/**	Returns the number of radians/s^2 in one degree/s^2
 *
 *	@return				The number of rad/s^2 in one deg/s^2.
 */
//------------------------------------------------------------
AngularAcceleration.getRPS2_PER_DPS2 = function() {
	var RPS2_PER_DPS2 = AngularLength.getRADIANS_PER_DEGREE();
	return RPS2_PER_DPS2;
};

//------------------------------------------------------------
//
//	GETDPS2_PER_RPS2
//
/**	Returns the number of degrees/s^2 in one radian/s^2
 *
 *	@return				The number of deg/s^2 in one rad/s^2.
 */
//------------------------------------------------------------
AngularAcceleration.getDPS2_PER_RPS2 = function() {
	var DPS2_PER_RPS2 =	AngularLength.getDEGREES_PER_RADIAN();
	return DPS2_PER_RPS2;
};

AngularAcceleration.getDefaultUnits = function() {
	return "radians/second^2";
};

AngularAcceleration.ScalarTypeConstructorSurrogate = function(s) {
	return new AngularAcceleration(s);
};

AngularAcceleration.getScalarName = function() {
	return "AngularAcceleration";
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
AngularAcceleration.zero = function() {
	return new AngularAcceleration().setValue(0.0);
};

return AngularAcceleration;

});



