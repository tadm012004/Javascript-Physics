
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
//  File:                    VectorArithmetic.C
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
//----------------------------------------------------------------------
//
//	VECTORARITHMETIC
//
/**	This header file specifies cross-type vector arithmetic.
 *	<br><br>
 *	All of these functions live in the osi::physics namespace,
 *	outside of any particular class.
 *  <br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */

 //------------------------------------------------------------
	//
	//	ANGLE
	//
	/**	This template function will return the angle between any two
	 *	vectors in the same coordinate system.  The result
	 *	will be in the range 0 .. pi.  This function is defined
	 *	in the header since it is a template.
	 *
	 *	@param	v1		The first vector.
 	 *	@param	v2		The second vector.
	 *
	 *	@return			The angle between v1 and v2, in the
	 *						range 0 .. pi.
	 *
	 *	@throws			WrongCoordinateBaseException if the two
	 *						supplied vectors do not have the
	 *						same coordinate base.
	 *	@throws			DivideByZeroException if either of the
	 *						supplied vectors has zero magnitude.
	 */
	//------------------------------------------------------------
define(["Acceleration","AngularSpeed","AngularVelocityVector","AccelerationVector","AngularLength","Frequency","FrequencySquared", 
    "Length","PositionVector", "Reference","VelocityVector","ScalarMath","Speed","TimeLength","TimeLengthSquared"], function (Accleration,
    AngularSpeed,AngularVelocityVector,AccelerationVector,AngularLength,Frequency,FrequencySquared, 
    Length,PositionVector, Reference,VelocityVector,ScalarMath,Speed,TimeLength,TimeLengthSquared){
		
		function VectorMath () {}
		
	VectorMath.angle = function (v1, v2) {
		//throws "CoordinateSystemNotSetException", "DivideByZeroException", "WrongCoordinateBaseException"{
			
	//  Get each vector's coordinate system.
			coords1=v1.getBaseCartesianCoordinateSystem();
			coords2=v2.getBaseCartesianCoordinateSystem();
		
	//  If the coordinate systems are not equal, throw
		//  an exception.
		if (!coord1.opEq(coords2)) {
			throw new "WrongCoordinateBaseException";
		
		}


		//  Get the magnitude of each vector.
		var mag1 = v1.magnitude();
		var mag2 = v2.magnitude();

		try {
    		//  Get the components of a unit vector in the direction
    		//  of each vector.
    		var x1 = coords1.getXComponent(v1).opDiv(mag1);
    		var y1 = coords1.getYComponent(v1).opDiv(mag1);
    		var z1 = coords1.getZComponent(v1).opDiv(mag1);
    		var x2 = coords2.getXComponent(v2).opDiv(mag2);
    		var y2 = coords2.getYComponent(v2).opDiv(mag2);
    		var z2 = coords2.getZComponent(v2).opDiv(mag2);

    		//  Get the cosine of the angle between the two vectors.
    		var cosAngle = x1*x2 + y1*y2 + z1*z2;

    		//	Make sure the cosine is in the correct range.
    		if (cosAngle > 1.0)
    		{
    			cosAngle = 1.0;
    		}
    		else if (cosAngle < -1.0)
    		{
    			cosAngle = -1.0;
    		}

    		//  Return the angle.
    		return ScalarMath.acos(cosAngle);

		} catch (err) {
			throw  "IllegalStateException";
		}
	
	};

	//------------------------------------------------------------
	//
	//	CROSSPRODUCTDIRECTION
	//
	/**	This template function will return the direction of the
	 *	cross product between any two vectors in the same coordinate 
	 *  system.  The resulting vector is always a position vector
	 * 	with a magnitude of one meter.  This function is defined in 
	 *	the header since it is a template.
	 *
	 *	@param	v1		The first vector.
 	 *	@param	v2		The second vector.
	 *
	 *	@return			A position vector that represents the direction
	 *						of the cross product v1 x v2.
	 *						The returned vector will have a magnitude 
	 *						of one meter.
	 *
	 *	@throws			WrongCoordinateBaseException if the two
	 *						supplied vectors do not have the
	 *						same coordinate base.
	 *	@throws			DivideByZeroException if either of the
	 *						supplied vectors has zero magnitude, or
	 *						if the supplied vectors are colinear.
	 */
	//------------------------------------------------------------
	VectorMath.crossProductDirection = function( v1,v2) {

		//  Get each vector's coordinate system.
		coords1 =v1.getBaseCartesianCoordinateSystem();
		coords2 =v2.getBaseCartesianCoordinateSystem();

		//  If the coordinate systems are not equal, throw
		//  an exception.
		if (!coords1.opEq(coords2)) {
			throw  "WrongCoordinateBaseException";
		}

		//  Get the magnitude of each vector.
		var mag1 = v1.magnitude();
		var mag2 = v2.magnitude();

		//  Get the components of a unit vector in the direction
		//  of each vector.  
		try {
    		var x1 = coords1.getXComponent(v1).opDiv(mag1);
    		var y1 = coords1.getYComponent(v1).opDiv(mag1);
    		var z1 = coords1.getZComponent(v1).opDiv(mag1);
    		var x2 = coords2.getXComponent(v2).opDiv(mag2);
    		var y2 = coords2.getYComponent(v2).opDiv(mag2);
    		var z2 = coords2.getZComponent(v2).opDiv(mag2);
    
    		//  Compute the components of the cross product.
    		var rx = y1*z2 - z1*y2;
    		var ry = -(x1*z2 - z1*x2);
    		var rz = x1*y2 - y1*x2;
    		var rn = Math.sqrt(rx*rx + ry*ry + rz*rz);
    
    		//  If the two vectors were in the same direction, then
    		//  the normalization factor will be zero.  Throw a 
    		//	divide by zero exception in that case.
    		if (rn == 0.0) {
    			throw  "DivideByZeroException";
    		}
    
    		//  Return a unit position vector in the direction of the cross
    		//  product.
    		try {
        		return coords1.position(new Length().setInMeters(rx/rn),
        								new Length().setInMeters(ry/rn),
        								new Length().setInMeters(rz/rn));
    		} catch (err) {
    			throw "IllegalStateException";
    		}
		} catch (err) {
    			throw "IllegalStateException";
		}
	};
	//------------------------------------------------------------
	//
	//	ORTHOGONALDIRECTION
	//
	/**	This template function will return the direction of a
	 *	vector that is orthonal to the supplied vector (i.e., that
	 *  lies in the plane defined by the supplied vector and the
	 *  origin).  The resulting vector is always a position vector
	 * 	with a magnitude of one meter.  This function is defined in 
	 *	the header since it is a template.
	 *
	 *	@param	v		The supplied vector.
	 *
	 *	@return			A position vector that represents the direction
	 *						of a vector orthogonal to the supplied
	 *						vector.  The returned vector will have a 
	 *						magnitude of one meter.
	 *
	 *	@throws			DivideByZeroException if the
	 *						supplied vector has zero magnitude.
	 */
	//------------------------------------------------------------
	
	 VectorMath.orthogonalDirection= function (v)  {

		//  Get the vector's coordinate system.
		var coords =v.getBaseCartesianCoordinateSystem();

		//  Get the magnitude of the vector.
		var mag = v.magnitude();

		//  Get the components of a unit vector in the direction
		//  of the vector.  This operation will throw an 
		//  exception if the supplied vector is the zero
		//  vector.
		try {
    		var vx = coords.getXComponent(v).opDiv(mag);
    		var vy = coords.getYComponent(v).opDiv(mag);
    		var vz = coords.getZComponent(v).opDiv(mag);
    
    		//  Compute the components of a vector that is
    		//  orthogonal to the supplied vector, i.e., a
    		//  vector that lies in the plane vx * X + vy * Y + vz * Z = 0.
    
    		//  Permute the coordinates to place any zeros in the
    		//  first and then the second positions.  There cannot
    		//  be three zeros.
    		var x = [];
    		var i=  [];		
    		x[0] = vx;
    		x[1] = vy;
    		x[2] = vz;
    		i[0] = 0;
    		i[1] = 1;
    		i[2] = 2;
    		if (x[0] == 0.0) {
    			if (x[2] == 0.0) {
    				var	tmp = x[2];
    				x[2] = x[1];
    				x[1] = tmp;
    				i[2] = 1;
    				i[1] = 2;
    			}
    		} else if (x[1] == 0.0) {
    			if (x[2] == 0.0) {
    				var	tmp = x[2];
    				x[2] = x[0];
    				x[0] = tmp;
    				i[2] = 0;
    				i[0] = 2;
    			} else {
    				var	tmp = x[1];
    				x[1] = x[0];
    				x[0] = tmp;
    				i[1] = 0;
    				i[0] = 1;
    			}
    		} else if (x[2] == 0.0) {
    			var	tmp = x[2];
    			x[2] = x[0];
    			x[0] = tmp;
    			i[2] = 0;
    			i[0] = 2;
    		}
    
    		//  Set "X" and "Y" to 1, and compute what "Z" needs to
    		//  be to lie in the plane.  Due to our permutations,
    		//  the coefficient of "Z" will always be non-zero.
    		var t = [];
    		t[0] = 1.0;
    		t[1] = 1.0;
    		t[2] = (-x[0]*t[0] - x[1]*t[1]) / x[2];
    
    		//  Re-order the components back to their original
    		//  meanings.
    		var X = [];
    		X[0] = t[i[0]];
    		X[1] = t[i[1]];
    		X[2] = t[i[2]];
    		var	norm = Math.sqrt(X[0]*X[0] + X[1]*X[1] + X[2]*X[2]);
    
    		//  Return a unit position vector in the direction of an 
    		//  orthogonal vector.
    		return coords.position(new Length().setInMeters(X[0]/norm),
    							   new Length().setInMeters(X[1]/norm),
    							   new Length().setInMeters(X[2]/norm));
		} catch (err) {
			throw "IllegalStateException";
		} 
	};
	//--------------------------------------------------------
    //
    //  OPMULT
    //
    /** This method returns a rotated version of the
     *  supplied vector.  This method needs access
     *  to the private/protected parts of both the
     *  rotation class and the vector class.
     *
     *	@param	r		The supplied rotation
     *
     *  @param  v       The supplied vector.
     *
     *  @return         A rotated version of the supplied
     *                      vector.
     *
     *  @throws			CoordinateSystemNotSetException if
     *  					the supplied vector is not
     *  					set.
     *
     *  @throws         WrongCoordinateBaseException if
     *                      the supplied vector is not
     *                      in the same coordinate system
     *                      as this rotation.
     */
    //--------------------------------------------------------
	VectorMath.opMult= function( r, v) {

        //  If the coordinate system of the supplied vector is
        //  not compatible with the coordinate system of
        //  this rotation, throw an exception.
        var vBase = v.getBaseCartesianCoordinateSystem();
        var rBase = r.getBaseCartesianCoordinateSystem();
        if (!vBase.opEq(rBase)) {
            throw "WrongCoordinateBaseException";
        }

        var   x = vBase.getXComponent(v);
        var   y = vBase.getYComponent(v);
        var   z = vBase.getZComponent(v);
        
        var	r11 = new Reference(0);
		var	r12 = new Reference(0);
        var	r13 = new Reference(0);
        var	r21 = new Reference(0);
        var	r22 = new Reference(0);
        var	r23 = new Reference(0);
        var	r31 = new Reference(0);
        var r32 = new Reference(0);
        var r33 = new Reference(0);
        
        r.getRepresentation(r11, r12, r13, r21, r22, r23, r31, r32, r33);
        
        var	dr11 = r11.getValue();
        var	dr12 = r12.getValue();
        var	dr13 = r13.getValue();
        var	dr21 = r21.getValue();
        var	dr22 = r22.getValue();
        var	dr23 = r23.getValue();
        var	dr31 = r31.getValue();
        var	dr32 = r32.getValue();
        var	dr33 = r33.getValue();
        
        //  Return the rotated vector.  We can only write this
        //  line because we are a friend of GenericVector
        //  and Rotation3D.
        try {
	        return vBase.position(x.opMult(dr11).opAdd(y.opMult(dr12)).opAdd(z.opMult(dr13)),
	        					  x.opMult(dr21).opAdd(y.opMult(dr22)).opAdd(z.opMult(dr23)),
	        					  x.opMult(dr31).opAdd(y.opMult(dr32)).opAdd(z.opMult(dr33)));
        } catch (err) {
        	throw "IllegalStateException";
        }
    };
    //--------------------------------------------------------
    //
    //  OPMULT
    //
    /** This method returns a rotated version of the
     *  supplied vector.  This method needs access
     *  to the private/protected parts of both the
     *  rotation class and the vector class.
     *
     *	@param	r		The supplied rotation
     *
     *  @param  v       The supplied vector.
     *
     *  @return         A rotated version of the supplied
     *                      vector.
     *
     *  @throws			CoordinateSystemNotSetException if
     *  					the supplied vector is not
     *  					set.
     *
     *  @throws         WrongCoordinateBaseException if
     *                      the supplied vector is not
     *                      in the same coordinate system
     *                      as this rotation.
     */
    //--------------------------------------------------------
	VectorMath.opMult=function (r, v)  {

        //  If the coordinate system of the supplied vector is
        //  not compatible with the coordinate system of
        //  this rotation, throw an exception.
        var vBase =
            v.getBaseCartesianCoordinateSystem();
        var rBase =
        	r.getBaseCartesianCoordinateSystem();
        if (!vBase.opEq(rBase)) {
            throw  "WrongCoordinateBaseException";
        }

        var  x = vBase.getXComponent(v);
        var  y = vBase.getYComponent(v);
        var  z = vBase.getZComponent(v);
        
        var		r11 = new Reference(0);
        var		r12 = new Reference(0);
        var		r13 = new Reference(0);
        var		r21 = new Reference(0);
        var		r22 = new Reference(0);
        var		r23 = new Reference(0);
        var		r31 = new Reference(0);
        var		r32 = new Reference(0);
        var		r33 = new Reference(0);
        r.getRepresentation(r11, r12, r13, r21, r22, r23, r31, r32, r33);
        
        var	dr11 = r11.getValue();
        var	dr12 = r12.getValue();
        var	dr13 = r13.getValue();
        var	dr21 = r21.getValue();
        var	dr22 = r22.getValue();
        var	dr23 = r23.getValue();
        var	dr31 = r31.getValue();
        var	dr32 = r32.getValue();
        var	dr33 = r33.getValue();
        
        //  Return the rotated vector.  We can only write this
        //  line because we are a friend of GenericVector
        //  and Rotation3D.
        try {
	        return vBase.velocity(x.opMult(dr11).opAdd(y.opMult(dr12)).opAdd(z.opMult(dr13)),
	        					  x.opMult(dr21).opAdd(y.opMult(dr22)).opAdd(z.opMult(dr23)),
	        					  x.opMult(dr31).opAdd(y.opMult(dr32)).opAdd(z.opMult(dr33)));
        } catch ( err) {
        	throw "IllegalStateException";
        }
    };
//--------------------------------------------------------
    //
    //  OPMULT
    //
    /** This method returns a rotated version of the
     *  supplied vector.  This method needs access
     *  to the private/protected parts of both the
     *  rotation class and the vector class.
     *
     *	@param	r		The supplied rotation
     *
     *  @param  v       The supplied vector.
     *
     *  @return         A rotated version of the supplied
     *                      vector.
     *
     *  @throws			CoordinateSystemNotSetException if
     *  					the supplied vector is not
     *  					set.
     *
     *  @throws         WrongCoordinateBaseException if
     *                      the supplied vector is not
     *                      in the same coordinate system
     *                      as this rotation.
     */
    //--------------------------------------------------------
	VectorMath.opMult= function (r,v)  {

        //  If the coordinate system of the supplied vector is
        //  not compatible with the coordinate system of
        //  this rotation, throw an exception.
        var vBase =
            v.getBaseCartesianCoordinateSystem();
        var rBase =
        	r.getBaseCartesianCoordinateSystem();
        if (!vBase.opEq(rBase)) {
            throw "WrongCoordinateBaseException";
        }

        var  x = vBase.getXComponent(v);
        var  y = vBase.getYComponent(v);
        var  z = vBase.getZComponent(v);
        
        var	r11 = new Reference(0);
        var	r12 = new Reference(0);
        var	r13 = new Reference(0);
        var	r21 = new Reference(0);
        var	r22 = new Reference(0);
        var	r23 = new Reference(0);
        var	r31 = new Reference(0);
        var	r32 = new Reference(0);
        var	r33 = new Reference(0);
        r.getRepresentation(r11, r12, r13, r21, r22, r23, r31, r32, r33);
        var	    dr11 = r11.getValue();
        var 	dr12 = r12.getValue();
        var  	dr13 = r13.getValue();
        var 	dr21 = r21.getValue();
        var 	dr22 = r22.getValue();
        var 	dr23 = r23.getValue();
        var 	dr31 = r31.getValue();
        var 	dr32 = r32.getValue();
        var    	dr33 = r33.getValue();
        
        //  Return the rotated vector.  We can only write this
        //  line because we are a friend of GenericVector
        //  and Rotation3D.
        try {
	        return vBase.acceleration(x.opMult(dr11).opAdd(y.opMult(dr12)).opAdd(z.opMult(dr13)),
	        					  	  x.opMult(dr21).opAdd(y.opMult(dr22)).opAdd(z.opMult(dr23)),
	        					  	  x.opMult(dr31).opAdd(y.opMult(dr32)).opAdd(z.opMult(dr33)));
        } catch (err) {
        	throw "IllegalStateException";
        }
    };
    //
    //  OPMULT
    //
    /** This method returns a rotated version of the
     *  supplied vector.  This method needs access
     *  to the private/protected parts of both the
     *  rotation class and the vector class.
     *
     *	@param	r		The supplied rotation
     *
     *  @param  v       The supplied vector.
     *
     *  @return         A rotated version of the supplied
     *                      vector.
     *
     *  @throws			CoordinateSystemNotSetException if
     *  					the supplied vector is not
     *  					set.
     *
     *  @throws         WrongCoordinateBaseException if
     *                      the supplied vector is not
     *                      in the same coordinate system
     *                      as this rotation.
     */
    //--------------------------------------------------------
	VectorMath.opMult= function (r,v) {

        //  If the coordinate system of the supplied vector is
        //  not compatible with the coordinate system of
        //  this rotation, throw an exception.
        var vBase =
            v.getBaseCartesianCoordinateSystem();
        var rBase =
        	r.getBaseCartesianCoordinateSystem();
        if (!vBase.opEq(rBase)) {
            throw  "WrongCoordinateBaseException";
        }

        var  x = vBase.getXComponent(v);
        var  y = vBase.getYComponent(v);
        var  z = vBase.getZComponent(v);
        
         var	r11 = new Reference(0);
        var	r12 = new Reference(0);
        var	r13 = new Reference(0);
        var	r21 = new Reference(0);
        var	r22 = new Reference(0);
        var	r23 = new Reference(0);
        var	r31 = new Reference(0);
        var	r32 = new Reference(0);
        var	r33 = new Reference(0);
        r.getRepresentation(r11, r12, r13, r21, r22, r23, r31, r32, r33);
        var	dr11 = r11.getValue();
        var dr12 = r12.getValue();
        var dr13 = r13.getValue();
        var dr21 = r21.getValue();
        var dr22 = r22.getValue();
        var dr23 = r23.getValue();
        var dr31 = r31.getValue();
        var dr32 = r32.getValue();
        var dr33 = r33.getValue();
        
        //  Return the rotated vector.  We can only write this
        //  line because we are a friend of GenericVector
        //  and Rotation3D.
        try {
	        return vBase.angularVelocity(x.opMult(dr11).opAdd(y.opMult(dr12)).opAdd(z.opMult(dr13)),
	        					  		 x.opMult(dr21).opAdd(y.opMult(dr22)).opAdd(z.opMult(dr23)),
	        					  		 x.opMult(dr31).opAdd(y.opMult(dr32)).opAdd(z.opMult(dr33)));
        } catch (err) {
        	throw "IllegalStateException";
        }
    };


	//  All multiplication operators should be symmetric.
	VectorMath.opMult= function (lhs, rhs) {

		//  Get the coordinate system for the supplied vector.  
		var	coords =
				lhs.getBaseCartesianCoordinateSystem();

		//  Create a new position vector with the expected
		//  components.
		try {
    		return coords.position(ScalarMath.opMult(coords.getXComponent(lhs),rhs),
    							   ScalarMath.opMult(coords.getYComponent(lhs),rhs),
    							   ScalarMath.opMult(coords.getZComponent(lhs),rhs));
		} catch (err) {
			throw  "IllegalStateException";
		} 
	};

	VectorMath.opMult= function (lhs, rhs)  {

		//  Get the coordinate system for the supplied vector.  
		var	coords =
				rhs.getBaseCartesianCoordinateSystem();

		//  Create a new position vector with the expected
		//  components.
		try {
    		return coords.position(ScalarMath.opMult(coords.getXComponent(rhs),lhs),
    							   ScalarMath.opMult(coords.getYComponent(rhs),lhs),
    							   ScalarMath.opMult(coords.getZComponent(rhs),lhs));
		} catch (err) {
			throw "IllegalStateException";
		} 
	};	
	//	MomentumVector operator * (const VelocityVector& lhs,
//							   const Mass& rhs) {
//
//		//  Get the coordinate system for the supplied vector.  
//		const BaseCartesianCoordinateSystem3D&	coords =
//				lhs.getBaseCartesianCoordinateSystem();
//
//		//  Create a new momentum vector with the expected
//		//  components.
//		return coords.momentum(coords.getXComponent(lhs) * rhs,
//							   coords.getYComponent(lhs) * rhs,
//							   coords.getZComponent(lhs) * rhs);
//	}

//	MomentumVector operator * (const Mass& lhs,
//							   const VelocityVector& rhs) {
//
//		//  Get the coordinate system for the supplied vector.  
//		const BaseCartesianCoordinateSystem3D&	coords =
//				rhs.getBaseCartesianCoordinateSystem();
//
//		//  Create a new momentum vector with the expected
//		//  components.
//		return coords.momentum(coords.getXComponent(rhs) * lhs,
//							   coords.getYComponent(rhs) * lhs,
//							   coords.getZComponent(rhs) * lhs);
//	}

	VectorMath.opMult= function (lhs,rhs) {

		//  Get the coordinate system for the supplied vector.  
		var	coords =
				lhs.getBaseCartesianCoordinateSystem();

		//  Create a new velocity vector with the expected
		//  components.
		try {
    		return coords.velocity(ScalarMath.opMult(coords.getXComponent(lhs),rhs),
    							   ScalarMath.opMult(coords.getYComponent(lhs),rhs),
    							   ScalarMath.opMult(coords.getZComponent(lhs),rhs));
		} catch (err) {
			throw "IllegalStateException";
		} 
    	
	};

	VectorMath.opMult= function (lhs,rhs) {

		return VectorMath.opMult(rhs,lhs);
	};

	VectorMath.opMult= function (lhs,rhs) {

		//  Get the coordinate system for the supplied vector.  
		var	coords =
				lhs.getBaseCartesianCoordinateSystem();

		//  Create a new velocity vector with the expected
		//  components.
		try {
    		return coords.velocity(ScalarMath.opMult(coords.getXComponent(lhs),rhs),
    							   ScalarMath.opMult(coords.getYComponent(lhs),rhs),
    							   ScalarMath.opMult(coords.getZComponent(lhs),rhs));
		} catch (err) {
			throw  "IllegalStateException";
		}
    		
	};

	VectorMath.opMult = function (lhs,rhs)  {
	
		return VectorMath.opMult(rhs,lhs);
	};

	VectorMath.opMult = function (lhs,rhs) {

		//  Get the coordinate system for the supplied vector.  
		var coords =
				lhs.getBaseCartesianCoordinateSystem();

		//  Create a new velocity vector with the expected
		//  components.
		try {
    		return coords.position(ScalarMath.opMult(coords.getXComponent(lhs),rhs),
    							   ScalarMath.opMult(coords.getYComponent(lhs),rhs),
    							   ScalarMath.opMult(coords.getZComponent(lhs),rhs));
		} catch (err) {
			throw  "IllegalStateException";
		}
    		
	};

	VectorMath.opMult = function ( lhs,rhs) {

		return VectorMath.opMult(rhs,lhs);
	};

	VectorMath.opMult = function (lhs,rhs) {

		//  Get the coordinate system for the supplied vector.  
		var coords =
				lhs.getBaseCartesianCoordinateSystem();

		//  Create a new velocity vector with the expected
		//  components.
		try {
    		return coords.acceleration(ScalarMath.opMult(coords.getXComponent(lhs),rhs),
    							       ScalarMath.opMult(coords.getYComponent(lhs),rhs),
    							   	   ScalarMath.opMult(coords.getZComponent(lhs),rhs));
		} catch (err) {
			throw  "IllegalStateException";
		} 
	};

	VectorMath.opMult =function ( lhs, rhs) {

		return VectorMath.opMult(rhs,lhs);
	};

	VectorMath.opMult = function ( lhs,rhs)  {

		//  Get the coordinate system for the supplied vector.  
		var coords =
				lhs.getBaseCartesianCoordinateSystem();

		//  Create a new velocity vector with the expected
		//  components.
		try {
    		return coords.acceleration(ScalarMath.opMult(coords.getXComponent(lhs),rhs),
    							       ScalarMath.opMult(coords.getYComponent(lhs),rhs),
    							       ScalarMath.opMult(coords.getZComponent(lhs),rhs));
		} catch (err) {
			throw  "IllegalStateException";
		} 
	};

	VectorMath.opMult = function (lhs,rhs) {

		return VectorMath.opMult(rhs,lhs);
	};
	//	ForceVector operator * (const AccelerationVector& lhs,
//							const Mass& rhs) {
//
//		//  Get the coordinate system for the supplied vector.  
//		const BaseCartesianCoordinateSystem3D&	coords =
//				lhs.getBaseCartesianCoordinateSystem();
//
//		//  Create a new velocity vector with the expected
//		//  components.
//		return coords.force(coords.getXComponent(lhs) * rhs,
//						    coords.getYComponent(lhs) * rhs,
//						    coords.getZComponent(lhs) * rhs);
//	}

//	ForceVector operator * (const Mass& lhs,
//							const AccelerationVector& rhs) {
//
//		return rhs * lhs;
//	}

//	MomentumVector operator * (const ForceVector& lhs,
//							   const TimeLength& rhs) {
//
//		//  Get the coordinate system for the supplied vector.  
//		const BaseCartesianCoordinateSystem3D&	coords =
//				lhs.getBaseCartesianCoordinateSystem();
//
//		//  Create a new velocity vector with the expected
//		//  components.
//		return coords.momentum(coords.getXComponent(lhs) * rhs,
//							   coords.getYComponent(lhs) * rhs,
//							   coords.getZComponent(lhs) * rhs);
//	}

//	MomentumVector operator * (const TimeLength& lhs,
//							   const ForceVector& rhs) {
//
//		return rhs * lhs;
//	}

//	ForceVector operator * (const MomentumVector& lhs,
//							const Frequency& rhs) {
//
//		//  Get the coordinate system for the supplied vector.  
//		const BaseCartesianCoordinateSystem3D&	coords =
//				lhs.getBaseCartesianCoordinateSystem();
//
//		//  Create a new velocity vector with the expected
//		//  components.
//		return coords.force(coords.getXComponent(lhs) * rhs,
//							coords.getYComponent(lhs) * rhs,
//							coords.getZComponent(lhs) * rhs);
//	}

//	ForceVector operator * (const Frequency& lhs,
//							const MomentumVector& rhs) {
//
//		return rhs * lhs;
//	}

	VectorMath.opMult = function ( lhs, rhs) {

		//  Get the coordinate system for the supplied vector.  
		var coords =
				lhs.getBaseCartesianCoordinateSystem();

		//  Create a new velocity vector with the expected
		//  components.
		try { 
    		return coords.velocity(ScalarMath.opMult(coords.getXComponent(lhs),rhs),
    							   ScalarMath.opMult(coords.getYComponent(lhs),rhs),
    							   ScalarMath.opMult(coords.getZComponent(lhs),rhs));
		} catch (err) {
			throw  "IllegalStateException";
		} 
	};
	
	VectorMath.opMult = function  (lhs,rhs)  {

		return VectorMath.opMult(rhs,lhs);
	};

	VectorMath.opMult = function  (lhs,rhs){

		//  Get the coordinate system for the supplied vector.  
		var	coords =
				lhs.getBaseCartesianCoordinateSystem();

		//  Create a new acceleration vector with the expected
		//  components.
		try {
    		return coords.acceleration(ScalarMath.opMult(coords.getXComponent(lhs),rhs),
    								   ScalarMath.opMult(coords.getYComponent(lhs),rhs),
    								   ScalarMath.opMult(coords.getZComponent(lhs),rhs));
		} catch (err) {
			throw  "IllegalStateException";
		} 
	};
	
	VectorMath.opMult = function  (lhs,rhs)	{

		return VectorMath.opMult(rhs,lhs);
	};

	//  Division operators are not symmetric, of course.
	VectorMath.opMult = function  (lhs,rhs){

		//  Get the coordinate system for the supplied vector.  
		var	coords =
				lhs.getBaseCartesianCoordinateSystem();

		//  Create a new velocity vector with the expected
		//  components.
		try {
    		return coords.velocity(ScalarMath.opDiv(coords.getXComponent(lhs),rhs),
    							   ScalarMath.opDiv(coords.getYComponent(lhs),rhs),
    							   ScalarMath.opDiv(coords.getZComponent(lhs),rhs));
		} catch (err) {
			throw  "IllegalStateException";
		} 
	};
	//	VelocityVector operator / (const MomentumVector& lhs,
//							   const Mass& rhs) {
//
//		//  Get the coordinate system for the supplied vector.  
//		const BaseCartesianCoordinateSystem3D&	coords =
//				lhs.getBaseCartesianCoordinateSystem();
//
//		//  Create a new velocity vector with the expected
//		//  components.
//		return coords.velocity(coords.getXComponent(lhs) / rhs,
//							   coords.getYComponent(lhs) / rhs,
//							   coords.getZComponent(lhs) / rhs);
//	}

	VectorMath.opDiv = function (lhs,rhs) {

		//  Get the coordinate system for the supplied vector.  
		var	coords =
				lhs.getBaseCartesianCoordinateSystem();

		//  Create a new position vector with the expected
		//  components.
		try {
    		return coords.position(ScalarMath.opDiv(coords.getXComponent(lhs),rhs),
    							   ScalarMath.opDiv(coords.getYComponent(lhs),rhs),
    							   ScalarMath.opDiv(coords.getZComponent(lhs),rhs));
		} catch (err) {
			throw  "IllegalStateException";
		}
	};

	VectorMath.opDiv = function ( lhs,rhs)  {

		//  Get the coordinate system for the supplied vector.  
		var	coords =
				lhs.getBaseCartesianCoordinateSystem();

		//  Create a new acceleration vector with the expected
		//  components.
		try {
    		return coords.acceleration(ScalarMath.opDiv(coords.getXComponent(lhs),rhs),
    							   	   ScalarMath.opDiv(coords.getYComponent(lhs),rhs),
    							   	   ScalarMath.opDiv(coords.getZComponent(lhs),rhs));
		} catch (err) {
			throw  "IllegalStateException";
		} 
	};

	VectorMath.opDiv = function ( lhs, rhs) {

		//  Get the coordinate system for the supplied vector.  
		var	coords =
				lhs.getBaseCartesianCoordinateSystem();

		//  Create a new acceleration vector with the expected
		//  components.
		try {
    		return coords.acceleration(ScalarMath.opDiv(coords.getXComponent(lhs),rhs),
    							       ScalarMath.opDiv(coords.getYComponent(lhs),rhs),
    							       ScalarMath.opDiv(coords.getZComponent(lhs),rhs));
		} catch (err) {
			throw  "IllegalStateException";
		} 
	};

	VectorMath.opDiv = function ( lhs, rhs) {

		//  Get the coordinate system for the supplied vector.  
		var	coords =
				lhs.getBaseCartesianCoordinateSystem();

		//  Create a new position vector with the expected
		//  components.
		try {
    		return coords.position(ScalarMath.opDiv(coords.getXComponent(lhs),rhs),
    							   ScalarMath.opDiv(coords.getYComponent(lhs),rhs),
    							   ScalarMath.opDiv(coords.getZComponent(lhs),rhs));
		} catch (err) {
			throw  "IllegalStateException";
		} 
	};

	VectorMath.opDiv = function ( lhs, rhs) {

		//  Get the coordinate system for the supplied vector.  
		var	coords =
				lhs.getBaseCartesianCoordinateSystem();

		//  Create a new velocity vector with the expected
		//  components.
		try {
    		return coords.velocity(ScalarMath.opDiv(coords.getXComponent(lhs),rhs),
    							   ScalarMath.opDiv(coords.getYComponent(lhs),rhs),
    							   ScalarMath.opDiv(coords.getZComponent(lhs),rhs));
		} catch (err) {
			throw  "IllegalStateException";
		} 
	};

//	AccelerationVector operator / (const ForceVector& lhs,
//							   	   const Mass& rhs) {
//
//		//  Get the coordinate system for the supplied vector.  
//		const BaseCartesianCoordinateSystem3D&	coords =
//				lhs.getBaseCartesianCoordinateSystem();
//
//		//  Create a new acceleration vector with the expected
//		//  components.
//		return coords.acceleration(coords.getXComponent(lhs) / rhs,
//							   	   coords.getYComponent(lhs) / rhs,
//							   	   coords.getZComponent(lhs) / rhs);
//	}

//	ForceVector operator / (const MomentumVector& lhs,
//							const TimeLength& rhs) {
//
//		//  Get the coordinate system for the supplied vector.  
//		const BaseCartesianCoordinateSystem3D&	coords =
//				lhs.getBaseCartesianCoordinateSystem();
//
//		//  Create a new force vector with the expected
//		//  components.
//		return coords.force(coords.getXComponent(lhs) / rhs,
//							   coords.getYComponent(lhs) / rhs,
//							   coords.getZComponent(lhs) / rhs);
//	}

//	MomentumVector operator / (const ForceVector& lhs,
//							   const Frequency& rhs) {
//
//		//  Get the coordinate system for the supplied vector.  
//		const BaseCartesianCoordinateSystem3D&	coords =
//				lhs.getBaseCartesianCoordinateSystem();
//
//		//  Create a new momentum vector with the expected
//		//  components.
//		return coords.momentum(coords.getXComponent(lhs) / rhs,
//							   coords.getYComponent(lhs) / rhs,
//							   coords.getZComponent(lhs) / rhs);
//	}

	//  Dot products that are sensible.  These should
	// 	be defined symmetrically.
	VectorMath.dot = function ( lhs,  rhs)  {

		//  Get the coordinate system for one supplied vector.  
		var	coords =
				lhs.getBaseCartesianCoordinateSystem();

		//  Confirm that vectors are in the same coordinate system.
		if (!coords.opEq(rhs.getBaseCartesianCoordinateSystem())) {
			throw  "WrongCoordinateBaseException";
		}

		//  Return the dot product of the vectors.
		try { 
    		return ScalarMath.opMult(coords.getXComponent(lhs),coords.getXComponent(rhs)).opAdd(
    			   ScalarMath.opMult(coords.getYComponent(lhs),coords.getYComponent(rhs))).opAdd(
    			   ScalarMath.opMult(coords.getZComponent(lhs),coords.getZComponent(rhs)));
		} catch (err) {
			throw  "IllegalStateException";
		}
	};


	//  Cross products that are sensible.  These should
	// 	be defined anti-symmetrically.
	VectorMath.cross = function ( lhs, rhs) {

		//  Get the coordinate system for one supplied vector.  
		var	coords =
				lhs.getBaseCartesianCoordinateSystem();

		//  Confirm that vectors are in the same coordinate system.
		if (!coords.opEq(rhs.getBaseCartesianCoordinateSystem())) {
			throw  "WrongCoordinateBaseException";
		}

		//  Get the coordinates of each vector.
		var	lx = coords.getXComponent(lhs);
		var	ly = coords.getYComponent(lhs);
		var	lz = coords.getZComponent(lhs);
		var	rx = coords.getXComponent(rhs);
		var	ry = coords.getYComponent(rhs);
		var	rz = coords.getZComponent(rhs);

		//  Return the cross-product of the vectors.
		try {
    		return coords.velocity(ScalarMath.opMult(ly,rz).opSub(ScalarMath.opMult(lz,ry)),
    							   (ScalarMath.opMult(lx,rz).opSub(ScalarMath.opMult(lz,rx))).opNeg(),
    							   ScalarMath.opMult(lx,ry).opSub(ScalarMath.opMult(ly,rx)));
		} catch (err) {
			throw  "IllegalStateException";
		}
	};

	VectorMath.cross = function ( lhs,rhs)  {

		return VectorMath.cross(rhs,lhs).opNeg();
	};

	VectorMath.cross = function( lhs, rhs)  {

		//  Get the coordinate system for one supplied vector.  
		var	coords =
				lhs.getBaseCartesianCoordinateSystem();

		//  Confirm that vectors are in the same coordinate system.
		if (!coords.opEq(rhs.getBaseCartesianCoordinateSystem())) {
			throw  "WrongCoordinateBaseException";
		}

		//  Get the coordinates of each vector.
		var	lx = coords.getXComponent(lhs);
		var	ly = coords.getYComponent(lhs);
		var	lz = coords.getZComponent(lhs);
		var	rx = coords.getXComponent(rhs);
		var	ry = coords.getYComponent(rhs);
		var	rz = coords.getZComponent(rhs);

		//  Return the cross-product of the vectors.
		try {
    		return coords.acceleration(ScalarMath.opMult(ly,rz).opSub(ScalarMath.opMult(lz,ry)),
    							   	   (ScalarMath.opMult(lx,rz).opSub(ScalarMath.opMult(lz,rx))).opNeg(),
    							   	   ScalarMath.opMult(lx,ry).opSub(ScalarMath.opMult(ly,rx)));
		} catch (err) {
			throw  "IllegalStateException";
		}
	};

	VectorMath.cross = function ( lhs, rhs) {

		return VectorMath.cross(rhs,lhs).opNeg();
	};
	


return VectorMath;
});
