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
//  File:                    Probability.C
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
//	PROBABILITY
//
/**	This class encapsulates the concept of a single probability number.  
 *	The probability is restricted to the range 0 .. 1.
 * 	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================

define(function() {
	"use strict";


Probability.prototype.setValue = function(val) {
	//Sets the value;
	this.value = val;
	
	//  Remember that we've set the value.
	this.setFlag = true;
	
	//  This cast will always be valid since GenericScalar is
	//  abstract and self-bounded, and all sub-classes are final.
	return this;
};

Probability.prototype.getValue = function() {
	if (!this.setFlag) {
		throw "NotSetException";
	}
	return this.value;
};

function Probability() {
	//---------------------------------------------------------
	//
	//	PROBABILITY
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
	//	PROBABILITY
	//
	/**	This copy constructor is a user-defined conversion
	 *  from GenericScalar<Probability> to Probability.  
	 *
	 *	@param	sp		The GenericScalar<Probability> to be 
	 *						converted.
	 *
	 *	@throws			NotSetException if the supplied 
	 *						probability is not set.
	 */
	//---------------------------------------------------------
	else if (arguments.length == 1) {
		this.setValue(arguments[0]);
	}
}
//---------------------------------------------------------
//
//	SETPROBABILITY
//
/**	This method sets the probability.  Probability is
 *	really unitless.
 *
 *	@param	p			The probability.
 *
 *	@return				The probability.
 */
//---------------------------------------------------------
Probability.prototype.setProbability = function(p) {
	this.setValue(p);
	return this;
};

//---------------------------------------------------------
//
//	GETPROBABILITY
//
/**	This method gets the probability.  Probability is
 *	unitless.
 *
 *	@return				The probability.
 *
 *	@throws				NotSetException if this probability
 *						is not set.
 */
//---------------------------------------------------------
Probability.prototype.getProbability = function() {
	return this.getValue();
};

//-----------------------------------------------------------
//
//	OPERATOR *
//
/**	Need a specialized Probability * Probability operator
 *	since the compiler cannot decide between the equally
 *	specific GenericScalar * Probability and 
 *	Probability * GenericScalar functions.
 *
 *	@param	rhs			The Probability by which to
 *							multiply this Probability.
 *
 *	@return				A new probability equal to this
 *							probability times the
 *							supplied probability.
 *
 *	@throws				NotSetException if the supplied
 *							probability is not set.
 */
//-----------------------------------------------------------
Probability.prototype.opMult = function(rhs)  {
	//return rhs.opMult(this.getProbability());
	return new Probability(this.getProbability() * rhs.getProbability());
};

//------------------------------------------------------------
//
//  CHECKVALUE
//
/**	This method will throw a NegativeException if the
 *	supplied probability is less than zero, and a 
 *	BadProbabilityException if the supplied probability
 *	is greater than 1.
 *
 *	@param	v	The value that will be set.
 *
 *	@throws		IllegalArgumentException if the supplied 
 *					probability is greater than 1 or 
 *					less than zero.
 */
//------------------------------------------------------------
Probability.checkValue = function(v) {
	if ((v < 0.0) || (v > 1.0)) {
		throw "IllegalArgumentException";
	}
};

Probability.getDefaultUnits = function() {
	return "probability";
};

Probability.ScalarTypeConstructorSurrogate = function(s) {
	return new Probability(s);
};

Probability.getScalarName = function() {
	return "Probability";
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
Probability.zero = function() {
	return new Probability().setValue(0.0);
};
	return Probability;
});
