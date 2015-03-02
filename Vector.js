//Vector.C ported to Javascript
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
//  File:                    Vector.C
//  Classification:          UNCLASSIFIED
//  Proprietary Information: NONE
//  Release:                 Controlled by NAVSEA61, Government Program Office
//
//  Programmer: 			 R. Conn             
//  Description:             see below
//
//  Reviewed By:             Tim McGee on March 21, 2007
//  Notes:                   
//
//=====================================================================
//
//	VECTOR
//
/**	This class is the parent class for all vectors.  The dominant
 *	feature of all vectors is that they must be attached to
 *	a base Cartesian coordinate system.
 * 	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//=====================================================================
define(function() {
	"use strict";



Vector.prototype.getBaseCartesianCoordinateSystem = function() {
	if (this.base == null) {
		throw "CoordinateSystemNotSetException";
	}
	return this.base;
};

Vector.prototype.isCoordinateSystemSet = function() {
	return (this.base != null);
};

Vector.prototype.setCoordinateSystem = function(coordSys) {
	if (this.base == null) {
		base = coordSys;
	} else {
		throw "CoordinateSystemAlreadySetException";
				

	}
};

function Vector() {
	//------------------------------------------------------
	//	This constructor allows for sorting and proper use of the 
	//vrctor constructor.
	//	VECTOR
	//
	/**	Protected constructor to ensure that no one can
	 *	instantiate a Vector.  The base Cartesian coordinate
	 *  system is blank; the vector cannot be used until
	 *	a coordinate system is set.
	 *
	 */
	//------------------------------------------------------
	if (arguments.length == 0) {
		this.base = null;
	} 
	//------------------------------------------------------
	//
	//	VECTOR
	//
	/**	Protected constructor to ensure that no one can
	 *	instantiate a Vector.  The base Cartesian coordinate
	 *  system is set upon creation and cannot be changed.
	 *
	 *	@param	baseCoords	The base Cartesian coordinate
	 *							system in which this vector
	 *							exists.
	 */
	//------------------------------------------------------
	else if (arguments.length == 1) {
		if (arguments[0] instanceof BaseCartesianCoordinateSystem3D) {
			this.base = baseCoords;
	
		} 

	//------------------------------------------------------
	//
	//	VECTOR
	//
	/**	Protected constructor to ensure that no one can
	 *	instantiate a Vector.  Copy the supplied vector.
	 *	It is an error to attempt to copy an unset vector.
	 *
	 *	@param	v			The vector to be copied.
	 *
	 *	@throws				CoordinateSystemNotSetException
	 *							if the coordinate system
	 *							of the supplied vector
	 *							has not yet been set.
	 */
	//------------------------------------------------------
		  else {
			throw "CoordinateSystemNotSetException";
			this.base= v.base;
			if (this.base==null){

				throw "CoordinateSystemNotSetException";
				
			}
		}	
	}

}


return Vector;
});



































