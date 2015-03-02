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
//  File:                    Point.H
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
//	POINT
//
/**	This class is the parent class for all points.  The dominant
 *	features of all points are that they are described by three
 *	scalars and must attached to a coordinate system.
 * 	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//=====================================================================
define(function() {
	"use strict";



//------------------------------------------------------
//
//  GETCOORDINATESYSTEM
//
/**	This method returns a reference to the 
 *  coordinate system in which this point exists.
 *  
 *	@return			A reference to the coordinate system 
	 *						in which this point exists.
 *
 *	@throws			CoordinateSystemNotSetException
 *						if the coordinate system of
 *						this point has not yet been set.
 */
//-------------------------------------------------------
Point.prototype.getCoordinateSystem = function() {
	if (this.coords != null) {
		return this.coords;
	} else {
		throw "CoordinateSystemNotSetException";
	}
};
//------------------------------------------------------
//
//  GETBASECARTESIANCOORDINATESYSTEM
//
/**	This method returns a reference to the 
 *  base Cartesian coordinate system of the coordinate
	 *  system in which this point exists.  If this point
 *	exists in a base Cartesian coordinate system, then
 *	this method will give the same result as
 *  the getCoordinateSystem() method.
 *  
 *	@return			A reference to the base Cartesian
	 *						coordinate system of the coordinate 
 *						system in which this point exists.
 *
 *	@throws			CoordinateSystemNotSetException
 *						if the coordinate system of
 *						this point has not yet been set.
 */
//-------------------------------------------------------
Point.prototype.getBaseCartesianCoordinateSystem = function() {
	if (this.coords != null) {
		return coords.getBaseCartesianCoordinateSystem();
	} else {
		throw "CoordinateSystemNotSetException";
	}
};

//-------------------------------------------------------
//
//	ISCOORDINATESYSTEMSET
//
/**	This method returns true if the coordinate system of
 *	this point has been set, and false otherwise.
 *
 *	@return			true if the coordinate system of this
	 *						point has been set; otherwise
 *						false.
 */
//-------------------------------------------------------
Point.prototype.isCoordinateSystemSet = function() {
	return (this.coords != null);
};
//-------------------------------------------------------
//
//	SETCOORDINATESYSTEM
//
/**	This method sets the coordinate system of this point
 *	to be the supplied coordinate system.
 *
 *	@throws			CoordinateSystemAlreadySetException if
 *						the coordinate system of this
 *						point has already been set.
 */
//-------------------------------------------------------
Point.prototype.setCoordinateSystem = function(coordSys) {
	if (this.coords == null) {
		this.coords = coordSys;
	} else {
		throw "CoordinateSystemAlreadySetException";
	}
};

function Point() {
	//------------------------------------------------------
	//
	//	POINT
	//
	/**	Protected constructor to ensure that no one can
	 *	instantiate a Point.  The coordinate system is 
	 *	not set.
	 */
	//------------------------------------------------------
	if (arguments.length == 0) {
		this.coords = null;
	} else if (arguments.length == 1) {
		//------------------------------------------------------
		//
		//	POINT
		//
		/**	Only subclasses should be making copies of points.
		 *	It is an error to attempt to copy an unset point.
		 *
		 *	@param	p			The point that is to be copied.
		 *
		 *	@throws				CoordinateSystemNotSetException
		 *							if the supplied point does
		 *							not have its coordinate
		 *							system set.
			 */
		//------------------------------------------------------
		if (arguments[0] instanceof Point) {
			this.coords = p.coords;
			if (this.coords == null) {
				throw  "CoordinateSystemNotSetException";
			}
		} 

		//------------------------------------------------------
		//
		//	POINT
		//
		/**	Protected constructor to ensure that no one can
		 *	instantiate a Point.  The coordinate system is set 
		 *  upon creation and cannot be changed.
		 *
		 *	@param	coordSys	The coordinate system in which 
		 *							this vector	exists.
		 */
		//------------------------------------------------------
		else {
			this.coords = coordSys;
		}
	} 
}



	return Point;
});
