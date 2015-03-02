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
//  File:                    SphericalCoords.C
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
//	SPHERICALCOORDS
//
/**	This class encapsulates a spherical coordinate system with a
 *	purely geometric relationship to the supplied base Cartesian coordinate
 *	system.
 *	<br><br>
 *	The parameters of the spherical coordinate system are
 *
 *		rho = the distance from the origin
 *		phi = the angle measured from the positive z-axis, and constrained
 *				to lie in 0 .. pi
 *		theta = the angle that lies in the X-Y plane, measured positive from
 *				  the positive x-axis as the X-Y plane is viewed from the
 *				  tip of the positive z-axis.
 *	<br><br>
 *	We know that
 *
 *			x = rho * sin(phi) * cos(theta)
 *			y = rho * sin(phi) * sin(theta)
 *			z = rho * cos(phi)
 *
 *	which invert to yield
 *
 *			rho = sqrt(x^2 + y^2 + z^2)
 *
 *			theta = atan2(y,x)
 *
 *			phi = acos(z / rho)
 *	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================
define(["AngularLength", "Length", "PositionVector", "ScalarMath"], function(AngularLength, Length, PositionVector, ScalarMath) {


//---------------------------------------------------------
//
//	SPHERICALCOORDS
//
/**	Create a new spherical coordinate system on top
 * 	of the supplied base Cartesian coordinate system.
 *	A reference to the base Cartesian coordinate system
 *	will be maintained, so it is the user's responsibility
 *	to ensure that the base Cartesian coordinate system
 *	is not destructed before this spherical coordinate
 *	system object.
 *
 *	@param	base		The base Cartesian coordinate
 *							system on which this
 *							spherical coordinate system
 *							will be overlaid.
 */
//---------------------------------------------------------
function SphericalCoords(base) {}


SphericalCoords.prototype.point = function(rho, phi, theta) {
	//---------------------------------------------------------
	//
	//	POINT
	//
	/**	Create a point in this spherical coordinate system.
	 *	
	 *	@param	rho			The rho value of the point.
	 *	@param	phi			The phi value of the point.
	 *	@param	theta		The theta value of the point.
	 *
	 *	@return				A SphericalCoords.Point with the
	 *							supplied values.
	 *
	 *	@throws				InvalidArgumentException if the supplied rho
	 *							value is negative, the supplied
	 *							phi value is outside of the
	 *							range 0 .. pi, or the supplied
	 *							theta value is outside of the
	 *							range 0 .. 2*pi.
	 *	@throws				NotSetException if any of the supplied
	 *							values have not been set.
	 */
	//---------------------------------------------------------
	if (arguments.length == 3) {
		//arguments[0] = rho, arguments[1] = phi, arguments[2] = theta
		//  Sanity check input args.
		this.checkRPT(arguments[0],arguments[1],arguments[2]);

		//  Create the point.
		try {
			return new SphericalCoords.Point(this.createPoint(arguments[0],arguments[1],arguments[2],this));
		} catch (err) {
			throw "IllegalStateException";
		}
	}
	//---------------------------------------------------------
	//
	//	POINT
	//
	/**	Create a point in this spherical coordinate system
	 *	from the supplied position vector.
	 *	
	 *	@param	pv			The position vector from which
	 *							to create the point.
	 *
	 *	@return				A SphericalCoords.Point that represents
	 *							the point at the tip of the
	 *							supplied vector.
	 *
	 *	@throws				WrongCoordinateBaseException if
	 *							the base coordinate system of
	 *							this spherical coordinate system
	 *							and the supplied position vector	
	 *							are not equal.
	 */
	//---------------------------------------------------------
	else if (arguments.length == 1) {
		//arguments[0] = pv
		// Get the rho,phi,theta coords of the tip of 	
		// the position vector.
		var			rho = new Length();
		var	phi = new AngularLength();
		var	theta = new AngularLength();
		this.getRhoPhiTheta(arguments[0],rho,phi,theta);

		// Create the point.
		try {
			return new SphericalCoords.Point(this.createPoint(rho,phi,theta,this));
		} catch (err) {
			throw "IllegalStateException";
		}
	}
};

SphericalCoords.prototype.position = function() {
	//---------------------------------------------------------
	//
	//	POSITION
	//
	/**	Create a position vector in the base coordinate system
	 *	using the spherical coordinate specification.
	 *	
	 *	@param	rho			The rho value of the position.
	 *	@param	phi			The phi value of the position.
	 *	@param	theta		The theta value of the position.
	 *
	 *	@return				A PositionVector in the base
	 *							coordinate system with
	 *							the specified spherical coordinate
	 *							representation.
	 *
	 *	@throws				InvalidArgumentException if the supplied rho
	 *							value is negative, the supplied
	 *							phi value is outside of the
	 *							range 0 .. pi, or the supplied
	 *							theta value is outside of the
	 *							range 0 .. 2*pi.
	 *	@throws				NotSetException if any of the supplied
	 *							values have not been set.
	 */
	//---------------------------------------------------------
	if (arguments.length == 3) {
		//arguments[0] = rho, arguments[1] = phi, arguments[2] = theta
		//  Sanity check the input args.
		this.checkRPT(arguments[0], arguments[1], arguments[2]);
		
		//  Convert rho, phi, and theta to X,Y,Z.
		var	x = new Length();
		var	y = new Length();
		var	z = new Length();
		this.rptToxyz(arguments[0],arguments[1],arguments[2],x,y,z);

		//  Return the vector.
		return this.getBaseCartesianCoordinateSystem().position(x,y,z);
	}
	//---------------------------------------------------------
	//
	//	POSITION
	//
	/**	Create a position vector in the base coordinate system
	 *	from the supplied point.
	 *	
	 *	@param	p			The point from which to create
	 *							the position vector.
	 *
	 *	@return				A PositionVector in the base
	 *							coordinate system whose
	 *							tip corresponds to the location
	 *							of the supplied point.
	 *
	 *	@throws				CoordinateSystemNotSetException
	 *							if the coordinate system of the
	 *							supplied point has not been set.
	 *	@throws				WrongCoordinateException if
	 *							the coordinate system of the
	 *							supplied point is not equal
	 *							to this spherical coordinate system.
	 */
	//---------------------------------------------------------
	else if (arguments.length == 1) {
		//arguments[0] = SphericalCoords.Point p
		//  Verify coordinate systems are equal.
		if (!arguments[0].getCoordinateSystem().opEq(this)) {
			throw "WrongCoordinateException";
		}

		// Get the rho, phi, and theta values.
		var			rho = new Length();
		var	phi = new AngularLength();
		var	theta = new AngularLength();
		this.getRhoPhiTheta(arguments[0],rho,phi,theta);

		// Transform to x,y,z values.
		var	x = new Length();
		var	y = new Length();
		var	z = new Length();
		this.rptToxyz(rho,phi,theta,x,y,z);

		// Return the vector.
		try {
			return this.getBaseCartesianCoordinateSystem().position(x,y,z);
		} catch (err) {
			throw "IllegalStateException";
		}
	}
};

//---------------------------------------------------------
//
//	GETRHO
//
/**	This method returns the rho value of the supplied 
 *	position vector.
 *
 *	@param	pv			The supplied position vector.
 *
 *	@return				The rho value of the supplied
 *							position vector.
 *
 *	@throws				CoordinateSystemNotSetException 
 *							if the supplied vector is
 *							not set.
 *
 *	@throws				WrongCoordinateBaseException if
 *							the base coordinate system of
 *							the supplied vector is not 	
 *							equal to the base coordinate
 *							system of this spherical
 *							coordinate system.
 */
//---------------------------------------------------------
SphericalCoords.prototype.getRho = function() {
	if (arguments.length == 1) {
		if (arguments[0] instanceof PositionVector) {
			 var	base = 
			this.getBaseCartesianCoordinateSystem();

			if (!arguments[0].getBaseCartesianCoordinateSystem().opEq(base)) {
				throw "WrongCoordinateBaseException";
			}

			return arguments[0].magnitude();
		} 
		//---------------------------------------------------------
		//
		//	GETRHO
		//
		/**	This method returns the rho value of the supplied 
		 *	point.
		 *
		 *	@param	p			The supplied point.
		 *
		 *	@return				The rho value of the supplied
		 *							point.
		 *
		 *	@throws				CoordinateSystemNotSetException
		 *							if the supplied point is
		 *							not set.
		 *
		 *	@throws				WrongCoordinateException if
		 *							the coordinate system of
		 *							the supplied point is not 	
		 *							equal to this spherical
		 *							coordinate system.
		 */
		//---------------------------------------------------------else {
		else {
				return this.getX1(arguments[0]);
		}
	}
	
};

//---------------------------------------------------------
//
//	GETPHI
//
/**	This method returns the phi value of the supplied 
 *	position vector.  If the tip of the supplied position 
 *	vector at is the origin, then an arbitrary but valid
 *	value will be returned.
 *
 *	@param	pv			The supplied position vector.
 *
 *	@return				The phi value of the supplied
 *							position vector.  The phi
 *							value will lie in the range
 *							0 .. pi.
 *
 *	@throws				CoordinateSystemNotSetException if
 *							the supplied vector is not
 *							set.
 *
 *	@throws				WrongCoordinateBaseException if
 *							the base coordinate system of
 *							the supplied vector is not 	
 *							equal to the base coordinate
 *							system of this spherical
 *							coordinate system.
 */
//---------------------------------------------------------
SphericalCoords.prototype.getPhi = function() {
	if (arguments.length == 1) {
		if (arguments[0] instanceof PositionVector) {
	
			 var	base = 
				this.getBaseCartesianCoordinateSystem();

			if (!arguments[0].getBaseCartesianCoordinateSystem().opEq(base)) {
				throw "WrongCoordinateBaseException";
			}

			try {
				 var	zd = base.getZComponent(arguments[0]).getInMeters();
				var	m = arguments[0].magnitude().getInMeters();

				if (m == 0.0) {
					return new AngularLength().setInRadians(0.0);
				}
				return ScalarMath.acos(zd / m);
			} catch (err) {
				throw "IllegalStateException";
			}
		}
		
		//---------------------------------------------------------
		//
		//	GETPHI
		//
		/**	This method returns the phi value of the supplied 
		 *	point.
		 *
		 *	@param	p			The supplied point.
		 *
		 *	@return				The phi value of the supplied
		 *							point.  The phi
		 *							value will lie in the range
		 *							0 .. pi.
		 *
		 *	@throws				CoordinateSystemNotSetException
		 *							if the supplied point is not
		 *							set.
		 *
		 *	@throws				WrongCoordinateException if
		 *							the coordinate system of
		 *							the supplied point is not 	
		 *							equal to this spherical
		 *							coordinate system.
		 */
		//---------------------------------------------------------
		else {
			return this.getX2(arguments[0]);
		}
	}
	

};


SphericalCoords.prototype.getTheta = function () {
	//---------------------------------------------------------
	//
	//	GETTHETA
	//
	/**	This method returns the theta value of the supplied 
	 *	position vector.  If the tip of the supplied position 
	 *  vector is on the z-axis, then an arbitrary but valid value
	 *	will be returned.
	 *
	 *	@param	pv			The supplied position vector.
	 *
	 *	@return				The theta value of the supplied
	 *							position vector.  The theta
	 *							value will lie in the range
	 *							0 .. 2*pi.
	 *
	 *	@throws				CoordinateSystemNotSetException
	 *							if the supplied coordinate
	 *							system is not set.
	 *
	 *	@throws				WrongCoordinateBaseException if
	 *							the base coordinate system of
	 *							the supplied vector is not 	
	 *							equal to the base coordinate
	 *							system of this spherical
	 *							coordinate system.
	 */
	//---------------------------------------------------------
	if (arguments.length == 1) {
		if (arguments[0] instanceof PositionVector) {
			 var	base =
				this.getBaseCartesianCoordinateSystem();

			if (!arguments[0].getBaseCartesianCoordinateSystem().opEq(base)) {
				throw "WrongCoordinateBaseException";
			}

			 var	y = base.getYComponent(arguments[0]);
			 var	x = base.getXComponent(arguments[0]);

			//  Since atan2 returns values from -pi to pi,
			//  convert to 0 .. 2*pi.
			try {
				 var	theta = ScalarMath.atan2(y,x);
				if (theta.opLess(SphericalCoords.angZero)) {
					theta.opAddAssign(AngularLength.twoPi());
				}
				return theta;
			} catch (err) {
				throw "WrongCoordinateBaseException";
			}
		}
		//---------------------------------------------------------
		//
		//	GETTHETA
		//
		/**	This method returns the theta value of the supplied 
		 *	point.
		 *
		 *	@param	p			The supplied point.
		 *
		 *	@return				The theta value of the supplied
		 *							point.  The theta
		 *							value will lie in the range
		 *							0 .. 2*pi.
		 *
		 *	@throws				CoordinateSystemNotSetException
		 *							if the supplied point is
		 *							not set.
		 *
		 *	@throws				WrongCoordinateException if
		 *							the coordinate system of
		 *							the supplied point is not 	
		 *							equal to this spherical
		 *							coordinate system.
		 */
		//---------------------------------------------------------
		else {
			return this.getX3(arguments[0]);
		}
	}
	
};

SphericalCoords.prototype.getRhoPhiTheta = function() {
	
	if (arguments.length == 4) {
		//---------------------------------------------------------
		//
		//	GETRHOPHITHETA
		//
		/**	This method returns the rho, phi, and theta values of 
		 *  the supplied position vector.
		 *
		 *	@param	pv			The supplied position vector.
		 *	@param	rho			After return, will hold the
		 *							rho value of the supplied
		 *							position vector.
		 *	@param	phi			After return, will hold the phi 
		 *							value of the supplied
		 *							position vector.  The phi
		 *							value will lie in the range
		 *							0 .. pi.
		 *	@param	theta		After return, will hold the theta 
		 *							value of the supplied
		 *							position vector.  The theta
		 *							value will lie in the range
		 *							0 .. 2*pi.
		 *
		 *	@throws				CoordinateSystemNotSetException
		 *							if the supplied vector is
		 *							not set.
		 *
		 *	@throws				WrongCoordinateBaseException if
		 *							the base coordinate system of
		 *							the supplied vector is not 	
		 *							equal to the base coordinate
		 *							system of this spherical
		 *							coordinate system.
		 */
		//---------------------------------------------------------
		
		if (arguments[0] instanceof PositionVector) {
			/*	params:
			arguments[0] = final PositionVector pv,
			arguments[1] = final Length rho,
			arguments[2] = final AngularLength phi,
			arguments[3] = final AngularLength theta
			*/
			 var	base =
				this.getBaseCartesianCoordinateSystem();

			if (!arguments[0].getBaseCartesianCoordinateSystem().opEq(base)) {
				throw "WrongCoordinateBaseException";
			}

			var	x = new Length();
			var	y = new Length();
			var	z = new Length();
			base.getXYZComponents(arguments[0],x,y,z);

			try {
				arguments[1].opAssign(arguments[0].magnitude());
				arguments[2].opAssign(ScalarMath.acos(z.opDiv(arguments[1])));
				arguments[3].opAssign(ScalarMath.atan2(y,x));

				//  Since atan2 returns values from -pi to pi,
				//  convert to 0 .. 2*pi.
				if (arguments[3].opLess(SphericalCoords.angZero)) {
					arguments[3].opAddAssign(AngularLength.twoPi());
				}
			} catch (err) {
				throw "IllegalStateException";
			} 
		}
		//---------------------------------------------------------
		//
		//	GETRHOPHITHETA
		//
		/**	This method returns the rho, phi, and theta values of 
		 *  the supplied point.
		 *
		 *	@param	p			The supplied point.
		 *	@param	rho			After return, will hold the
		 *							rho value of the supplied
		 *							point.
		 *	@param	phi			After return, will hold the phi 
		 *							value of the supplied
		 *							point.  The phi
		 *							value will lie in the range
		 *							0 .. pi.
		 *	@param	theta		After return, will hold the theta 
		 *							value of the supplied
		 *							point.  The theta
		 *							value will lie in the range
		 *							0 .. 2*pi.
		 *
		 *	@throws				CoordinateSystemNotSetException
		 *							if the supplied point is
		 *							not set.
		 *
		 *	@throws				WrongCoordinateException if
		 *							the coordinate system of
		 *							the supplied point is not 	
		 *							equal to this spherical
		 *							coordinate system.
		 */
		//---------------------------------------------------------
		else {
			/*	params:
			arguments[0] = SphericalCoords.Point,
			arguments[1] = final Length rho,
			arguments[2] = final AngularLength phi,
			arguments[3] = final AngularLength theta
			*/
			return this.getX1X2X3(arguments[0], arguments[1], arguments[2], arguments[3]);
		}
	}
	
};

//---------------------------------------------------------
//
//	CHECKRPT
//
/**	This method checks the supplied rho, phi, and theta
 *	values for appropriateness.
 *
 *	@param	rho			The rho value.
 *	@param	phi			The phi value.
 *	@param	theta		The theta value.
 *
 *	@throws				InvalidArgumentException if the supplied
 *							rho value is negative, the
 *							supplied phi value is outside
 *							of the range 0 .. pi, or the
 *							supplied theta value is outside
 *							of the range 0 .. 2*pi.
 */
//---------------------------------------------------------
SphericalCoords.prototype.checkRPT = function(rho, phi, theta) {

	try {
		if ((rho.opLess(SphericalCoords.lenZero)) ||
			(phi.opLess(SphericalCoords.angZero)) ||
			(theta.opLess(SphericalCoords.angZero)) ||
			(phi.opGreat(SphericalCoords.phiMax)) ||
			(theta.opGreat(SphericalCoords.thetaMax))) {
			
			throw "IllegalArgumentException";
		}
	} catch (err) {
		throw "IllegalArgumentException";
	}
};

//---------------------------------------------------------
//
//	RPTTOXYZ
//
/**	This method transforms the supplied rho, phi, and
 *	theta values to x,y,z values.
 *
 *	@param	rho		The supplied rho value.  Assumed
 *						>= 0.
 *	@param	phi		The supplied phi value.  Assumed
 *						in the range 0 .. pi.
 *	@param	theta	The supplied theta value.  Assumed
 *						in the range 0 .. 2*pi.
 *
 *	@param	x		After return, will hold the x value.
 *	@param	y		After return, will hold the y value.
 *	@param	z		After return, will hold the z value.
 */
//---------------------------------------------------------
SphericalCoords.rptToxyz = function(rho, phi, theta, x, y, z) {

	try {
		var sinPhi = ScalarMath.sin(phi);
		var cosPhi = ScalarMath.cos(phi);
		var sinTheta = ScalarMath.sin(theta);
		var cosTheta = ScalarMath.cos(theta);
		x.opAssign(rho.opMult(sinPhi * cosTheta));
		y.opAssign(rho.opMult(sinPhi * sinTheta));
		z.opAssign(rho.opMult(cosPhi));
	} catch (err) {
		throw "IllegalArgumentException";
	}
};

SphericalCoords.zeroPoint = function() {
	try {
		return this.point(new Length().opZeroAssign(), 
						  new AngularLength().opZeroAssign(),
						  new AngularLength().opZeroAssign());
	} catch (err) {
		throw "IllegalStateException";
	}
};

/*
public position(p) {
	if (!p.getCoordinateSystem().opEq(this)) {
		throw "WrongCoordinateException";
	}
	
	//  The previous check ensures that this cast is valid.
	//	RAC DEBUG
	//  A compiler bug forces us to use the Object cast
	//  first to avoid the compiler error.
	var gp = p;	
	return this.position(new SphericalCoords.Point(gp));
}
*/
SphericalCoords.getCoordinateSystemName = function() {
	return "SphericalCoords";
};
	return SphericalCoords;
});
