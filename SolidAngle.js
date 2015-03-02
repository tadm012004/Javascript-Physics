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
//  File:                    SolidAngle.C
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
//	SOLIDANGLE
//
/**	This class encapsulates the concept of a solid angle.  The angle
 *	may be algebraically positive or negative.
 * 	<br><br>
 *	Solid angle does not have a restricted range; if you want
 *	the value restricted to the surface area of the unit sphere,
 *	use the restricted() method.
 *	<br><br>
 *	Solid angle is "measured by the ratio of the surface of the portion
 *	of a sphere enclosed by the conical surface forming the angle, to
 *	the square of the radius of the sphere.  Unit of solid angle -- the
 *	steradian, the solid angle which encloses a surface on the sphere
 *	equivalent to the square of the radius".  From the 47th Edition of
 *	the CRC Handbook of Chemistry and Physics.
 *	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================
define(["AngularLength","Length","PositionVector","ScalarMath","SphericalCoords","VectorMath"],
	function(AngularLength,Length,PositionVector,ScalarMath,SphericalCoords,VectorMath) {



SolidAngle.prototype.setValue = function(val) {
	//Sets the value;
	this.value = val;
	
	//  Remember that we've set the value.
	this.setFlag = true;
	
	//  This cast will always be valid since GenericScalar is
	//  abstract and self-bounded, and all sub-classes are final.
	return this;
};

SolidAngle.prototype.getValue = function() {
	if (!this.setFlag) {
		throw "NotSetException";
	}
	return this.value;
};

function SolidAngle() {
	///---------------------------------------------------------
	//
	//	SOLIDANGLE
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
	//	SOLIDANGLE
	//
	/**	This copy constructor is a user-defined conversion
	 *  from GenericScalar<SolidAngle> to SolidAngle.  
	 *
	 *	@param	s		The GenericScalar<SolidAngle> to be 
	 *						converted.
	 *
	 *	@throws			NotSetException if the supplied
	 *						generic scalar is not set.
	 */
	//---------------------------------------------------------
	else if (arguments.length == 1) {
		this.setValue(arguments[0]);
	}
}

//---------------------------------------------------------
//
//	SETINSTERADIANS
//
/**	This method sets the solid angle in steradians.
 *  The surface area of a sphere divided by the radius
 *	squared of that same sphere is defined to be
 *	4*Pi steradians.
 *
 *	@param	ster		The solid angle in steradians.
 *
 *	@return				The solid angle.
 */
//---------------------------------------------------------
SolidAngle.prototype.setInSteradians = function(ster) {
	this.setValue(ster);
	return this;
};

//---------------------------------------------------------
//
//	SETINFRACTIONALSPHERES
//
/**	This method sets the solid angle in fractions of
 *	4*pi steradians.  This method is the analogue of
 *	the setInRevolutions() method for AngularLength.
 *
 *	@param	fsph		The solid angle in fractions of
 *							the 4*pi steradians.
 *
 *	@return				The solid angle.
 */
//---------------------------------------------------------
SolidAngle.prototype.setInFractionalSpheres = function(fsph) {
	this.setValue(fsph * SolidAngle.getSTERADIANS_PER_FULL_SPHERE());
	return this;
};

//---------------------------------------------------------
//
//	SETBYSPHERICALPOLYGON
//
/**	This method sets the solid angle to the solid angle
 *	subtended by the supplied connected spherical polygon.  
 *	If the supplied points do not form a single connected 
 *	spherical polygon, then this method will throw an 
 *  InvalidArgumentException.  The angular distance between 
	 *  two subsequent vertices is always taken to be less than
*	pi, and the solid angle returned is always less than 2pi.
 *
 *	@param	vertices	The vertices of the connected
 *							spherical polygon.  The list 
 *							of vertices	must not contain 
 *							any duplicates.  The angular
 *							distance between two 
 *							subsequent vertices is always
 *							taken to be less than pi.
 *
 *	@return				The solid angle, which is less than
 *							2 pi.
 *
 *	@throws				CoordinateSystemNotSetException if
 *							any of the supplied vertices
 *							are not set.
 *	@throws				DivideByZeroException if any of the
 *							supplied vertices are at the
 *							origin.
 *	@throws				InvalidArgumentException if
 *							a NULL pointer is passed
 *							or if the supplied list of 
 *							vertices does not form
 *							a single connected spherical 
 *							polygon (i.e., if any non-adjacent
 *							edges touch or cross).
 *	@throws				WrongCoordinateException if the
*							supplied SphericalCoords.Points are
	 *							not all from the same spherical
 *							coordinate system.
 */
//--------------------------------------------------------
SolidAngle.prototype.setBySphericalPolygon = function(vertices) {
	
	try {
		//  If a null vertex list is passed, throw
		//	an exception.
		if (vertices == null) {
			throw "IllegalArgumentException";
		}
			
		var nVertices = vertices.length;
		
		//  Take the easy cases first.
		if (nVertices < 3) {
			this.setValue(0.0);
			return this;
		}

		//  Get the coordinate system of the vertices.
		var sCoords = vertices[0].getCoordinateSystem();
		var sbCoords = sCoords.getBaseCartesianCoordinateSystem();
		//final PositionVector	origin = 
		//							sCoords.position(new Length().opZeroAssign(),
		//											 new AngularLength().opZeroAssign(),
		//											 new AngularLength().opZeroAssign());

		//  Verify that the list of vertices
		//	represents a connected spherical polygon.
		//	This is accomplished by checking
		//	whether any two non-adjacent
		//	edges intersect.
		for (var i=0; i<nVertices; i++) {

			//  Define the ith edge.
			var	s1start = i;
			var s1end = ((i+1) % nVertices);

			//  Check for intersections with all edges except
			//	the (i+1)th edge and the (i-1)th edge.
			for (var j=i+2; j<nVertices; j++) {
		
				//  Ignore the last side if i = 0; it
				//	is adjacent to side 0.
				if ((i == 0) && (j == (nVertices - 1))) {
					continue;
				}

				//  Define the jth edge.
				var	s2start = j;
				var	s2end = ((j+1) % nVertices);

				//  Check for intersection between the ith
				//	edge and the jth edge.
				var	intersect = false;

				//  Define the normal to the plane defined by
				//	the center of the sphere and the two 
				//	vertices that define the ith edge,
				//	and the normal to the plane defined by 
				//	the center of the sphere and the two vertices
				//	that define the jth edge.  Confine all
				//	points to the surface of a 1-meter radius
				//	sphere.
				var			radius = new Length().setInMeters(1.0);
				var	s1 = sCoords.position(
        											radius,
        											sCoords.getPhi(vertices[s1start]),
        											sCoords.getTheta(vertices[s1start]));
				var	e1 = sCoords.position(
        											radius,
        											sCoords.getPhi(vertices[s1end]),
        											sCoords.getTheta(vertices[s1end]));
				var	s2 = sCoords.position(
        											radius,
        											sCoords.getPhi(vertices[s2start]),
        											sCoords.getTheta(vertices[s2start]));
				var	e2 = sCoords.position(
        											radius,
        											sCoords.getPhi(vertices[s2end]),
        											sCoords.getTheta(vertices[s2end]));

				var	n1 = VectorMath.crossProductDirection(e1,s1);
				var	n2 = VectorMath.crossProductDirection(e2,s2);
					
				//  Compute the angle between the points for the ith
				//	side and for the jth side.
				//AngularLength	l1 = VectorMath.angle(s1,e1);
				//AngularLength	l2 = VectorMath.angle(s2,e2);

				//  Each normal defines a plane that cuts the 
				//  sphere through its center, and hence defines
				//	a great circle.  Every pair of great circles
				//	has either two or an infinite number of
				//	intersection points (two if the circles are
				//	distinct, an infinite number if they are identical).
				//	If there are two points of intersection, they
				//	are always diametrically opposed.  Compute
				//	the intersection of the two great circles.

				//  Consider first the case of identical great
				//	circles.
				var	angleZero = new AngularLength().setInRadians(1.0e-09);
				if (VectorMath.angle(n1,n2).abs().opLess(angleZero) ||
					VectorMath.angle(n1,n2.opNeg()).abs().opLess(angleZero)) {

					//  Determine whether either of the end-points
					//	of the second side lie in the first side.
					if (contains(s1,e1,s2,angleZero) || 
						contains(s1,e1,e2,angleZero)) {

						intersect = true;
					}

				//  We need to determine the actual intersection
				//	points of the two great circles.
				} else {

					//  The equation of the planes defined by the
					//	normals are
					//
					//		n1 . v = 0
					//		n2 . v = 0
					//
					//	The equation of the sphere is
					//
					//		x^2 + y^2 + z^2 = 1
					//
					//	The intersection of the planes will result in
					//	a line (1-dimensional object); for our particular
					//	type of planes, the line will pass through the
					//	origin.  The free parameter of the line can be 
					//  substituted into the equation of the sphere 
					//  for a single (origin-centered) quadratic whose 
					//  two solutions will yield the two points
					//	of intersection.

					//  We are going to permute the coordinates
					//	as necessary to avoid divide by zero.
					//	We'll need to keep track of the permutations
					//	to make sense of the answer.
					var	compZero = radius.opMult(1.0e-09);
					var	compZerod = compZero.getInMeters();
					var	perm =[];
					perm[0] = 0;
					perm[1] = 1;
					perm[2] = 2;

					var x1 =[];
					var x2 =[];
					x1[0] = sbCoords.getXComponent(n1).getInMeters();
					x1[1] = sbCoords.getYComponent(n1).getInMeters();
					x1[2] = sbCoords.getZComponent(n1).getInMeters();
					x2[0] = sbCoords.getXComponent(n2).getInMeters();
					x2[1] = sbCoords.getYComponent(n2).getInMeters();
					x2[2] = sbCoords.getZComponent(n2).getInMeters();

					//  Permute the coordinates (if necessary) so
					//	that x1[0] is non-zero.
					if (Math.abs(x1[0]) < compZerod) {
						if (Math.abs(x1[1]) < compZerod) {
							this.swap(perm,x1,x2,0,2);
						} else {
							this.swap(perm,x1,x2,0,1);
						}
					}

					//  We will use the above invariant to solve
					//	for "x" in terms of "y" and "z".  When we do
					//	that in the second normal equation, permute
					//	the coordinates (if necessary) so that
					//	the coefficient of y is non-zero.
					if (Math.abs(x2[1] - x2[0]*x1[1]/x1[0]) < compZerod) {
						this.swap(perm,x1,x2,1,2);
					}

					//  We can now form the coefficients of the 
					//	quadratic equation to solve for "z".  Since
					//	the sphere is centered at the origin, the 
					//	equation is of the form z^2 = const,
					//	and the solutions are of the form
					//	z = +/- sqrt(const).
					var	alpha = -(x2[2] - x2[0]*x1[2]/x1[0]) /
									 (x2[1] - x2[0]*x1[1]/x1[0]);
					var	beta = -x1[1] / x1[0];
					var	gamma = x1[1]*x1[2]/x1[0]/x1[0];
					var	delta = -x1[2] / x1[0];

					var	sol1 = [];
					var	sol2 = [];
					sol1[2] = radius.getInMeters() /  Math.sqrt(beta*beta*alpha*alpha +
											  					gamma*alpha + delta*delta +
											  					alpha*alpha + 1.0);
					sol1[1] = alpha * sol1[2];
					sol1[0] = beta * sol1[1] + delta * sol1[2];
					sol2[2] = -sol1[2];
					sol2[1] = alpha * sol2[2];
					sol2[0] = beta * sol2[1] + delta * sol2[2];

					//  Permute the solutions back to sensible
					//	order.
					if (perm[0] != 0) {
						if (perm[1] == 0) {
							swap(perm,sol1,sol2,0,1);
						} else {
							swap(perm,sol1,sol2,0,2);
						}
					}
					if (perm[1] != 1) {
						swap(perm,sol1,sol2,1,2);
					}

					//  We have the actual intersection points.
					//  Determine whether either of them lie
					//	in both sides.
					var	i1 = sbCoords.position(new Length().setInMeters(sol1[0]),
														   new Length().setInMeters(sol1[1]),
														   new Length().setInMeters(sol1[2]));
					var	i2 = sbCoords.position(new Length().setInMeters(sol2[0]),
														   new Length().setInMeters(sol2[1]),
														   new Length().setInMeters(sol2[2]));

					if ((this.contains(s1,e1,i1,angleZero) && 
						 this.contains(s2,e2,i1,angleZero)) ||
						(this.contains(s1,e1,i2,angleZero) &&
						 this.contains(s2,e2,i2,angleZero))) {

						intersect = true;
					}
				}

				//  If we found an intersection, complain.
				if (intersect) {
					throw "IllegalArgumentException";
				}
			}
		}

		//  Now that we know that the vertices represent a
		//	connected spherical polygon, it is fairly easy
		//	to compute the solid angle enclosed.  Every
		//	singly connected spherical polygon defines two
		//	solid angles (it is not clear what is the "exterior"
		//	and what is the "interior" of a spherical polygon).
		//	The two solid angles sum to 4pi, so just compute
		//	one.  The one that we will compute assumes that the
		//	vertices supplied form a "clockwise" tour of the
		//	spherical polygon.
		var	sum = AngularLength.zero();
		for (var i=0; i<nVertices; i++) {
			//  Compute the angle between the ith and the
			//	(i+1)st sides using the spherical geometry
			//	law of cosines.
			var	s0 = ((i-1) + nVertices) % nVertices;
			var	s1 = i;
			var	s2 = (i+1) % nVertices;

			//  Get the vectors associated with the points.
			var	p0 = sCoords.position(vertices[s0]);
			var	p1 = sCoords.position(vertices[s1]);
			var	p2 = sCoords.position(vertices[s2]);

			//  Get the angular lengths of the "sides" of the
			//  spherical triangle involving side i and i+1 of
			//	the spherical polygon.
			var	sidea = VectorMath.angle(p0,p1);
			var	sideb = VectorMath.angle(p1,p2);
			var	sidec = VectorMath.angle(p0,p2);

			//  Compute the cosine of the spherical angle between
			//	side i and side i+1 (from point i-1 to i to i+1).
			//
			//	The formula is:
			//
			//					cos(sidec) - cos(sideb)*cos(sidea) 
			//		cos(C) =   ------------------------------------
			//							sin(sideb) * sin(sidea)

			//  The calculation below is arranged in the most
			//  accurate way, rather than the most efficient way.
			//  Performing the addition before the multiplications/
			//  divisions provides unacceptable accuracy losses,
			//  as does computing tangent by a ratio rather than
			//  directly.
			var	t1 = ScalarMath.cos(sidec) / (ScalarMath.sin(sidea) * ScalarMath.sin(sideb));
			var	t2 = 1.0 / (ScalarMath.tan(sidea)*ScalarMath.tan(sideb));
			var	cosC = t1 - t2;

			//  Adjust for numerical accuracy.
			cosC = (cosC > 1.0 ? 1.0 : cosC);
			cosC = (cosC < -1.0 ? -1.0 : cosC);

			var	C = ScalarMath.acos(cosC);

			//  Compute the cross-product direction of point i-1
			//	into point i.
			var	n1 = VectorMath.crossProductDirection(p0,p1);

			//  If point i+1 is on the same side of the plane
			//	defined by i-1 and i, then the angle is between
			//	0 and pi; otherwise, the angle is between pi and
			//	2pi.
			if (VectorMath.dot(n1,p2).opGreatEq(Area.zero())) {
				sum.opAddAssign(C);
			} else {
				sum.opAddAssign(AngularLength.twoPi().opSub(C));
			}
		}
			
		//  Use sum of the interior spherical angles to compute
		//	the solid angle.
		sum.opSubAssign(AngularLength.pi().opMult(nVertices-2));

		//  If we computed the larger of the solid angles, convert
		//	to the smaller.
		if (sum.opGreat(AngularLength.twoPi())) {
			sum = AngularLength.twoPi().opMult(2.0).opSub(sum);
		}

		//  Set the solid angle of this object.
		this.setValue(sum.getInRadians());
		return this;
	} catch (err) {
		throw "IllegalStateException";
	} 
};


//---------------------------------------------------------
//
//	SWAP
//
/**	This helper method swaps the position of the variables 
 *  in the supplied arrays of Lengths and the supplied perm
 *	array.
 *
 *	@param	perm			The array of permutations.
 *	@param	x1				The first array to permute.
 *	@param	x2				The second array to permute.
 *	@param	s1				One of the positions to swap.
 *	@param	s2				The other position to swap.
 */
//---------------------------------------------------------
SolidAngle.swap = function(perm, x1, x2, s1, s2) {

	var	tmpL = x1[s1];
	x1[s1] = x1[s2];
	x1[s2] = tmpL;
	tmpL = x2[s1];
	x2[s1] = x2[s2];
	x2[s2] = tmpL;
	var	tmpI = perm[s1];
	perm[s1] = perm[s2];
	perm[s2] = tmpI;
};

//---------------------------------------------------------
//
//	CONTAINS
//
/**	Given three points on a circle, this helper method
 *	determines whether the third point lies between the
 *	first two points, where the distance between the
 *	first two points is defined as being less than pi.
 *
 *	@param	start			One end of the interval.
 *	@param	end				The other end of the interval
 *	@param	test			The point whose presence or
 *								absence from the interval
 *								is to be tested.
 *	@param	tol				The tolerance to which the
 *								computation should be
 *								performed.  An increased
 *								tolerance will cause
 *								fewer "true" returns.
 *
 *	@return					true if the test point lies
 *								in the interval defined
 *								by start and end; otherwise
 *								false.
 *	@throws					CoordinateSystemNotSetException if
 *								any of the supplied vectors
 *								are not set.
 *
 *	@throws					DivideByZeroException if any of the
 *								supplied vectors have zero length.
 *
 *	@throws					WrongCoordinateBaseException if
 *								the supplied positions do
 *								not all have the same
 *								base coordinate system.
 */
//---------------------------------------------------------
SolidAngle.prototype.contains = function(start, end, test, tol) {

	//  Let s = start, e = end, t = test.  If
	//
	//		|s->t| + |t->e| > |s->e|
	//
	//	then t lies outside the interval defined by [s,e];
	//  if
	//	
	//		|s->t| + |t->e| == |s->e|
	//
	//	then t lies inside the interval defined by [s,e].
	try {
		return !(VectorMath.angle(start,test).opAdd(VectorMath.angle(test,end)).opGreat(
				 VectorMath.angle(start,end).opAdd(tol)));
	} catch (err) {
		throw "IllegalStateException";
	}
};

	
//---------------------------------------------------------
//
//	GETINSTERADIANS
//
/**	This method gets the solid angle in steradians.
 *
 *	@return				The solid angle in steradians.
 *
 *	@throws				NotSetException if the value of
 *							this SolidAngle has not been set.
 */
//---------------------------------------------------------
SolidAngle.prototype.getInSteradians = function() {
	return this.getValue();
};

//---------------------------------------------------------
//
//	GETINFRACTIONALSPHERES
//
/**	This method gets the solid angle in fractions of
 *	4*Pi steradians.  The method is the analogue of
 *	the getInRevolutions() method of AngularLength.
 *
 *	@return				The solid angle in fractions of
 *							4*Pi steradians.
 *
 *	@throws				NotSetException if the value of
 *							this SolidAngle has not been set.
 */
//---------------------------------------------------------
SolidAngle.prototype.getInFractionalSpheres = function() {
	return (this.getValue() * SolidAngle.getFULL_SPHERES_PER_STERADIAN)();
};

//---------------------------------------------------------
//
//	RESTRICTED
//
/**	Returns a copy of this SolidAngle with the return
 *  value restricted to be positive and less than 4*Pi
 *  steradians.  Does not modify this SolidAngle.
 *
 *	@return			The restricted SolidAngle
 *
 *	@throws			NotSetException if the value of this
 *						SolidAngle has not been set.
 */
//---------------------------------------------------------
SolidAngle.prototype.restricted = function() {
	//  Get the value of this SolidAngle in steradians.
	var	restricted = this.getValue();

	//  Make the solid angle positive.
	while (restricted < 0.0) {
		restricted += SolidAngle.getFOUR_PI();
	}
	
	//  Limit to less than 4*Pi steradians (full sphere).
	while (restricted >= SolidAngle.getFOUR_PI()) {
		restricted -= SolidAngle.getFOUR_PI();
	}

	//  Return a SolidAngle containing the result.
	return new SolidAngle().setValue(restricted);
};

//---------------------------------------------------------
//
//	FOURPI
//
/**	This static convenience method returns a SolidAngle
 *  with a value in steradians of 4*Pi (full sphere).
 */
//---------------------------------------------------------
SolidAngle.fourPi = function() {
	return new SolidAngle().setValue(SolidAngle.getFOUR_PI());
};

//---------------------------------------------------------
//
//	TWOPI
//
/** This static convenience method returns a SolidAngle
 *  with a value in steradians of 2*Pi (half-sphere).
 */
//---------------------------------------------------------
SolidAngle.twoPi = function() {
	return new SolidAngle().setValue(SolidAngle.getTWO_PI());
};

//---------------------------------------------------------
//
//	PI
//
/**	This static convenience method returns a SolidAngle
 *  with a value in steradians of Pi (quarter-sphere).
 */
//---------------------------------------------------------
SolidAngle.pi = function() {
	return new SolidAngle().setValue(SolidAngle.getPI());
};

//---------------------------------------------------------
//
//	PIOVERTWO
//
/**	This static convenience method returns a SolidAngle
 *  with a value in steradians of Pi/2 (eighth-sphere).
 */
//---------------------------------------------------------
SolidAngle.piOverTwo = function() {
	return new SolidAngle().setValue(SolidAngle.getPI_OVER_TWO());
};

//------------------------------------------------------------
//
//	GETDEFAULTUNITS
//
/**	This method should be overridden by every specific scalar
 *  type to supply the string description of the type's
 *  default units, e.g., "meters".  
 *
 *	@return			The default units for the type.
 */
//------------------------------------------------------------
SolidAngle.getDefaultUnits = function() {
	return "steradians";
};

//--------------------------------------------------------
//
// 	GETPI
//
/**	This method returns the value of pi steradians.
 *
 *	@return					The value of pi steradians.
 */
//---------------------------------------------------------
SolidAngle.getPI = function() {
	var PI = AngularLength.getPI();
	return PI;
};

//---------------------------------------------------------
//
//	GETFOUR_PI
//
/**	This method returns the value of 4*pi steradians.
 *
 *	@return					The value of 4*pi steradians.
 */
//---------------------------------------------------------
SolidAngle.getFOUR_PI = function() {
	var	FOUR_PI = 2.0 * AngularLength.getTWO_PI();
	return FOUR_PI;
};

//---------------------------------------------------------
//
//	GETTWO_PI
//
/**	This method returns the value of 2*pi steradians.
 *
 *	@return					The value of 2*pi steradians.
 */
//---------------------------------------------------------
SolidAngle.getTWO_PI = function() {
	var	TWO_PI = AngularLength.getTWO_PI();
	return TWO_PI;
};

//---------------------------------------------------------
//
//	GETPI_OVER_TWO
//
/**	This method returns the value of pi/2 steradians.
 *
 *	@return					The value of pi/2 steradians.
 */
//---------------------------------------------------------
SolidAngle.getPI_OVER_TWO = function() {
	var	PI_OVER_TWO = AngularLength.getPI_OVER_TWO();
	return PI_OVER_TWO;
};

//---------------------------------------------------------
//
//	GETSTERADIANS_PER_FULL_SPHERE
//
/**	This method returns the number of steradians in
 *	one unit sphere.
 *
 *	@return					The number of steradians in
 *								one unit sphere.
 */
//---------------------------------------------------------
SolidAngle.getSTERADIANS_PER_FULL_SPHERE = function() {
	var	STERADIANS_PER_FULL_SPHERE = 
		SolidAngle.getFOUR_PI();
	return STERADIANS_PER_FULL_SPHERE;
};

//---------------------------------------------------------
//
//	GETSTERADIANS_PER_FULL_SPHERE
//
/**	This method returns the number of full spheres in
 *	one steradian.
 *
 *	@return					The number of full spheres in
 *								one steradian.
 */
//---------------------------------------------------------
SolidAngle.getFULL_SPHERES_PER_STERADIAN = function() {
	var	FULL_SPHERES_PER_STERADIAN = 
		1.0 / SolidAngle.getSTERADIANS_PER_FULL_SPHERE();
	return FULL_SPHERES_PER_STERADIAN;
};

SolidAngle.ScalarTypeConstructorSurrogate = function(s) {
	return new SolidAngle(s);
};

SolidAngle.getScalarName = function() {
	return "SolidAngle";
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
SolidAngle.zero = function() {
	return new SolidAngle().setValue(0.0);
};
		return SolidAngle;
});
