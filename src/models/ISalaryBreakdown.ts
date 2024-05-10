import { ITaxBracket } from './ITaxBracket';

export interface ISalaryBreakdown {
  initialSalary: number
  taxBracketsBreakdowns: ITaxBracketBreakdown[],
  taxesTotal: number
  finalSalary: number 
}

export interface ITaxBracketBreakdown extends ITaxBracket {
  amount: number
}