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
//  File:                    Acceleration.C
//  Classification:          UNCLASSIFIED
//  Proprietary Information: NONE
//  Release:                 Controlled by NAVSEA61, Government Program Office
//
//  Programmer:              R. Conn
//  Description:             see below
//
//  Reviewed By:             Tim McGee on March 21, 2007
//  Notes:                   
//
//========================================================================
//
//	ACCELERATION
//
/**	This class encapsulates the concept of a linear acceleration.  The 
 *	acceleration may be positive or negative, indicating direction from some
 *  (unencapsulated) reference.
 * 	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================
define(["Length"], function(Length) {
	//"use strict";
	function Acceleration() {
		//---------------------------------------------------------
		//
		//	ACCELERATION
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
		//	ACCELERATION
		//
		/**	This copy constructor is a user-defined conversion
		 *  from GenericScalar<Acceleration> to Acceleration.  
		 *
		 *	@param	s		The GenericScalar<Acceleration> to 
		 *						be converted.
		 *
		 *	@throws			NotSetException if the supplied
		 *					GenericScalar<Acceleration> has not
		 *					been set.
		 */
		//---------------------------------------------------------
		//---------------------------------------------------------
		//
		//	ACCELERATION
		//
		/**	Copy constructor.
		 *
		 *	@param	s		The Acceleration to be copied.
		 *
		 *	@throws			NotSetException if the supplied
		 *					Acceleration has not been set.
		 */
		//---------------------------------------------------------
		else if (arguments.length == 1) {
			this.setValue(arguments[0]);
		}
	}

	Acceleration.prototype.setValue = function(val) {
	//Sets the value;
	this.value = val;
	
	//  Remember that we've set the value.
	this.setFlag = true;
	
	//  This cast will always be valid since GenericScalar is
	//  abstract and self-bounded, and all sub-classes are final.
	return this;
};

Acceleration.prototype.getValue = function() {
	if (!this.setFlag) {
		throw "NotSetException";
	}
	return this.value;
};


Acceleration.prototype.setInMetersPerSecondPerSecond = function(mps2) {
	this.setValue(mps2);
	return this;
};

//---------------------------------------------------------
//
//	SETINKILOMETERSPERSECONDPERSECOND
//
/**	This method sets the acceleration in km / second^2
 *
 *	@param	kmps2		The acceleration in km per second
 *							per second.
 *
 *	@return				The acceleration.
 */
//---------------------------------------------------------
Acceleration.prototype.setInKilometersPerSecondPerSecond = function(kmps2) {
	this.setValue(kmps2 * Acceleration.getMPS2_PER_KMPS2());
	return this;
};

//---------------------------------------------------------
//
//	SETINFEETPERSECONDPERSECOND
//
/**	This method sets the acceleration in feet per second^2
 *
 *	@param	fps2	The acceleration in feet per second
 *						per second.
 *
 *	@return			The acceleration.
 */
//---------------------------------------------------------
Acceleration.prototype.setInFeetPerSecondPerSecond = function(fps2) {
	this.setValue(fps2 * Acceleration.getMPS2_PER_FPS2());
	return this;
};

//---------------------------------------------------------
//
//	SETINKILOYARDSPERSECONDPERSECOND
//
/**	This method sets the acceleration in kiloyards per second^2
 *
 *	@param	kyps2		The acceleration in kiloyards per 
 *							second per second.
 *
 *	@return				The acceleration.
 */
//---------------------------------------------------------
Acceleration.prototype.setInKiloyardsPerSecondPerSecond  = function(kyps2) {
	this.setValue(kyps2 * Acceleration.getMPS2_PER_KYPS2());
	return this;
};

//---------------------------------------------------------
//
//	SETINDATAMILESPERSECONDPERSECOND
//
/**	This method sets the acceleration in data miles per second^2
 *
 *	@param	dmps2		The acceleration in data miles per 
 *							second per second
 *
 *	@return				The acceleration.
 */
//---------------------------------------------------------
Acceleration.prototype.setInDataMilesPerSecondPerSecond  = function(dmps2) {
	this.setValue(dmps2 * Acceleration.getMPS2_PER_DMPS2());
	return this;
};

//---------------------------------------------------------
//
//	SETINSTATUTEMILESPERSECONDPERSECOND
//
/**	This method sets the acceleration in statute miles per 
 *	second^2.
 *
 *	@param	mips2		The acceleration in statute miles 
 *							per second per second.
 *
 *	@return				The acceleration.
 */
//---------------------------------------------------------
Acceleration.prototype.setInStatuteMilesPerSecondPerSecond  = function(mips2) {
	this.setValue(mips2 * Acceleration.getMPS2_PER_MIPS2());
	return this;
};

//---------------------------------------------------------
//
//	SETINNAUTICALMILESPERSECONDPERSECOND
//
/**	This method sets the acceleration in nautical miles
 *	per second^2
 *
 *	@param	nmps2		The acceleration in nautical miles
 *							per second per second.
 *
 *	@return				The acceleration.
 */
//---------------------------------------------------------
Acceleration.prototype.setInNauticalMilesPerSecondPerSecond  = function(nmps2) {
	this.setValue(nmps2 * Acceleration.getMPS2_PER_NMPS2());
	return this;
};

//---------------------------------------------------------
//
//	GETINMETERSPERSECONDPERSECOND
//
/**	This method gets the acceleration in meters / second^2.
 *
 *	@return			The acceleration in meters per second
 *						per second.
 *
 *	@throws			NotSetException if the value of
 *							this Acceleration has not been set.
 */
//---------------------------------------------------------
Acceleration.prototype.getInMetersPerSecondPerSecond = function() {
	return this.getValue();
};

//---------------------------------------------------------
//
//	GETINKILOMETERSPERSECONDPERSECOND
//
/**	This method gets the acceleration in km / second^2
 *
 *	@return			The acceleration in km per second
 *							per second.
 *
 *	@throws			NotSetException if the value of
 *							this Acceleration has not been set.
 */
//---------------------------------------------------------
Acceleration.prototype.getInKilometersPerSecondPerSecond = function() {
	return this.getValue() * Acceleration.getKMPS2_PER_MPS2();
};

//---------------------------------------------------------
//
//	GETINFEETPERSECONDPERSECOND
//
/**	This method gets the acceleration in feet per second^2
 *
 *	@return			The acceleration in feet per second
 *						per second.
 *
 *	@throws			NotSetException if the value of
 *							this Acceleration has not been set.
 */
//---------------------------------------------------------
Acceleration.prototype.getInFeetPerSecondPerSecond = function() {
	return this.getValue() * Acceleration.getFPS2_PER_MPS2();
};

//---------------------------------------------------------
//
//	GETINKILOYARDSPERSECONDPERSECOND
//
/**	This method gets the acceleration in kiloyards per second^2
 *
 *	@return				The acceleration in kiloyards per 
 *							second per second.
 *
 *	@throws				NotSetException if the value of
 *							this Acceleration has not been set.
 */
//---------------------------------------------------------
Acceleration.prototype.getInKiloyardsPerSecondPerSecond = function() {
	return this.getValue() * Acceleration.getKYPS2_PER_MPS2();
};

//---------------------------------------------------------
//
//	GETINDATAMILESPERSECONDPERSECOND
//
/**	This method gets the acceleration in data miles per second^2
 *
 *	@return				The acceleration in data miles per 
 *							second per second
 *
 *	@throws				NotSetException if the value of
 *							this Acceleration has not been set.
 */
//---------------------------------------------------------
Acceleration.prototype.getInDataMilesPerSecondPerSecond = function() {
	return this.getValue() * Acceleration.getDMPS2_PER_MPS2();
};

//---------------------------------------------------------
//
//	GETINSTATUTEMILESPERSECONDPERSECOND
//
/**	This method gets the acceleration in statute miles per 
 *	second^2.
 *
 *	@return				The acceleration in statute miles 
 *							per second per second.
 *
 *	@throws				NotSetException if the value of
 *							this Acceleration has not been set.
 */
//---------------------------------------------------------
Acceleration.prototype.getInStatuteMilesPerSecondPerSecond = function() {
	return this.getValue() * Acceleration.getMIPS2_PER_MPS2();
};

//---------------------------------------------------------
//
//	GETINNAUTICALMILESPERSECONDPERSECOND
//
/**	This method gets the acceleration in nautical miles
 *	per second^2
 *
 *	@return				The acceleration in nautical miles
 *							per second per second.
 *
 *	@throws				NotSetException if the value of
 *							this Acceleration has not been set.
 */
//---------------------------------------------------------
Acceleration.prototype.getInNauticalMilesPerSecondPerSecond = function() {
	return this.getValue() * Acceleration.getNMPS2_PER_MPS2();
};

//------------------------------------------------------------
//
//	GETMPS2_PER_KMPS2
//
/**	Returns the number of m/s^2 in one km/s^2
 *
 *	@return				The number of m/s^2 in one km/s^2.
 */
//------------------------------------------------------------
Acceleration.getMPS2_PER_KMPS2 = function() {
	var MPS2_PER_KMPS2 = Length.getMETERS_PER_KILOMETER();
	return MPS2_PER_KMPS2;
};

//------------------------------------------------------------
//
//	GETMPS2_PER_FPS2
//
/**	Returns the number of m/s^2 in one foot/s^2
 *
 *	@return				The number of m/s^2 in one foot/s^2.
 */
//------------------------------------------------------------
Acceleration.getMPS2_PER_FPS2 = function() {
	var MPS2_PER_FPS2 = Length.getMETERS_PER_FOOT();
	return MPS2_PER_FPS2;
};

//------------------------------------------------------------
//
//	GETMPS2_PER_KYPS2
//
/**	Returns the number of m/s^2 in one kyard/s^2
 *
 *	@return				The number of m/s^2 in one kyard/s^2.
 */
//------------------------------------------------------------
Acceleration.getMPS2_PER_KYPS2 = function() {
	var MPS2_PER_KYPS2 = Length.getMETERS_PER_KILOYARD();
	return MPS2_PER_KYPS2;
};

//------------------------------------------------------------
//
//	GETMPS2_PER_DMPS2
//
/**	Returns the number of m/s^2 in one datamile/s^2
 *
 *	@return				The number of m/s^2 in one datamile/s^2.
 */
//------------------------------------------------------------
Acceleration.getMPS2_PER_DMPS2 = function() {
	var MPS2_PER_DMPS2 = Length.getMETERS_PER_DATA_MILE();
	return MPS2_PER_DMPS2;
};

//------------------------------------------------------------
//
//	GETMPS2_PER_MIPS2
//
/**	Returns the number of m/s^2 in one statute mile/s^2
 *
 *	@return				The number of m/s^2 in one mile/s^2.
 */
//------------------------------------------------------------
Acceleration.getMPS2_PER_MIPS2 = function() {
	var MPS2_PER_MIPS2 = Length.getMETERS_PER_STATUTE_MILE();
	return MPS2_PER_MIPS2;
};

//------------------------------------------------------------
//
//	GETMPS2_PER_NMPS2
//
/**	Returns the number of m/s^2 in one nautical mile/s^2
 *
 *	@return				The number of m/s^2 in one nm/s^2.
 */
//------------------------------------------------------------
Acceleration.getMPS2_PER_NMPS2 = function() {
	var MPS2_PER_NMPS2 = Length.getMETERS_PER_NAUTICAL_MILE();
	return MPS2_PER_NMPS2;
};

//------------------------------------------------------------
//
//	GETKMPS2_PER_MPS2
//
/**	Returns the number of km/s^2 in one m/s^2
 *
 *	@return				The number of km/s^2 in one m/s^2.
 */
//------------------------------------------------------------
Acceleration.getKMPS2_PER_MPS2 = function() {
	var KMPS2_PER_MPS2 = Length.getKILOMETERS_PER_METER();
	return KMPS2_PER_MPS2;
};

//------------------------------------------------------------
//
//	GETFPS2_PER_MPS2
//
/**	Returns the number of feet/s^2 in one m/s^2
 *
 *	@return				The number of feet/s^2 in one m/s^2.
 */
//------------------------------------------------------------
Acceleration.getFPS2_PER_MPS2 = function() {
	var FPS2_PER_MPS2 = Length.getFEET_PER_METER();
	return FPS2_PER_MPS2;
};

//------------------------------------------------------------
//
//	GETKYPS2_PER_MPS2
//
/**	Returns the number of kiloyards/s^2 in one m/s^2
 *
 *	@return				The number of kyards/s^2 in one m/s^2.
 */
//------------------------------------------------------------
Acceleration.getKYPS2_PER_MPS2 = function() {
	var KYPS2_PER_MPS2 = Length.getKILOYARDS_PER_METER();
	return KYPS2_PER_MPS2;
};

//------------------------------------------------------------
//
//	GETDMPS2_PER_MPS2
//
/**	Returns the number of datamiles/s^2 in one m/s^2
 *
 *	@return				The number of dmiles/s^2 in one m/s^2.
 */
//------------------------------------------------------------
Acceleration.getDMPS2_PER_MPS2 = function() {
	var DMPS2_PER_MPS2 = Length.getDATA_MILES_PER_METER();
	return DMPS2_PER_MPS2;
};

//------------------------------------------------------------
//
//	GETMIPS2_PER_MPS2
//
/**	Returns the number of statute miles/s^2 in one m/s^2
 *
 *	@return				The number of miles/s^2 in one m/s^2.
 */
//------------------------------------------------------------
Acceleration.getMIPS2_PER_MPS2 = function() {
	var MIPS2_PER_MPS2 = Length.getSTATUTE_MILES_PER_METER();
	return MIPS2_PER_MPS2;
};

//------------------------------------------------------------
//
//	GETNMPS2_PER_MPS2
//
/**	Returns the number of nautical miles/s^2 in one m/s^2
 *
 *	@return				The number of nm/s^2 in one m/s^2.
 */
//------------------------------------------------------------
Acceleration.getNMPS2_PER_MPS2 = function() {
	var NMPS2_PER_MPS2 = Length.getNAUTICAL_MILES_PER_METER();
	return NMPS2_PER_MPS2;
};

Acceleration.getDefaultUnits = function() {
	return "meters/second^2";
};

Acceleration.ScalarTypeConstructorSurrogate = function(s) {
	return new Acceleration(s);
};

Acceleration.getScalarName = function() {
	return "Acceleration";
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
Acceleration.zero = function() {
	return new Acceleration().setValue(0.0);
};


return Acceleration;
});


