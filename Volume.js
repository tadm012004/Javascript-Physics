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
//  File:                    Volume.C
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
//	VOLUME
//
/**	This class encapsulates the concept of a 3D volume.  The volume
 *	may be algebraically positive or negative.
 * 	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================
define(["Length"], function(Length) {


var value = 0;
var setFlag;
Volume.prototype.setValue = function(val) {
	//Sets the value;
	this.value = val;
	
	//  Remember that we've set the value.
	this.setFlag = true;
	
	//  This cast will always be valid since GenericScalar is
	//  abstract and self-bounded, and all sub-classes are final.
	return this;
};

Volume.prototype.getValue = function() {
	if (!this.setFlag) {
		throw "NotSetException";
	}
	return this.value;
};

function Volume() {
	if (arguments.length == 0) {
		this.value = 0.0
		this.value = false;

	} else if (arguments.length == 1) {
		
		this.setValue(arguments[0]);
	}
}

//---------------------------------------------------------
//
//	SETINMETERSCUBED
//
/**	This method sets the volume in meters^3.
 *
 *	@param	m3			The volume in meters^3.
 *
 *	@return				The volume.
 */
//---------------------------------------------------------
Volume.prototype.setInMetersCubed = function(m3) {
	this.setValue(m3);
	return this;
};

//---------------------------------------------------------
//
//	SETINCUBICCENTIMETERS
//
/**	This method sets the volume in cm^3 (also known as cc).
 *
 *	@param	cm3			The volume in cm^3
 *
 *	@return				The volume.
 */
//---------------------------------------------------------
Volume.prototype.setInCubicCentimeters = function(cm3) {
	this.setValue(cm3 * Volume.getMETERS_CUBED_PER_CENTIMETER_CUBED());
	return this;
};

//---------------------------------------------------------
//
//	SETINLITERS
//
/**	This method sets the volume in liters.
 *
 *	@param	lit			The volume in liters. 
 *
 *	@return				The volume.
 */
//---------------------------------------------------------
Volume.prototype.setInLiters = function(lit) {
	this.setValue(lit * Volume.getMETERS_CUBED_PER_LITER());
	return this;
};

//---------------------------------------------------------
//
//	SETINGALLONS
//
/**	This method sets the volume in gallons.
 *
 *	@param	gal			The volume in gallons. 
 *
 *	@return				The volume.
 */
//---------------------------------------------------------
Volume.prototype.setInGallons = function(gal) {
	this.setValue(gal * Volume.getMETERS_CUBED_PER_GALLON());
	return this;
};

//---------------------------------------------------------
//
//	SETINFEETCUBED
//
/**	This method sets the volume in ft^3.
 *
 *	@param	ft3			The volume in gallons. 
 *
 *	@return				The volume.
 */
//---------------------------------------------------------
Volume.prototype.setInFeetCubed = function(ft3) {
	this.setValue(ft3 * Volume.getMETERS_CUBED_PER_FOOT_CUBED());
	return this;
};

//---------------------------------------------------------
//
//	GETINMETERSCUBED
//
/**	This method gets the volume in meters^3.
 *
 *	@return				The volume in meters^3.
 *
 *	@throws				NotSetException if the value of
 *							this Volume has not been set.
 */
//---------------------------------------------------------
Volume.prototype.getInMetersCubed = function() {
	return this.getValue();
};

//---------------------------------------------------------
//
//	GETINCUBICCENTIMETERS
//
/**	This method gets the volume in cm^3 (also known
 *	as cc).
 *
 *	@return				The volume in cm^3.
 *
 *	@throws				NotSetException if the value of
 *							this Volume has not been set.
 */
//---------------------------------------------------------
Volume.prototype.getInCubicCentimeters = function() {
	return this.getValue() * Volume.getCENTIMETERS_CUBED_PER_METER_CUBED();
};

//---------------------------------------------------------
//
//	GETINLITERS
//
/**	This method gets the volume in liters.
 *
 *	@return				The volume in liters.
 *
 *	@throws				NotSetException if the value of
 *							this Volume has not been set.
 */
//---------------------------------------------------------
Volume.prototype.getInLiters = function() {
	return this.getValue() * Volume.getLITERS_PER_METER_CUBED();
};

//---------------------------------------------------------
//
//	GETINGALLONS
//
/**	This method gets the volume in gallons.
 *
 *	@return				The volume in gallons.
 *
 *	@throws				NotSetException if the value of
 *							this Volume has not been set.
 */
//---------------------------------------------------------
Volume.prototype.getInGallons = function() {
	return this.getValue() * Volume.getGALLONS_PER_METER_CUBED();
};

//---------------------------------------------------------
//
//	GETINFEETCUBED
//
/**	This method gets the volume in ft^3.
 *
 *	@return				The volume in ft^3.
 *
 *	@throws				NotSetException if the value of
 *							this Volume has not been set.
 */
//---------------------------------------------------------
Volume.prototype.getInFeetCubed = function() {
	return this.getValue() * Volume.getFEET_CUBED_PER_METER_CUBED();
};

//------------------------------------------------------------
//
//	GETMETERS_CUBED_PER_CENTIMETER_CUBED
//
/**	Returns the number of m^3 in one cm^3.
 *
 *	@return				The number of m^3 in one cm^3.
 */
//------------------------------------------------------------
Volume.getMETERS_CUBED_PER_CENTIMETER_CUBED = function() {
	var	METERS_CUBED_PER_CENTIMETER_CUBED = 
		Length.getMETERS_PER_CENTIMETER() *
		Length.getMETERS_PER_CENTIMETER() *
		Length.getMETERS_PER_CENTIMETER();
	return METERS_CUBED_PER_CENTIMETER_CUBED;
};

//------------------------------------------------------------
//
//	GETCENTIMETERS_CUBED_PER_METER_CUBED
//
/**	Returns the number of cm^3 in one m^3.
 *
 *	@return				The number of cm^3 in one m^3.
 */
//------------------------------------------------------------
Volume.getCENTIMETERS_CUBED_PER_METER_CUBED = function() {
	var	CENTIMETERS_CUBED_PER_METER_CUBED = 
		1.0 / Volume.getMETERS_CUBED_PER_CENTIMETER_CUBED();
	return CENTIMETERS_CUBED_PER_METER_CUBED;
};

//------------------------------------------------------------
//
//	GETMETERS_CUBED_PER_LITER
//
/**	Returns the number of m^3 in one liter.
 *
 *	@return				The number of m^3 in one liter.
 */
//------------------------------------------------------------
Volume.getMETERS_CUBED_PER_LITER = function() {
	var METERS_CUBED_PER_LITER = 
		Length.getMETERS_PER_DECIMETER() *
		Length.getMETERS_PER_DECIMETER() *
		Length.getMETERS_PER_DECIMETER();
	return METERS_CUBED_PER_LITER;
};

//------------------------------------------------------------
//
//	GETLITERS_PER_METER_CUBED
//
/**	Returns the number of liters in one m^3.
 *
 *	@return				The number of liters in one m^3.
 */
//------------------------------------------------------------
Volume.getLITERS_PER_METER_CUBED = function() {
	var	LITERS_PER_METER_CUBED = 
		1.0 / Volume.getMETERS_CUBED_PER_LITER();
	return LITERS_PER_METER_CUBED;
};

//------------------------------------------------------------
//
//	GETGALLONS_PER_LITER
//
/**	Returns the number of gallons in one liter.
 *
 *	@return				The number of gallons in one liter.
 */
//------------------------------------------------------------
Volume.getGALLONS_PER_LITER = function() {
	//  This value is taken from "CRC Standard Mathematical
	//  Tables", 27th Edition, CRC Press, Boca Raton, Florida,
	//  1984, p. 3.
	var GALLONS_PER_LITER = 0.2641720524;
	return GALLONS_PER_LITER;
};

//------------------------------------------------------------
//
//	GETGALLONS_PER_METER_CUBED
//
/**	Returns the number of gallons in one m^3
 *
 *	@return				The number of gallons in one m^3
 */
//------------------------------------------------------------
Volume.getGALLONS_PER_METER_CUBED = function() {
	var GALLONS_PER_METER_CUBED = 
		Volume.getGALLONS_PER_LITER() *
		Volume.getLITERS_PER_METER_CUBED();
	return GALLONS_PER_METER_CUBED;
};

//------------------------------------------------------------
//
//	GETMETERS_CUBED_PER_GALLON
//
/**	Returns the number of m^3 in one gallon.
 *
 *	@return				The number of m^3 in one gallon.
 */
//------------------------------------------------------------
Volume.getMETERS_CUBED_PER_GALLON = function() {
	var	METERS_CUBED_PER_GALLON = 
		1.0 / Volume.getGALLONS_PER_METER_CUBED();
	return METERS_CUBED_PER_GALLON;
};

//------------------------------------------------------------
//
//	GETMETERS_CUBED_PER_FOOT_CUBED
//
/**	Returns the number of m^3 in one ft^3.
 *
 *	@return				The number of m^3 in one ft^3.
 */
//------------------------------------------------------------
Volume.getMETERS_CUBED_PER_FOOT_CUBED = function() {
	var METERS_CUBED_PER_FOOT_CUBED = 
		Length.getMETERS_PER_FOOT() *
		Length.getMETERS_PER_FOOT() *
		Length.getMETERS_PER_FOOT();
	return METERS_CUBED_PER_FOOT_CUBED;
};

//------------------------------------------------------------
//
//	GETFEET_CUBED_PER_METER_CUBED
//
/**	Returns the number of ft^3 in one m^3.
 *
 *	@return				The number of ft^3 in one m^3.
 */
//------------------------------------------------------------
Volume.getFEET_CUBED_PER_METER_CUBED = function() {
	var	FEET_CUBED_PER_METER_CUBED = 
		1.0 / Volume.getMETERS_CUBED_PER_FOOT_CUBED();
	return FEET_CUBED_PER_METER_CUBED;
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
Volume.getDefaultUnits = function() {
	return "meters^3";
};

Volume.ScalarTypeConstructorSurrogate = function(s) {
	return new Volume(s);
};

Volume.getScalarName = function() {
	return "Volume";
};
return Volume;
});
