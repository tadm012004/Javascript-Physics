define(function() {
	//---------------------------------------------------------
	//
	//	BASECARTESIANCOORDINATESYSTEM3D
	//
	/**	Users should not be creating instances of this class.
	 */
	//---------------------------------------------------------
	function BaseCartesianCoordinateSystem3D() {}
	
		//------------------------------------------------------------
	//
	//	GETBASECARTESIANCOORDINATESYSTEM
	//
	/**	This method returns the base Cartesian coordinate system
	 *	of this coordinate system.   Every coordinate system 
	 *	either has a base Cartesian coordinate system or is
	 *	a base Cartesian coordinate system.
	 *
	 *	Since this is the BaseCartesianCoordinateSystem3D
	 *	class, this method just returns a reference to this
	 *	object.
	 *
	 *	@return					The base Cartesian coordinate
	 *								system of this coordinate
	 *								system.
	 */
	//------------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.getBaseCartesianCoordinateSystem = function() { 
		return this;
	};

	
	BaseCartesianCoordinateSystem3D.prototype.point = function() {
		//---------------------------------------------------------
		//
		//	POINT
		//
		/**	This method creates a point given a position vector.
		 *
		 *	@param	p		The position vector whose tip defines
		 *						the point to be created.
		 *
		 *	@return			The Point with the specified position.
		 *
		 *	@throws			WrongCoordinateBaseException if the
		 *						base coordinate system of the supplied
		 *						position is not this.
		 *
		 *	@throws			CoordinateSystemNotSetException if the
		 *						supplied position is not set.
		 */
		//---------------------------------------------------------
		if (arguments.length == 1) {
					
			if (!arguments[0].isCoordinateSystemSet()) {
				throw "CoordinateSystemNotSetException";
			}

			try {
				return this.point(this.getXComponent(arguments[0]),
								  this.getYComponent(arguments[0]),
								  this.getZComponent(arguments[0]));
			} catch (err) {
				throw "IllegalStateException";
			}
		} 
		
		//---------------------------------------------------------
		//
		//	POINT
		//
		/**	This method creates a point given the x, y, and z
		 *	components.
		 *
		 *	@param	x		x-coordinate
		 *	@param	y		y-coordinate
		 *	@param	z		z-coordinate
		 *
		 *	@return			The Point with the specified coordinates.
		 *
		 *	@throws			NotSetException if any of the supplied
		 *						coordinates are not set.
		 */
		//---------------------------------------------------------
		else {
			return new GenericPoint(arguments[0],arguments[1],arguments[2],this);
		}
	};



	BaseCartesianCoordinateSystem3D.prototype.convertPoint = function() {
		//---------------------------------------------------------
		//
		//	CONVERTPOINT
		//
		/**	This method creates a point in this base coordinate 
		 *	system that corresponds to the supplied point.  The
		 *	supplied point must have this base cartesian coordinate
		 *	system as its base coordinate system.  In particular,
		 *	this method is a specialization for the case where
		 *	the two points are of the same class.  This specialization
		 *	is necessary since the code line
		 *
		 *		return p;
		 *
		 *	cannot compile in the general case.
		 *
		 *	@param	p		The Point to be converted.
		 *
		 *	@return			A point in this coordinate system that
		 *						corresponds to the supplied point.
		 *
		 *	@throws			CoordinateSystemNotSetException if the
		 *						supplied point is not set.
		 *
		 *	@throws			WrongCoordinateBaseException if
		 *						the supplied point does not have
		 *						this base cartesian coordinate
		 *						system as its base coordinate
		 *						system.
		 */
		//---------------------------------------------------------
		if (arguments.length == 1) {
			//GenericPoint p
			//  Test to see if base coordinate system matches.
			if (!p.getBaseCartesianCoordinateSystem().opEq(this)) {
				throw "WrongCoordinateBaseException";
			}

			//  If the coordinate system of the point is
			//  also us, just return the point.
			if (p.getCoordinateSystem().opEq(this)) {
				try {
					return this.point(this.getX1(p), 
									  this.getX2(p), 
									  this.getX3(p));
				} catch (err) {
					throw "IllegalStateException";
				}
			}

			//  Convert the supplied point to a position vector
			//  in its native base, which is us.
			var	pv;
			try {
				pv = this.PositionVectorConstructorSurrogate(p.getCoordinateSystem().position(p));
			} catch (err) {
				throw "IllegalStateException";
			}

			//  Return a point in this coordinate system.
			return this.point(pv);		
		}
		
		else if (arguments.length == 2) {
			//---------------------------------------------------------
			//
			//	CONVERTPOINT
			//
			/**	This method creates a point given a position vector.
			 *
			 *	@param	p		The position vector whose tip defines
			 *						the point to be created.
			 *	@param	t		The time at which the coordinate
			 *						transformations are to be applied.
			 *
			 *	@return			The Point with the specified position.
			 *
			 *	@throws			CoordinateSystemNotSetException if the
			 *						supplied vector is not set.
			 */
			//---------------------------------------------------------
			if (arguments[1] instanceof PositionVector) {
				
				//PositionVector p
				//  Convert position to this base, then create
				//	a point from it.
				try {
					return this.point(this.convertPosition(p,t));
				} catch (err) {
					throw "IllegalStateException";
				}			
			}
			
			
			//---------------------------------------------------------
			//
			//	CONVERTPOINT
			//
			/**	This method creates a point in this base coordinate 
			 *	system that corresponds to the supplied point.  
			 *	In particular, this method is a specialization for
			 *	the case where both points are of the same class.
			 *	This specialization is necessary because the code
			 *	line
			 *
			 *		return p;
			 *
			 *	cannot compile in the general case.
			 *
			 *	@param	p		The Point to be converted.
			 *	@param	t		The time at which the coordinate 
			 *						transformations are	to be applied.  
			 *
			 *	@return			A point in this coordinate system that
			 *						corresponds to the supplied point.
			 *
			 *	@throws			CoordinateSystemNotSetException if the
			 *						supplied point is not set.
			 */
			//---------------------------------------------------------
			else {
				
				//GenericPoint p, Time t
				//  If the coordinate system of the supplied point is
				//  this, just return a copy of the supplied point.
				if (p.getCoordinateSystem().opEq(this)) {
					try {
						return this.point(this.getX1(p), 
										  this.getX2(p), 
										  this.getX3(p));
					} catch (err) {
						throw "IllegalStateException";
					} 
				}

				//  Create a position vector in this coordinate system.
				var	pv = this.convertPosition(p,t);

				//  Form a point in this base from the vector.
				try {
					return this.point(pv);
				} catch (err) {
					throw "IllegalStateException";
				}
				
			}
		}		
	};

	//------------------------------------------------------------
	//
	//	GETX1
	//
	/**	This method returns a copy of the x1-component of the 
	 *  supplied point.  Although this method is public, its use is
	 *	contraindicated unless you are writing very generic
	 *	code (i.e., code to deal with any type of Point).  Most
	 *	users should prefer the specific methods provided in
	 *	this class, e.g., getX(p).
	 *
	 *	@param	p		The point whose x1-component is to
	 *						be returned.
	 *
	 *	@return			A copy of the x1-component of the point.
	 *
	 *	@throws			CoordinateSystemNotSetException if the
	 *						supplied point is not set.
	 *
	 *	@throws			WrongCoordinateSystem if the coordinate
	 *						system of the supplied point is
	 *						not this.
	 */
	//------------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.getX1 = function(p) {

		if (!p.getCoordinateSystem().opEq(this)) {
			throw "WrongCoordinateException";
		}

		return p.getX1();
	};

	//------------------------------------------------------------
	//
	//	GETX2
	//
	/**	This method returns a copy of the x2-component of the 
	 *  supplied point.  Although this method is public, its use is
	 *	contraindicated unless you are writing very generic
	 *	code (i.e., code to deal with any type of Point).  Most
	 *	users should prefer the specific methods provided in
	 *	this class, e.g., getY(p).
	 *
	 *	@param	p		The point whose x2-component is to
	 *						be returned.
	 *
	 *	@return			A copy of the x2-component of the point.
	 *
	 *	@throws			CoordinateSystemNotSetException if the
	 *						supplied point is not set.
	 *
	 *	@throws			WrongCoordinateSystem if the coordinate
	 *						system of the supplied point is
	 *						not this.
	 */
	//------------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.getX2 = function(p) {

		if (!p.getCoordinateSystem().opEq(this)) {
			throw "WrongCoordinateException";
		}

		return p.getX2();
	};

	//------------------------------------------------------------
	//
	//	GETX3
	//
	/**	This method returns a copy of the x3-component of the 
	 *  supplied point.  Although this method is public, its use is
	 *	contraindicated unless you are writing very generic
	 *	code (i.e., code to deal with any type of Point).  Most
	 *	users should prefer the specific methods provided in
	 *	this class, e.g., getZ(p).
	 *
	 *	@param	p		The point whose x3-component is to
	 *						be returned.
	 *
	 *	@return			A copy of the x3-component of the point.
	 *
	 *	@throws			CoordinateSystemNotSetException if the
	 *						supplied point is not set.
	 *
	 *	@throws			WrongCoordinateSystem if the coordinate
	 *						system of the supplied point is
	 *						not this.
	 */
	//------------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.getX3 = function(p) {

		if (!p.getCoordinateSystem().opEq(this)) {
			throw "WrongCoordinateException";
		}

		return p.getX3();
	};

	//------------------------------------------------------------
	//
	//	GETX1X2X3
	//
	/**	This method returns a copy of all three components of
	 *  the supplied point in the supplied references.  
	 *  Although this method is public, its use is contraindicated 
	 *  unless you are writing very generic code (i.e., code to 
	 *	deal with any type of Point).  Most users should prefer 
	 *	the specific methods provided in this class, 
	 *  e.g., getXYZ(p).
	 *
	 *	@param	p		The point whose components are to
	 *						be returned.
	 *	@param	x1		After return, will hold a copy of
	 *						the x1 component of the point.
	 *	@param	x2		After return, will hold a copy of
	 *						the x2 component of the point.
	 *	@param	x3		After return, will hold a copy of
	 *						the x3 component of the point.
	 *
	 *	@throws			CoordinateSystemNotSetException if the
	 *						supplied point is not set.
	 *
	 *	@throws			WrongCoordinateException if the 
	 *						coordinate system of the supplied
	 *						point is not this.
	 */
	//------------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.getX1X2X3 = function(p,x1,x2,x3) {

		if (!p.getCoordinateSystem().opEq(this)) {
			throw "WrongCoordinateException";
		}
		
		p.getX1X2X3(x1,x2,x3);
	};

	//---------------------------------------------------------
	//
	//	ZEROPOSITION
	//
	/**	This method creates a zero position vector.
	 *
	 *	@return			The PositionVector with zero components.
	 */
	//---------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.zeroPosition = function() {
		try {
    		return this.position(new Length().opZeroAssign(),
    							 new Length().opZeroAssign(),
    							 new Length().opZeroAssign());
		} catch (err) {
			throw "IllegalStateException";
		}
	};


	BaseCartesianCoordinateSystem3D.prototype.position = function(p) {
		if (arguments.length == 1) {
			//  Test to see if the coordinate system matches.
			if (!arguments[0].getCoordinateSystem().opEq(this)) {
				throw "WrongCoordinateException";
			}
			
			//  It matches, so this cast is valid.
			//  RAC DEBUG 
			//  A compiler bug causes us to need the (Object)
			//  cast.  Only occurs with javac -- Eclipse works
			//  fine.
			var pb = arguments[0];

			try {
				return this.position(this.getX(pb),
									 this.getY(pb),
									 this.getZ(pb));
			} catch (err) {
				throw "IllegalStateException";
			}
			
		}
		//---------------------------------------------------------
		//
		//	POSITION
		//
		/**	This method creates a position vector given the
		 *  x, y, and z components.
		 *
		 *	@param	x		x-coordinate
		 *	@param	y		y-coordinate
		 *	@param	z		z-coordinate
		 *
		 *	@return			The PositionVector with the 
		 *						specified position.
		 *
		 *	@throws			NotSetException if any of the supplied
		 *						coordinates are not set.
		 */
		//---------------------------------------------------------
		else if (arguments.length == 3) {
			try {
				return this.PositionVectorConstructorSurrogate(new PositionVector(arguments[0],arguments[1],arguments[2],this));
			} catch (err) {
				throw "IllegalStateException";
			}
		}

		
	};


	
	//---------------------------------------------------------
	//
	//	CONVERTPOSITION
	//
	/**	This method creates a position vector given a Point.
	 *
	 *	@param	p		The point defining the tip of the
	 *						position vector to be created.
	 *	@param	t		The time at which to apply the coordinate
	 *						conversions.
	 *
	 *	@return			The PositionVector with its tip at
	 *						the supplied point.
	 *
	 *	@throws			CoordinateSystemNotSetException if the
	 *						coordinate system of the supplied
	 *						point is not set.
	 */
	//---------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.convertPosition = function(p,t) {

		//  Get the position in the point's base coordinate system.
		var	pv;
		try {
			pv = p.getCoordinateSystem().position(p);
		} catch (err) {
			throw "IllegalStateException";
		}

		//  If the position point's base coordinate system is
		//  us, just return the vector.
		if (pv.getBaseCartesianCoordinateSystem().opEq(this)) {
			try {
    			return this.position(this.getXComponent(pv),
    								  this.getYComponent(pv),
    								  this.getZComponent(pv));
			} catch (err) {
				throw "IllegalStateException";
			} 
		}

		//  Convert to this coordinate system.
		return this.convertPosition(pv,t);
	};

    //---------------------------------------------------------
    //
    //	VELOCITY
	//
	/**	This method creates a velocity vector given the
	 *  x, y, and z components.
	 *
	 *	@param	x		x-coordinate
	 *	@param	y		y-coordinate
	 *	@param	z		z-coordinate
	 *
	 *	@return			The VelocityVector with the 
	 *						specified position.
	 *
	 *	@throws			NotSetException if any of the supplied
	 *						coordinates are not set.
	 */
	//---------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.velocity = function(x,y,z) {
		try {
    		return this.VelocityVectorConstructorSurrogate(new VelocityVector(x,y,z,this));
		} catch (err) {
			throw "IllegalStateException";
		} 
	};

	//---------------------------------------------------------
	//
	//	ZEROVELOCITY
	//
	/**	This method creates a zero velocity vector.
	 *
	 *	@return			The VelocityVector with zero components.
	 */
	//---------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.zeroVelocity = function() {
		try {
			return this.velocity(new Speed().opZeroAssign(),
								 new Speed().opZeroAssign(),
								 new Speed().opZeroAssign());
		} catch (err) {
			throw "IllegalStateException";
		}
	};

	//---------------------------------------------------------
	//
	//	ACCELERATION
	//
	/**	This method creates an acceleration vector given the
	 *  x, y, and z components.
	 *
	 *	@param	x		x-coordinate
	 *	@param	y		y-coordinate
	 *	@param	z		z-coordinate
	 *
	 *	@return			The AccelerationVector with the 
	 *						specified position.
	 *
	 *	@throws			NotSetException if any of the supplied
	 *						coordinates are not set.
	 */
	//---------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.acceleration = function(x,y,z) {
		try {
    		return this.AccelerationVectorConstructorSurrogate(new AccelerationVector(x,y,z,this));
		} catch (err) {
			throw "IllegalStateException";
		} 
	};

	//---------------------------------------------------------
	//
	//	ZEROACCELERATION
	//
	/**	This method creates a zero acceleration vector.
	 *
	 *	@return			The AccelerationVector with zero components.
	 */
	//---------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.zeroAcceleration = function() {
		try {
			return this.acceleration(new Acceleration().opZeroAssign(),
									 new Acceleration().opZeroAssign(),
									 new Acceleration().opZeroAssign());
		} catch (err) {
			throw "IllegalStateException";
		}
	};

	//---------------------------------------------------------
	//
	//	ANGULARVELOCITY
	//
	/**	This method creates an angular velocity vector given the
	 *  x, y, and z components.
	 *
	 *	@param	x		x-coordinate
	 *	@param	y		y-coordinate
	 *	@param	z		z-coordinate
	 *
	 *	@return			The AngularVelocityVector with the 
	 *						specified position.
	 *
	 *	@throws			NotSetException if any of the supplied
	 *						coordinates are not set.
	 */
	//---------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.angularVelocity = function(x,y,z) {

		try {
    		return this.AngularVelocityVectorConstructorSurrogate(new AngularVelocityVector(x,y,z,this));
		} catch (err) {
			throw "IllegalStateException";
		} 
	};

	//---------------------------------------------------------
	//
	//	ZEROANGULARVELOCITY
	//
	/**	This method creates a zero angular velocity vector.
	 *
	 *	@return			The AngularVelocityVector with zero 
	 *						components.
	 */
	//---------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.zeroAngularVelocity = function() {
		try {
			return this.angularVelocity(new AngularSpeed().opZeroAssign(),
										new AngularSpeed().opZeroAssign(),
										new AngularSpeed().opZeroAssign());
		} catch (err) {
			throw "IllegalStateException";
		}
	};

	//---------------------------------------------------------
	//
	//	GETX
	//
	/**	This method returns the x-component of the point
	 *  provided that this is the point's coordinate
	 *  system.
	 *
	 *	@param		p		The point whose x-component
	 *							is desired.
	 *
	 *	@return				The x-component of the point,
	 *							if this is the coordinate
	 *							system of the vector.
	 *
	 *	@throws				CoordinateSystemNotSetException if the
	 *						supplied point is not set.
	 *
	 *	@throws				WrongCoordinateException
	 *							if this is not the coordinate
	 *							system of the point.
	 */
	//---------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.getX = function(p) {
		return this.getX1(p);
	};

	//---------------------------------------------------------
	//
	//	GETY
	//
	/**	This method returns the y-component of the point
	 *  provided that this is the point's coordinate
	 *  system.
	 *
	 *	@param		p		The point whose y-component
	 *							is desired.
	 *
	 *	@return				The y-component of the point,
	 *							if this is the coordinate
	 *							system of the vector.
	 *
	 *	@throws				CoordinateSystemNotSetException if the
	 *						supplied point is not set.
	 *
	 *	@throws				WrongCoordinateException
	 *							if this is not the coordinate
	 *							system of the point.
	 */
	//---------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.getY = function(p) {
		return this.getX2(p);
	};

	//---------------------------------------------------------
	//
	//	GETZ
	//
	/**	This method returns the z-component of the point
	 *  provided that this is the point's coordinate
	 *  system.
	 *
	 *	@param		p		The point whose z-component
	 *							is desired.
	 *
	 *	@return				The z-component of the point,
	 *							if this is the coordinate
	 *							system of the vector.
	 *
	 *	@throws				CoordinateSystemNotSetException if the
	 *						supplied point is not set.
	 *
	 *	@throws				WrongCoordinateException
	 *							if this is not the coordinate
	 *							system of the point.
	 */
	//---------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.getZ = function(p) {
		return this.getX3(p);
	};

	//---------------------------------------------------------
	//
	//	GETXYZ
	//
	/**	This method returns, in the supplied references,
	 *	the x-, y-, and z-components of the point
	 *  provided that this is the point's coordinate
	 *  system.
	 *
	 *	@param		p		The point whose components are
	 *							desired.
	 *	@param		x		After return, the x-component
	 *							of the supplied point.
	 *	@param		y		After return, the y-component
	 *							of the supplied point.
	 *	@param		z		After return, the z-component
	 *							of the supplied point.
	 *
	 *	@throws				CoordinateSystemNotSetException if the
	 *						supplied point is not set.
	 *
	 *	@throws				WrongCoordinateException
	 *							if this is not the coordinate
	 *							system of the point.
	 */
	//---------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.getXYZ = function(p,x,y,z) {
		this.getX1X2X3(p,x,y,z);
	};

	//---------------------------------------------------------
	//
	//	CONVERTPOSITION
	//
	/**	This method converts a position from some other
	 *	base coordinate system into this base coordinate
	 *	system.  Since the relationship between two base
	 *	coordinate systems is time-dependent, a time is
	 *	required in order to perform the conversion, and
	 *	the conversion is only valid at that time.
	 *
	 *	@param	pv		The position vector that is to be 
	 *						converted to this base.
	 *	@param	t		The time at which the conversion
	 *						is to be made.
	 *
	 *	@return			The position vector expressed in
	 *						this base coordinate system
	 *						at the supplied time.
	 *
	 *	@throws			CoordinateSystemNotSetException if
	 *						the supplied vector is not set.
	 */
	//---------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.convertPosition = function(pv,t) {

		//  Get the coordinate system for the supplied vector.  
		var	coords =
				pv.getBaseCartesianCoordinateSystem();

		//  If we are the coordinate system, just return
		//  the vector.
		if (coords.opEq(this)) {
			try {
			    return this.position(this.getXComponent(pv),
						  			 this.getYComponent(pv),
						  			 this.getZComponent(pv));
			} catch (err) {
				throw "IllegalStateException";
			} 
		}

		//  We need to do a conversion.  Convert to ECR, then
		//  to us.
		try {
			return this.PositionVectorConstructorSurrogate(this.convertPositionFromECR(coords.convertPositionToECR(pv,t), t));
		} catch (err) {
			throw "IllegalStateException";
		}
	};

	//---------------------------------------------------------
	//
	//	CONVERTPOSVEL
	//
	/**	This method converts a position and a velocity
	 *	at that position in some base coordinate system
	 *	into this base coordinate system.  Since the 
	 *  relationship between two base coordinate systems is 
	 *  time-dependent, a time is required in order to perform 
	 *  the conversion, and the conversion is only valid at 
	 *  that time.
	 *
	 *	@param	pv		The position vector that is to be
	 *						converted to this base, and at
	 *						which the velocity is to be converted.
	 *	@param	vv		The velocity vector that is to be 
	 *						converted to this base.
	 *	@param	t		The time at which the conversion
	 *						is to be made.
	 *	@param	pnew	After return, will hold a reference
	 *						to the converted position expressed
	 *						in this base coordinate system at
	 *						the supplied time.
	 *	@param	vnew	After return, will hold a reference
	 *						to the converted velocity expressed
	 *						in this base coordinate system at
	 *						the supplied time and converted
	 *						position.
	 *
	 *	@throws			CoordinateSystemNotSetException if
	 *						the supplied position or velocity
	 *						vectors are not set.
	 *
	 *	@throws			WrongCoordinateBaseException if the
	 *						supplied position and velocity
	 *						vector are not in the same
	 *						coordinate system, or if the
	 *						supplied new position and velocity
	 *						vectors are not in this coordinate
	 *						system.
	 */
	//---------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.convertPosVel = function(pv, vv, t, pnew, vnew) {

		//  Get the coordinate system for the supplied vectors.
		var	coords =
				pv.getBaseCartesianCoordinateSystem();

		//  Check the coordinate systems of the supplied vectors
		//	for sanity.
		if (!vv.getBaseCartesianCoordinateSystem().opEq(coords)) {
			throw "WrongCoordinateBaseException";
		}
		if (!pnew.getBaseCartesianCoordinateSystem().opEq(this)) {
			throw "WrongCoordinateBaseException";
		}
		if (!vnew.getBaseCartesianCoordinateSystem().opEq(this)) {
			throw "WrongCoordinateBaseException";
		}

		//  If we are the target coordinate system, just return
		//  the supplied vectors.
		if (coords.opEq(this)) {
			try {
			    pnew.opAssign(this.position(this.getXComponent(pv),
						  			 		this.getYComponent(pv),
						  			 		this.getZComponent(pv)));
			    vnew.opAssign(this.velocity(this.getXComponent(vv),
						  			 		this.getYComponent(vv),
						  			 		this.getZComponent(vv)));
			} catch (err) {
				throw "IllegalStateException";
			} 
		    return;
		}

		//  We need to do a conversion.  Convert to ECR, then
		//  to us.
		var	ecrp = coords.convertPositionToECR(pv,t);
		var	ecrv = coords.convertVelocityToECR(vv,t,ecrp);
		try {
			pnew.opAssign(this.convertPositionFromECR(ecrp,t));
			vnew.opAssign(this.convertVelocityFromECR(ecrv,t,pnew));
		} catch (err) {
			throw "IllegalStateException";
		}
	};

	//---------------------------------------------------------
	//
	//	CONVERTPOSVELACCEL
	//
	/**	This method converts a position, velocity at that position,
	 *	and acceleration at that position and velocity in some 
	 *  base coordinate system into this base coordinate system.  
	 *  Since the relationship between two base coordinate systems 
	 *  is time-dependent, a time is required in order to perform 
	 *  the conversion, and the conversion is only valid at 
	 *  that time.
	 *
	 *	@param	pv		The position vector that is to be
	 *						converted to this base, and at
	 *						which the velocity and acceleration
	 *						are to be converted.
	 *	@param	vv		The velocity vector that is to be 
	 *						converted to this base, and at
	 *						which the acceleration is to
	 *						be converted.
	 *	@param	av		The acceleration vector that is to be
	 *						converted to this base.
	 *	@param	t		The time at which the conversion
	 *						is to be made.
	 *	@param	pnew	After return, will hold a reference
	 *						to the converted position expressed
	 *						in this base coordinate system at
	 *						the supplied time.
	 *	@param	vnew	After return, will hold a reference
	 *						to the converted velocity expressed
	 *						in this base coordinate system at
	 *						the supplied time and converted
	 *						position.
	 *	@param	anew	After return will hold a reference 
	 *						to the converted acceleration
	 *						expressed in this base coordinate
	 *						system at the supplied time and
	 *						converted position and velocity.
	 *
	 *	@throws			WrongCoordinateBaseException if the
	 *						supplied position, velocity, and
	 *						acceleration vectors are not in the 
	 *						same coordinate system, or if the
	 *						supplied new position, velocity
	 *						and acceleration vectors are not in 
	 *						this coordinate system.
	 */
	//---------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.convertPosVelAccel  = function(pv, vv, av, t, pnew, vnew, anew) {

		//  Get coordinate system for the supplied vectors.
		var	coords =
				pv.getBaseCartesianCoordinateSystem();

		//  Check the coordinate systems of the supplied vectors
		//	for sanity.
		if ((!vv.getBaseCartesianCoordinateSystem().opEq(coords)) ||
			(!av.getBaseCartesianCoordinateSystem().opEq(coords))) {

			throw "WrongCoordinateBaseException";
				
		}
		if (!pnew.getBaseCartesianCoordinateSystem().opEq(this)) {
			throw "WrongCoordinateBaseException";
		}
		if (!vnew.getBaseCartesianCoordinateSystem().opEq(this)) {
			throw "WrongCoordinateBaseException";
		}
		if (!anew.getBaseCartesianCoordinateSystem().opEq(this)) {
			throw "WrongCoordinateBaseException";
		}

		//  If we are the target coordinate system, just return
		//  the supplied vectors.
		if (coords.opEq(this)) {
			try {
			    pnew.opAssign(this.position(this.getXComponent(pv),
						  			 		this.getYComponent(pv),
						  			 		this.getZComponent(pv)));
			    vnew.opAssign(this.velocity(this.getXComponent(vv),
						  					this.getYComponent(vv),
						  					this.getZComponent(vv)));
			    anew.opAssign(this.acceleration(this.getXComponent(av),
						      					this.getYComponent(av),
						      					this.getZComponent(av)));
			} catch (err) {
				throw "IllegalStateException";
			} 
		    return;
		}

		//  We need to do a conversion.  Convert to ECR, then
		//  to us.
		var		ecrp = coords.convertPositionToECR(pv,t);
		var		ecrv = coords.convertVelocityToECR(vv,t,ecrp);
		var	ecra = coords.convertAccelerationToECR(av, t, ecrp, ecrv);
		try {
			pnew.opAssign(this.convertPositionFromECR(ecrp,t));
			vnew.opAssign(this.convertVelocityFromECR(ecrv,t,pnew));
			anew.opAssign(this.convertAccelerationFromECR(ecra,t,pnew,vnew));
		} catch (err) {
			throw "IllegalStateException";
		}
	};
		
	//---------------------------------------------------------
	//
	//	GETXCOMPONENT
	//
	/**	This method returns the x-component of the vector
	 *  provided that this is the vector's base coordinate
	 *  system.
	 *
	 *	@param		v		The vector whose x-component
	 *							is desired.
	 *
	 *	@return				The x-component of the vector,
	 *							if this is the base coordinate
	 *							system of the vector.
	 *
	 *	@throws				CoordinateSystemNotSetException
	 *							if the supplied vector is
	 *							not set.
	 *
	 *	@throws				WrongCoordinateBaseException
	 *							if this is not the coordinate
	 *							system of the vector.
	 */
	//---------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.getXComponent = function(final VectorT v) {
		if (!this.opEq(v.getBaseCartesianCoordinateSystem())) {
			throw "WrongCoordinateBaseException";
		}
		return v.getX();
	};
	
	
	//---------------------------------------------------------
	//
	//	GETYCOMPONENT
	//
	/**	This method returns the y-component of the vector
	 *  provided that this is the vector's base coordinate
	 *  system.
	 *
	 *	@param		v		The vector whose y-component
	 *							is desired.
	 *
	 *	@return				The y-component of the vector,
	 *							if this is the base coordinate
	 *							system of the vector.
	 *
	 *	@throws				CoordinateSystemNotSetException
	 *							if the supplied vector is
	 *							not set.
	 *
	 *	@throws				WrongCoordinateBaseException
	 *							if this is not the coordinate
	 *							system of the vector.
	 */
	//---------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.getYComponent = function(v) {
		
		if (!this.opEq(v.getBaseCartesianCoordinateSystem())) {
			throw "WrongCoordinateBaseException";
		}
		return v.getY();
		
		
	};
	
	//---------------------------------------------------------
	//
	//	GETZCOMPONENT
	//
	/**	This method returns the z-component of the vector
	 *  provided that this is the vector's base coordinate
	 *  system.
	 *
	 *	@param		v		The vector whose z-component
	 *							is desired.
	 *
	 *	@return				The y-component of the vector,
	 *							if this is the base coordinate
	 *							system of the vector.
	 *
	 *	@throws				CoordinateSystemNotSetException
	 *							if the supplied vector is
	 *							not set.
	 *
	 *	@throws				WrongCoordinateBaseException
	 *							if this is not the coordinate
	 *							system of the vector.
	 */
	//---------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.getZComponent = function(v){
		
		if (!this.opEq(v.getBaseCartesianCoordinateSystem())) {
			throw "WrongCoordinateBaseException";
		}
		return v.getZ();
	};

	//---------------------------------------------------------
	//
	//	GETXYZCOMPONENTS
	//
	/**	This method returns, in the supplied references,
	 *  the x-, y-, and z-components of the vector
	 *  provided that this is the vector's base coordinate
	 *  system.
	 *
	 *	@param		v		The vector whose components are
	 *							desired.
	 *	@param		x		After return, contains a reference
	 *							to a copy of the x-component
	 *							of the vector.
	 *	@param		y		After return, contains a reference
	 *							to a copy of the y-component
	 *							of the vector.
	 *	@param		z		After return, contains a reference
	 *							to a copy of the z-component
	 *							of the vector.
	 *
	 *	@throws				CoordinateSystemNotSetException
	 *							if the supplied vector is
	 *							not set.
	 *
	 *	@throws				WrongCoordinateBaseException
	 *							if this is not the coordinate
	 *							system of the vector.
	 */
	//---------------------------------------------------------
	BaseCartesianCoordinateSystem3D.prototype.getXYZComponents (v,x,y,z) {
		if (!this.opEq(v.getBaseCartesianCoordinateSystem())) {
			throw "WrongCoordinateBaseException";
		}
		try {
    		x.opAssign(v.getX());
    		y.opAssign(v.getY());
    		z.opAssign(v.getZ());
		} catch (er) {
			throw "IllegalStateException";
		}
	};
	

	return BaseCartesianCoordinateSystem3D;
});