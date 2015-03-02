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
//  File:                    ECRCoords.C
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
//	ECRCOORDS
//
/**	This class encapsulates the Earth-centered rotating Cartesian
 *	coordinate system.  This coordinate system is the only base
 *	Cartesian coordinate system in which the location of your 
 *	favorite city is a constant.
 *	<br><br>
 *	The coordinate system has its origin at the (instantaneous) center
 *  of the Earth.  The Z-axis points along the (instantaneous) rotational 
 *	axis of the Earth, with North in the positive direction.  The X-axis 
 *	exits in the positive direction through the (instantaneous) intersection 
 *  of the equator and the prime meridian.  The y-axis is determined at each
 *	instant by the cross-product Z x X.
 *	<br><br>
 *  The ECR coordinate system is not an inertial coordinate system
 *	(it is rotating).  In particular, the X and Y axes approximately 
 *  rotate around the Z axis by approximately 360 degrees in 24 hours, 
 *  or about 0.004167 deg/sec.	This rate of rotation equates to a translation 
 *  on the surface at the equator of about 463 meters/second.  Since the
 *	speed of a point attached to the equator is (for our purposes) constant,
 *	but it's direction changes by 0.004167 deg/sec, the acceleration of
 *	a point attached to the equator due to the Earth's rotation is about
 *	463*(0.004167/180*3.14159) meters / sec^2 = 3.37 cm / sec^2.  The
 *	acceleration caused by the rotation of the ECR coordinate system varies
 *	as a function of distance from the origin, and for points that lie
 *	radially outbound from the equator is equal to approximately
 *
 *		rotAccel =  3.37 + h * 0.00052885 [cm / second^2],
 *
 *		where h = height above surface of point, in km
 *	
 *	If the dynamical model you are implementing is sensitive to accelerations
 *	on this order, you will need to treat the ECR coordinate system as
 *	non-inertial, or convert to an inertial coordinate system.  Note that 
 *  if the height of the point of interest is less than 1000 km, the 
 *  equator-surface acceleration value of 3.37 cm/sec^2 will do as a 
 *  litmus test.
 *	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================
define (["AccelerationVector","ECRAccelerationVector","ECRAngularVelocityVector", "ECRPositionVector",
    "PositionVector", "Time","VelocityVector"], function (AccelerationVector,ECRAccelerationVector,
        ECRAngularVelocityVector,ECRPositionVector,PositionVector,Time, VelocityVector){
	//  Singleton instance.  Well, mostly.  It can be
	//  cloned, but that's OK.
	//var oneAndOnly = new ECRCoords();
	
	//---------------------------------------------------------
	//
	//	GETCOORDS
	//
	/**	This static method returns a reference to the 
	 *  Earth-centered rotating Cartesian coordinate 
	 *  system object.
	 *
	 *	@return			A reference to the Earth-centered
	 *						rotating Cartesian coordinate
	 *						system object.
	 */
	//---------------------------------------------------------
	ECRCoords.getCoords = function () {
		return ECRCoords.oneAndOnly;
	};
	function ECRCoords () {
		if (arguments.length==0){
	//------------------------------------------------------
	//
	//	ECRCOORDS
	//
	/**	This single-arg constructor builds an Earth-centered
	 *  rotating Cartesian coordinate system.  No user 
	 *  should ever create an ECRCoords object; see the getCoords()
	 *  method.
	 */
	//------------------------------------------------------
		
		//super();
	
}
		else if (arguments.length==1) {
	//---------------------------------------------------------
	//
	//	ECRCOORDS
	//
	/**	This copy constructor returns a copy of the
	 *  supplied coordinate system.
	 */
	//---------------------------------------------------------
		
		//super(ecr);
	
	}
}

	
	ECRCoords.prototype.clone= function () {
		return new ECRCoords(this);
	};

	
	ECRCoords.prototype.convertPositionToECR = function ( pv, t) {

		try {
    		if (!pv.getBaseCartesianCoordinateSystem().opEq(this)) {
    			throw "WrongCoordinateBaseException";
    		}
    
    		//  No conversion necessary; we are ECR.
    		return pv;
		} catch (err) { 
			throw "IllegalStateException";
		}
	};

	
	ECRCoords.prototype.convertPositionFromECR = function (pv,t) {
		
		try {
    		if (!pv.getBaseCartesianCoordinateSystem().opEq(this)) {
    			throw "WrongCoordinateBaseException";
    		}
    
    		//  No conversion is necessary; we are ECR.
    		return pv;
		} catch (err) {
			throw "IllegalStateException";
		}
	};

	
	ECRCoords.prototype.convertVelocityToECR = function (vv,t,ecrp) {

		try {
    		if (!vv.getBaseCartesianCoordinateSystem().opEq(this)) {
    			throw "WrongCoordinateBaseException";
    		}
    		if (!ecrp.getBaseCartesianCoordinateSystem().opEq(this)) {
    			throw "WrongCoordinateBaseException";
    		}
    
    		//  No conversion necessary; we are ECR.
    		return vv;
		} catch (err) {
			throw "IllegalStateException";
		}
	};

	
	ECRCoords.prototype.convertVelocityFromECR = function (vv,t,newp) {

		try {
    		if (!vv.getBaseCartesianCoordinateSystem().opEq(this)) {
    			throw "WrongCoordinateBaseException";
    		}
    		if (!newp.getBaseCartesianCoordinateSystem().opEq(this)) {
    			throw new "WrongCoordinateBaseException";
    		}
    
    		//  No conversion necessary; we are ECR.
    		return vv;
		} catch (err) {
			throw "IllegalStateException";
		}
	};

	
	ECRCoords.prototype.convertAccelerationToECR = function (av,t,ecrp,ecrv) {

		try {
    		if (!av.getBaseCartesianCoordinateSystem().opEq(this)) {
    			throw "WrongCoordinateBaseException";
    		}
    		if (!ecrp.getBaseCartesianCoordinateSystem().opEq(this)) {
    			throw  "WrongCoordinateBaseException";
    		}
    		if (!ecrv.getBaseCartesianCoordinateSystem().opEq(this)) {
    			throw "WrongCoordinateBaseException";
    		}
    
    		//  No conversion necessary; we are ECR.
    		return av;
		} catch (err) {
			throw  "IllegalStateException";
		}
	};

	ECRCoords.prototype.convertAccelerationFromECR = function ( av,t,newp,newv)  {

		try {
    		if (!av.getBaseCartesianCoordinateSystem().opEq(this)) {
    			throw "WrongCoordinateBaseException";
    		}
    		if (!newp.getBaseCartesianCoordinateSystem().opEq(this)) {
    			throw  "WrongCoordinateBaseException";
    		}
    		if (!newv.getBaseCartesianCoordinateSystem().opEq(this)) {
    			throw  "WrongCoordinateBaseException";
    		}
    
    		//  No conversion necessary; we are ECR.
    		return av;
		} catch (err) {
			throw "IllegalStateException";
		}
    	
	};

	
	ECRCoords.AccelerationVectorConstructorSurrogate = function (v) {
		return new ECRAccelerationVector(v);
	};

	
	ECRCoords.AngularVelocityVectorConstructorSurrogate= function(v) {
		return new ECRAngularVelocityVector(v);
	};

	
	ECRCoords.PositionVectorConstructorSurrogate= function(v)  {
		return new ECRPositionVector(v);
	};

	
	ECRCoords.VelocityVectorConstructorSurrogate= function(v)  {
		return new ECRVelocityVector(v);
	};

	
	ECRCoords.getCoordinateSystemName= function() {
		return "ECRCoords";
	};


return ECRCoords;

});
