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
//  File:                    PositionVector.java
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
//===============================================================================
//
//	POSITIONVECTOR
//
/**	Java doesn't have typedefs.  So we create the GenericVector 
 *  subclasses explicitly.  
 *  <br><br>
 *  These classes can't be final, since specific singleton coordinate
 *  systems (e.g., EGR) will want to sub-class them.
 *  
 *  @author		R.Conn
 *  @project	OSI
 */
//===============================================================================

define(["Length"], function(Length) {



function PositionVector() {
	if (arguments.length == 0) {	//nothing
		this.base = null;
		this.x = null;
		this.y = null;
		this.z = null;
	} else if (arguments.length == 1) { // PositionVector
		this.base = arguments[0].base;
		if (this.base == null) {
			throw "CoordinateSystemNotSetException";
		}
		try {
    		this.x = arguments[0].x.opCopy();
    		this.y = arguments[0].y.opCopy();
    		this.z = arguments[0].z.opCopy();
		} catch (err) {
			throw "IllegalStateException";
		} 
	} else if (arguments.length == 2) { //vector, base
		this.base = arguments[1];
		try {
    		this.x = arguments[0].x.opCopy();
    		this.y = arguments[0].y.opCopy();
    		this.z = arguments[0].z.opCopy();
		} catch (err) {
			throw "IllegalStateException";
		}	

		//  Confirm that coordinate systems are equivalent.
		if (!arguments[0].getBaseCartesianCoordinateSystem().opEq(arguments[1])) {
			throw "WrongCoordinateBaseException";
		}
	} else if (arguments.length == 4) { // x,y,z,base
		this.base = arguments[3];
		this.x = arguments[0].opCopy();
		this.y = arguments[1].opCopy();
		this.z = arguments[2].opCopy();
	}
}

PositionVector.VectorTypeConstructorSurrogate = function(v) {
	return new PositionVector(v);
};

PositionVector.getVectorName = function() {
	return "PositionVector";
};
	return PositionVector;
});

