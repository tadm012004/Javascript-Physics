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
//  File:                    ECRAngularVelocityVector.java
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
//	ECRANGULARVELOCITYVECTOR
//
/**	Direct sub-class of AngularVelocityVector provided as a convenience
 *  so that it can have a default constructor.  This class is provided
 *  as a convenience since there is a unique ECR coordinate system
 *  object.  A class such as this would not be appropriate for,
 *  e.g., a sensor-based base coordinate system which would be
 *  expected to have many instances.
 *  
 *  @author		R.Conn
 */
//==================================================================
define(["AngularSpeed", "AngularVelocityVector", "ECRCoords"], function(AngularSpeed, AngularVelocityVector, ECRCoords) {


function ECRAngularVelocityVector() {
	//---------------------------------------------------------------
	//
	//	ECRANGULARVELOCITYVECTOR
	//
	/**	Default constructor.  Creates a vector set to
	 * 	(0,0,0).
	 */
	//---------------------------------------------------------------
	if (arguments.length == 0) {
		this.base = null;
		this.x = null;
		this.y = null;
		this.z = null;
		try {
			this.opAssign(ECRAngularVelocityVector.getZeroVector());
		} catch (err) {
			throw "IllegalStateException";
		}
	}

	else if (arguments.length == 1) {
		//--------------------------------------------------------------
		//
		//	ECRANGULARVELOCITYVECTOR
		//
		/**	Copy constructor.
		 * 
		 *  @param	ecrp		The ECRAngularVelocityVector to be copied.
		 */
		//--------------------------------------------------------------
		if (arguments[0] instanceof ECRAngularVelocityVector) {
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
		//	ECRANGULARVELOCITYVECTOR
		//
		/**	Conversion constructor.
		 *  
		 *  @param	pv			The AngularVelocityVector to be converted. 
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
		else if (arguments[0] instanceof AngularVelocityVector) {
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
				this.opAssign(pv);
			} catch (err) {
				throw "IllegalStateException";
			}
		}
	}

	//--------------------------------------------------------------
	//
	//	ECRANGULARVELOCITYVECTOR
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

ECRAngularVelocityVector.getZeroVector = function() {
	try {
		return new ECRAngularVelocityVector(new AngularSpeed().opZeroAssign(),
								     		new AngularSpeed().opZeroAssign(),
		 						     		new AngularSpeed().opZeroAssign());
	} catch (err) {
		throw "IllegalStateException";
	}
};
	return ECRAngularVelocityVector;
});

