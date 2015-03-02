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
//  File:                    SingleAxisRotation.H
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
//========================================================================
//
//	SINGLEAXISROTATION
//
/**	This class encapsulates the concept of a three-dimensional 
 *	geometric rotation of a vector around another vector.
 * 	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================

define(["AngularLength"], function(AngularLength) {


//-------------------------------------------------------
//
//	SINGLEAXISROTATION
//
/**	This constructor builds a Rotation3D object that represents
 *	a rotation by the supplied angle around the supplied
 *	vector.  The rotation object will only be valid for
 *	other vectors in the same coordinate base as the
 *	supplied vector.  The rotation angle is positive in
 *	the counterclockwise direction as the axis vector is viewed
 *	from tip to base.
 *
 *	@param	axis		The vector that lies along the
 *							axis about which the rotation
 *							will occur.
 *	@param	angle		The angular length through which
 *							the rotation will occur.  The
 *							angular length is positive in
 *							the counterclockwise direction 
 *							as the axis vector is viewed from
 *							tip to base.
 *
 *	@throws				CoordinateSystemNotSetException if
 *							the supplied vector is not set.
 *
 *	@throws				DivideByZeroException if the 
 *							supplied axis is the zero vector.
 */
//--------------------------------------------------------
function SingleAxisRotation(axis, angle) {

	this.base = baseCoords.clone();
	this.r11 = 1.0;
	this.r12 = 0.0;
	this.r13 = 0.0;
	this.r21 = 0.0;
	this.r22 = 1.0;
	this.r23 = 0.0;
	this.r31 = 0.0;
	this.r32 = 0.0;
	this.r33 = 1.0; 

	var axisCoords = axis.getBaseCartesianCoordinateSystem();

	//  Get the magnitude of the supplied axis vector.
	var	axisMag = axis.magnitude();

	try {
		//  Get unit vector components of axis.
		var	x = axisCoords.getXComponent(axis).opDiv(axisMag);
		var	y = axisCoords.getYComponent(axis).opDiv(axisMag);
		var	z = axisCoords.getZComponent(axis).opDiv(axisMag);

		//  Define some angle constants for this rotation.
		var	cosAngle = ScalarMath.cos(angle);
		var	sinAngle = ScalarMath.sin(angle);
		var	oneMinusCosAngle = 1.0 - cosAngle;

		//  Create the rotation.
		this.setRotation(cosAngle + (oneMinusCosAngle * x * x),
						 (oneMinusCosAngle * x * y) - (sinAngle * z),
						 (oneMinusCosAngle * x * z) + (sinAngle * y),
						 (sinAngle * z) + (oneMinusCosAngle * x * y),
						 cosAngle + (oneMinusCosAngle * y * y),
						 (oneMinusCosAngle * y * z) - (sinAngle * x),
						 (oneMinusCosAngle * x * z) - (sinAngle * y),
						 (sinAngle * x) + (oneMinusCosAngle * y * z),
						 cosAngle + (oneMinusCosAngle * z * z)
		);
	} catch (err) {
		throw "IllegalStateException";
	} 
}
	return SingleAxisRotation;
});
