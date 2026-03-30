export type BmiCategory = "Underweight" | "Normal" | "Overweight" | "Obese";

export interface BmiResult {
  bmi: number;
  category: BmiCategory;
  bmiPrime: number;
  healthyWeightRange: { min: number; max: number };
}

export function calculateBmi(
  heightCm: number,
  weightKg: number
): BmiResult | null {
  if (heightCm <= 0 || weightKg <= 0) return null;

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const bmiPrime = bmi / 25;

  const category = getBmiCategory(bmi);

  const healthyMin = 18.5 * heightM * heightM;
  const healthyMax = 24.9 * heightM * heightM;

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    bmiPrime: Math.round(bmiPrime * 100) / 100,
    healthyWeightRange: {
      min: Math.round(healthyMin * 10) / 10,
      max: Math.round(healthyMax * 10) / 10,
    },
  };
}

export function getBmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function imperialToCm(feet: number, inches: number): number {
  return (feet * 12 + inches) * 2.54;
}

export function lbsToKg(lbs: number): number {
  return lbs * 0.453592;
}

export function kgToLbs(kg: number): number {
  return kg / 0.453592;
}
