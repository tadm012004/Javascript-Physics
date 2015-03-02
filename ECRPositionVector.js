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
//  File:                    ECRPositionVector.java
//  Classification:          UNCLASSIFIED
//  Proprietary Information: NONE
//  Release:                 Controlled by NAVSEA61, Government Program Office
//
//  Programmer:              
//  Description:             
//
//  Reviewed By:             
//  Notes:                   
//
//==================================================================
//
//	ECRPOSITIONVECTOR
//
/**	Direct sub-class of PositionVector provided as a convenience
 *  so that it can have a default constructor.  This class is provided
 *  as a convenience since there is a unique ECR coordinate system
 *  object.  A class such as this would not be appropriate for,
 *  e.g., a sensor-based base coordinate system which would be
 *  expected to have many instances.
 *  
 *  @author		R.Conn
 */
//==================================================================
define(["ECRCoords", "Length", "PositionVector"], function(ECRCoords,Length,PositionVector) {



function ECRPositionVector() {
	if (arguments.length == 0) {
		this.base = null;
		this.x = null;
		this.y = null;
		this.z = null;
		try {
			this.opAssign(ECRPositionVector.getZeroVector);
		} catch (err) {
			throw "IllegalStateException";
		} 
	}

	else if (arguments.length == 1) {
		//--------------------------------------------------------------
		//
		//	ECRPOSITIONVECTOR
		//
		/**	Copy constructor.
		 * 
		 *  @param	ecrp		The ECRPositionVector to be copied.
		 */
		//--------------------------------------------------------------
		if (arguments[0] instanceof ECRPositionVector) {
			this.base = null;
			this.x = null;
			this.y = null;
			this.z = null;
			try {
			this.opAssign(arguments[0]);
			}  catch (err) {
				throw "IllegalStateException";
			}
		}
		//--------------------------------------------------------------
		//
		//	ECRPOSITIONVECTOR
		//
		/**	Conversion constructor.
		 *  
		 *  @param	pv			The PositionVector to be converted. 
		 *  					Must have ECR as its base
		 *  					coordinate system.
		 *  
		 *  @throws				CoordinateSystemNotSetException
		 *  					if the supplied vector's coordinate
		 *  					system is not set.
		 *  
		 *  @throws				WrongCoordinateBaseException if 
		 *  					the coordinate system of the
		 *  					supplied vector does not match
		 *  					ECR.
		 */
		//--------------------------------------------------------------
		else if (arguments[0] instanceof PositionVector) {
			this.base = null;
			this.x = null;
			this.y = null;
			this.z = null;
			//  Check coordinate system.
			if (!arguments[0].getBaseCartesianCoordinateSystem().opEq(ECRCoords.getCoords())) {
				throw "WrongCoordinateBaseException";
			}
			
			//  Do assignment.
			try {
				this.opAssign(arguments[0]);
			} catch (err) {
				throw "IllegalStateException";
			}
		}
	}

	else if (arguments.length == 3) {
		this.base = ECRCoords.getCoords();
		this.x = arguments[0].opCopy();
		this.y = arguments[1].opCopy();
		this.z = arguments[2].opCopy();
	}

}

ECRPositionVector.getZeroVector = function() {
	try {
		return new ECRPositionVector(new Length().opZeroAssign(),
								     new Length().opZeroAssign(),
		 						     new Length().opZeroAssign());
	} catch (err) {
		throw "IllegalStateException";
	}
};

ECRPositionVector.prototype.getScaled = function(unit) {
	//  Don't do anything if this vector's coordinate system
	//	is not set.
	if (!this.isCoordinateSystemSet()) {
		throw "CoordinateSystemNotSetException";
	}
	
	var	magZero = unit.opZero();

	//  Don't let the user request a negative magnitude.
	if (unit.opLess(magZero)) {
		throw "NegativeException";
	}

	//  Can't scale up a zero vector.
	var	oldMag = this.magnitude();
	if (oldMag.opEq(magZero)) {
		throw "DivideByZeroException";
	}
	
	var	scale = unit.opDiv(oldMag);
	var retval = this.opCopy();	

	return new ECRPositionVector(retval.opMultAssign(scale));
};

ECRPositionVector.prototype.opAssign = function(v) {
	//  If our coordinate system is not set, just set it.
	if (!this.isCoordinateSystemSet()) {
		this.setCoordinateSystem(
			v.getBaseCartesianCoordinateSystem()
		);

	//  If our coordinate system is set, it must be the
	//	same as the supplied coordinate system.
	} else {
		if (!this.getBaseCartesianCoordinateSystem().opEq
				(v.getBaseCartesianCoordinateSystem())) {
			throw "CoordinateSystemAlreadySetException";
		}
	}

	//  Should be safe to copy the values.
	try {
		if (this.x == null) {
			this.x = v.x.opCopy();
			this.y = v.y.opCopy();
			this.z = v.z.opCopy();
		} else {
			this.x.opAssign(v.x);
			this.y.opAssign(v.y);
			this.z.opAssign(v.z);
		}
	} catch (err) {
		throw "IllegalStateException";
	}
	
	//  Cast is valid by construction.
	return this;
	
};

ECRPositionVector.prototype.opEq = function(rhs) {
	if (!this.getBaseCartesianCoordinateSystem().opEq(
		rhs.getBaseCartesianCoordinateSystem())) {
		throw "WrongCoordinateBaseException";
	}

	try {
		return (this.x.opEq(rhs.x) &&
				this.y.opEq(rhs.y) &&
				this.z.opEq(rhs.z));
	} catch (err) {
		throw "IllegalStateException";
	} 
	
};

ECRPositionVector.prototype.opCompare = function(rhs) {
	if (!this.getBaseCartesianCoordinateSystem().opEq(
		rhs.getBaseCartesianCoordinateSystem())) {

		throw "WrongCoordinateBaseException";
	}
	try {
	    if (x.opEq(rhs.x)){
	       if (y.opEq(rhs.y)){
	           if (z.opEq(rhs.z)){
	               return 0;
	           }else{
	               return z.opGreat(rhs.z) ? 1 : -1;
	           }
	       }else{
	           return y.opGreat(rhs.y) ? 1 : -1;
	       }
	    }else{
	        return x.opGreat(rhs.x) ? 1 : -1;
	    }
	} catch (err) {
		throw "IllegalStateException";
	} 

};

ECRPositionVector.prototype.compareTo = function(rhs) {
    return this.opCompare(rhs);
};
	return ECRPositionVector;
});
