import { ISalaryBreakdown, ITaxBracketBreakdown } from '../models/ISalaryBreakdown';
import { ITaxBracket } from '../models/ITaxBracket';

// TODO: unit tests
export function getSalaryBreakdown(taxBrackets: ITaxBracket[], salary: number): ISalaryBreakdown {
  const applicableTaxBrackets = taxBrackets.filter(taxBrackets => taxBrackets.min < salary)

  const taxBracketsBreakdowns: ITaxBracketBreakdown[] = applicableTaxBrackets.map(taxBracket => ({
    rate: taxBracket.rate,
    min: taxBracket.min,
    max: taxBracket.max,
    amount: getTaxableAmountForBracket(taxBracket, salary) * taxBracket.rate,
  }))

  const taxesTotal = taxBracketsBreakdowns.reduce((total, taxBracketBreakdown) => total + taxBracketBreakdown.amount,  0)
  return {
    initialSalary: salary,
    taxesTotal,
    taxBracketsBreakdowns,
    finalSalary: salary - taxesTotal,
  }
}

export function getTaxableAmountForBracket(taxBracket: ITaxBracket, salary: number): number {
  const { min, max = Infinity} = taxBracket
  if (salary >= max) return max - min
  if (salary < min) return 0
  return salary - min
}