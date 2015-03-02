define(function() {
	 "use strict";
// Cache copies of constants for efficiency.

function Length(val) {
	if (arguments.length == 0) {
		this.value = 0.0
		this.value = false;		
	}  else if (arguments.length == 1) {
		this.setValue(arguments[0]);
	}
}


Length.prototype.setValue = function(val) {
	//Sets the value;
	this.value = val;
	
	//  Remember that we've set the value.
	this.setFlag = true;
	
	//  This cast will always be valid since GenericScalar is
	//  abstract and self-bounded, and all sub-classes are final.
	return this;
};

Length.prototype.getValue = function() {
	if (!this.setFlag) {
		throw "NotSetException";
	}
	return this.value;
};

//---------------------------------------------------------
//
//	SETINMETERS
//
/**	This method sets the length in meters.
 *
 *	@param	meters		The length in meters.
 *
 *	@return				The length.
 */
//---------------------------------------------------------
Length.prototype.setInMeters = function(meters) {
	this.setValue(meters);
	return this;
};

//---------------------------------------------------------
//
//	SETINCENTIMETERS
//
/**	This method sets the length in centimeters.
 *
 *	@param	cm			The length in centimeters.
 *
 *	@return				The length.
 */
//---------------------------------------------------------
Length.prototype.setInCentimeters = function(cm) {
	this.setValue(cm *Length.METERS_PER_CENTIMETER);
	return this;
};

//---------------------------------------------------------
//
//	SETINMILLIMETERS
//
/**	This method sets the length in millimeters.
 *
 *	@param	mm			The length in millimeters.
 *
 *	@return				The length.
 */
//---------------------------------------------------------
Length.prototype.setInMillimeters = function(mm) {
	this.setValue(mm * Length.METERS_PER_MILLIMETER);
	return this;
};

//---------------------------------------------------------
//
//	SETINMICRONS
//
/**	This method sets the length in microns.  A micron
 *	is one-millionth of a meter.
 *
 *	@param	um			The length in microns.
 *
 *	@return				The length.
 */
//---------------------------------------------------------
Length.prototype.setInMicrons = function(um) {
	this.setValue(um * Length.METERS_PER_MICRON);
	return this;
};

//---------------------------------------------------------
//
//	SETINANGSTROMS
//
/**	This method sets the length in angstroms.  An angstrom
 *	is 10^-8 meters.
 *
 *	@param	aa			The length in angstroms.
 *
 *	@return				The length.
 */
//---------------------------------------------------------
Length.prototype.setInAngstroms = function(aa) {
	this.setValue(aa * Length.METERS_PER_ANGSTROM);
	return this;
};

//---------------------------------------------------------
//
//	SETINNANOMETERS
//
/**	This method sets the length in nanometers. 
 *
 *	@param	nm			The length in nanometers.
 *
 *	@return				The length.
 */
//---------------------------------------------------------
Length.prototype.setInNanometers = function(nm) {
	this.setValue(nm * Length.METERS_PER_NANOMETER);
	return this;
};

//---------------------------------------------------------
//
//	SETINKILOMETERS
//
/**	This method sets the length in kilometers.  A kilometer
 *  is defined as 1000 meters.
 *
 *	@param	km			The length in kilometers.
 *
 *	@return				The length.
 */
//---------------------------------------------------------
Length.prototype.setInKilometers = function(km) {
	this.setValue(km * Length.METERS_PER_KILOMETER);
	return this;
};

//---------------------------------------------------------
//
//	SETINFEET
//
/**	This method sets the length in feet.
 *
 *	@param	feet		The length in feet.
 *
 *	@return				The length.
 */
//---------------------------------------------------------
Length.prototype.setInFeet = function(feet) {
	this.setValue(feet * Length.METERS_PER_FOOT);
	return this;
};

//---------------------------------------------------------
//
//	SETINYARDS
//
/**	This method sets the length in yards.  A yard is 
 *  defined as 3 feet.
 *
 *	@param	yards		The length in yards.
 *
 *	@return				The length.
 */
//---------------------------------------------------------
Length.prototype.setInYards = function(yards) {
	this.setValue(yards * Length.METERS_PER_YARD);
	return this;
};

//---------------------------------------------------------
//
//	SETINKILOYARDS
//
/**	This method sets the length in kiloyards.  A kiloyard
 *  is defined as 1000 yards.
 *
 *	@param	kiloyards	The length in kiloyards.
 *
 *	@return				The length.
 */
//---------------------------------------------------------
Length.prototype.setInKiloyards = function(kiloyards) {
	this.setValue(kiloyards * Length.METERS_PER_KILOYARD);
	return this;
};

//---------------------------------------------------------
//
//	SETINDATAMILES
//
/**	This method sets the length in data miles.  A data mile
 *	is defined as 6000 feet.
 *
 *	@param	datamiles	The length in data miles.
 *
 *	@return				The length.
 */
//---------------------------------------------------------
Length.prototype.setInDataMiles = function(datamiles) {
	this.setValue(datamiles * Length.METERS_PER_DATA_MILE);
	return this;
};

//---------------------------------------------------------
//
//	SETINSTATUTEMILES
//
/**	This method sets the length in statute miles.  A statute
 *  mile is defined as 5280 feet.
 *
 *	@param	statutemiles	The length in statute miles.
 *
 *	@return					The length.
 */
//---------------------------------------------------------
Length.prototype.setInStatuteMiles = function(statutemiles) {
	this.setValue(statutemiles * Length.METERS_PER_STATUTE_MILE);
	return this;
};

//---------------------------------------------------------
//
//	SETINNAUTICALMILES
//
/**	This method sets the length in nautical miles.
 *  A nautical mile is defined as 1852 meters.
 *
 *	@param	nauticalmiles	The length in nautical miles.
 *
 *	@return					The length.
 */
//---------------------------------------------------------
Length.prototype.setInNauticalMiles = function(nauticalmiles) {
	this.setValue(nauticalmiles * Length.METERS_PER_NAUTICAL_MILE);
	return this;
};

//---------------------------------------------------------
//
//	GETINMETERS
//
/**	This method gets the length in meters.
 *
 *	@return				The length in meters.
 *
 *	@throws				NotSetException if the value of
 *							this Length has not been set.
 */
//---------------------------------------------------------
Length.prototype.getInMeters = function()  {
	return this.getValue();
};

//---------------------------------------------------------
//
//	GETINCENTIMETERS
//
/**	This method gets the length in centimeters.
 *
 *	@return				The length in centimeters.
 *
 *	@throws				NotSetException if the value of
 *							this Length has not been set.
 */
//---------------------------------------------------------
Length.prototype.getInCentimeters = function()  {
	return this.getValue() * Length.CENTIMETERS_PER_METER;
};

//---------------------------------------------------------
//
//	GETINCENTIMETERS
//
/**	This method gets the length in centimeters.
 *
 *	@return				The length in centimeters.
 *
 *	@throws				NotSetException if the value of
 *							this Length has not been set.
 */
//---------------------------------------------------------
Length.prototype.getInMillimeters = function()  {
	return this.getValue() * Length.MILLIMETERS_PER_METER;
};

//---------------------------------------------------------
//
//	GETINMICRONS
//
/**	This method gets the length in microns.  A micron
 *	is one-millionth of a meter.
 *
 *	@return				The length in microns.
 *
 *	@throws				NotSetException if the value of
 *							this Length has not been set.
 */
//---------------------------------------------------------
Length.prototype.getInMicrons = function()  {
	return this.getValue() * Length.MICRONS_PER_METER;
};

//---------------------------------------------------------
//
//	GETINANGSTROMS
//
/**	This method gets the length in angstroms.  An angstrom
 *	is 10^-8 meters.
 *
 *	@return				The length in angstroms.
 *
 *	@throws				NotSetException if the value of
 *							this Length has not been set.
 */
//---------------------------------------------------------
Length.prototype.getInAngstroms = function()  {
	return this.getValue() * Length.ANGSTROMS_PER_METER;
};

//---------------------------------------------------------
//
//	GETINNANOMETERS
//
/**	This method gets the length in nanometers.
 *
 *	@return				The length in nanometers.
 *
 *	@throws				NotSetException if the value of
 *							this Length has not been set.
 */
//---------------------------------------------------------
Length.prototype.getInNanometers = function()  {
	return this.getValue() * Length.NANOMETERS_PER_METER;
};

//---------------------------------------------------------
//
//	GETINKILOMETERS
//
/**	This method gets the length in kilometers.  A kilometer
 *  is defined as 1000 meters.
 *
 *	@return				The length in kilometers.
 *
 *	@throws				NotSetException if the value of
 *							this Length has not been set.
 */
//---------------------------------------------------------
Length.prototype.getInKilometers = function()  {
	return Length.KILOMETERS_PER_METER * this.getValue();
};

//---------------------------------------------------------
//
//	GETINFEET
//
/**	This method gets the length in feet.
 *
 *	@return				The length in feet.
 *
 *	@throws				NotSetException if the value of
 *							this Length has not been set.
 */
//---------------------------------------------------------
Length.prototype.getInFeet = function()  {
	return Length.FEET_PER_METER * this.getValue();
};

//---------------------------------------------------------
//
//	GETINYARDS
//
/**	This method gets the length in yards.  A yard is 
 *  defined as 3 feet.
 *
 *	@return				The length in yards.
 */
//---------------------------------------------------------
Length.prototype.getInYards = function()  {
	return Length.YARDS_PER_METER * this.getValue();
};

//---------------------------------------------------------
//
//	GETINKILOYARDS
//
/**	This method gets the length in kiloyards.  A kiloyard
 *  is defined as 1000 yards.
 *
 *	@return				The length in kiloyards.
 */
//---------------------------------------------------------
Length.prototype.getInKiloyards = function()  {
	return Length.KILOYARDS_PER_METER * this.getValue();
};

//---------------------------------------------------------
//
//	GETINDATAMILES
//
/**	This method gets the length in data miles.  A data mile
 *	is defined as 6000 feet.
 *
 *	@return				The length in data miles.
 *
 *	@throws				NotSetException if the value of
 *							this Length has not been set.
 */
//---------------------------------------------------------
Length.prototype.getInDataMiles = function()  {
	return Length.DATA_MILES_PER_METER * this.getValue();
};

//---------------------------------------------------------
//
//	GETINSTATUTEMILES
//
/**	This method gets the length in statute miles.  A statute
 *  mile is defined as 5280 feet.
 *
 *	@return				The length in statute miles.
 *
 *	@throws				NotSetException if the value of
 *							this Length has not been set.
 */
//---------------------------------------------------------
Length.prototype.getInStatuteMiles = function()  {
	return Length.STATUTE_MILES_PER_METER * this.getValue();
};

//---------------------------------------------------------
//
//	GETINNAUTICALMILES
//
/**	This method gets the length in nautical miles.
 *  A nautical mile is defined as 1852 meters.
 *
 *	@return				The length in nautical miles.
 *
 *	@throws				NotSetException if the value of
 *							this Length has not been set.
 */
//---------------------------------------------------------
Length.prototype.getInNauticalMiles = function()  {
	return Length.NAUTICAL_MILES_PER_METER * this.getValue();
};

//------------------------------------------------------------
//
//	GETFEET_PER_STATUTE_MILE
//
/**	Returns the number of feet in one statute mile.
 *
 *	@return				The number of feet in one statute mile.
 */
//------------------------------------------------------------
Length.getFEET_PER_STATUTE_MILE = function() {
	var	FEET_PER_STATUTE_MILE = 5280.0;
	return FEET_PER_STATUTE_MILE;
};

//------------------------------------------------------------
//
//	GETFEET_PER_DATA_MILE
//
/**	Returns the number of feet in one data mile.
 *
 *	@return				The number of feet in one data mile.
 */
//------------------------------------------------------------
Length.getFEET_PER_DATA_MILE = function() {
	var	FEET_PER_DATA_MILE = 6000.0;
	return FEET_PER_DATA_MILE;
};

//------------------------------------------------------------
//
//	GETMETERS_PER_NAUTICAL_MILE
//
/**	Returns the number of meters in one nautical mile.
 *
 *	@return				The number of m in one nm.
 */
//------------------------------------------------------------
Length.getMETERS_PER_NAUTICAL_MILE = function() {
	//  The following value was obtained from "CRC Standard
	//  Mathematical Tables", 27th Ed., CRC Press, 1986, pg. 5,
	//  and is apparently definitional.
	var	METERS_PER_NAUTICAL_MILE = 1852.0;
	return METERS_PER_NAUTICAL_MILE;
};

//------------------------------------------------------------
//
//	GETMETERS_PER_FOOT
//
// *	Returns the number of meters in one foot.
//  *
//  *	@return				The number of m in one ft.
 
//------------------------------------------------------------
Length.getMETERS_PER_FOOT = function() {
	//  The following value was obtained from "CRC Standard
	//  Mathematical Tables", 27th Ed., CRC Press, 1986, pg. 3.
	var	METERS_PER_FOOT = 0.3048;
	return METERS_PER_FOOT;
};

//------------------------------------------------------------
//
//	GETMETERS_PER_KILOMETER
//
/**	Returns the number of meters in one kilometer.
 *
 *	@return				The number of m in one km.
 */
//------------------------------------------------------------
Length.getMETERS_PER_KILOMETER = function() {
	var	METERS_PER_KILOMETER = 1000.0;
	return METERS_PER_KILOMETER;
};

//------------------------------------------------------------
//
//	GETDECIMETERS_PER_METER
//
/**	Returns the number of decimeters in one meter.
 *
 *	@return				The number of decimeters in one m.
 */
//------------------------------------------------------------
Length.getDECIMETERS_PER_METER = function() {
	var	DECIMETERS_PER_METER = 10.0;
	return DECIMETERS_PER_METER;
};

//------------------------------------------------------------
//
//	GETCENTIMETERS_PER_METER
//
/**	Returns the number of centimeters in one meter.
 *
 *	@return				The number of cm in one m.
 */
//------------------------------------------------------------
Length.getCENTIMETERS_PER_METER = function() {
	var	CENTIMETERS_PER_METER = 100.0;
	return CENTIMETERS_PER_METER;
};

//------------------------------------------------------------
//
//	GETMILLIMETERS_PER_METER
//
/**	Returns the number of millimeters in one meter.
 *
 *	@return				The number of mm in one m.
 */
//------------------------------------------------------------
Length.getMILLIMETERS_PER_METER = function() {
	var	MILLIMETERS_PER_METER = 1000.0;
	return MILLIMETERS_PER_METER;
};

//------------------------------------------------------------
//
//	GETMICRONS_PER_METER
//
/**	Returns the number of microns in one meter.
 *
 *	@return				The number of microns in one m.
 */
//------------------------------------------------------------
Length.getMICRONS_PER_METER = function() {
	var	MICRONS_PER_METER = 1000000.0;
	return MICRONS_PER_METER;
};

//------------------------------------------------------------
//
//	GETANGSTROMS_PER_METER
//
/**	Returns the number of Angstroms in one meter.
 *
 *									  o
 *	@return				The number of A in one m.
 */
//------------------------------------------------------------
Length.getANGSTROMS_PER_METER = function() {
	var	ANGSTROMS_PER_METER = 100000000.0;
	return ANGSTROMS_PER_METER;
};

//------------------------------------------------------------
//
//	GETNANOMETERS_PER_METER
//
/**	Returns the number of nanometers in one meter.
 *
 *	@return				The number of nanometers in one m.
 */
//------------------------------------------------------------
Length.getNANOMETERS_PER_METER = function() {
	var	NANOMETERS_PER_METER = 1000000000.0;
	return NANOMETERS_PER_METER;
};

//------------------------------------------------------------
//
//	GETFEET_PER_YARD
//
/**	Returns the number of feet in one yard.
 *
 *	@return				The number of feet in one yard.
 */
//------------------------------------------------------------
Length.getFEET_PER_YARD = function() {
	var	FEET_PER_YARD = 3.0;
	return FEET_PER_YARD;
};

//------------------------------------------------------------
//
//	GETYARDS_PER_KILOYARD
//
/**	Returns the number of yards in one kiloyard.
 *
 *	@return				The number of yards in one kyrd.
 */
//------------------------------------------------------------
Length.getYARDS_PER_KILOYARD = function() {
	var	YARDS_PER_KILOYARD = 1000.0;
	return YARDS_PER_KILOYARD;
};

//------------------------------------------------------------
//
//	GETMETERS_PER_YARD
//
/**	Returns the number of meters in one yard.
 *
 *	@return				The number of meters in one yard.
 */
//------------------------------------------------------------
Length.getMETERS_PER_YARD = function() {
	var	METERS_PER_YARD = Length.getFEET_PER_YARD() * Length.getMETERS_PER_FOOT();
	return METERS_PER_YARD;
};

//------------------------------------------------------------
//
//	GETMETERS_PER_STATUTE_MILE
//
/**	Returns the number of meters in one statute mile.
 *
 *	@return				The number of m in one mi.
 */
//------------------------------------------------------------
Length.getMETERS_PER_STATUTE_MILE = function() {
	var	METERS_PER_STATUTE_MILE = Length.getFEET_PER_STATUTE_MILE() * Length.getMETERS_PER_FOOT();
	return METERS_PER_STATUTE_MILE;
};

//------------------------------------------------------------
//
//	GETMETERS_PER_DATA_MILE
//
/**	Returns the number of meters in one data mile.
 *
 *	@return				The number of meters in one data mile.
 */
//------------------------------------------------------------
Length.getMETERS_PER_DATA_MILE = function() {
	var	METERS_PER_DATA_MILE = Length.getFEET_PER_DATA_MILE() * Length.getMETERS_PER_FOOT();
	return METERS_PER_DATA_MILE;
};

//------------------------------------------------------------
//
//	GETMETERS_PER_KILOYARD
//
/**	Returns the number of meters in one kiloyard.
 *
 *	@return				The number of m in one kyrd.
 */
//------------------------------------------------------------
Length.getMETERS_PER_KILOYARD = function() {
	var	METERS_PER_KILOYARD = Length.getYARDS_PER_KILOYARD() * Length.getMETERS_PER_YARD();
	return METERS_PER_KILOYARD;
};

//------------------------------------------------------------
//
//	GETFEET_PER_METER
//
/**	Returns the number of feet in one meter.
 *
 *	@return				The number of ft in one m.
 */
//------------------------------------------------------------
Length.getFEET_PER_METER = function() {
	var	FEET_PER_METER = 1.0 / Length.getMETERS_PER_FOOT();
	return FEET_PER_METER;
};

//------------------------------------------------------------
//
//	GETYARDS_PER_METER
//
/**	Returns the number of yards in one meter.
 *
 *	@return				The number of yrds in one m.
 */
//------------------------------------------------------------
Length.getYARDS_PER_METER = function() {
	var	YARDS_PER_METER = 1.0 / Length.getMETERS_PER_YARD();
	return YARDS_PER_METER;
};

//------------------------------------------------------------
//
//	GETKILOMETERS_PER_METER
//
/**	Returns the number of kilometers in one meter.
 *
 *	@return				The number of km in one m.
 */
//------------------------------------------------------------
Length.getKILOMETERS_PER_METER = function() {
	var	KILOMETERS_PER_METER = 1.0 / Length.getMETERS_PER_KILOMETER();
	return KILOMETERS_PER_METER;
};

//------------------------------------------------------------
//
//	GETMETERS_PER_DECIMETER
//
/**	Returns the number of meters in one decimeter.
 *
 *	@return				The number of m in one decimeter.
 */
//------------------------------------------------------------
Length.getMETERS_PER_DECIMETER = function() {
	var	METERS_PER_DECIMETER = 1.0 / Length.getDECIMETERS_PER_METER();
	return METERS_PER_DECIMETER;
};

//------------------------------------------------------------
//
//	GETMETERS_PER_CENTIMETER
//
/**	Returns the number of meters in one centimeter.
 *
 *	@return				The number of m in one cm.
 */
//------------------------------------------------------------
Length.getMETERS_PER_CENTIMETER = function() {
	var	METERS_PER_CENTIMETER = 1.0 / Length.getCENTIMETERS_PER_METER();
	return METERS_PER_CENTIMETER;
};

//------------------------------------------------------------
//
//	GETMETERS_PER_MILLIMETER
//
/**	Returns the number of meters in one millimeter.
 *
 *	@return				The number of m in one mm.
 */
//------------------------------------------------------------
Length.getMETERS_PER_MILLIMETER = function() {
	var	METERS_PER_MILLIMETER = 1.0 / Length.getMILLIMETERS_PER_METER();
	return METERS_PER_MILLIMETER;
};

//------------------------------------------------------------
//
//	GETMETERS_PER_MICRON
//
/**	Returns the number of meters in one micron.
 *
 *	@return				The number of meters in one micron.
 */
//------------------------------------------------------------
Length.getMETERS_PER_MICRON = function() {
	var METERS_PER_MICRON = 1.0 / Length.getMICRONS_PER_METER();
	return METERS_PER_MICRON;
};

//------------------------------------------------------------
//
//	GETMETERS_PER_ANGSTROM
//
/**	Returns the number of meters in one Angstrom.
 *
 *											   o
 *	@return				The number of m in one A.
 */
//------------------------------------------------------------
Length.getMETERS_PER_ANGSTROM = function() {
	var	METERS_PER_ANGSTROM = 1.0 / Length.getANGSTROMS_PER_METER();
	return METERS_PER_ANGSTROM;
};

//------------------------------------------------------------
//
//	GETMETERS_PER_NANOMETER
//
/**	Returns the number of meters in one nanometer.
 *
 *	@return				The number of m in one nanometer.
 */
//------------------------------------------------------------
Length.getMETERS_PER_NANOMETER = function() {
	var	METERS_PER_NANOMETER = 1.0 / Length.getNANOMETERS_PER_METER();
	return METERS_PER_NANOMETER;
};

//------------------------------------------------------------
//
//	GETKILOYARDS_PER_METER
//
/**	Returns the number of kiloyards in one meter.
 *
 *	@return				The number of kyrds in one m.
 */
//------------------------------------------------------------
Length.getKILOYARDS_PER_METER = function() {
	var	KILOYARDS_PER_METER = 1.0 / Length.getMETERS_PER_KILOYARD();
	return KILOYARDS_PER_METER;
};

//------------------------------------------------------------
//
//	GETDATA_MILES_PER_METER
//
/**	Returns the number of data miles in one meter.
 *
 *	@return				The number of data miles in one m.
 */
//------------------------------------------------------------
Length.getDATA_MILES_PER_METER = function() {
	var	DATA_MILES_PER_METER = 1.0 / Length.getMETERS_PER_DATA_MILE();
	return DATA_MILES_PER_METER;
};

//------------------------------------------------------------
//
//	GETSTATUTE_MILES_PER_METER
//
/**	Returns the number of statute miles in one meter.
 *
 *	@return				The number of statute miles in one m.
 */
//------------------------------------------------------------
Length.getSTATUTE_MILES_PER_METER = function() {
	var	STATUTE_MILES_PER_METER = 1.0 / Length.getMETERS_PER_STATUTE_MILE();
	return STATUTE_MILES_PER_METER;
};

//------------------------------------------------------------
//
//	GETNAUTICAL_MILES_PER_METER
//
/**	Returns the number of nautical miles in one meter.
 *
 *	@return				The number of nautical miles in one m.
 */
//------------------------------------------------------------
Length.getNAUTICAL_MILES_PER_METER = function() {
	var	NAUTICAL_MILES_PER_METER = 1.0 / Length.getMETERS_PER_NAUTICAL_MILE();
	return NAUTICAL_MILES_PER_METER;
};

Length.ScalarTypeConstructorSurrogate = function(s) {
	return new Length(s);
};

Length.getScalarName = function(){
	return "Length";
};

Length.getDefaultUnits = function() {
	return "meters";
};

// //---------------------------------------------------------
// //
// //	ZERO
// //
// /**	This static method returns a set zero-valued scalar
//  *  of this scalar type.  Cannot be part of GenericScalar
//  *  due to type erasure.
//  *  
//  *  @return				A set zero-valued scalar of this
//  *  					scalar type.
//  */
// //--------------------------------------------------------
Length.zero = function() {
	return new Length().setValue(0.0);
};

Length.METERS_PER_CENTIMETER =	Length.getMETERS_PER_CENTIMETER();
Length.METERS_PER_MILLIMETER =	Length.getMETERS_PER_MILLIMETER();
Length.METERS_PER_MICRON =	Length.getMETERS_PER_MICRON();
Length.METERS_PER_ANGSTROM = Length.getMETERS_PER_ANGSTROM();
Length.METERS_PER_NANOMETER = Length.getMETERS_PER_NANOMETER();
Length.METERS_PER_KILOMETER = Length.getMETERS_PER_KILOMETER();
Length.METERS_PER_FOOT = Length.getMETERS_PER_FOOT();
Length.METERS_PER_YARD = Length.getMETERS_PER_YARD();
Length.METERS_PER_KILOYARD = Length.getMETERS_PER_KILOYARD();
Length.METERS_PER_DATA_MILE = Length.getMETERS_PER_DATA_MILE();
Length.METERS_PER_STATUTE_MILE = Length.getMETERS_PER_STATUTE_MILE();
Length.METERS_PER_NAUTICAL_MILE = Length.getMETERS_PER_NAUTICAL_MILE();
	
Length.CENTIMETERS_PER_METER = Length.getCENTIMETERS_PER_METER();
Length.MILLIMETERS_PER_METER = Length.getMILLIMETERS_PER_METER();
Length.MICRONS_PER_METER = Length.getMICRONS_PER_METER();
Length.ANGSTROMS_PER_METER = Length.getANGSTROMS_PER_METER();
Length.NANOMETERS_PER_METER = Length.getNANOMETERS_PER_METER();
Length.KILOMETERS_PER_METER = Length.getKILOMETERS_PER_METER();
Length.FEET_PER_METER = Length.getFEET_PER_METER();
Length.YARDS_PER_METER = Length.getYARDS_PER_METER();
Length.KILOYARDS_PER_METER = Length.getKILOYARDS_PER_METER();
Length.DATA_MILES_PER_METER = Length.getDATA_MILES_PER_METER();
Length.STATUTE_MILES_PER_METER = Length.getSTATUTE_MILES_PER_METER();
Length.NAUTICAL_MILES_PER_METER = Length.getNAUTICAL_MILES_PER_METER();

	return Length;
});