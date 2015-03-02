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
//  File:                    Rotation3D.C
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
//	ROTATION3D
//
/**	This class encapsulates the concept of a three-dimensional 
 *	geometric rotation of a vector.  Actual rotations are created by 
 *	the sub-classes of this class.	A rotation has a base coordinate 
 *  system, and is only valid for vectors in that same base coordinate system.
 * 	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================
//Line 370,462,493 port error
define (["Reference"], function (Reference){
	
	var	base;
	var	r11;
	var	r12;
	var	r13;
	var	r21;
	var	r22;
	var	r23;
	var	r31;
	var	r32;
	var	r33;
//--------------------------------------------------------
	//
	//	ROTATION3D
	//
	/**	This copy constructor makes a copy of this Rotation3D
	 *	object with the same base coordinate system reference
	 *	as the original.  This function just copies the members;
	 *	we only needed to write it since we needed another
	 *	copy constructor.
	 *
	 *	@param	r3d			The Rotation3D object to copy.
	 */
	//--------------------------------------------------------
	function Rotation3D() {


		if (arguments.length==1){
			if (arguments[0] instanceof r3d) {
				this.base = r3d.base.clone();
				this.r11 = r3d.r11;
				this.r12 = r3d.r12;
				this.r13 = r3d.r13;
				this.r21 = r3d.r21;
				this.r22 = r3d.r22;
				this.r23 = r3d.r23;
				this.r31 = r3d.r31;
				this.r32 = r3d.r32;
				this.r33 = r3d.r33;
			}
		

			//---------------------------------------------------------
			//
			//	ROTATION3D
			//
			/**	This single-arg constructor creates the identity
			 *	rotation in the supplied coordinate system.
			 *
			 *	@param	baseCoords		The base coordinate system
			 *								for this rotation.
			 */
			//---------------------------------------------------------
			else {

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
			}
		}
		//--------------------------------------------------------
		//
		//	ROTATION3D
		//
		/**	This copy constructor makes a copy of this Rotation3D
		 *	object with the supplied base coordinate system 
		 *	reference.  The supplied base coordinate system must
		 *	be equivalent to the base coordinate system of this
		 *	object.
		 *
		 *	@param	r3d			The Rotation3D object to copy.
		 *
		 *	@param	bCoord		The base Cartesian coordinate system
		 *							reference to use for the copied
		 *							object.  Must be equivalent to
		 *							(but not necessarily the same
		 *							literal object as) the base
		 *							coordinate system of this
		 *							object.
		 *
		 *	@throws				WrongCoordinateBaseException if the
		 *							supplied base coordinate system
		 *							is not equivalent to the
		 *							base coordinate system of this
		 *							Rotation.
		 */
		//---------------------------------------------------------
		 else if (arguments.length==2){

				this.base = bCoord.clone();
				this.r11 = r3d.r11;
				this.r12 = r3d.r12;
				this.r13 = r3d.r13;
				this.r21 = r3d.r21;
				this.r22 = r3d.r22;
				this.r23 = r3d.r23;
				this.r31 = r3d.r31;
				this.r32 = r3d.r32;
				this.r33 = r3d.r33;
			
				//  The supplied coordinate system must be a copy of the 
				//  base coordinate system of the supplied Rotation.
				if (!r3d.getBaseCartesianCoordinateSystem().opEq(bCoord)) {
					throw "WrongCoordinateBaseException";
				}
		}
	}
	

//--------------------------------------------------------
	//
	//	GETBASECARTESIANCOORDINATESYSTEM
	//
	/**	This method returns the base Cartesian coordinate
	 *	system in which this rotation is based.
	 *
	 *	@return			The base Cartesian coordinate system
	 *						in which this rotation is based.
	 */
	//--------------------------------------------------------
	Rotation3D.prototype.getBaseCartesianCoordinateSystem = function() {
		return this.base;
	};

	//--------------------------------------------------------
	//
	//	IDENTITY
	//
	/**	This method creates an identity rotation in the
	 *	supplied base coordinate system.
	 *
	 *	@param	base		The base coordinate system
	 *							in which to create the
	 *							identity rotation.
	 *
	 *	@return				The identity rotation in the
	 *							supplied base coordinate system.
	 */
	//--------------------------------------------------------
	Rotation3D.identity= function (base) {
		return new Rotation3D(base);
	};
	//--------------------------------------------------------
	//
	//	INVERSE
	//
	/**	This method returns a rotation that is the inverse
	 *	of the this rotation.
	 *
	 *	@return			A rotation that is the inverse
	 *						of this rotation.
	 */
	//--------------------------------------------------------
	Rotation3D.prototype.inverse= function () {
		// Create the return rotation.
		var	retval = new Rotation3D(this.base);

		// Fill in the values.  The inverse of a rotation
		// matrix is the same as the transpose.
		retval.r11 = this.r11;
		retval.r12 = this.r21;
		retval.r13 = this.r31;
		retval.r21 = this.r12;
		retval.r22 = this.r22;
		retval.r23 = this.r32;
		retval.r31 = this.r13;
		retval.r32 = this.r23;
		retval.r33 = this.r33;
	
		return retval;
	};

	//--------------------------------------------------------
	//
	//	OPASSIGN
	//
	/**	This operator assigns one rotation to another rotation.
	 *	The two rotations must have the same base coordinate
	 *	system.
	 *
	 *	@param	rhs		The rotation to be assigned to this
	 *						rotation.
	 *
	 *	@return			This rotation with the values from
	 *						the supplied rotation copied into
	 *						it.
	 *
	 *	@throws			WrongCoordinateBaseException if 
	 *						this rotation and the supplied
	 *						rotation are not in the same
	 *						coordinate system.
	 */
	//---------------------------------------------------------
	Rotation3D.prototype.opAssign = function (rhs)  {

		if (!this.base.opEq(rhs.base)) {
			throw "WrongCoordinateBaseException";
		}

		this.r11 = rhs.r11;
		this.r12 = rhs.r12;
		this.r13 = rhs.r13;
		this.r21 = rhs.r21;
		this.r22 = rhs.r22;
		this.r23 = rhs.r23;
		this.r31 = rhs.r31;
		this.r32 = rhs.r32;
		this.r33 = rhs.r33;

		return this;
	};
	//--------------------------------------------------------
	//
	//	OPERATOR *
	//
	/**	This method returns a rotation that is this rotation
	 *	preceded by the supplied rotation.  By way of 
	 *	example, if the transformation of vector x to 
	 *	vector x' is expressed by
	 *
	 *		x' = lhs * rhs * x = T * x
	 *
	 *	where
	 *
	 *		lhs = this rotation
	 *		rhs = the supplied rotation
	 *
	 *	then
	 *
	 *		T = lhs * rhs
	 *
	 *	constructs a rotation that results in rhs being 
	 *	applied to x with lhs applied to the result.
	 *
	 *	@param	rhs		The rotation to precede this rotation
	 *						in the construction of the 
	 *						return rotation.
	 *
	 *	@return			A rotation that is this rotation
	 *						preceded by the supplied
	 *						rotation.
	 *
	 *	@throws			WrongCoordinateBaseException if the
	 *						supplied rotation does not
	 *						have the same base coordinate
	 *						system as this rotation.
	 */
	//--------------------------------------------------------
	Rotation3D.prototype.opMult= function (rhs) {

		//  Check the base of the supplied rotation against ours.
		if (!this.base.opEq(rhs.base)) {
			throw "WrongCoordinateBaseException";
		}

		//  Construct the return rotation.
		var	retval = new Rotation3D(this.base);

		//  Compute the elements of the return rotation.
		retval.r11 = this.r11 * rhs.r11 +
					 this.r12 * rhs.r21 +
					 this.r13 * rhs.r31;
		retval.r12 = this.r11 * rhs.r12 +
					 this.r12 * rhs.r22 +
					 this.r13 * rhs.r32;
		retval.r13 = this.r11 * rhs.r13 +
					 this.r12 * rhs.r23 +
					 this.r13 * rhs.r33;
		retval.r21 = this.r21 * rhs.r11 +
					 this.r22 * rhs.r21 +
					 this.r23 * rhs.r31;
		retval.r22 = this.r21 * rhs.r12 +
					 this.r22 * rhs.r22 +
					 this.r23 * rhs.r32;
		retval.r23 = this.r21 * rhs.r13 +
					 this.r22 * rhs.r23 +
					 this.r23 * rhs.r33;
		retval.r31 = this.r31 * rhs.r11 +
					 this.r32 * rhs.r21 +
					 this.r33 * rhs.r31;
		retval.r32 = this.r31 * rhs.r12 +
					 this.r32 * rhs.r22 +
					 this.r33 * rhs.r32;
		retval.r33 = this.r31 * rhs.r13 +
					 this.r32 * rhs.r23 +
					 this.r33 * rhs.r33;

		return retval;
	};

	//------------------------------------------------------
	//
	//	GETREPRESENTATION
	//
	/**	This method returns the representation of this
	 *	rotation in its current coordinate system.
	 *	<br><br>
	 *	NOTE:  In general, do not use this method.  It
	 *	is provided only for speed-oriented applications,
	 *	and breaks the paradigms of the physics library
	 *	model.  If you are still considering using this
	 *	method, don't.  You don't need to know the
	 *	representation.  The representation is only useful
	 *	for computational efficiency (i.e., if you need
	 *	to apply the rotation to millions or billions of
	 *	vectors in the same coordinate system).
	 *
	 *	@param	row1col1		Obvious, set on output.
	 *	@param	row1col2		Obvious, set on output.
	 *	@param	row1col3		Obvious, set on output.
	 *	@param	row2col1		Obvious, set on output.
	 *	@param	row2col2		Obvious, set on output.
	 *	@param	row2col3		Obvious, set on output.
	 *	@param	row3col1		Obvious, set on output.
	 *	@param	row3col2		Obvious, set on output.
	 *	@param	row3col3		Obvious, set on output.
	 *
	 */
	//-----------------------------------------------------
	Rotation3D.prototype.getRepresentation = function(row1col1,row1col2,row1col3,row2col1,row2col2,row2col3,row3col1,row3col2,row3col3) {
		row1col1.set(parseFloat(this.r11));
		row1col2.set(parseFloat(this.r12));
		row1col3.set(parseFloat(this.r13));
		row2col1.set(parseFloat(this.r21));
		row2col2.set(parseFloat(this.r22));
		row2col3.set(parseFloat(this.r23));
		row3col1.set(parseFloat(this.r31));
		row3col2.set(parseFloat(this.r32));
		row3col3.set(parseFloat(this.r33));
	};


	//---------------------------------------------------------
	//
	//	SETROTATION
	//
	/*	This method sets the rotation matrix values with 
	 *	the supplied matrix representation.  The vectors 
	 *  to be rotated will be assumed to be column vectors 
	 *  and will be left-multiplied by the matrix representation 
	 *  to effect the rotation.
	 *
	 *	@param	m11				The first row, first column
	 *								element of the rotation 
	 *								matrix.
	 *	@param	m12				The first row, second column
	 *								element of the rotation 
	 *								matrix.
	 *	@param	m13				The first row, third column
	 *								element of the rotation 
	 *								matrix.
	 *	@param	m21				The second row, first column
	 *								element of the rotation 
	 *								matrix.
	 *	@param	m22				The second row, second column
	 *								element of the rotation 
	 *								matrix.
	 *	@param	m23				The second row, third column
	 *								element of the rotation 
	 *								matrix.
	 *	@param	m31				The third row, first column
	 *								element of the rotation 
	 *								matrix.
	 *	@param	m32				The third row, second column
	 *								element of the rotation 
	 *								matrix.
	 *	@param	m33				The third row, third column
	 *								element of the rotation 
	 *								matrix.
	 */
	//--------------------------------------------------------
	Rotation3D.prototype.setRotation = function(m11,m12,m13,m21,m22,m23,m31,m32,m33) {
		this.r11 = m11;
		this.r12 = m12;
		this.r13 = m13;
		this.r21 = m21;
		this.r22 = m22;
		this.r23 = m23;
		this.r31 = m31;
		this.r32 = m32;
		this.r33 = m33;
	};
	
	//---------------------------------------------------------
	//
	//	ISCOMPATIBLEWITH
	//
	/**	This method returns true if this rotation
	 *	has the same base coordinate system as the supplied 
	 *  vector, and false otherwise.  This method never throws an
	 *  exception.
	 *
	 *	@param		v		The vector whose base coordinate
	 *							system is to be tested.
	 *
	 *	@return				true if this rotation 
	 *							has the same base coordinate 
	 *							system as the supplied vector, 
	 *							otherwise false.
	 */
	//---------------------------------------------------------
	Rotation3D.prototype.isCompatibleWith = function (v) {
		if (!v.isCoordinateSystemSet()) {
			return false;
		}
		try {
			if (v.getBaseCartesianCoordinateSystem().opEq(
				this.base)) {
				return true;
			}
		} catch (err) {
			throw  "IllegalStateException";
		}
		return false;
	};

	//---------------------------------------------------------
	//
	//	TOSTRING
	//
	/**	This method returns a string representation of the
	 *	Rotation.
	 *
	 *	@return			A string representation of the 
	 *						rotation.
	 */
	//---------------------------------------------------------
	Rotation3D.prototype.toString= function () {
		var buf = new StringBuffer();
		buf.append(
				  "[ " + this.r11 + " " + this.r12 + " " + this.r13 + " ]\n" +
				  "[ " + this.r21 + " " + this.r22 + " " + this.r23 + " ]\n" +
				  "[ " + this.r31 + " " + this.r32 + " " + this.r33 + " ]\n" + 
				" in " + this.base.getClass().getName());

		return buf.toString();
	};

	//----------------------------------------------------
	//
	//	WRITEOBJECT
	//
	/**	This method writes an object of this (derived)
	 *	class to the supplied non-aligned character
	 *	buffer.  The primitives contained in the
	 *	object must be written in network byte order,
	 *	i.e., Big-Endian = MSB first.  All information
	 *	necessary to reconstruct the object (including
	 *	any sub-objects) must be included.
	 *	<br><br>
	 *	BIG CAVEAT:  This method does not write any
	 *	reference to the rotation's coordinate system,
	 *	or any coordinate system object.
	 *
	 *	@param		buf			The non-aligned buffer into 
	 *								which to write the object
	 *								contents.
	 *
	 *	@return					The number of bytes
	 *								written into the
	 *								buffer.
	 *
	 *	@throws					InvalidArgumentException
	 *								if this point's coordinate
	 *								system is not the default
	 *								coordinate system for this
	 *								coordinate system type.
	 */
	//-----------------------------------------------------
	Rotation3D.prototype.writeObject = function(buf, offset) {

		//  Write the vector coordinate values.
		var	objSize = 0;
		objSize += CPPSerializer.writeDouble(buf,offset+objSize,this.r11);
		objSize += CPPSerializer.writeDouble(buf,offset+objSize,this.r12);
		objSize += CPPSerializer.writeDouble(buf,offset+objSize,this.r13);
		objSize += CPPSerializer.writeDouble(buf,offset+objSize,this.r21);
		objSize += CPPSerializer.writeDouble(buf,offset+objSize,this.r22);
		objSize += CPPSerializer.writeDouble(buf,offset+objSize,this.r23);
		objSize += CPPSerializer.writeDouble(buf,offset+objSize,this.r31);
		objSize += CPPSerializer.writeDouble(buf,offset+objSize,this.r32);
		objSize += CPPSerializer.writeDouble(buf,offset+objSize,this.r33);
		
		return objSize;
	};

	//-----------------------------------------------------
	//
	//	READOBJECT
	//
	/**	This method reads the contents of this object from
	 *	the supplied non-aligned character buffer.  The
	 *	primitives will be stored in the buffer in network
	 *	byte order, i.e., Big Endian = MSB first.  The
	 *	primitives must be placed into this object in
	 *	local byte order.  All sub-objects must be read
	 *	as well.  
	 *	<br><br>
	 *	BIG CAVEAT:  You must be using the same base coordinate
	 *	system type and instance as the sender, otherwise the 
	 *	results will be unpredictable (at run time).  
	 *	In a marked departure from the usual CPPSerializable
	 *	interface, the object that is being read by this method 
	 *	should NOT be created with the default constructor,
	 *	but instead should be created using the static identity()
	 *	method with the relevant coordinate system instance,
	 *	e.g., identity(ECRCoords::getCoords()), etc.
	 *
	 *	@param		buf			The non-aligned buffer from
	 *								which to read the object
	 *								contents.
	 *
	 *	@return					The number of bytes read
	 *								from the buffer, or 
	 *								0 if the supplied buffer
	 *								does not contain a valid
	 *								object of this (derived)
	 *								type.
	 */
	//------------------------------------------------------
	Rotation3D.prototype.readObject = function( buf, offset) {
		//  Read the values.
		var	objSize = 0;
		
		//Reference<Integer>	dsz = new Reference<Integer>(new Integer(0));
		var dsz = new Reference(0);
		this.r11 = CPPSerializer.readDouble(buf, offset+objSize, dsz);
		objSize += dsz.getValue();
		this.r12 = CPPSerializer.readDouble(buf, offset+objSize, dsz);
		objSize += dsz.getValue();
		this.r13 = CPPSerializer.readDouble(buf, offset+objSize, dsz);
		objSize += dsz.getValue();
		this.r21 = CPPSerializer.readDouble(buf, offset+objSize, dsz);
		objSize += dsz.getValue();
		this.r22 = CPPSerializer.readDouble(buf, offset+objSize, dsz);
		objSize += dsz.getValue();
		this.r23 = CPPSerializer.readDouble(buf, offset+objSize, dsz);
		objSize += dsz.getValue();
		this.r31 = CPPSerializer.readDouble(buf, offset+objSize, dsz);
		objSize += dsz.getValue();
		this.r32 = CPPSerializer.readDouble(buf, offset+objSize, dsz);
		objSize += dsz.getValue();
		this.r33 = CPPSerializer.readDouble(buf, offset+objSize, dsz);
		objSize += dsz.getValue();
		
		return objSize;
	};


	Rotation3D.prototype.calculateWriteSize = function() {
		//  Sum the sizes of the fields.
		var 	size = 0;
		size += CPPSerializer.sizeOf(this.r11);
		size += CPPSerializer.sizeOf(this.r12);
		size += CPPSerializer.sizeOf(this.r13);
		size += CPPSerializer.sizeOf(this.r21);
		size += CPPSerializer.sizeOf(this.r22);
		size += CPPSerializer.sizeOf(this.r23);
		size += CPPSerializer.sizeOf(this.r31);
		size += CPPSerializer.sizeOf(this.r32);
		size += CPPSerializer.sizeOf(this.r33);

		//  Return the answer.
		return size;
	};



return Rotation3D;
});
