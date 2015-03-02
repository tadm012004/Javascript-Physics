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
//  File:                    C
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
//	AREA
//
/**	This class encapsulates the concept of a planar   The area
 *	may be algebraically positive or negative.
 * 	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================

define(["Length"], function(Length){
Area.prototype.setValue = function(val) {
	//Sets the value;
	this.value = val;
	
	//  Remember that we've set the value.
	this.setFlag = true;
	
	//  This cast will always be valid since GenericScalar is
	//  abstract and self-bounded, and all sub-classes are final.
	return this;
};

Area.prototype.getValue = function() {
	if (!this.setFlag) {
		throw "NotSetException";
	}
	return this.value;
};

function Area() {
	//---------------------------------------------------------
	//
	//	AREA
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
	//	AREA
	//
	/**	This copy constructor is a user-defined conversion
	 *  from GenericScalar<Area> to Area.  
	 *
	 *	@param	s		The GenericScalar<Area> to be converted.
	 *
	 *	@throws			NotSetException if the supplied
	 *					GenericScalar<Area> is not set.
	 */
	//---------------------------------------------------------
	//---------------------------------------------------------
	//
	//	AREA
	//
	/**	Copy constructor.
	 *
	 *	@param	s		The Area to be copied.
	 *
	 *	@throws			NotSetException if the supplied
	 *					Area is not set.
	 */
	//---------------------------------------------------------
	else if (arguments.length == 1) {
		this.setValue(arguments[0]);
	}
};

//---------------------------------------------------------
//
//	SETINMETERSSQUARED
//
/**	This method sets the area in meters^2.
 *
 *	@param	m2			The area in meters^2.
 *
 *	@return				The area.
 */
//---------------------------------------------------------
Area.prototype.setInMetersSquared = function(m2) {
	this.setValue(m2);
	return this;
};

//---------------------------------------------------------
//
//	SETINCENTIMETERSSQUARED
//
/**	This method sets the area in centimeters^2.
 *
 *	@param	cm2			The area in centimeters^2.
 *
 *	@return				The area.
 */
//---------------------------------------------------------
Area.prototype.setInCentimetersSquared = function(cm2) {
	this.setValue(cm2 * Area.getMETERS_SQ_PER_CENTIMETER_SQ());
	return this;
};

//---------------------------------------------------------
//
//	SETINKILOMETERSSQUARED
//
/**	This method sets the area in kilometers^2.  A kilometer
 *  is defined as 1000 meters.
 *
 *	@param	km2			The area in kilometers^2.
 *
 *	@return				The area.
 */
//---------------------------------------------------------
Area.prototype.setInKilometersSquared = function(km2) {
	this.setValue(km2 * Area.getMETERS_SQ_PER_KILOMETER_SQ());
	return this;
};

//---------------------------------------------------------
//
//	SETINFEETSQUARED
//
/**	This method sets the area in feet^2.
 *
 *	@param	feet2		The area in feet^2.
 *
 *	@return				The area.
 */
//---------------------------------------------------------
Area.prototype.setInFeetSquared = function(feet2) {
	this.setValue(feet2 * Area.getMETERS_SQ_PER_FOOT_SQ());
	return this;
};

//---------------------------------------------------------
//
//	SETINYARDSSQUARED
//
/**	This method sets the area in yards^2.  A yard is 
 *  defined as 3 feet.
 *
 *	@param	yards2		The area in yards^2.
 *
 *	@return				The area.
 */
//---------------------------------------------------------
Area.prototype.setInYardsSquared = function(yards2) {
	this.setValue(yards2 * Area.getMETERS_SQ_PER_YARD_SQ());
	return this;
};

//---------------------------------------------------------
//
//	SETINKILOYARDSSQUARED
//
/**	This method sets the area in kiloyards^2.  A kiloyard
 *  is defined as 1000 yards.
 *
 *	@param	kiloyards2	The area in kiloyards^2.
 *
 *	@return				The area.
 */
//---------------------------------------------------------
Area.prototype.setInKiloyardsSquared = function(kiloyards2) {
	this.setValue(kiloyards2 * Area.getMETERS_SQ_PER_KILOYARD_SQ());
	return this;
};

//---------------------------------------------------------
//
//	SETINDATAMILESSQUARED
//
/**	This method sets the area in data miles^2.  A data mile
 *	is defined as 6000 feet.
 *
 *	@param	datamiles2	The area in data miles^2.
 *
 *	@return				The area.
 */
//---------------------------------------------------------
Area.prototype.setInDataMilesSquared = function(datamiles2) {
	this.setValue(datamiles2 * Area.getMETERS_SQ_PER_DATA_MILE_SQ());
	return this;
};

//---------------------------------------------------------
//
//	SETINSTATUTEMILESSQUARED
//
/**	This method sets the area in statute miles^2.  A statute
 *  mile is defined as 5280 feet.
 *
 *	@param	statutemiles2	The area in statute miles^2.
 *
 *	@return					The area.
 */
//---------------------------------------------------------
Area.prototype.setInStatuteMilesSquared = function(statutemiles2) {
	this.setValue(statutemiles2 * Area.getMETERS_SQ_PER_STATUTE_MILE_SQ());
	return this;
};

//---------------------------------------------------------
//
//	SETINNAUTICALMILESSQUARED
//
/**	This method sets the area in nautical miles^2.
 *  A nautical mile is defined as 1852 meters.
 *
 *	@param	nauticalmiles2	The area in nautical miles^2.
 *
 *	@return					The area.
 */
//---------------------------------------------------------
Area.prototype.setInNauticalMilesSquared = function(nauticalmiles2) {
	this.setValue(nauticalmiles2 * Area.getMETERS_SQ_PER_NAUTICAL_MILE_SQ());
	return this;
};

//---------------------------------------------------------
//
//	SETINACRES
//
/**	This method sets the area in acres.  For those who
 *  are curious, an acre is 1/640 of a section, which
 *	itself is 1 square statute mile.
 *
 *	@param	acres		The area in acres.
 *
 *	@return				The area.
 */
//---------------------------------------------------------
Area.prototype.setInAcres = function(acres) {
	this.setValue(acres * Area.getMETERS_SQ_PER_ACRE());
	return this;
};

//---------------------------------------------------------
//
//	SETINHECTARES
//
/**	This method sets the area in hectares.  A hectare
 *	is 100 ares, each of which is 100 sq. meters.
 *
 *	@param	hectares	The area in hectares.
 *
 *	@return				The area.
 */
//---------------------------------------------------------
Area.prototype.setInHectares = function(hectares) {
	this.setValue(hectares * Area.getMETERS_SQ_PER_HECTARE());
	return this;
};

//---------------------------------------------------------
//
//	GETINMETERSSQUARED
//
/**	This method gets the area in meters^2.
 *
 *	@return				The area in meters^2.
 *
 *	@throws				NotSetException if the value of
 *							this Area has not been set.
 */
//---------------------------------------------------------
Area.prototype.getInMetersSquared = function() {
	return this.getValue();
};

//---------------------------------------------------------
//
//	GETINCENTIMETERSSQUARED
//
/**	This method gets the area in centimeters^2.
 *
 *	@return				The area in centimeters^2.
 *
 *	@throws				NotSetException if the value of
 *							this Area has not been set.
 */
//---------------------------------------------------------
Area.prototype.getInCentimetersSquared = function() {
	return this.getValue() * Area.getCENTIMETERS_SQ_PER_METER_SQ();
};

//---------------------------------------------------------
//
//	GETINKILOMETERSSQUARED
//
/**	This method gets the area in kilometers^2.  A kilometer
 *  is defined as 1000 meters.
 *
 *	@return				The area in kilometers^2.
 *
 *	@throws				NotSetException if the value of
 *							this Area has not been set.
 */
//---------------------------------------------------------
Area.prototype.getInKilometersSquared = function() {
	return this.getValue() * Area.getKILOMETERS_SQ_PER_METER_SQ();
};

//---------------------------------------------------------
//
//	GETINFEETSQUARED
//
/**	This method gets the area in feet^2.
 *
 *	@return				The length in feet^2.
 *
 *	@throws				NotSetException if the value of
 *							this Area has not been set.
 */
//---------------------------------------------------------
Area.prototype.getInFeetSquared = function() {
	return this.getValue() * Area.getFEET_SQ_PER_METER_SQ();
};

//---------------------------------------------------------
//
//	GETINYARDSSQUARED
//
/**	This method gets the area in yards^2.  A yard is 
 *  defined as 3 feet.
 *
 *	@return				The area in yards^2.
 */
//---------------------------------------------------------
Area.prototype.getInYardsSquared = function() {
	return this.getValue() * Area.getYARDS_SQ_PER_METER_SQ();
};

//---------------------------------------------------------
//
//	GETINKILOYARDSSQUARED
//
/**	This method gets the area in kiloyards^2.  A kiloyard
 *  is defined as 1000 yards.
 *
 *	@return				The area in kiloyards^2.
 */
//---------------------------------------------------------
Area.prototype.getInKiloyardsSquared = function() {
	return this.getValue() * Area.getKILOYARDS_SQ_PER_METER_SQ();
};

//---------------------------------------------------------
//
//	GETINDATAMILESSQUARED
//
/**	This method gets the area in data miles^2.  A data mile
 *	is defined as 6000 feet.
 *
 *	@return				The area in data miles^2.
 *
 *	@throws				NotSetException if the value of
 *							this Area has not been set.
 */
//---------------------------------------------------------
Area.prototype.getInDataMilesSquared = function() {
	return this.getValue() * Area.getDATA_MILES_SQ_PER_METER_SQ();
};

//---------------------------------------------------------
//
//	GETINSTATUTEMILESSQUARED
//
/**	This method gets the area in statute miles^2.  A statute
 *  mile is defined as 5280 feet.
 *
 *	@return				The area in statute miles^2.
 *
 *	@throws				NotSetException if the value of
 *							this Area has not been set.
 */
//---------------------------------------------------------
Area.prototype.getInStatuteMilesSquared = function() {
	return this.getValue() * Area.getSTATUTE_MILES_SQ_PER_METER_SQ();
};

//---------------------------------------------------------
//
//	GETINNAUTICALMILESSQUARED
//
/**	This method gets the area in nautical miles^2.
 *  A nautical mile is defined as 1852 meters.
 *
 *	@return				The area in nautical miles^2.
 *
 *	@throws				NotSetException if the value of
 *							this Area has not been set.
 */
//---------------------------------------------------------
Area.prototype.getInNauticalMilesSquared = function() {
	return this.getValue() * Area.getNAUTICAL_MILES_SQ_PER_METER_SQ();
};

//---------------------------------------------------------
//
//	GETINACRES
//
/**	This method gets the area in acres.  For those who
 *  are curious, an acre is 1/640 of a section, which
 *	itself is 1 square statute mile.
 *
 *	@return				The area in acres.
 *
 *	@throws				NotSetException if the value of
 *							this Area has not been set.
 */
//---------------------------------------------------------
Area.prototype.getInAcres = function() {
	return this.getValue() * Area.getACRES_PER_METER_SQ();
};

//---------------------------------------------------------
//
//	GETINHECTARES
//
/**	This method gets the area in hectares.  A hectare
 *	is 100 ares, each of which is 100 sq. meters.
 *
 *	@return				The area in hectares.
 *
 *	@throws				NotSetException if the value of
 *							this Area has not been set.
 */
//---------------------------------------------------------
Area.prototype.getInHectares = function() {
	return this.getValue() * Area.getHECTARES_PER_METER_SQ();
};

//------------------------------------------------------------
//
//	GETFEET_SQ_PER_ACRE
//
/**	Returns the number of ft^2 in one acre.
 *
 *	@return				The number of ft^2 in one acre.
 */
//------------------------------------------------------------
Area.getFEET_SQ_PER_ACRE = function() {
	var FEET_SQ_PER_ACRE_1 = 43560.0;
	return FEET_SQ_PER_ACRE_1;
};

//------------------------------------------------------------
//
//	GETMETERSSQ_PER_HECTARE
//
/**	Returns the number of m^2 in one hectare.
 *
 *	@return				The number of m^2 in one hectare.
 */
//------------------------------------------------------------
Area.getMETERS_SQ_PER_HECTARE = function() {
	var METERS_SQ_PER_HECTARE_1 = 10000.0;
	return METERS_SQ_PER_HECTARE_1;
};

//------------------------------------------------------------
//
//	GETMETERS_SQ_PER_CENTIMETER_SQ
//
/**	Returns the number of m^2 in one cm^2
 *
 *	@return				The number of m^2 in one cm^2
 */
//------------------------------------------------------------
Area.getMETERS_SQ_PER_CENTIMETER_SQ = function() {
	var METERS_SQ_PER_CENTIMETER_SQ_1 =
		Length.getMETERS_PER_CENTIMETER() * 
		Length.getMETERS_PER_CENTIMETER();

	return METERS_SQ_PER_CENTIMETER_SQ_1;
};

//------------------------------------------------------------
//
//	GETMETERS_SQ_PER_KILOMETER_SQ
//
/**	Returns the number of m^2 in one km^2
 *
 *	@return				The number of m^2 in one km^2
 */
//------------------------------------------------------------
Area.getMETERS_SQ_PER_KILOMETER_SQ = function() {
	var METERS_SQ_PER_KILOMETER_SQ_1 =
		Length.getMETERS_PER_KILOMETER() * 
		Length.getMETERS_PER_KILOMETER();
	return METERS_SQ_PER_KILOMETER_SQ_1;
};

//------------------------------------------------------------
//
//	GETMETERS_SQ_PER_FOOT_SQ
//
/**	Returns the number of m^2 in one ft^2
 *
 *	@return				The number of m^2 in one ft^2
 */
//------------------------------------------------------------
Area.getMETERS_SQ_PER_FOOT_SQ = function() {
	var METERS_SQ_PER_FOOT_SQ_1 =
		Length.getMETERS_PER_FOOT() * Length.getMETERS_PER_FOOT();
	return METERS_SQ_PER_FOOT_SQ_1;
};

//------------------------------------------------------------
//
//	GETMETERS_SQ_PER_YARD_SQ
//
/**	Returns the number of m^2 in one yard^2
 *
 *	@return				The number of m^2 in one yard^2
 */
//------------------------------------------------------------
Area.getMETERS_SQ_PER_YARD_SQ = function() {
	var METERS_SQ_PER_YARD_SQ_1 =
		Length.getMETERS_PER_YARD() * Length.getMETERS_PER_YARD();
	return METERS_SQ_PER_YARD_SQ_1;
};

//------------------------------------------------------------
//
//	GETMETERS_SQ_PER_KILOYARD_SQ
//
/**	Returns the number of m^2 in one kiloyard^2
 *
 *	@return				The number of m^2 in one kiloyard^2
 */
//------------------------------------------------------------
Area.getMETERS_SQ_PER_KILOYARD_SQ = function() {
	var METERS_SQ_PER_KILOYARD_SQ_1 =
		Length.getMETERS_PER_KILOYARD() * 
		Length.getMETERS_PER_KILOYARD();
	return METERS_SQ_PER_KILOYARD_SQ_1;
};

//------------------------------------------------------------
//
//	GETMETERS_SQ_PER_DATA_MILE_SQ
//
/**	Returns the number of m^2 in one data mile^2
 *
 *	@return				The number of m^2 in one data mile^2
 */
//------------------------------------------------------------
Area.getMETERS_SQ_PER_DATA_MILE_SQ = function() {
	var METERS_SQ_PER_DATA_MILE_SQ_1 =
		Length.getMETERS_PER_DATA_MILE() * 
		Length.getMETERS_PER_DATA_MILE();
	return METERS_SQ_PER_DATA_MILE_SQ_1;
};

//------------------------------------------------------------
//
//	GETMETERS_SQ_PER_STATUTE_MILE_SQ
//
/**	Returns the number of m^2 in one statute mile^2
 *
 *	@return				The number of m^2 in one mile^2
 */
//------------------------------------------------------------
Area.getMETERS_SQ_PER_STATUTE_MILE_SQ = function() {
	var METERS_SQ_PER_STATUTE_MILE_SQ_1 =
		Length.getMETERS_PER_STATUTE_MILE() * 
		Length.getMETERS_PER_STATUTE_MILE();
	return METERS_SQ_PER_STATUTE_MILE_SQ_1;
};

//------------------------------------------------------------
//
//	GETMETERS_SQ_PER_NAUTICAL_MILE_SQ
//
/**	Returns the number of m^2 in one nautical mile^2
 *
 *	@return				The number of m^2 in one nm^2
 */
//------------------------------------------------------------
Area.getMETERS_SQ_PER_NAUTICAL_MILE_SQ = function() {
	var METERS_SQ_PER_NAUTICAL_MILE_SQ_1=
		Length.getMETERS_PER_NAUTICAL_MILE() *
		Length.getMETERS_PER_NAUTICAL_MILE();
	return METERS_SQ_PER_NAUTICAL_MILE_SQ_1;
};

//------------------------------------------------------------
//
//	GETMETERS_SQ_PER_ACRE
//
/**	Returns the number of m^2 in one acre
 *
 *	@return				The number of m^2 in one acre
 */
//------------------------------------------------------------
Area.getMETERS_SQ_PER_ACRE = function() {
	var METERS_SQ_PER_ACRE_1 =
		Area.getFEET_SQ_PER_ACRE() * Area.getMETERS_SQ_PER_FOOT_SQ();
	return METERS_SQ_PER_ACRE_1;
};

//------------------------------------------------------------
//
//	GETCENTIMETERS_SQ_PER_METER_SQ
//
/**	Returns the number of cm^2 in one m^2
 *
 *	@return				The number of cm^2 in one m^2
 */
//------------------------------------------------------------
Area.getCENTIMETERS_SQ_PER_METER_SQ = function() {
	var CENTIMETERS_SQ_PER_METER_SQ_1 =
				1.0 / Area.getMETERS_SQ_PER_CENTIMETER_SQ();
	return CENTIMETERS_SQ_PER_METER_SQ_1;
};

//------------------------------------------------------------
//
//	GETKILOMETERS_SQ_PER_METER_SQ
//
/**	Returns the number of km^2 in one m^2
 *
 *	@return				The number of km^2 in one m^2
 */
//------------------------------------------------------------
Area.getKILOMETERS_SQ_PER_METER_SQ = function() {
	var KILOMETERS_SQ_PER_METER_SQ_1 =
				1.0 / Area.getMETERS_SQ_PER_KILOMETER_SQ();
	return KILOMETERS_SQ_PER_METER_SQ_1;
};

//------------------------------------------------------------
//
//	GETFEET_SQ_PER_METER_SQ
//
/**	Returns the number of ft^2 in one m^2
 *
 *	@return				The number of ft^2 in one m^2
 */
//------------------------------------------------------------
Area.getFEET_SQ_PER_METER_SQ = function() {
	var FEET_SQ_PER_METER_SQ_1 =
				1.0 / Area.getMETERS_SQ_PER_FOOT_SQ();
	return FEET_SQ_PER_METER_SQ_1;
};

//------------------------------------------------------------
//
//	GETYARDS_SQ_PER_METER_SQ
//
/**	Returns the number of yards^2 in one m^2
 *
 *	@return				The number of yards^2 in one m^2
 */
//------------------------------------------------------------
Area.getYARDS_SQ_PER_METER_SQ = function() {
	var YARDS_SQ_PER_METER_SQ_1 =
				1.0 / Area.getMETERS_SQ_PER_YARD_SQ();
	return YARDS_SQ_PER_METER_SQ_1;
};

//------------------------------------------------------------
//
//	GETKILOYARDS_SQ_PER_METER_SQ
//
/**	Returns the number of kiloyards^2 in one m^2
 *
 *	@return				The number of kyards^2 in one m^2
 */
//------------------------------------------------------------
Area.getKILOYARDS_SQ_PER_METER_SQ = function() {
	var KILOYARDS_SQ_PER_METER_SQ_1 =
				1.0 / Area.getMETERS_SQ_PER_KILOYARD_SQ();
	return KILOYARDS_SQ_PER_METER_SQ_1;
};

//------------------------------------------------------------
//
//	GETDATA_MILES_SQ_PER_METER_SQ
//
/**	Returns the number of data miles^2 in one m^2
 *
 *	@return				The number of dmiles^2 in one m^2
 */
//------------------------------------------------------------
Area.getDATA_MILES_SQ_PER_METER_SQ = function() {
	var DATA_MILES_SQ_PER_METER_SQ_1 =
				1.0 / Area.getMETERS_SQ_PER_DATA_MILE_SQ();
	return DATA_MILES_SQ_PER_METER_SQ_1;
};

//------------------------------------------------------------
//
//	GETSTATUTE_MILES_SQ_PER_METER_SQ
//
/**	Returns the number of statute miles^2 in one m^2
 *
 *	@return				The number of miles^2 in one m^2
 */
//------------------------------------------------------------
Area.getSTATUTE_MILES_SQ_PER_METER_SQ = function() {
	var STATUTE_MILES_SQ_PER_METER_SQ_1 =
				1.0 / Area.getMETERS_SQ_PER_STATUTE_MILE_SQ();
	return STATUTE_MILES_SQ_PER_METER_SQ_1;
};

//------------------------------------------------------------
//
//	GETNAUTICAL_MILES_SQ_PER_METER_SQ
//
/**	Returns the number of nautical miles^2 in one m^2
 *
 *	@return				The number of nm^2 in one m^2
 */
//------------------------------------------------------------
Area.getNAUTICAL_MILES_SQ_PER_METER_SQ = function() {
	var NAUTICAL_MILES_SQ_PER_METER_SQ_1 =
				1.0 / Area.getMETERS_SQ_PER_NAUTICAL_MILE_SQ();
	return NAUTICAL_MILES_SQ_PER_METER_SQ_1;
};

//------------------------------------------------------------
//
//	GETACRES_PER_METER_SQ
//
/**	Returns the number of acres in one m^2
 *
 *	@return				The number of acres in one m^2
 */
//------------------------------------------------------------
Area.getACRES_PER_METER_SQ = function() {
	var ACRES_PER_METER_SQ_1 =
				1.0 / Area.getMETERS_SQ_PER_ACRE();
	return ACRES_PER_METER_SQ_1;
};

//------------------------------------------------------------
//
//	GETHECTARES_PER_METER_SQ
//
/**	Returns the number of hectares in one m^2
 *
 *	@return				The number of hectares in one m^2
 */
//------------------------------------------------------------
Area.getHECTARES_PER_METER_SQ = function() {
	var HECTARES_PER_METER_SQ_1 =
				1.0 / Area.getMETERS_SQ_PER_HECTARE();
	return HECTARES_PER_METER_SQ_1;
};

Area.getDefaultUnits = function() {
	return "meters^2";
};


Area.ScalarTypeConstructorSurrogate = function(s) {
	return new Area(s);
};


Area.getScalarName = function() {
	return "Area";
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
Area.zero = function() {
	return new Area().setValue(0.0);
};

//  Cache these results for efficiency.
var FEET_SQ_PER_ACRS =	Area.getFEET_SQ_PER_ACRE();
var METERS_SQ_PER_HECTARE =	Area.getMETERS_SQ_PER_HECTARE();
var METERS_SQ_PER_CENTIMETER_SQ = Area.getMETERS_SQ_PER_CENTIMETER_SQ();
var METERS_SQ_PER_KILOMETER_SQ = Area.getMETERS_SQ_PER_KILOMETER_SQ();
var METERS_SQ_PER_FOOT_SQ =	Area.getMETERS_SQ_PER_FOOT_SQ();
var METERS_SQ_PER_YARD_SQ =	Area.getMETERS_SQ_PER_YARD_SQ();
var METERS_SQ_PER_KILOYARD_SQ =	Area.getMETERS_SQ_PER_KILOYARD_SQ();
var METERS_SQ_PER_DATA_MILE_SQ = Area.getMETERS_SQ_PER_DATA_MILE_SQ();
var METERS_SQ_PER_STATUTE_MILE_SQ =	Area.getMETERS_SQ_PER_STATUTE_MILE_SQ();
var METERS_SQ_PER_NAUTICAL_MILE_SQ = Area.getMETERS_SQ_PER_NAUTICAL_MILE_SQ();
var METERS_SQ_PER_ACRE = Area.getMETERS_SQ_PER_ACRE();
var CENTIMETERS_SQ_PER_METER_SQ = Area.getCENTIMETERS_SQ_PER_METER_SQ();
var KILOMETERS_SQ_PER_METER_SQ = Area.getKILOMETERS_SQ_PER_METER_SQ();
var FEET_SQ_PER_METER_SQ = Area.getFEET_SQ_PER_METER_SQ();
var YARDS_SQ_PER_METER_SQ =	Area.getYARDS_SQ_PER_METER_SQ();
var KILOYARDS_SQ_PER_METER_SQ =	Area.getKILOYARDS_SQ_PER_METER_SQ();
var DATA_MILES_SQ_PER_METER_SQ = Area.getDATA_MILES_SQ_PER_METER_SQ();
var STATUTE_MILES_SQ_PER_METER_SQ =	Area.getSTATUTE_MILES_SQ_PER_METER_SQ();
var NAUTICAL_MILES_SQ_PER_METER_SQ = Area.getNAUTICAL_MILES_SQ_PER_METER_SQ();
var ACRES_PER_METER_SQ = Area.getACRES_PER_METER_SQ();
var HECTARES_PER_METER_SQ = Area.getHECTARES_PER_METER_SQ();

return Area;
});
