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
//  File:                    Frequency.C
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
//	FREQUENCY
//
/**	This class encapsulates the concept of a temporal frequency.  The 
 *	frequency may be positive or negative, indicating direction from some
 *  (unencapsulated) reference.
 * 	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================

define(["TimeLength"], function(TimeLength) {



Frequency.prototype.setValue = function(val) {
	//Sets the value;
	this.value = val;
	
	//  Remember that we've set the value.
	this.setFlag = true;
	
	//  This cast will always be valid since GenericScalar is
	//  abstract and self-bounded, and all sub-classes are final.
	return this;
};

Frequency.prototype.getValue = function() {
	if (!this.setFlag) {
		throw "NotSetException";
	}
	return this.value;
};

function Frequency() {
	//--------------------------------------------------------
	//
	//	FREQUENCY
	//
	/**	Copy constructor.
	 *
	 *	@param	s			The Frequency to be copied.
	 *
	 *	@throws				NotSetException if the supplied
	 *						Frequency is not set.
	 */
	//--------------------------------------------------------
	if (arguments.length == 0) {
		this.value = 0.0;
		this.setFlag = false;
	}
	//--------------------------------------------------------
	//
	//	FREQUENCY
	//
	/**	Conversion constructor.
	 *
	 *	@param	s			The GenericScalar<Frequency> to be copied.
	 *
	 *	@throws				NotSetException if the supplied
	 *						GenericScalar<Frequency> is not set.
	 */
	//--------------------------------------------------------
	else if (arguments.length == 1) {
		this.setValue(arguments[0]);
	}
}

//---------------------------------------------------------
//
//	SETHERTZ
//
/**	This method sets the frequency in Hertz. 
 *
 *	@param	hz			The frequency in Hertz
 *
 *	@return				The frequency.
 */
//---------------------------------------------------------
Frequency.prototype.setInHertz = function(hz) {
	this.setValue(hz);
	return this;
};

//---------------------------------------------------------
//
//	SETINKILOHERTZ
//
/**	This method sets the frequency in KiloHertz.  A KiloHertz
 *	is 1000 Hz.
 *
 *	@param	kHz			The frequency in KiloHertz
 *
 *	@return				The frequency.
 */
//---------------------------------------------------------
Frequency.prototype.setInKiloHertz = function(kHz) {
	this.setValue(kHz * Frequency.getHERTZ_PER_KILOHERTZ());
	return this;
};

//---------------------------------------------------------
//
//	SETINMEGAHERTZ
//
/**	This method sets the frequency in MegaHertz.  A MegaHertz
 *	is 10^6 Hz.
 *
 *	@param	MHz			The frequency in MegaHertz
 *
 *	@return				The frequency.
 */
//---------------------------------------------------------
Frequency.prototype.setInMegaHertz = function(MHz) {
	this.setValue(MHz * Frequency.getHERTZ_PER_MEGAHERTZ());
	return this;
};

//---------------------------------------------------------
//
//	SETINGIGAHERTZ
//
/**	This method sets the frequency in GigaHertz.  A GigaHertz
 *	is 10^9 Hz.
 *
 *	@param	GHz			The frequency in GigaHertz
 *
 *	@return				The frequency.
 */
//---------------------------------------------------------
Frequency.prototype.setInGigaHertz = function(GHz) {
	this.setValue(GHz * Frequency.getHERTZ_PER_GIGAHERTZ());
	return this;
};

//---------------------------------------------------------
//
//	SETININVERSESIDEREALSECONDS
//
/**	This method sets the frequency in inverse sidereal
 *	seconds.
 *
 *	@param	invSideSec	The frequency in inverse sidereal
 *							seconds.
 *
 *	@return				The frequency.
 */
//---------------------------------------------------------
Frequency.prototype.setInInverseSiderealSeconds	 = function(invSideSec) {
	this.setValue(invSideSec * 
				  Frequency.getHERTZ_PER_INVERSE_SIDEREAL_SECOND());
	return this;
};

//---------------------------------------------------------
//
//	SETININVERSECALENDARDAYS
//
/**	This method sets the frequency in inverse calendar
 *	days.  A calendar day is exactly 86,400 SI seconds,
 *	so an inverse calendar day is about 1.1575e-05 Hz.
 *
 *	@param	invCalDay	The frequency in inverse calendar
 *							days.
 *
 *	@return				The frequency.
 */
//---------------------------------------------------------
Frequency.prototype.setInInverseCalendarDays  = function(invCalDay) {
	this.setValue(invCalDay * Frequency.getHERTZ_PER_INVERSE_CALENDAR_DAY());
	return this;
};

//---------------------------------------------------------
//
//	SETININVERSEMEANSOLARDAYS
//
/**	This method sets the frequency in inverse mean solar
 *	days.  A mean solar day in 1999 was about 86,400.002
 *	SI seconds, so an inverse mean solar day is close to,
 *	but not exactly, an inverse calendar day.
 *
 *	@param	invSolDay	The frequency in inverse mean solar
 *							days.
 *
 *	@return				The frequency.
 */
//---------------------------------------------------------
Frequency.prototype.setInInverseMeanSolarDays = function(invSolDay) {
	this.setValue(invSolDay * Frequency.getHERTZ_PER_INVERSE_MEAN_SOLAR_DAY());
	return this;
};

//---------------------------------------------------------
//
//	SETININVERSESIDEREALDAYS
//
/**	This method sets the frequency in inverse sidereal
 *	days.  A sidereal day is exactly 86,400 sidereal seconds.
 *
 *	@param	invSideDay	The frequency in inverse sidereal
 *							days.
 *
 *	@return				The frequency.
 */
//---------------------------------------------------------
Frequency.prototype.setInInverseSiderealDays  = function(invSideDay) {
	this.setValue(invSideDay * Frequency.getHERTZ_PER_INVERSE_SIDEREAL_DAY());
	return this;
};		

//---------------------------------------------------------
//
//	GETINHERTZ
//
/**	This method gets the frequency in Hertz.  
 *
 *	@return				The frequency in Hertz.
 *
 *	@throws				NotSetException if this Frequency
 *							is not set.
 */
//---------------------------------------------------------
Frequency.prototype.getInHertz = function() {
	return this.getValue();
};

//---------------------------------------------------------
//
//	GETINKILOHERTZ
//
/**	This method gets the frequency in KiloHertz.  A KiloHertz
 *	is 1000 Hz.
 *
 *	@return				The frequency in KiloHertz.
 *
 *	@throws				NotSetException if this Frequency
 *							is not set.
 */
//---------------------------------------------------------
Frequency.prototype.getInKiloHertz = function() {
	return this.getValue() * Frequency.getKILOHERTZ_PER_HERTZ();
};

//---------------------------------------------------------
//
//	GETINMEGAHERTZ
//
/**	This method gets the frequency in MegaHertz.  A MegaHertz
 *	is 10^6 Hz.
 *
 *	@return				The frequency in MegaHertz.
 *
 *	@throws				NotSetException if this Frequency
 *							is not set.
 */
//---------------------------------------------------------
Frequency.prototype.getInMegaHertz = function() {
	return this.getValue() * Frequency.getMEGAHERTZ_PER_HERTZ();
};

//---------------------------------------------------------
//
//	GETINGIGAHERTZ
//
/**	This method gets the frequency in GigaHertz.  A GigaHertz
 *	is 10^9 Hz.
 *
 *	@return				The frequency in GigaHertz.
 *
 *	@throws				NotSetException if this Frequency
 *							is not set.
 */
//---------------------------------------------------------
Frequency.prototype.getInGigaHertz = function() {
	return this.getValue() * Frequency.getGIGAHERTZ_PER_HERTZ();
};

//---------------------------------------------------------
//
//	GETININVERSESIDEREALSECONDS
//
/**	This method gets the frequency in inverse sidereal
 *	seconds.
 *
 *	@return				The frequency in inverse sidereal
 *							seconds.
 *
 *	@throws				NotSetException if this Frequency
 *							is not set.
 */
//---------------------------------------------------------
Frequency.prototype.getInInverseSiderealSeconds = function() {
	return (this.getValue() * Frequency.getINVERSE_SIDEREAL_SECONDS_PER_HERTZ());
};

//---------------------------------------------------------
//
//	GETININVERSECALENDARDAYS
//
/**	This method gets the frequency in inverse calendar
 *	days.  A calendar day is exactly 86,400 SI seconds,
 *	so an inverse calendar day is about 1.1575e-05 Hz.
 *
 *	@return				The frequency in inverse calendar
 *							days.
 *
 *	@throws				NotSetException if this Frequency
 *							is not set.
 */
//---------------------------------------------------------
Frequency.prototype.getInInverseCalendarDays = function() {
	return (this.getValue() * Frequency.getINVERSE_CALENDAR_DAYS_PER_HERTZ());
};

//---------------------------------------------------------
//
//	GETININVERSEMEANSOLARDAYS
//
/**	This method gets the frequency in inverse mean solar
 *	days.  A mean solar day in 1999 was about 86,400.002
 *	SI seconds, so an inverse mean solar day is close to,
 *	but not exactly, an inverse calendar day.
 *
 *	@return				The frequency in inverse mean solar
 *							days.
 *
 *	@throws				NotSetException if this Frequency
 *							is not set.
 */
//---------------------------------------------------------
Frequency.prototype.getInInverseMeanSolarDays = function() {
	return (this.getValue() * Frequency.getINVERSE_MEAN_SOLAR_DAYS_PER_HERTZ());
};

//---------------------------------------------------------
//
//	GETININVERSESIDEREALDAYS
//
/**	This method gets the frequency in inverse sidereal
 *	days.  A sidereal day is exactly 86,400 sidereal seconds.
 *
 *	@return				The frequency in inverse sidereal
 *							days.
 *
 *	@throws				NotSetException if this Frequency
 *							is not set.
 */
//---------------------------------------------------------
Frequency.prototype.getInInverseSiderealDays = function() {
	return (this.getValue() * Frequency.getINVERSE_SIDEREAL_DAYS_PER_HERTZ());
};


//------------------------------------------------------------
//
//	GETHERTZ_PER_KILOHERTZ
//
/**	Returns the number of Hertz in one kiloHertz.
 *
 *	@return				The number of Hz in one kHz.
 */
//------------------------------------------------------------
Frequency.getHERTZ_PER_KILOHERTZ = function() {
	var	HERTZ_PER_KILOHERTZ = 1000.0;
	return HERTZ_PER_KILOHERTZ;
};

//------------------------------------------------------------
//
//	GETHERTZ_PER_MEGAHERTZ
//
/**	Returns the number of Hertz in one megaHertz.
 *
 *	@return				The number of Hz in one MHz.
 */
//------------------------------------------------------------
Frequency.getHERTZ_PER_MEGAHERTZ = function() {
	var	HERTZ_PER_MEGAHERTZ = 1000000.0;
	return HERTZ_PER_MEGAHERTZ;
};

//------------------------------------------------------------
//
//	GETHERTZ_PER_GIGAHERTZ
//
/**	Returns the number of Hertz in one gigaHertz.
 *
 *	@return				The number of Hz in one GHz.
 */
//------------------------------------------------------------
Frequency.getHERTZ_PER_GIGAHERTZ = function() {
	var HERTZ_PER_GIGAHERTZ = 1000000000.0;
	return HERTZ_PER_GIGAHERTZ;
};

//------------------------------------------------------------
//
//	GETINVERSE_SIDEREAL_SECONDS_PER_HERTZ
//
/**	Returns the number of 1/sidereal secs in one Hertz.
 *
 *	@return				The number of inverse sidereal
 *							seconds per Hertz.
 */
//------------------------------------------------------------
Frequency.getINVERSE_SIDEREAL_SECONDS_PER_HERTZ = function() {
	var	INVERSE_SIDEREAL_SECONDS_PER_HERTZ =
		TimeLength.getSI_SECONDS_PER_SIDEREAL_SECOND();
	return INVERSE_SIDEREAL_SECONDS_PER_HERTZ;
};

//------------------------------------------------------------
//
//	GETHERTZ_PER_INVERSE_SIDEREAL_SECOND
//
/**	Returns the number of Hertz in one 1/sidereal second.
 *
 *	@return				The number of Hertz per inverse
 *							sidereal seconds.
 */
//------------------------------------------------------------
Frequency.getHERTZ_PER_INVERSE_SIDEREAL_SECOND = function() {
	var	HERTZ_PER_INVERSE_SIDEREAL_SECOND =
		TimeLength.getSIDEREAL_SECONDS_PER_SI_SECOND();
	return HERTZ_PER_INVERSE_SIDEREAL_SECOND;
};

//------------------------------------------------------------
//
//	GETINVERSE_CALENDAR_DAYS_PER_HERTZ
//
/**	Returns the number of 1/calendar days in one Hertz.
 *
 *	@return				The number of inverse calendar
 *							days per Hertz.
 */
//------------------------------------------------------------
Frequency.getINVERSE_CALENDAR_DAYS_PER_HERTZ = function() {
	var	INVERSE_CALENDAR_DAYS_PER_HERTZ =
		TimeLength.getSI_SECONDS_PER_CALENDAR_DAY();
	return INVERSE_CALENDAR_DAYS_PER_HERTZ;
};

//------------------------------------------------------------
//
//	GETHERTZ_PER_INVERSE_CALENDAR_DAY
//
/**	Returns the number of Hertz in one 1/calendar day.
 *
 *	@return				The number of Hertz per inverse
 *							calendar day.
 */
//------------------------------------------------------------
Frequency.getHERTZ_PER_INVERSE_CALENDAR_DAY = function() {
	var	HERTZ_PER_INVERSE_CALENDAR_DAY =
		TimeLength.getCALENDAR_DAYS_PER_SI_SECOND();
	return HERTZ_PER_INVERSE_CALENDAR_DAY;
};

//------------------------------------------------------------
//
//	GETINVERSE_MEAN_SOLAR_DAYS_PER_HERTZ
//
/**	Returns the number of 1/mean solar days in one Hertz.
 *
 *	@return				The number of inverse mean solar
 *							days per Hertz.
 */
//------------------------------------------------------------
Frequency.getINVERSE_MEAN_SOLAR_DAYS_PER_HERTZ = function() {
	var	INVERSE_MEAN_SOLAR_DAYS_PER_HERTZ =
		TimeLength.getSI_SECONDS_PER_MEAN_SOLAR_DAY_1999();
	return INVERSE_MEAN_SOLAR_DAYS_PER_HERTZ;
};

//------------------------------------------------------------
//
//	GETHERTZ_PER_INVERSE_MEAN_SOLAR_DAY
//
/**	Returns the number of Hertz in one 1/mean solar day.
 *
 *	@return				The number of Hertz per inverse
 *							mean solar day.
 */
//------------------------------------------------------------
Frequency.getHERTZ_PER_INVERSE_MEAN_SOLAR_DAY = function() {
	var	HERTZ_PER_INVERSE_MEAN_SOLAR_DAY =
		TimeLength.getMEAN_SOLAR_DAYS_PER_SI_SECOND_1999();
	return HERTZ_PER_INVERSE_MEAN_SOLAR_DAY;
};

//------------------------------------------------------------
//
//	GETINVERSE_SIDEREAL_DAYS_PER_HERTZ
//
/**	Returns the number of 1/sidereal days in one Hertz.
 *
 *	@return				The number of inverse sidereal
 *							days per Hertz.
 */
//------------------------------------------------------------
Frequency.getINVERSE_SIDEREAL_DAYS_PER_HERTZ = function() {
	var	INVERSE_SIDEREAL_DAYS_PER_HERTZ =
		TimeLength.getSI_SECONDS_PER_SIDEREAL_DAY();
	return INVERSE_SIDEREAL_DAYS_PER_HERTZ;
};

//------------------------------------------------------------
//
//	GETHERTZ_PER_INVERSE_SIDEREAL_DAY
//
/**	Returns the number of Hertz in one 1/sidereal day.
 *
 *	@return				The number of Hertz per inverse
 *							sidereal day.
 */
//------------------------------------------------------------
Frequency.getHERTZ_PER_INVERSE_SIDEREAL_DAY = function() {
	var	HERTZ_PER_INVERSE_SIDEREAL_DAY =
		TimeLength.getSIDEREAL_DAYS_PER_SI_SECOND();
	return HERTZ_PER_INVERSE_SIDEREAL_DAY;
};

//------------------------------------------------------------
//
//	GETKILOHERTZ_PER_HERTZ
//
/**	Returns the number of kiloHertz in one Hertz.
 *
 *	@return				The number of kHz per Hz.
 */
//------------------------------------------------------------
Frequency.getKILOHERTZ_PER_HERTZ = function() {
	var KILOHERTZ_PER_HERTZ = 
		1.0 / Frequency.getHERTZ_PER_KILOHERTZ();
	return KILOHERTZ_PER_HERTZ;
};

//------------------------------------------------------------
//
//	GETMEGAHERTZ_PER_HERTZ
//
/**	Returns the number of megaHertz in one Hertz.
 *
 *	@return				The number of MHz per Hz.
 */
//------------------------------------------------------------
Frequency.getMEGAHERTZ_PER_HERTZ = function() {
	var	MEGAHERTZ_PER_HERTZ =
		1.0 / Frequency.getHERTZ_PER_MEGAHERTZ();
	return MEGAHERTZ_PER_HERTZ;
};

//------------------------------------------------------------
//
//	GETGIGAHERTZ_PER_HERTZ
//
/**	Returns the number of gigaHertz in one Hertz.
 *
 *	@return				The number of GHz per Hz.
 */
//------------------------------------------------------------
Frequency.getGIGAHERTZ_PER_HERTZ = function() {
	var	GIGAHERTZ_PER_HERTZ = 
		1.0 / Frequency.getHERTZ_PER_GIGAHERTZ();
	return GIGAHERTZ_PER_HERTZ;
};

Frequency.getDefaultUnits = function() {
	return "Hertz";
};

Frequency.ScalarTypeConstructorSurrogate = function(s) {
	return new Frequency(s);
};

Frequency.getScalarName = function() {
	return "Frequency";
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
Frequency.zero = function() {
	return new Frequency().setValue(0.0);
};



	return Frequency;
});
