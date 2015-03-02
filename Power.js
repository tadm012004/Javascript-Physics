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
//  File:                    Power.C
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
// POWER	
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


Power.prototype.setValue = function(val) {
	//Sets the value;
	this.value = val;
	
	//  Remember that we've set the value.
	this.setFlag = true;
	
	//  This cast will always be valid since GenericScalar is
	//  abstract and self-bounded, and all sub-classes are final.
	return this;
};

Power.prototype.getValue = function() {
	if (!this.setFlag) {
		throw "NotSetException";
	}
	return this.value;
};

function Power() {
	//---------------------------------------------------------
	//
	//  POWER	
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
	// POWER	
	//
	/**	Copy constructor.
	 *
	 *	@param	s		The Power to be copied.
	 *
	 *	@throws			NotSetException if the supplied
	 *					Power is not set.
	 */
	//---------------------------------------------------------
	//---------------------------------------------------------
	//
	//	
	//
	/**	This copy constructor is a user-defined conversion
	 *  from GenericScalar<Power> to Power.  
	 *
	 *	@param	s		The GenericScalar<Power> to be 
	 *						converted.
	 *
	 *	@throws			NotSetException if the supplied
	 *					GenericScalar<Power> is not set.
	 */
	//---------------------------------------------------------
	else if (arguments.length == 1) {
		this.setValue(arguments[0]);
	}
}
/**	This method sets the power in watts.
 *
 *	@param	h2			The power in watts.
 *
 *	@return				The power. 
 */
//---------------------------------------------------------
Power.prototype.setInWatts = function(h2) {
	this.setValue(h2);
	return this;
};

/**    This method sets the power in dBm.
 *     W (watts) = (10 ^ (dBm / 10)) / 1000
*
*  @param  h2          The power in watts.
*
*  @return             The power. 
*/
//---------------------------------------------------------
Power.prototype.setIndBm = function(dBm) {
   var W = 0.001 * Math.pow(10.0, (0.1 * dBm));
   this.setValue(W);
   return this;
};

//---------------------------------------------------------
//
//	GETINWATTS
//
/**	This method gets the power in watts.
 *
 *	@return				The power in watts.
 *
 *	@throws				NotSetException if this 
 *							Power is not set.
 */
//---------------------------------------------------------
Power.prototype.getInWatts = function() {
	return this.getValue();
};

//---------------------------------------------------------
//
//  GETINDBM
//
/** This method gets the power in dBm.
 *
 *  @return             The power in dBm.
 *
 *  @throws             NotSetException if this 
 *                          Power is not set.
 */
//---------------------------------------------------------
Power.prototype.getIndBm = function() {
    var W = this.getValue();
    return 10.0 * Math.log10(W * 1000.0);
};

Power.getDefaultUnits = function() {
	return "Watts";
};

Power.ScalarTypeConstructorSurrogate = function(s)  {
	return new Power(s);
};

Power.getScalarName = function() {
	return "Power";
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
Power.zero = function() {
	return new Power().setValue(0.0);
};

	return Power;
});
