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
//  File:                    Month.java
//  Classification:          UNCLASSIFIED
//  Proprietary Information: NONE
//  Release:                 Controlled by NAVSEA61, Government Program Office
//
//  Programmer:              
//  Description:             
//
//  Reviewed By:             
//  Notes:                   
//
/*
var Month = {
	January : 1,
	February : 2,
	March : 3,
	April : 4,
	May : 5,
	June : 6,
	July : 7,
	August : 8,
	September : 9,
	October : 10,
	November : 11,
	December : 12
};
*/
define(function() {
	"use strict";

function Month(val) {
	this.value = val;
}

Month.prototype.getMonthNumber = function() {
	return this.value;
};

Month.getMonthByNumber = function(val) {
	switch (val) {
		case 1: 
			return "January";
		case 2:
			return "February";
		case 3: 
			return "March";
		case 4:
			return "April";
		case 5: 
			return "May";
		case 6:
			return "June";
		case 7: 
			return "July";
		case 8:
			return "August";
		case 9: 
			return "September";
		case 10:
			return "October";
		case 11: 
			return "November";
		case 12:
			return "December";
		default:
			throw "IllegalArgumentException";
	}
};

Month.prototype.opEq = function(rhs) {
	return (this.value == rhs.value);
};

Month.prototype.opNotEq = function(rhs) {
	return (this.value != rhs.value);
};

Month.prototype.opLess = function(rhs) {
	return (this.value < rhs.value);
};

Month.prototype.opLessEq = function(rhs) {
	return (this.value <= rhs.value);
};

Month.prototype.opGreat = function(rhs) {
	return (this.value > rhs.value);
};

Month.prototype.opGreatEq = function(rhs) {
	return (this.value >= rhs.value);
};

Month.prototype.opIncr = function() {
	var	tmp = this.value + 1;
	if (tmp > new Month(12).getMonthNumber()) {
		tmp = 1;
	}
	var retval = 1;
	try {
		retval = Month.getMonthByNumber(tmp);
	} catch (err) {
		//Log.warning(iae.toString());
	}
	return retval;
};

Month.prototype.opDecr = function() {
	var	tmp = this.value - 1;
	if (tmp < new Month(1).getMonthNumber()) {
		tmp = 12;
	}
	var retval = 12;
	try {
		retval = Month.getMonthByNumber(tmp);
	} catch (err) {
		//Log.warning(iae.toString());
	}
	return retval;
};
	Month.January = 1;
	Month.February = 2;
	Month.March = 3;
	Month.April = 4;
	Month.May = 5;
	Month.June = 6;
	Month.July = 7;
	Month.August = 8;
	Month.September = 9;
	Month.October = 10;
	Month.November = 11;
	Month.December = 12;


//consol.log(getMonthByNumber(1));
	return Month;
});
