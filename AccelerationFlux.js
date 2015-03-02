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
//  File:                    AccelerationFluxFlux.C
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
//	ACCELERATIONFLUX
//
/**	This class encapsulates the concept of an acceleration flux.  The 
 *	flux may be positive or negative, indicating direction through some
 *  (unencapsulated) reference.  
 * 	<br><br>
 *	For the curious, this dimension is not common.  It arises from taking
 *	the product of the universal gravitational constant with the attracting
 *	mass, i.e.,
 *
 *		G m1
 *
 *	is in units of acceleration flux [m^3 / s^2].
 *	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================
define(function() {
	"use strict";


function AccelerationFlux() {
	//---------------------------------------------------------
	//
	//	ACCELERATIONFLUX
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
	//	SETINMETERSCUBEDPERSECONDPERSECOND
	//
	/**	This method sets the acceleration flux in 
	 *  meters^3 / second^2.
	 *
	 *	@param	m3ps2	The acceleration flux in meters cubed per
	 *						per second squared.
	 *
	 *	@return				The acceleration flux.
	 */
	//---------------------------------------------------------
	else if (arguments.length == 1) {
		this.setValue(arguments[0]);
	}
}


AccelerationFlux.prototype.setValue = function(val) {
	//Sets the value;
	this.value = val;
	
	//  Remember that we've set the value.
	this.setFlag = true;
	
	//  This cast will always be valid since GenericScalar is
	//  abstract and self-bounded, and all sub-classes are final.
	return this;
};

AccelerationFlux.prototype.getValue = function() {
	if (!this.setFlag) {
		throw "NotSetException";
	}
	return this.value;
};



//---------------------------------------------------------
//
//	SETINMETERSCUBEDPERSECONDPERSECOND
//
/**	This method sets the acceleration flux in 
 *  meters^3 / second^2.
 *
 *	@param	m3ps2	The acceleration flux in meters cubed per
 *						per second squared.
 *
 *	@return				The acceleration flux.
 */
//---------------------------------------------------------
AccelerationFlux.prototype.setInMetersCubedPerSecondPerSecond = function(m3ps2) {
	this.setValue(m3ps2);
	return this;
};

//---------------------------------------------------------
//
//	GETINMETERSCUBEDPERSECONDPERSECOND
//
/**	This method gets the acceleration flux in 
 *  meters ^3 / second^2.
 *
 *	@return			The acceleration flux in meters cubed 
 *						per second squared.
 *
 *	@throws			NotSetException if the value of
 *							this AccelerationFlux has not 
 *							been set.
 */
//---------------------------------------------------------
AccelerationFlux.prototype.getInMeterCubedPerSecondPerSecond = function() {
	return this.getValue();
};

//------------------------------------------------------------
//
//	GETDEFAULTUNITS
//
/**	This method should be overridden by every specific scalar
 *  type to supply the string description of the type's
 *  default units, e.g., "meters".  
 *
 *	@return			The default units for the type.
 */
//------------------------------------------------------------
AccelerationFlux.getDefaultUnits = function() {
	return "meters^3/second^2";
};

AccelerationFlux.ScalarTypeConstructorSurrogate = function(s) {
	return new AccelerationFlux(s);
};

AccelerationFlux.getScalarName = function() {
	return "AccelerationFlux";
};
//-----------------------------------------------------------
//
//	ZERO
//
/**	Useful static method should be provided for each
 *  scalar.
 *  
 *  @return				A set AccelerationFlux scalar with
 *  					a value of zero.
 *  
 */
//-----------------------------------------------------------
AccelerationFlux.zero = function() {
	return new AccelerationFlux().setInMetersCubedPerSecondPerSecond(0.0);
};

return AccelerationFlux;
});



