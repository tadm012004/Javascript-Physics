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
//  File:                    GenericPoint.H
//  Classification:          UNCLASSIFIED
//  Proprietary Information: NONE
//  Release:                 Controlled by NAVSEA61, Government Program Office
//
//  Programmer:  			 R. Conn            
//  Description:             see below
//
//  Reviewed By:             Tim McGee on March 20, 2007
//  Notes:                   
//
//========================================================================
//
//	GENERICPOINT
//
/**	This template encapsulates the concept of a point.  Every point is
 *	described by three scalars in some coordinate system.
 * 	<br><br>
 *  Points may be created set or unset.  There are no arithmetic operators 
 *  defined on points.
 *	<br><br>
 *	Points are stored in their native coordinate system (base or not).
 *	<br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//========================================================================

define(function() {
	"use strict";

function GenericPoint() {
	//------------------------------------------------------------
	//
	//	GENERICPOINT
	//
	/**	This no-arg constructor is used to create a new
	 *  unset point.  This constructor is public so that
	 *	users can create arrays of points; however, the
	 *	points cannot be accessed except after setting them
	 *	to some set point.
	 */
	//------------------------------------------------------------
	if (arguments.length == 0) {
		//  No coordinate system.
		this.coords = null;
		//  Initialize coordinates to null.
		this.x1 = null;
		this.x2 = null;
		this.x3 = null;
	}
	//------------------------------------------------------------
	//  
	//
	//	GENERICPOINT
	//
	/**	This copy constructor creates a new point from 
	 *  the supplied point.  
	 *
	 *	@param	p		The supplied point to be copied.
	 *
	 *	@throws			CoordinateSystemNotSetException if the
	 *						coordinate system of the supplied
	 *						point has not been set.
	 */
	//------------------------------------------------------------
	else if (arguments.length == 1) {
		//  Use the same coordinate system as the supplied point.
		this.coords = arguments[0].coords;
		if (this.coords == null) {
			throw "CoordinateSystemNotSetException";
		}
		
		//  Copy the point coordinates.  We need to use
		//  opCopy instead of opAssign since our x1,x2,x3
		//  may be null.
		try {
			this.x1 = arguments[0].x1.opCopy();
			this.x2 = arguments[0].x2.opCopy();
			this.x3 = arguments[0].x3.opCopy();
		} catch (err) {
			throw "IllegalStateException"
		}
	}

	//------------------------------------------------------------
	//  
	//
	//	GENERICPOINT
	//
	/**	This two-arg copy constructor creates a new point from 
	 *  the supplied point and uses the supplied 
	 *	CoordT reference as the coordinate system of the newly 
	 *	created point.  The supplied coordinate system must
	 *	be equivalent to the coordinate system of the supplied 
	 *	point.
	 *
	 *	@param	p		The supplied point to be copied.
	 *
	 *	@param	coords	The coordinate system reference that 
	 *						is to be used as the coordinate system 
	 *						of the new point.
	 *
	 *	@throws			CoordinateSystemNotSetException
	 *						if the coordinate system of
	 *						the supplied point has not
	 *						been set.
	 *
	 *	@throws			WrongCoordinateException if the
	 *						supplied coordinate system is not 
	 *						equivalent	to the coordinate system
	 *						of the supplied point.
	 */
	//------------------------------------------------------------
	else if (arguments.length == 2) {
		//  Make new point with coords as coordinate 
		//  system reference.
		this.coords = arguments[1];
		
		//  Copy the point coordinates.  We need to use
		//  opCopy instead of opAssign since our x1,x2,x3
		//  may be null.
		try {
			this.x1 = arguments[0].x1.opCopy();
			this.x2 = arguments[0].x2.opCopy();
			this.x3 = arguments[0].x3.opCopy();
		} catch (err) {
			throw "IllegalStateException";
		}
		
		//  Confirm that coordinate systems are equivalent
		if (!arguments[0].getCoordinateSystem().opEq(arguments[1])) {
			throw "WrongCoordinateException";				
		}
	}
	//------------------------------------------------------------
	//
	//	GENERICPOINT
	//
	/**	This four-arg constructor is used to create a new
	 *  point.  Four arguments are always required to
	 *  create a point.  This constructor is protected so 
	 *  that users cannot create GenericPoint<whatevers>.
	 *  
	 *  @throws				NotSetException if any of the
	 *  					supplied values are not set.
	 */
	//------------------------------------------------------------
	else if (arguments.length == 4) {
		this.coords = arguments[3];
		
		//  These are intentionally set using assignment instead
		//  of initialization so that the "set"-ness of the
		//  scalars will be tested.
		this.x1 = arguments[0].opCopy();
		this.x2 = arguments[1].opCopy();
		this.x3 = arguments[2].opCopy();
	}
}

//------------------------------------------------------------
//
//	OPASSIGN
//
/**	This method defines the assignment operator for a
 *  point.  
 *
 *  @param	p		The supplied point that
 *						is to be assigned to this point.
 *
 *	@throws			WrongCoordinateException if the
 *						coordinate system of this point has
 *						been set and is not the same as
 *						the coordinate system of the 
 *						supplied point.
 *
 *	@throws			CoordinateSystemNotSetException if
 *						the coordinate system of the supplied
 *						point has not been set.
 */
//------------------------------------------------------------
GenericPoint.prototype.opAssign = function(p) {

	//  Confirm that the coordinate system of the supplied
	//	point is set.
	if (!p.isCoordinateSystemSet()) {
		throw "CoordinateSystemNotSetException";
	}

	//  If the coordinate system of this point is set,
	//	confirm that it matches the coordinate system
	//	of the supplied point.
	if (this.isCoordinateSystemSet() &&
		(!this.getCoordinateSystem().opEq(p.getCoordinateSystem()))) {
		throw "WrongCoordinateException";

	//  If the coordinate system of this point is not
	//	set, set it from the supplied point.
	} else if (!(this.isCoordinateSystemSet())) {
		try {
			this.setCoordinateSystem(p.getCoordinateSystem());
		} catch (err) {
			throw "IllegalStateException";
		}
	}
	
	//  Copy the point coordinates.  We need to use
	//  opCopy instead of opAssign since our x1,x2,x3
	//  may be null.
	try {
		this.x1 = p.x1.opCopy();
		this.x2 = p.x2.opCopy();
		this.x3 = p.x3.opCopy();
	} catch (err) {
		throw "IllegalStateException";
	}
	
	return this;
};

//------------------------------------------------------------
//
//	OPEQ
//
/**	This method returns true if this point is equal
 *  to the right-hand operand point. 
 *
	 *	@param	rhs		The right-hand operand.
 *
 *	@return			true if this point is equal to
 *						the supplied point, otherwise false.
 *
 *	@throws			WrongCoordinateException if the 
*						coordinate system of the supplied
 *						point is not the same as the 
 *						coordinate system of this point.
 *
 *	@throws			CoordinateSystemNotSetException if
 *						the coordinate system of either this
 *						point or the supplied point has
 *						not been set.
 */
//------------------------------------------------------------
GenericPoint.prototype.opEq = function(rhs) {

	//  Verify that both coordinate systems are set.
	if (!this.isCoordinateSystemSet()) {
		throw "CoordinateSystemNotSetException";
			
	}
	if (!rhs.isCoordinateSystemSet()) {
		throw "CoordinateSystemNotSetException";
			
	}
		
	//  Confirm that the coordinate systems are equal.
	if (!this.getCoordinateSystem().opEq(rhs.getCoordinateSystem())) {
		throw "WrongCoordinateException";
			
	}

	//  If our coordinate system is set, our coordinates
	//  should be set and non-null.
	try {
		return (this.x1.opEq(rhs.x1) &&
				this.x2.opEq(rhs.x2) &&
				this.x3.opEq(rhs.x3));
	} catch (err) {
		throw "IllegalStateException";
	} 
};

//------------------------------------------------------------
//
//	OPNOTEQ
//
/**	This method returns true if this point is not equal
 *  to the right-hand operand point.  
 *
	 *	@param	rhs		The right-hand operand.
 *
 *	@return			true if this point is not equal to
 *						the supplied point, otherwise false.
 *
 *	@throws			WrongCoordinateException if the 
*						coordinate system of the supplied
 *						point is not the same as the 
 *						coordinate system of this point.
 *
 *	@throws			CoordinateSystemNotSetException if
 *						the coordinate system of either this
 *						point or the supplied point has
 *						not been set.
 */
//------------------------------------------------------------
GenericPoint.prototype.opNotEq = function(rhs) {	
	return !this.opEq(rhs);
};

//------------------------------------------------------------
//
//	TOSTRING
//
/**	This method returns a string representation of the Point,
 *  including the value of the components of the point and 
 *  the coordinate system of the point.
 *
 *	@return			A string representation of the Point.
 */
//------------------------------------------------------------
GenericPoint.toString = function() {

	var	buf = new StringBuffer();

	if (this.isCoordinateSystemSet()) {
		buf.append("(");
		buf.append(this.x1);
		buf.append(",");
		buf.append(this.x2);
		buf.append(",");
		buf.append(this.x3);
		buf.append(") in ");
		try {
			buf.append(this.getCoordinateSystem().getClass().getName());
		} catch (err) {
			throw "IllegalStateException";
		}
	} else {
		//  I'd prefer to log the CoordT type, but Java 
		//	has inconveniently erased it.
		buf.append("(Unset) in CoordT");
	}

	return buf.toString();
};

GenericPoint.prototype.writeObject = function(buf, offset) {
	//  Write the point coordinate values.
	var	objSize = 0;
	objSize += this.x1.writeObject(buf, offset + objSize);
	objSize += this.x2.writeObject(buf, offset + objSize);
	objSize += this.x3.writeObject(buf, offset + objSize);
	return objSize;
};

GenericPoint.prototype.readObject = function(buf, offset) {

	//  Read the values.
	var	objSize = 0;
	objSize += this.x1.readObject(buf,offset+objSize);
	objSize += this.x2.readObject(buf,offset+objSize);
	objSize += this.x3.readObject(buf,offset+objSize);

	return objSize;
};

//------------------------------------------------------------
//
//	GETX1
//
/**	This method returns a copy of the x1-component of the 
 *  point.  
 *
 *	@return			A copy of the x1-component of the point.
 *
 *	@throws			CoordinateSystemNotSetException if
 *						the coordinate system of the point
 *						has not been set.
 */
//------------------------------------------------------------
GenericPoint.prototype.getX1 = function() {

	if (!this.isCoordinateSystemSet()) {
		throw "CoordinateSystemNotSetException";			
	}

	try {
		return this.x1.opCopy();
	} catch (err) {
		throw "IllegalStateException";
	} 
};

//------------------------------------------------------------
//
//	GETX2
//
/**	This method returns a copy of the x2-component of the 
 *  point.  
 *
 *	@return			A copy of the x2-component of the point.
 *
 *	@throws			CoordinateSystemNotSetException if
 *						the coordinate system of the point
 *						has not been set.
 */
//------------------------------------------------------------
GenericPoint.prototype.getX2 = function() {

	if (!this.isCoordinateSystemSet()) {
		throw "CoordinateSystemNotSetException";
			
	}

	try {
		return this.x2.opCopy();
	} catch (err) {
		throw  "IllegalStateException";
	} 
};

//------------------------------------------------------------
//
//	GETX3
//
/**	This method returns a copy of the x3-component of the 
 *  point.  
 *
 *	@return			A copy of the x3-component of the point.
 *
 *	@throws			CoordinateSystemNotSetException if
 *						the coordinate system of the point
 *						has not been set.
 */
//------------------------------------------------------------
GenericPoint.prototype.getX3 = function() {

	if (!this.isCoordinateSystemSet()) {
		throw "CoordinateSystemNotSetException";			
	}

	try {
		return this.x3.opCopy();
	} catch (err) {
		throw "IllegalStateException";
	} 
};

//------------------------------------------------------------
//
//	GETX1X2X3
//
/**	This method returns a copy of all three components of
 *  the point in the supplied references.  
 *
 *	@param	x1		After return, will hold a copy of
 *						the x1 component of the point.
 *	@param	x2		After return, will hold a copy of
 *						the x2 component of the point.
 *	@param	x3		After return, will hold a copy of
 *						the x3 component of the point.
 *
 *	@throws			CoordinateSystemNotSetException if
 *						the coordinate system of the point
 *						has not been set.
 */
//------------------------------------------------------------
GenericPoint.prototype.getX1X2X3 = function(x1, x2, x3) {

	if (!this.isCoordinateSystemSet()) {
		throw "CoordinateSystemNotSetException";			
	}

	//  We can call opAssign since the Reference
	//  class guarantees that the values are
	//  not null.
	try {
		x1.opAssign(this.x1);
		x2.opAssign(this.x2);
		x3.opAssign(this.x3);
	} catch (err) {
		throw "IllegalStateException";
	} 
};

GenericPoint.prototype.calculateWriteSize = function() {
	var	size = 0;
	size += CPPSerializer.sizeOf(this.x1);
	size += CPPSerializer.sizeOf(this.x2);
	size += CPPSerializer.sizeOf(this.x3);
	return size;
};

GenericPoint.prototype.fromXMLNode = function(tagNode) {
	var	attributes = tagNode.getAttributes();
	var				setStr = null;
	var				coordsStr = null;
	var				baseStr = null;
	for (var k=0; k<attributes.getLength(); k++) {
		var	attribute = attributes.item(k);
		var	attrName = attribute.getNodeName();
		var	attrVal = attribute.getNodeValue();
		if (attrName.equals("set")) {
			setStr = attrVal;
		} else if (attrName.equals("coords")) {
			coordsStr = attrVal;
		} else if (attrName.equals("base")) {
			baseStr = attrVal;
		} else {
			//Log.warning("unexpected attribute: " +
			//			attrName + " = " + attrVal + 
			//			" in " + tagNode);
			return false;
		}
	}
	
	//  Check set flag.
	if (setStr == null) {
		//Log.warning("missing set attribute in " + tagNode);
		return false;
	}
	if (setStr.compareTo("N") == 0) {
		if (this.isCoordinateSystemSet()) {
			//Log.warning("coordinate system already set - cannot unset it");
			return false;
		}
		if ((coordsStr != null) || (baseStr != null)) {
			//Log.warning("spurious attributes after set in " + tagNode);
		}
		return true;
	} else if (setStr.compareTo("Y") == 0) {
		if (!this.isCoordinateSystemSet()) {
			//Log.warning("coordinate system not set - cannot set it");
			return false;
		}
	} else {
		//Log.warning("invalid set attribute in " + tagNode);
		return false;
	}
	
	try {
		//  Check coordinate system
		if (coordsStr == null) {
			//Log.warning("missing coordinate system attribute in " + tagNode);
			return false;
		} else if (coordsStr.compareTo(this.getCoordinateSystem().getCoordinateSystemName()) != 0) {
			//Log.warning("invalid coords attribute " + coordsStr + "; expected " + 
			//			this.getCoordinateSystem().getCoordinateSystemName() + " in " + tagNode);
			return false;
		}
		
		//  Check base coordinate system
		if (baseStr == null) {
			//Log.warning("missing base coordinate system attribute in " + tagNode);
			return false;
		} else if (baseStr.compareTo(this.getCoordinateSystem().getBaseCartesianCoordinateSystem().getCoordinateSystemName()) != 0) {
			//Log.warning("invalid base attribute " + baseStr + "; expected " + 
			//			this.getCoordinateSystem().getBaseCartesianCoordinateSystem().getCoordinateSystemName() + " in " + tagNode);
			return false;
		}
	} catch (err) {
		throw "IllegalStateException";
	}
	
	//  Pull the coordinate nodes out of the children of
	//  the point node.  The DOM parser adds lots of
	//  non-element nodes, so we must find the 3
	//  element nodes that contain our coordinates.
	var childList = tagNode.getChildNodes();
	var numChildren = childList.getLength();
	var MAX_COORDINATES = 3;
	var numCoordinates = 0;
	varcoordinateIndices = [];
	for (var i=0; i<numChildren; i++) {
		var	tmp = childList.item(i);
		if (tmp.getNodeType() == Node.ELEMENT_NODE) {
			if (numCoordinates == MAX_COORDINATES) {
				Log.warning("extra coordinate found in " + tagNode);
				return false;
			}
			coordinateIndices[numCoordinates] = i;
			numCoordinates++;
		}
	}
	if (numCoordinates != MAX_COORDINATES) {
		//Log.warning("expected " + MAX_COORDINATES + " coordinates, found " + numCoordinates + " in " + tagNode);
		return false;
	}
	
	//  Parse the coordinates.
	if (!this.x1.fromXMLNode(childList.item(coordinateIndices[0]))) {
		//Log.warning("failed to parse x1 from " + childList.item(coordinateIndices[0]) + " in " + tagNode);
		return false;
	}
	if (!this.x2.fromXMLNode(childList.item(coordinateIndices[1]))) {
		//Log.warning("failed to parse x2 from " + childList.item(coordinateIndices[1]) + " in " + tagNode);
		return false;
	}
	if (!this.x3.fromXMLNode(childList.item(coordinateIndices[2]))) {
		//Log.warning("failed to parse x3 from " + childList.item(coordinateIndices[2]) + " in " + tagNode);
		return false;
	}
	
	//  Must have succeeded.
	return true;
};

GenericPoint.prototype.fromXMLString = function(tagStr) {
	//  Enclose the supplied tag in a document begin/end.
	var	buf = new StringBuffer();
	buf.append("<xml>");
	buf.append(tagStr);
	buf.append("</xml>");
	
	//  Get the document as a byte array, and wrap
	//  into a ByteArrayInputStream.
	var tagBytes = buf.toString().getBytes();
	var	tagBais = new ByteArrayInputStream(tagBytes);
	
	//  Build a document parser and process the
	//  contents of the document.
	var	dbf = 
		DocumentBuilderFactory.newInstance();
	var					db = null;
	try {
		db = dbf.newDocumentBuilder();
	} catch (err) {
		//Log.warning("could not build document " +
		//			"builder: " + pce);
		return false;
	}
	var						doc = null;
	try {
		doc = db.parse(tagBais);
	} catch (err) {
		//Log.warning("could not parse document: " + saxe);
		return false;
	}
	var  points = doc.getElementsByTagName(this.XMLClassName);
	var	numPoints = points.getLength();
	if (numPoints <= 0) { 
		//Log.warning("no point listed in " + tagStr);
		return false;
	}
	if (numPoints > 1) {
		//Log.warning("more than one point listed in " + tagStr);
		return false;
	}
	var point = points.item(0);
	return this.fromXMLNode(point);
};

GenericPoint.prototype.toXMLString = function() {
	var	retval = new StringBuffer();
	retval.append("<");
	retval.append(this.XMLClassName);
	retval.append(" set=\"");
	if (!this.isCoordinateSystemSet()) {
		retval.append("N\"/>");
		return retval.toString();
	}
	try {
		retval.append("Y\" coords=\"");
		retval.append(this.getCoordinateSystem().getCoordinateSystemName());
		retval.append("\" base=\"");
		retval.append(this.getCoordinateSystem().getBaseCartesianCoordinateSystem().getCoordinateSystemName());
		retval.append("\">\n");
		retval.append("\t");
		retval.append(this.getX1().toXMLString());
		retval.append("\n\t");
		retval.append(this.getX2().toXMLString());
		retval.append("\n\t");
		retval.append(this.getX3().toXMLString());
		retval.append("\n</" + this.XMLClassName + ">");
		return retval.toString();
	} catch (err) {
		throw "IllegalStateException";
	}
};

	return GenericPoint;
});

