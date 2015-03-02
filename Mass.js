//
//  Developed for Naval Sea Systems Command, Code SEA61, and the FACT/OSI
//  program at the Johns Hopkins University / Applied Physics Laboratory
//
//  Copyright (c) 2013 The Johns Hopkins University / Applied Physics Laboratory
//  All rights reserved.
//
//  This material may be used, modified, or reproduced by or for the
//  U.S. Government pursuant to the license rights granted under the clauses at
//  DFARS 252.227-7013/7014.  For any other permissions, please contact the
//  FACT Program Office at JHU/APL.
//
//  Project:                 Ocean Surveillance Initiative (OSI)
//  File:                    Mass.C
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
//	MASS
//
/**	This class encapsulates the concept of mass.  The mass
 *	may only be positive, as I could not justify including
 *	anti-matter in the model.
 * 	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================
define(function() {
	"use strict";

Mass.prototype.setValue = function(val) {
	//Sets the value;
	this.value = val;
	
	//  Remember that we've set the value.
	this.setFlag = true;
	
	//  This cast will always be valid since GenericScalar is
	//  abstract and self-bounded, and all sub-classes are final.
	return this;
};

Mass.prototype.getValue = function() {
	if (!this.setFlag) {
		throw "NotSetException";
	}
	return this.value;
};

function Mass() {
	//--------------------------------------------------------
	//
	//	MASS
	//
	/**	Default constructor.
	 */
	//--------------------------------------------------------
	if (arguments.length == 0) {
		this.value = 0.0
		this.value = false;		
	} 
	//--------------------------------------------------------
	//
	//	MASS
	//
	/**	Copy constructor.
	 *
	 *	@param	s			The Mass to be copied.
	 *
	 *	@throws				NotSetException if the supplied
	 *						Mass is not set.
	 */
	//--------------------------------------------------------
	//---------------------------------------------------------
	//
	//	SETINPOUNDSMASS
	//
	/**	This method sets the mass in pounds-mass.  Since "pounds"
	 *  are really a unit of force, the interpretation
	 *  of pounds-mass is the mass that, on the Earth, creates 
	 *  1 of the units of pounds-force that is in general civil use
	 *  in the United States.  More directly, 
	 *
	 *		1 lb-force = 1 lb-mass * g
	 *
	 *	@param	poundsmass	The mass in pounds-mass.
	 *
	 *	@return				The mass.
	 */
	//---------------------------------------------------------
	else if (arguments.length == 1) {
		this.setValue(arguments[0]);
	}
}

Mass.prototype.setInPoundsMass = function(poundsmass) {
	this.setValue(poundsmass * Mass.getKILOGRAMS_PER_POUNDMASS());
	return this;
};

//---------------------------------------------------------
//
//	SETINKILOGRAMS
//
/**	This method sets the mass in kilograms.
 *
 *	@param	kilograms	The mass in kilograms.	
 *
 *	@return				The mass.
 */
//---------------------------------------------------------
Mass.prototype.setInKilograms = function(kilograms) {
	this.setValue(kilograms);
	return this;
};

//---------------------------------------------------------
//
//	SETINGRAMS
//
/**	This method sets the mass in grams.
 *
 *	@param	grams		The mass in grams.	
 *
 *	@return				The mass.
 */
//---------------------------------------------------------
Mass.prototype.setInGrams = function(grams) {
	this.setValue(grams * Mass.getKILOGRAMS_PER_GRAM());
	return this;
};

//---------------------------------------------------------
//
//	SETINMETRICTONS
//
/**	This method sets the mass in metric tons.
 *
 *	@param	mton		The mass in metric tons.	
 *
 *	@return				The mass.
 */
//---------------------------------------------------------
Mass.prototype.setInMetricTons = function(mton) {
	this.setValue(mton * Mass.getKILOGRAMS_PER_METRIC_TON());
	return this;
};

//---------------------------------------------------------
//
//	GETINPOUNDSMASS
//
/**	This method gets the mass in pounds-mass.  Since "pounds"
 *  are really a unit of force, the interpretation
 *  of pounds-mass is the mass that, on the Earth, creates 
 *  1 of the units of pounds-force that is in general civil use
 *  in the United States.  More directly, 
 *
 *		1 lb-force = 1 lb-mass * g
 *
 *	@return				The mass in pounds-mass.
 */
//---------------------------------------------------------
Mass.prototype.getInPoundsMass = function() {
	return (this.getValue() * Mass.getPOUNDSMASS_PER_KILOGRAM());
};

//---------------------------------------------------------
//
//	GETINKILOGRAMS
//
/**	This method gets the mass in kilograms.
 *
 *	@return				The mass in kilograms.
 */
//---------------------------------------------------------
Mass.prototype.getInKilograms = function() {
	return this.getValue();
};

//---------------------------------------------------------
//
//	GETINGRAMS
//
/**	This method gets the mass in grams.
 *
 *	@return				The mass in grams.
 */
//---------------------------------------------------------
Mass.prototype.getInGrams = function() {
	return (this.getValue() * Mass.getGRAMS_PER_KILOGRAM());
};

//---------------------------------------------------------
//
//	GETINMETRICTONS
//
/**	This method gets the mass in metric tons.
 *
 *	@return				The mass in metric tons.
 */
//---------------------------------------------------------
Mass.prototype.getInMetricTons = function() {
	return (this.getValue() * Mass.getMETRIC_TONS_PER_KILOGRAM());
};

//------------------------------------------------------------
//
//	GETPOUNDSMASS_PER_KILOGRAM
//
/**	Returns the number of pounds-mass in one kilogram.
 *
 *	@return				The number of lb-m in one kg.
 */
//------------------------------------------------------------
Mass.getPOUNDSMASS_PER_KILOGRAM = function() {
	//  Taken from "CRC Standard Mathematical Tables", 27th Edition,
	//  CRC Press, 1984, pg. 3.
	var	POUNDSMASS_PER_KILOGRAM = 0.45359237;
	return POUNDSMASS_PER_KILOGRAM;
};

//------------------------------------------------------------
//
//	GETGRAMS_PER_KILOGRAM
//
/**	Returns the number of grams in one kilogram.
 *
 *	@return				The number of g in one kg.
 */
//------------------------------------------------------------
Mass.getGRAMS_PER_KILOGRAM = function() {
	var	GRAMS_PER_KILOGRAM = 1000.0;
	return GRAMS_PER_KILOGRAM;
};

//------------------------------------------------------------
//
//	GETMETRIC_TONS_PER_KILOGRAM
//
/**	Returns the number of metric tons in one kilogram.
 *
 *	@return				The number of metric tons in one kg.
 */
//------------------------------------------------------------
Mass.getMETRIC_TONS_PER_KILOGRAM = function() {
	var	METRIC_TONS_PER_KILOGRAM = 1.0 / Mass.getKILOGRAMS_PER_METRIC_TON();
	return METRIC_TONS_PER_KILOGRAM;
};

//------------------------------------------------------------
//
//	GETKILOGRAMS_PER_POUNDSMASS
//
/**	Returns the number of kilograms in one pound-mass.
 *
 *	@return				The number of kg in one lb-m.
 */
//------------------------------------------------------------
Mass.getKILOGRAMS_PER_POUNDMASS = function() {
	var	KILOGRAMS_PER_POUNDMASS = 1.0 / Mass.getPOUNDSMASS_PER_KILOGRAM();
	return KILOGRAMS_PER_POUNDMASS;
};

//------------------------------------------------------------
//
//	GETKILOGRAMS_PER_GRAM
//
/**	Returns the number of kilograms in one gram.
 *
 *	@return				The number of kilograms in one gram.
 */
//------------------------------------------------------------
Mass.getKILOGRAMS_PER_GRAM = function() {
	var	KILOGRAMS_PER_GRAM = 1.0 / Mass.getGRAMS_PER_KILOGRAM();
	return KILOGRAMS_PER_GRAM;
};

//------------------------------------------------------------
//
//	GETKILOGRAMS_PER_METRIC_TON
//
/**	Returns the number of kilograms in one metric ton.
 *
 *	@return				The number of kilograms in one
 *						metric ton.
 */
//------------------------------------------------------------
Mass.getKILOGRAMS_PER_METRIC_TON = function() {
	var	KILOGRAMS_PER_METRIC_TON = 1000.0;
	return KILOGRAMS_PER_METRIC_TON;
};

Mass.getDefaultUnits = function() {
	return "kilograms";
};

Mass.ScalarTypeConstructorSurrogate = function(s) {
	return new Mass(s);
};

Mass.getScalarName = function() {
	return "Mass";
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
Mass.zero = function() {
	return new Mass().setValue(0.0);
};


	return Mass;
});
