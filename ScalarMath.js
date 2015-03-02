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
//  File:                    ScalarMath.C
//  Classification:          UNCLASSIFIED
//  Proprietary Information: NONE
//  Release:                 Controlled by NAVSEA61, Government Program Office
//
//  Programmer:     		 R. Conn         
//  Description:             see below
//
//  Reviewed By:             Tim McGee on March 21, 2007
//  Notes:                   
//
//----------------------------------------------------------------------
//
//	ARITHMETIC
//
/**	This header file specifies cross-type scalar arithmetic and
 *	trigonometric functions.
 *	<br><br>
 *	All of these functions live in the osi::physics namespace,
 *	outside of any particular class.
 *  <br><br>
 *
 *	@author		Robert A. Conn
 *	@project	OSI
 *	@org		JHU/APL
 */
//----------------------------------------------------------------------

define(["Acceleration","AccelerationFlux","AngularAcceleration","AngularLength","AngularSpeed",
"Area","Frequency","FrequencySquared","Length","Probability","Speed","TimeLength","TimeLengthSquared","Volume"], 
function(Acceleration,AccelerationFlux,AngularAcceleration,AngularLength,AngularSpeed,Area,
Frequency,FrequencySquared,Length,Probability,Speed,TimeLength,TimeLengthSquared,Volume) {

function ScalarMath() {}

//--------------------------------------------------------------
//
//	MINIMUMANGULARDISTANCE
//
/**	This method returns the minimum distance between two 
 *	angles as an angle.  The two angles are restricted to
 *	(projected down to) a single circuit of the circle.  For example, 
 *	minimumAngularDistance(359 deg, 1 deg) = 2 degrees.  Another 
 *	example is that minimumAngularDistance(720 deg, 90 deg) = 90 deg.
 *	Note that minimumAngularDistance() is symmetric, i.e.,
 *	minimumAngularDistance(x,y) = minimumAngularDistance(y,x).
 *
 *	@param	ang1		The first angle.
 *	@param	ang2		The second angle.
 *	
 *	@return				The minimum angular distance
 *							between ang1 and ang2.   Always
 *							in the range 0 .. pi.
 *
 *	@throws				NotSetException if ang1 or ang2
 *							are not set.
 */
//-------------------------------------------------------------
ScalarMath.minimumAngularDistance = function(ang1, ang2) {

	var a1 = ang1.restricted();
	var a2 = ang2.restricted();
	
	var	maxa = a1;
	var	mina = a2;
	if (a1.opLess(a2)) {
		maxa = a2;
		mina = a1;
	}
	var	dist = maxa.opSub(mina);
	if (dist.opGreat(AngularLength.pi())) {
		dist.opAssign(AngularLength.twoPi().opSub(dist));
		dist.opAssign(dist.restricted());
	}
	return dist;
};

/**
 *  ISANGLEINRANGE
 *
 *  This function will determine whether or not a test angle is between
 *  two other angles on a circle.  Note that the general answer to this
 *  question is always true (i.e. a circle is continuous so any point on
 *  the circle is between any other two points on the same circle).  For
 *  this function to make sense, it is necessary to introduce an
 *  orientation for the test.
 *
 *  So this function will fundamentally answer the following question:
 *
 *  Beginning at start and traversing a circle in either the clockwise or 
 *  counterclockwise direction as specified, which angle will be
 *  encountered first, end or testAngle?  If end is encountered first,
 *  this function will return false.  Otherwise, it will return true.
 *
 *  NOTE:   This function will restrict the start and end angles to be
 *          between 0 and 2 PI.  However, it will also treat a circle as 
 *          a continuous traversal (i.e. if start is 4PI/3, end is
 *          PI/4, and testAngle is 0, true will be returned).   
 *
 *  @param  start       The angle from which to begin traversal of the
 *                      circle.
 *
 *  @param  end         The angle at which to stop traversal of the
 *                      circle.
 *
 *  @param  testAngle   The angle in question.
 *
 *  @param  isOrientationCounterClockwise   If true, traversal of the
 *                      circle will be done in the counter-clockwise
 *                      direction, otherwise, traversal will be done in
 *                      the clockwise direction.
 *                      
 *  @throws				NotSetException if any of the supplied scalar
 *  					values are not set.
 */
ScalarMath.isAngleInRange = function( start, end, testAngle, isOrientationCounterClockwise) {
	var  retval  =  false;

	// Restrict the angles.
	var  s  =  start.restricted();
	var  e  =  end.restricted();
	var  t  =  testAngle.restricted();

	// We might need to adjust the angles to account for going
	// around the horn.
	if( isOrientationCounterClockwise )
	{
		// We'll need to add 2 pi to s if it is less than e so that the
		// logic following is valid.
		if( s.opLess(e) ) {
			// Make sure to adjust t if necessary as well.
			if( t.opLess(s) ) {
				t.opAddAssign(AngularLength.twoPi());
			}

			s.opAddAssign(AngularLength.twoPi());
		}

		// By this point, e <= t <= s.
		retval  =  (e.opLessEq(t) && t.opLessEq(s));

	} else {
		// We'll need to add 2 pi to e if it is less than s so that the
		// following logic is valid.
		if( e.opLess(s) ) {
			e.opAddAssign(AngularLength.twoPi());

			// Make sure to adjust t if necessary as well.
			if( t.opLess(s) ) {
				t.opAddAssign(AngularLength.twoPi());
			}
		}

		// Now, t must always be >= s and t must always be <= e.
		retval  =  (s.opLessEq(t) && t.opLessEq(e));
	}

	// Done.
	return  retval;
};

//  Trigonometric
ScalarMath.cos = function(al) {
	return Math.cos(al.getInRadians());
};

ScalarMath.sin = function(al)  {
	return Math.sin(al.getInRadians());
};

ScalarMath.tan = function(al)  {
	return Math.tan(al.getInRadians());
};

//  Inverse trigonometric
ScalarMath.acos = function(d) {
	return new AngularLength().setInRadians(Math.acos(d));
};

ScalarMath.asin = function(d) {
	return new AngularLength().setInRadians(Math.asin(d));
};

ScalarMath.atan = function(d) {
	return new AngularLength().setInRadians(Math.atan(d));
};

//----------------------------------------------------------
//
//	ATAN2
//
/**	This method is (mostly) a wrapper for the math library
 *	atan2 function, which returns the arc tangent of y/x.
 *	This method has been modified to allow both y and x to
 *	be zero, in which case an arbitrary but valid angle
 *	will be returned.
 *
 *	@param	y			The y-component of the point whose
 *							angle is desired.
 *	@param	x			The x-component of the point whose
 *							angle is desired.
 *
 *	@return				The arc tangent of y/x, or an arbitrary
 *							valid value if y and x are both
 *							zero.
 */
//----------------------------------------------------------
ScalarMath.atan2 = function(y, x) {
	 var	yd = y.getInMeters();
	 var	xd = x.getInMeters();

	//  Handle case of both zero.
	if ((yd == 0.0) && (xd == 0.0)) {
		return new AngularLength().setInRadians(0.0);
	}

	//  Generic case.
	return new AngularLength().setInRadians(Math.atan2(yd, xd));
};

//  Specialty.
ScalarMath.sqrt = function(a) {
	return new Length().setInMeters(
		Math.sqrt(
			a.getInMetersSquared()
		)
	);
};

ScalarMath.sqrt = function(t2) {
	return new TimeLength().setInSeconds(
		Math.sqrt(
			t2.getInSecondsSquared()
		)
	);
};

ScalarMath.sqrt = function(f2)  {
	return new Frequency().setInHertz(
		Math.sqrt(
			f2.getInHertzSquared()
		)
	);
};


ScalarMath.opMult = function() {
	if (arguments[0] instanceof Probability && arguments[1] instanceof ScalarT) {
		return arguments[1].opMult(arguments[0].getProbability());

	} else if (arguments[0] instanceof ScalarT && arguments[1] instanceof Probability) {
		return arguments[0].opMult(arguments[1].getProbability());

	} else if (arguments[0] instanceof AngularLength && arguments[1] instanceof Length) {
		return new Length().setInMeters(arguments[0].getInRadians() * arguments[1].getInMeters());

	} else if (arguments[0] instanceof Length && arguments[1] instanceof AngularLength) {
		return ScalarMath.opMult(arguments[1], arguments[0]);

	} else if (arguments[0] instanceof Length && arguments[1] instanceof Frequency) {
		return new Speed().setInMetersPerSecond(arguments[0].getInMeters() * arguments[1].getInHertz());

	} else if (arguments[0] instanceof Frequency && arguments[1] instanceof Length) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof Length && arguments[1] instanceof AngularSpeed) {
		return new Speed().setInMetersPerSecond(arguments[0].getInMeters() * arguments[1].getInRadiansPerSecond());
		
	} else if (arguments[0] instanceof AngularSpeed && arguments[1] instanceof Length) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	}  else if (arguments[0] instanceof AngularLength && arguments[1] instanceof Frequency) {
		return new AngularSpeed().setInRadiansPerSecond(arguments[0].getInRadians() * arguments[1].getInHertz())
	
	} else if (arguments[0] instanceof Frequency && arguments[1] instanceof AngularLength) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof TimeLength && arguments[1] instanceof Frequency) {
		return arguments[0].getInSeconds() * arguments[1]/getInHertz();
		
	} else if (arguments[0] instanceof Frequency && arguments[1] instanceof TimeLength) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof Speed && arguments[1] instanceof TimeLength) {
		return new Length().setInMeters(arguments[0].getInMetersPerSecond() * arguments[1].getInSeconds());
		
	} else if (arguments[0] instanceof TimeLength && arguments[1] instanceof Speed) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof AngularSpeed && arguments[1] instanceof TimeLength) {
		return new AngularLength().setInRadians(arguments[0].getInRadiansPerSecond() * arguments[1].getInSeconds());
		
	} else if (arguments[0] instanceof TimeLength && arguments[1] instanceof AngularSpeed) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof Length && arguments[1] instanceof FrequencySquared) {
		return new Acceleration().setInMetersPerSecondPerSecond(arguments[0].getInMeters() * arguments[1].getInHertzSquared());
		
	} else if (arguments[0] instanceof FrequencySquared && arguments[1] instanceof Length) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof Acceleration && arguments[1] instanceof TimeLengthSquared) {
		return new Length().setInMeters(arguments[0].getInMetersPerSecondPerSecond() * arguments[1].getInSecondsSquared());
	
	} else if (arguments[0] instanceof TimeLengthSquared && arguments[1] instanceof Acceleration) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof Acceleration && arguments[1] instanceof TimeLength) {
		return new Spped().setInMetersPerSecond(arguments[0].getInMetersPerSecondPerSecond() * arguments[1].getInSeconds());
		
	} else if (arguments[0] instanceof TimeLength && arguments[1] instanceof Acceleration) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof Speed && arguments[1] instanceof Frequency) {
		return new Acceleration().setInMetersPerSecondPerSecond(arguments[0].getInMetersPerSecond() * arguments[1].getInHertz());
		
	} else if (arguments[0] instanceof Frequency && arguments[1] instanceof Speed) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof  Speed && arguments[1] instanceof AngularSpeed) {
		return new Acceleration().setInMetersPerSecondPerSecond(arguments[0].getInMetersPerSecond() * arguments[1].getInRadiansPerSecond());
		
	} else if (arguments[0] instanceof AngularSpeed && arguments[1] instanceof Speed) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof Frequency && arguments[1] instanceof Frequency) {
		return new FrequencySquared().setInHertzSquared(arguments[0].getInHertz() * arguments[1].getInHertz());
		
	} else if (arguments[0] instanceof FrequencySquared && arguments[1] instanceof TimeLength) {
		return new Frequency(),setInHertz(arguments[0].getInHertzSquared() * arguments[1].getInSeconds());
		
	} else if (arguments[0] instanceof TimeLength && arguments[1] instanceof FrequencySquared) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof FrequencySquared && arguments[1] instanceof TimeLengthSquared) {
		return arguments[0].getInHertzSquared() * arguments[1].getInSecondsSquared();
		
	} else if (arguments[0] instanceof TimeLengthSquared && arguments[1] instanceof FrequencySquared) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof TimeLength && arguments[1] instanceof TimeLength) {
		return new TimeLengthSquared().setInSecondsSquared(arguments[0].getInSeconds() * arguments[1].getInSeconds());
		
	} else if (arguments[0] instanceof TimeLengthSquared && arguments[1] instanceof Frequency) {
		return new TimeLength().setInSeconds(arguments[0].getInSecondsSquared() * arguments[1].getInHertz());

	} else if (arguments[0] instanceof Frequency && arguments[1] instanceof TimeLengthSquared) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof Length && arguments[1] instanceof Length) {
		return new Area().setInMetersSquared(arguments[0].getInMeters() * arguments[1].getInMeters());
		
	} else if (arguments[0] instanceof AngularLength && arguments[1] instanceof Area) {
		return new Area().setInMetersSquared(arguments[0]/getInRadians() * arguments[1].getInMetersSquared());
		
	} else if (arguments[0] instanceof Area && arguments[1] instanceof AngularLength) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof AngularAcceleration && arguments[1] instanceof TimeLength) {
		return new AngularSpeed().setInRadiansPerSecond(arguments[0].getInRadiansPerSecondPerSecond() * arguments[1].getInSeconds());
	
	} else if (arguments[0] instanceof TimeLength && arguments[1] instanceof AngularAcceleration) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof AngularSpeed && arguments[1] instanceof Frequency) {
		return new AngularAcceleration().setInRadiansPerSecondPerSecond(arguments[0].getInRadiansPerSecond() * arguments[1].getInHertz());
		
	} else if (arguments[0] instanceof Frequency && arguments[1] instanceof AngularSpeed) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof AngularLength && arguments[1] instanceof FrequencySquared) {
		return new AngularAcceleration().setInRadiansPerSecondPerSecond(arguments[0].getInRadians() * arguments[1].getInHertzSquared());
		
	} else if (arguments[0] instanceof FrequencySquared && arguments[1] instanceof AngularLength) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof AngularAcceleration && arguments[1] instanceof TimeLengthSquared) {
		return new AngularLength().setInRadians(arguments[0].getInRadiansPerSecondPerSecond() * arguments[1].getInSecondsSquared());
		
	} else if (arguments[0] instanceof TimeLengthSquared && arguments[1] instanceof AngularAcceleration) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof Volume && arguments[1] instanceof FrequencySquared) {
		return new AccelerationFlux().setInMetersCubedPerSecondPerSecond(arguments[0].getInMetersCubed() * arguments[1].getInHertzSquared());
		
	} else if (arguments[0] instanceof FrequencySquared && arguments[1] instanceof Volume) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof Area && arguments[1] instanceof Acceleration) {
		return new AccelerationFlux().setInMetersCubedPerSecondPerSecond(arguments[0].getInMetersSquared() * arguments[1].getInMetersPerSecondPerSecond());
		
	} else if (arguments[0] instanceof Acceleration && arguments[1] instanceof Area) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof AccelerationFlux && arguments[1] instanceof TimeLengthSquared) {
		return new Volume().setInMetersCubed(arguments[0].getInMetersCubedPerSecondPerSecond() * arguments[1].getInSecondsSquared());
	
	} else if (arguments[0] instanceof TimeLengthSquared && arguments[1] instanceof AccelerationFlux) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} else if (arguments[0] instanceof Length && arguments[1] instanceof Area) {
		return new Volume().setInMetersCubed(arguments[0].getInMeters() * arguments[1].getInMetersSquared());
		
	} else if (arguments[0] instanceof Area && arguments[1] instanceof Length) {
		return ScalarMath.opMult(arguments[1], arguments[0]);
		
	} 
};

ScalarMath.opDiv = function() {

	if (typeof arguments[0] === "number" && arguments[1] instanceof TimeLength) {
		var denom = arguments[1].getInSeconds();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new Frequency().setInHertz(arguments[0]/arguments[1]);

	} else if (typeof arguments[0] === "number" && arguments[1] instanceof Frequency) {
		var denom = arguments[1].getInHertz();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new TimeLength().setInSeconds(arguments[0]/denom);

	} else if (arguments[0] instanceof Length && arguments[1] instanceof TimeLength) {
		var denom = arguments[1].getInSeconds();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new Speed().setInMetersPerSecond(arguments[0].getInMeters()/denom);
		
	} else if (arguments[0] instanceof Length && arguments[1] instanceof Speed) {
		var denom = arguments[1].getInMetersPerSecond();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new TimeLength().setInSeconds(arguments[0].getInMeters()/denom);
		
	} else if (arguments[0] instanceof AngularLength && arguments[1] instanceof TimeLength) {
		var denom = arguments[1].getInSeconds();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new AngularLength().setInRadiansPerSecond(arguments[0].getInRadians()/denom);
		
	} else if (arguments[0] instanceof Speed && arguments[1] instanceof Length) {
		var denom = arguments[1].getInMeters();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new FrequencySquared().setInHertz(arguments[0].getInMetersPerSecond()/denom);
		
	} else if (arguments[0] instanceof Speed && arguments[1] instanceof Frequency) {
		var denom = arguments[1].getInHertz();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new Length().setInMeters(arguments[0].getInMetersPerSecond()/denom);
		
	} else if (arguments[0] instanceof AngularSpeed && arguments[1] instanceof AngularLength) {
		var denom = arguments[1].getInRadians();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new Frequency().setInHertz(arguments[0].getInRadiansPerSecond()/denom);
		
	} else if (arguments[0] instanceof AngularSpeed && arguments[1] instanceof Frequency) {
		var denom = arguments[1].getInHertz();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new AngularLength().setInRadians(arguments[0].getInRadiansPerSecond()/denom);
		
	} else if (arguments[0] instanceof Acceleration && arguments[1] instanceof Length) {
		var denom = arguments[1].getInMeters();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new FrequencySquared().setInHertzSquared(arguments[0].getInMetersPerSecondPerSecond()/denom);
		
	} else if (arguments[0] instanceof Acceleration && arguments[1] instanceof FrequencySquared) {
		var denom = arguments[1].getInHertzSquared();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new Length().setInMeters(arguments[0].getInMetersPerSecondPerSecond()/denom);
		
	} else if (arguments[0] instanceof Length && arguments[1] instanceof TimeLengthSquared) {
		var denom = arguments[1].getInSecondsSquared();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new Acceleration().setInMetersPerSecondPerSecond(arguments[0].getInMeters()/denom);
		
	} else if (arguments[0] instanceof Speed && arguments[1] instanceof TimeLength) {
		var denom = arguments[1].getInSeconds();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new Acceleration().setInMetersPerSecondPerSecond(arguments[0].getInMetersPerSecond()/denom);
		
	} else if (arguments[0] instanceof Acceleration && arguments[1] instanceof Speed) {
		var denom = arguments[1].getInMetersPerSecond();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new Frequency().setInHertz(arguments[0].getInMetersPerSecondPerSecond()/denom);
		
	} else if (arguments[0] instanceof Acceleration && arguments[1] instanceof Frequency) {
		var denom = arguments[1].getInHertz();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new Speed().setInMetersPerSecond(arguments[0].getInMetersPerSecondPerSecond()/denom);
		
	} else if (arguments[0] instanceof Frequency && arguments[1] instanceof TimeLength) {
		var denom = arguments[1].getInSeconds();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new FrequencySquared().setInHertzSquared(arguments[0].getInHertz()/denom);
		
	} else if (arguments[0] instanceof FrequencySquared && arguments[1] instanceof Frequency) {
		var denom = arguments[1].getInHertz();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new Frequency().setInHertz(arguments[0].getInHertzSquared()/denom);
		
	} else if (arguments[0] instanceof TimeLength && arguments[1] instanceof Frequency) {
		var denom = arguments[1].getInHertz();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new TimeLengthSquared().setInSecondsSquared(arguments[0].getInSeconds()/denom);
		
	} else if (arguments[0] instanceof TimeLengthSquared && arguments[1] instanceof TimeLength) {
		var denom = arguments[1].getInSeconds();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new TimeLength().setInSeconds(arguments[0].getInSecondsSquared()/denom);
		
	} else if (arguments[0] instanceof Area && arguments[1] instanceof Length) {
		var denom = arguments[1].getInMeters();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new Length().setInMeters(arguments[0].getInMetersSquared()/denom);
		
	} else if (arguments[0] instanceof AngularSpeed && arguments[1] instanceof TimeLength) {
		var denom = arguments[1].getInSeconds();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new AngularAcceleration().setInRadiansPerSecond(arguments[0].getInRadiansPerSecond()/denom);
		
	} else if (arguments[0] instanceof AngularLength && arguments[1] instanceof TimeLengthSquared) {
		var denom = arguments[1].getInSecondsSquared();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new AngularAcceleration().setInRadiansPerSecondPerSecond(arguments[0].getInRadians()/denom);
		
	} else if (arguments[0] instanceof AngularAcceleration && arguments[1] instanceof Frequency) {
		var denom = arguments[1].getInHertz();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new AngularSpeed().setInRadiansPerSecond(arguments[0].getInRadiansPerSecondPerSecond()/denom);
		
	} else if (arguments[0] instanceof AngularAcceleration && arguments[1] instanceof FrequencySquared) {
		var denom = arguments[1].getInHertzSquared();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new AngularLength().setInRadians(arguments[0].getInRadiansPerSecondPerSecond()/denom);
		
	} else if (arguments[0] instanceof Volume && arguments[1] instanceof TimeLengthSquared) {
		var denom = arguments[1].getInSecondsSquared();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new AccelerationFlux().setInMetersCubedPerSecondPerSecond(arguments[0].getInMetersCubed()/denom);
		
	} else if (arguments[0] instanceof AccelerationFlux && arguments[1] instanceof FrequencySquared) {
		var denom = arguments[1].getInHertzSquared();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new Volume().setInMetersCubed(arguments[0].getInMetersCubedPerSecondPerSecond()/denom);
		
	} else if (arguments[0] instanceof AccelerationFlux && arguments[1] instanceof Area) {
		var denom = arguments[1].getInMetersSquared();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new Acceleration().setInMetersPerSecondPerSecond(arguments[0].getInMetersCubedPerSecondPerSecond()/denom);
		
	} else if (arguments[0] instanceof AccelerationFlux && arguments[1] instanceof Volume) {
		var denom = arguments[1].getInMetersCubed();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new FrequencySquared().setInHertzSquared(arguments[0].getInMetersCubedPerSecondPerSecond()/denom);
		
	} else if (arguments[0] instanceof Volume && arguments[1] instanceof Length) {
		var denom = arguments[1].getInMeters();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new Area().setInMetersSquared(arguments[0].getInMetersCubed()/denom);
		
	} else if (arguments[0] instanceof Volume && arguments[1] instanceof Area) {
		var denom = arguments[1].getInMetersSquared();
		if (denom == 0.0) {
			throw "DivideByZeroException";
		}
		return new Length().setInMeters(arguments[0].getInMetersCubed()/denom);
		
	}
};

	return ScalarMath;
});
