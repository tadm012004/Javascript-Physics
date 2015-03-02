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
//  File:                    ECRVelocityVector.java
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
//	ECRVELOCITYVECTOR
//
/**	Direct sub-class of VelocityVector provided as a convenience
 *  so that it can have a default constructor.  This class is provided
 *  as a convenience since there is a unique ECR coordinate system
 *  object.  A class such as this would not be appropriate for,
 *  e.g., a sensor-based base coordinate system which would be
 *  expected to have many instances.
 *  
 *  @author		R.Conn
 */
//==================================================================

define(["ECRCoords", "Speed", "VelocityVector"], function(ECRCoords, Speed, VelocityVector) {


function ECRVelocityVector() {
	//---------------------------------------------------------------
	//
	//	ECRVELOCITYVECTOR
	//
	/**	Default constructor.  Creates a vector set to
	 * 	(0,0,0).
	 */
	//---------------------------------------------------------------
	if (arguments.length == 0) {
		//  Contortions to avoid having to declare NotSetException
		//  as a thrown exception.  You really should be allowed
		//  to have "try" as the first word of a constructor, even
		//  if you want to call a superclass constructor.
		this.base = null;
		this.x = null;
		this.y = null;
		this.z = null;
		try {
			this.opAssign(ECRVelocityVector.getZeroVector());
		} catch (err) {
			throw "IllegalStateException";
		} 
	}

	//--------------------------------------------------------------
	//
	//	ECRVELOCITYVECTOR
	//
	/**	Copy constructor.
	 * 
	 *  @param	ecrp		The ECRVelocityVector to be copied.
	 */
	//--------------------------------------------------------------
	else if (arguments.length == 1) {
		if (arguments[0] instanceof ECRVelocityVector) {
			this.base = null;
			this.x = null;
			this.y = null;
			this.z = null;
			try {
				this.opAssign(arguments[0]);
			} catch (err) {
				throw "IllegalStateException";
			}
		}

		//--------------------------------------------------------------
		//
		//	ECRVELOCITYVECTOR
		//
		/**	Conversion constructor.
		 *  
		 *  @param	pv			The VelocityVector to be converted. 
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
		else if (arguments[0] instanceof VelocityVector) {

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

	//--------------------------------------------------------------
	//
	//	ECRVELOCITYVECTOR
	//
	/**	This three-arg constructor creates a new ECRPositionVector
	 *  with the supplied coordinates.
	 *  
	 *  @param	xinit		The x-coordinate.
	 *  @param	yinit		The y-coordinate.
	 *  @param	zinit		The z-coordinate.
	 *  
	 *  @throws				NotSetException if any of the supplied
	 *  					values are not set.
	 */
	//--------------------------------------------------------------
	else if (arguments.length == 3) {
		this.base = ECRCoords.getCoords();
		this.x = arguments[0].opCopy();
		this.y = arguments[1].opCopy();
		this.z = arguments[2].opCopy();
	}
}

//--------------------------------------------------------------
//
//	GETZEROVECTOR
//
/**	This static method returns a zero ECRPositionVector.
 *
 *	@return				A zero ECRPositionVector.
 */
//--------------------------------------------------------------
ECRVelocityVector.getZeroVector = function() {
	try {
		return new ECRVelocityVector(new Speed().opZeroAssign(),
								     new Speed().opZeroAssign(),
		 						     new Speed().opZeroAssign());
	} catch (err) {
		throw "IllegalStateException";
	}
};

ECRVelocityVector.prototype.opAssign = function(v) {
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

ECRVelocityVector.prototype.opEq = function(rhs) {
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
	return ECRVelocityVector;
});
