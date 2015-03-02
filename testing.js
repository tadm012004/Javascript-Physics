require(["Acceleration", "AccelerationFlux", "AccelerationVector", "AngularAcceleration", "AngularLength", "AngularSpeed","AngularVelocityVector", "Area",
	"ECRAccelerationVector", "ECRAngularVelocityVector", "ECRCoords", "ECRPositionVector", "ECRVelocityVector", "Frequency", "FrequencySquared",
	"GenericPoint", "JavaTime", "Length", "Mass", "Month", "Point", "PositionVector", "Power", "Probability", "Reference", "Rotation3D", "ScalarMath",
	"SingleAxisRotation","SolidAngle", "Speed", "SphericalCoords", "TAITime", "Time", "TimeLength", "TimeLengthSquared", "TimeStandard", "Vector",
	"VectorMath", "VelocityVector", "Volume"],
	function(Acceleration,AccelerationFlux, AccelerationVector, AngularAcceleration, AngularLength, AngularSpeed, AngularVelocityVector, Area, 
	ECRAccelerationVector, ECRAccelerationVector, ECRCoords, ECRPositionVector, ECRVelocityVector, Frequency, FrequencySquared,
	GenericPoint, JavaTime, Length, Mass, Month, Point, PositionVector, Power, Probability, Reference, Rotation3D, ScalarMath, 
	SingleAxisRotation, SolidAngle, Speed, SphericalCoords, TAITime, Time, TimeLength, TimeLengthSquared, TimeStandard, Vector,
	VectorMath, VelocityVector, Volume) {

/*
	console.log("here"); 
	var c = new AngularSpeed(4); 
	c.setValue(8); 
	console.log(c.getValue());
	console.log(AngularSpeed.RADIANS_PER_SECOND_PER_DEGREE_PER_MINUTE);
	console.log(c.getValue());
	console.log(Month.getMonthByNumber(4));
	console.log(Area.getMETERS_SQ_PER_KILOMETER_SQ());
*/
	
	// Acceleration
	/* 
	var Acc = new Acceleration(1);
	console.log(Acc.getValue());
	console.log(Acc.setInMetersPerSecondPerSecond(6).getValue());
	console.log(Acc.getValue());
	console.log(Acc.setInKilometersPerSecondPerSecond(3).getValue());
	console.log(Acc.setInFeetPerSecondPerSecond(3).getValue());
	console.log(Acc.setInKiloyardsPerSecondPerSecond(3).getValue());	
	console.log(Acc.setInDataMilesPerSecondPerSecond(2).getValue());
	console.log(Acc.setInStatuteMilesPerSecondPerSecond(2).getValue());
	console.log(Acc.setInNauticalMilesPerSecondPerSecond(2).getValue());
	console.log(Acc.getInMetersPerSecondPerSecond());
	console.log(Acc.getInKilometersPerSecondPerSecond());
	console.log(Acc.getInFeetPerSecondPerSecond());
	console.log(Acc.getInKiloyardsPerSecondPerSecond());
	console.log(Acc.getInDataMilesPerSecondPerSecond());
	console.log(Acc.getInStatuteMilesPerSecondPerSecond());
	console.log(Acc.getInNauticalMilesPerSecondPerSecond());
	console.log(Acceleration.getMPS2_PER_KMPS2());
	console.log(Acceleration.getMPS2_PER_FPS2());
	console.log(Acceleration.getMPS2_PER_KYPS2());
	console.log(Acceleration.getMPS2_PER_DMPS2());
	console.log(Acceleration.getMPS2_PER_MIPS2());
	console.log(Acceleration.getMPS2_PER_NMPS2());
	console.log(Acceleration.getKMPS2_PER_MPS2());
	console.log(Acceleration.getFPS2_PER_MPS2());
	console.log(Acceleration.getKYPS2_PER_MPS2());
	console.log(Acceleration.getDMPS2_PER_MPS2());
	console.log(Acceleration.getMIPS2_PER_MPS2());
	console.log(Acceleration.getDefaultUnits());
	console.log(Acceleration.getScalarName());
	console.log(Acceleration.ScalarTypeConstructorSurrogate(4).getValue());
	*/
/*
		//Acceleration Flux
		var x = new AccelerationFlux(2);
		console.log(x.setInMetersCubedPerSecondPerSecond(34).getValue());
		console.log(x.getInMeterCubedPerSecondPerSecond());
		console.log(AccelerationFlux.getDefaultUnits());
		console.log(AccelerationFlux.ScalarTypeConstructorSurrogate(6).getValue());
*/
/*	
		//AngularAcceleration
	var x = new AngularAcceleration(2);
	console.log(x.getValue());
	console.log(x.setInRadiansPerSecondPerSecond(3).getValue());
	console.log(x.setInDegreesPerSecondPerSecond(4).getValue());
	console.log(x.getInRadiansPerSecondPerSecond());
	console.log(x.getInDegreesPerSecondPerSecond());
	console.log(AngularAcceleration.getDPS2_PER_RPS2());
	console.log(AngularAcceleration.getDefaultUnits());
	console.log(AngularAcceleration.ScalarTypeConstructorSurrogate(12).getValue());
	console.log(AngularAcceleration.getScalarName());
	
*/
/*
	//NEED TO FIX! 46 16 45.000..000682
	//AngularLength
	var x = new AngularLength(3);
	console.log(x.setInRadians(3).getValue());
	console.log(x.setInRevolutions(3).getValue());
	console.log(x.setInDegrees(3).getValue());
	console.log(x.setInDMS(33, 21, 4).getValue());
	console.log(x.setInHMS(3,5,7).getValue());
	console.log(x.getInRadians());
	console.log(x.getInRevolutions());
	console.log(x.getInDegrees());
	
	//var degree = new Reference(33), min = new Reference(21), sec = new Reference(4);
	var degree = {val:33}, min = {val:21}, sec = {val:4};
	console.log(x.getInDMS(degree, min, sec));
	
	//console.log(degree.getValue() + "  " + min.getValue() + "   " + sec.getValue());
	console.log(degree.val + "   " + min.val + "   " + sec.val);
	
	console.log(x.getInHMS(3, 5, 7));
	console.log(x.restricted());	
	*/

/*
	//Area
	var x = new Area(5);
	console.log(x.getValue());
	console.log(x.setInMetersSquared(3).getValue());
	console.log(x.setInCentimetersSquared(3).getValue());
	console.log(x.setInKilometersSquared(3).getValue());
	console.log(x.setInFeetSquared(3).getValue());
	console.log(x.setInYardsSquared(3).getValue());
	console.log(x.setInKiloyardsSquared(3).getValue());
	console.log(x.setInDataMilesSquared(3).getValue());
	console.log(x.setInStatuteMilesSquared(3).getValue());
	console.log(x.setInNauticalMilesSquared(3).getValue());
	console.log(x.setInAcres(3).getValue());
	console.log(x.setInHectares(3).getValue());
	console.log(x.getInMetersSquared());
	console.log(x.getInCentimetersSquared());
	console.log(x.getInKilometersSquared());
	console.log(x.getInFeetSquared());
	console.log(x.getInYardsSquared());
	console.log(x.getInKiloyardsSquared());
	console.log(x.getInDataMilesSquared());
	console.log(x.getInStatuteMilesSquared());
	console.log(x.getInNauticalMilesSquared());
	console.log(x.getInAcres());
	console.log(x.getInHectares());
	console.log(Area.getFEET_SQ_PER_ACRE());
	console.log(Area.getMETERS_SQ_PER_HECTARE());
	console.log(Area.getMETERS_SQ_PER_CENTIMETER_SQ());
	console.log(Area.getMETERS_SQ_PER_KILOMETER_SQ());
	console.log(Area.getMETERS_SQ_PER_FOOT_SQ());
	console.log(Area.getMETERS_SQ_PER_YARD_SQ());
	console.log(Area.getMETERS_SQ_PER_KILOYARD_SQ());
	console.log(Area.getMETERS_SQ_PER_DATA_MILE_SQ());
	console.log(Area.getMETERS_SQ_PER_STATUTE_MILE_SQ());
	console.log(Area.getMETERS_SQ_PER_NAUTICAL_MILE_SQ());
	console.log(Area.getMETERS_SQ_PER_ACRE());
	console.log(Area.getCENTIMETERS_SQ_PER_METER_SQ());
	console.log(Area.getKILOMETERS_SQ_PER_METER_SQ());
	console.log(Area.getFEET_SQ_PER_METER_SQ());
	console.log(Area.getYARDS_SQ_PER_METER_SQ());
	console.log(Area.getKILOYARDS_SQ_PER_METER_SQ());
	console.log(Area.getDATA_MILES_SQ_PER_METER_SQ());
	console.log(Area.getSTATUTE_MILES_SQ_PER_METER_SQ());
	console.log(Area.getNAUTICAL_MILES_SQ_PER_METER_SQ());
	console.log(Area.getACRES_PER_METER_SQ());
	console.log(Area.getHECTARES_PER_METER_SQ());
	console.log(Area.getDefaultUnits());
	console.log(Area.ScalarTypeConstructorSurrogate(3).getValue());
	console.log(Area.getScalarName());
	console.log(Area.zero().getValue());
	
*/
/*
	//Frequency
	var x = new Frequency(34);
	console.log(x.setInHertz(45).getValue());
	console.log(x.setInKiloHertz(45).getValue());
	console.log(x.setInMegaHertz(45).getValue());
	console.log(x.setInGigaHertz(45).getValue());
	console.log(x.setInInverseSiderealSeconds(45).getValue());
	console.log(x.setInInverseCalendarDays(45).getValue());
	console.log(x.setInInverseMeanSolarDays(45).getValue());
	console.log(x.setInInverseSiderealDays(45).getValue());
	console.log(x.getInHertz());
	console.log(x.getInKiloHertz());
	console.log(x.getInMegaHertz());
	console.log(x.getInGigaHertz());
	console.log(x.getInInverseSiderealSeconds());
	console.log(x.getInInverseCalendarDays());
	console.log(x.getInInverseMeanSolarDays());
	console.log(x.getInInverseSiderealDays());
	console.log(Frequency.getHERTZ_PER_KILOHERTZ());
	console.log(Frequency.getHERTZ_PER_MEGAHERTZ());
	console.log(Frequency.getHERTZ_PER_GIGAHERTZ());
	console.log(Frequency.getINVERSE_SIDEREAL_SECONDS_PER_HERTZ());
	console.log(Frequency.getHERTZ_PER_INVERSE_SIDEREAL_SECOND());
	console.log(Frequency.getINVERSE_CALENDAR_DAYS_PER_HERTZ());
	console.log(Frequency.getHERTZ_PER_INVERSE_CALENDAR_DAY());
	console.log(Frequency.getINVERSE_MEAN_SOLAR_DAYS_PER_HERTZ());
	console.log(Frequency.getHERTZ_PER_INVERSE_MEAN_SOLAR_DAY());
	console.log(Frequency.getINVERSE_SIDEREAL_DAYS_PER_HERTZ());
	console.log(Frequency.getHERTZ_PER_INVERSE_SIDEREAL_DAY());
	console.log(Frequency.getKILOHERTZ_PER_HERTZ());
	console.log(Frequency.getMEGAHERTZ_PER_HERTZ());
	console.log(Frequency.getGIGAHERTZ_PER_HERTZ());
	console.log(Frequency.getDefaultUnits());
	console.log(Frequency.ScalarTypeConstructorSurrogate(45));
	console.log(Frequency.getScalarName());
*/
/*
		//FrequencySquared
		var x = new FrequencySquared(54);
		console.log(x.getValue());
		console.log(x.setInHertzSquared(4).getValue());
		console.log(x.getInHertzSquared());
		console.log(FrequencySquared.getDefaultUnits());
		console.log(FrequencySquared.ScalarTypeConstructorSurrogate(56).getValue());
		console.log(FrequencySquared.getScalarName());
		console.log(FrequencySquared.zero().getValue());
*/
/*	
	//Length
	var x = new Length(234);
	console.log(x.getValue());
	console.log(x.setInMeters(34).getValue());
	console.log(x.setInCentimeters(34).getValue());
	console.log(x.setInMillimeters(34).getValue());
	console.log(x.setInMicrons(34).getValue());
	console.log(x.setInAngstroms(34).getValue());
	console.log(x.setInNanometers(34).getValue());
	console.log(x.setInKilometers(34).getValue());
	console.log(x.setInFeet(34).getValue());
	console.log(x.setInYards(34).getValue());
	console.log(x.setInKiloyards(34).getValue());
	console.log(x.setInDataMiles(34).getValue());
	console.log(x.setInStatuteMiles(34).getValue());
	console.log(x.setInNauticalMiles(34).getValue());
	console.log(x.getInMeters());
	console.log(x.getInCentimeters());
	console.log(x.getInMillimeters());
	console.log(x.getInMicrons());
	console.log(x.getInAngstroms());
	console.log(x.getInNanometers());
	console.log(x.getInKilometers());
	console.log(x.getInFeet());
	console.log(x.getInYards());
	console.log(x.getInKiloyards());
	console.log(x.getInDataMiles());
	console.log(x.getInStatuteMiles());
	console.log(x.getInNauticalMiles());
	console.log(Length.getFEET_PER_STATUTE_MILE());
	console.log(Length.getFEET_PER_DATA_MILE());
	console.log(Length.getMETERS_PER_NAUTICAL_MILE());
	console.log(Length.getMETERS_PER_FOOT());
	console.log(Length.getMETERS_PER_KILOMETER());
	console.log(Length.getDECIMETERS_PER_METER());
	console.log(Length.getCENTIMETERS_PER_METER());
	console.log(Length.getMILLIMETERS_PER_METER());
	console.log(Length.getMICRONS_PER_METER());
	console.log(Length.getANGSTROMS_PER_METER());
	console.log(Length.getNANOMETERS_PER_METER());
	console.log(Length.getFEET_PER_YARD());
	console.log(Length.getYARDS_PER_KILOYARD());
	console.log(Length.getMETERS_PER_YARD());
	console.log(Length.getMETERS_PER_STATUTE_MILE());
	console.log(Length.getMETERS_PER_DATA_MILE());
	console.log(Length.getMETERS_PER_KILOYARD());
	console.log(Length.getFEET_PER_METER());
	console.log(Length.getYARDS_PER_METER());
	console.log(Length.getKILOMETERS_PER_METER());
	console.log(Length.getMETERS_PER_DECIMETER());
	console.log(Length.getMETERS_PER_CENTIMETER());
	console.log(Length.getMETERS_PER_MILLIMETER());
	console.log(Length.getMETERS_PER_MICRON());
	console.log(Length.getMETERS_PER_ANGSTROM());
	console.log(Length.getMETERS_PER_NANOMETER());
	console.log(Length.getKILOYARDS_PER_METER());
	console.log(Length.getDATA_MILES_PER_METER());
	console.log(Length.getSTATUTE_MILES_PER_METER());
	console.log(Length.getNAUTICAL_MILES_PER_METER());
	console.log(Length.ScalarTypeConstructorSurrogate(34).getValue());
	console.log(Length.getScalarName());
	console.log(Length.getDefaultUnits());
	console.log(Length.zero().getValue());
*/
/*	
	//Mass
	var x = new Mass(23);
	console.log(x.getValue());
	console.log(x.setInPoundsMass(45).getValue());
	console.log(x.setInKilograms(45).getValue());
	console.log(x.setInGrams(45).getValue());
	console.log(x.setInMetricTons(45).getValue());
	console.log(x.getInPoundsMass());
	console.log(x.getInKilograms());
	console.log(x.getInGrams());
	console.log(x.getInMetricTons());
	console.log(Mass.getPOUNDSMASS_PER_KILOGRAM());
	console.log(Mass.getGRAMS_PER_KILOGRAM());
	console.log(Mass.getMETRIC_TONS_PER_KILOGRAM());
	console.log(Mass.getKILOGRAMS_PER_POUNDMASS());
	console.log(Mass.getKILOGRAMS_PER_GRAM());
	console.log(Mass.getKILOGRAMS_PER_METRIC_TON());
	console.log(Mass.getDefaultUnits());
	console.log(Mass.ScalarTypeConstructorSurrogate(324).getValue());
	console.log(Mass.getScalarName());
	console.log(Mass.zero().getValue());
*/
/*
	//Month
	var x = new Month(2);
	console.log(x.getMonthNumber());
	for (var i = 1; i <= 12; i++) {
		console.log(Month.getMonthByNumber(i));
	}
	var y = new Month(2);
	console.log(x.opEq(y));
	console.log(x.opNotEq(y));
	console.log(x.opLess(y));
	console.log(x.opLessEq(y));
	console.log(x.opGreat(y));
	console.log(x.opGreatEq(y));
	y = new Month(12);
	console.log(x.opEq(y));
	console.log(x.opNotEq(y));
	console.log(x.opLess(y));
	console.log(x.opLessEq(y));
	console.log(x.opGreat(y));
	console.log(x.opGreatEq(y));
	
	console.log(y.opIncr());
	console.log(y.opDecr());
	y = new Month(1);
	console.log(y.opIncr());
	console.log(y.opDecr());
	console.log(Month.January);
	console.log(Month.February);
	console.log(Month.December);
	*/	
	
/*	
	//Power
	var x = new Power(13);
	console.log(x.setInWatts(59).getValue());
	console.log(x.setIndBm(59).getValue());
	console.log(x.getInWatts());
	console.log(x.getIndBm());
	console.log(Power.getDefaultUnits());
	console.lo	g(Power.ScalarTypeConstructorSurrogate(35).getValue());
	console.log(Power.getScalarName());
	console.log(Power.zero().getValue());
*/
/*
	//Probability
	var x = new Probability(.12);
	console.log(x.setProbability(.34).getValue());
	console.log(x.getProbability());
	var y = new Probability(.2);
	console.log(x.opMult(y).getValue());
	Probability.checkValue(.2);
	//Probability.checkValue(35.2);
	console.log(Probability.getDefaultUnits());
	console.log(Probability.ScalarTypeConstructorSurrogate(.43).getValue());
	console.log(Probability.getScalarName());
	console.log(Probability.zero().getValue());
*/
/*
		//TimeLengthSquared
		var x = new TimeLengthSquared(2);
		console.log(x.setInSecondsSquared(34).getValue());
		console.log(x.setInSiderealSecondsSquared(34).getValue());
		console.log(x.getInSecondsSquared());
		console.log(x.getInSiderealSecondsSquared());
		console.log(TimeLengthSquared.getSIDEREAL_SEC_SQ_PER_SI_SEC_SQ());
		console.log(TimeLengthSquared.getDefaultUnits());
		console.log(TimeLengthSquared.ScalarTypeConstructorSurrogate(67).getValue());
		console.log(TimeLengthSquared.getScalarName());
		console.log(TimeLengthSquared.zero().getValue());
*/	
/*
		//Volume
		var x = new Volume(3);
		console.log(x.setInMetersCubed(123).getValue());
		console.log(x.setInCubicCentimeters(123).getValue());
		console.log(x.setInLiters(123).getValue());
		console.log(x.setInGallons(123).getValue());
		console.log(x.setInFeetCubed(123).getValue());
		console.log(x.getInMetersCubed());
		console.log(x.getInCubicCentimeters());
		console.log(x.getInLiters());
		console.log(x.getInGallons());
		console.log(x.getInFeetCubed());
		console.log(Volume.getMETERS_CUBED_PER_CENTIMETER_CUBED());
		console.log(Volume.getCENTIMETERS_CUBED_PER_METER_CUBED());
		console.log(Volume.getMETERS_CUBED_PER_LITER());
		console.log(Volume.getLITERS_PER_METER_CUBED());
		console.log(Volume.getGALLONS_PER_LITER());
		console.log(Volume.getGALLONS_PER_METER_CUBED());
		console.log(Volume.getMETERS_CUBED_PER_GALLON());
		console.log(Volume.getMETERS_CUBED_PER_FOOT_CUBED());
		console.log(Volume.getFEET_CUBED_PER_METER_CUBED());
		console.log(Volume.getDefaultUnits());
		console.log(Volume.ScalarTypeConstructorSurrogate(34).getValue());
		console.log(Volume.getScalarName());
*/
	// JavaTime check this again after UTCTime.
	console.log(JavaTime.time(5));
	//console.log(Time.dummy());
	
	
		
		
		
	
});

