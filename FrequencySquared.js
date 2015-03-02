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
//  File:                    FrequencySquared.C
//  Classification:          UNCLASSIFIED
//  Proprietary Information: NONE
//  Release:                 Controlled by NAVSEA61, Government Program Office
//
//  Programmer:     		 R. Conn         
//  Description:             see below
//
//  Reviewed By:             Tim McGee on March 21, 2007
//  Notes:                   
//
//========================================================================
//
//	FREQUENCYSQUARED
//
/**	This class encapsulates the concept of a quantity with units of
 *	1/time^2.  The quantity may be algebraically positive or negative.
 * 	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================

define(function() {
"use strict";



FrequencySquared.prototype.setValue = function(val) {
	//Sets the value;
	this.value = val;
	
	//  Remember that we've set the value.
	this.setFlag = true;
	
	//  This cast will always be valid since GenericScalar is
	//  abstract and self-bounded, and all sub-classes are final.
	return this;
};

FrequencySquared.prototype.getValue = function() {
	if (!this.setFlag) {
		throw "NotSetException";
	}
	return this.value;
};

function FrequencySquared() {
	//---------------------------------------------------------
	//
	//	FREQUENCYSQUARED
	//
	/**	We must explicitly define the ordinarily default 
	 *  constructor since we define a copy constructor below.
	 */
	//---------------------------------------------------------
	if (arguments.length == 0) {
		this.value = 0.0
		this.setFlag = false;		
	} 
	//---------------------------------------------------------
	//
	//	FREQUENCYSQUARED
	//
	/**	This copy constructor is a user-defined conversion
	 *  from GenericScalar<FrequencySquared> to FrequencySquared.  
	 *
	 *	@param	s		The GenericScalar<FrequencySquared> to be 
	 *						converted.
	 *
	 *	@throws			NotSetException if the supplied
	 *					GenericScalar<FrequencySquared> is not set.
	 */
	//---------------------------------------------------------
	//
	//	FREQUENCYSQUARED
	//
	/**	This copy constructor is a user-defined conversion
	 *  from GenericScalar<FrequencySquared> to FrequencySquared.  
	 *
	 *	@param	s		The GenericScalar<FrequencySquared> to be 
	 *						converted.
	 *
	 *	@throws			NotSetException if the supplied
	 *					GenericScalar<FrequencySquared> is not set.
	 */
	//---------------------------------------------------------
	else if (arguments.length == 1) {
		this.setValue(arguments[0]);
	}
}

//---------------------------------------------------------
//
//	SETINHERTZSQUARED
//
/**	This method sets the frequency squared in Hertz^2.
 *
 *	@param	h2			The frequency squared in Hertz^2.
 *
 *	@return				The frequency squared.
 */
//---------------------------------------------------------
FrequencySquared.prototype.setInHertzSquared = function(h2) {
	this.setValue(h2);
	return this;
};

//---------------------------------------------------------
//
//	GETINHERTZSQUARED
//
/**	This method gets the frequency squared in Hertz^2.
 *
 *	@return				The frequency squared in Hertz^2.
 *
 *	@throws				NotSetException if this 
 *							FrequencySquared is not set.
 */
//---------------------------------------------------------
FrequencySquared.prototype.getInHertzSquared = function() {
	return this.getValue();
};

FrequencySquared.getDefaultUnits = function() {
	return "Hertz^2";
};

FrequencySquared.ScalarTypeConstructorSurrogate = function(s) {
	return new FrequencySquared(s);
};

FrequencySquared.getScalarName = function() {
	return "FrequencySquared";
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
FrequencySquared.zero = function() {
	return new FrequencySquared().setValue(0.0);
};

return FrequencySquared;
});
