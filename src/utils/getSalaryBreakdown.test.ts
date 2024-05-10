import assert from 'assert'
import { ITaxBracket } from '../models/ITaxBracket'
import { getSalaryBreakdown, getTaxableAmountForBracket } from './getSalaryBreakdown'

describe('getTaxableAmountForBracket', () => {
  describe('Given a taxBracket with no max', () => {
    describe('And a min of 0', () => {
      const taxBracket: ITaxBracket = {
        min: 0,
        rate: 0.1      
      }

      describe('and a salary of 0', () => {
        const salary = 0

        it('returns 0', () => {
          const taxableAmount = getTaxableAmountForBracket(taxBracket, salary)
          assert.strictEqual(taxableAmount, 0)
        })
      })

      describe('and a salary of 10000', () => {
        const salary = 10000

        it('returns 10000', () => {
          const taxableAmount = getTaxableAmountForBracket(taxBracket, salary)
          assert.strictEqual(taxableAmount, 10000)
        })
      })
    })

    describe('And a min of 10000', () => {
      const taxBracket: ITaxBracket = {
        min: 10000,
        rate: 0.1      
      }

      describe('and a salary of 0', () => {
        const salary = 0

        it('returns 0', () => {
          const taxableAmount = getTaxableAmountForBracket(taxBracket, salary)
          assert.strictEqual(taxableAmount, 0)
        })
      })

      describe('and a salary of 10000', () => {
        const salary = 10000

        it('returns 0', () => {
          const taxableAmount = getTaxableAmountForBracket(taxBracket, salary)
          assert.strictEqual(taxableAmount, 0)
        })
      })

      describe('and a salary of 10001', () => {
        const salary = 10001

        it('returns 1', () => {
          const taxableAmount = getTaxableAmountForBracket(taxBracket, salary)
          assert.strictEqual(taxableAmount, 1)
        })
      })
    })
  })
  describe('Given a taxBracket with a max of 15000', () => {
    const max = 15000
    describe('And a min of 0', () => {
      const taxBracket: ITaxBracket = {
        min: 0,
        max,
        rate: 0.1      
      }

      describe('and a salary of 0', () => {
        const salary = 0

        it('returns 0', () => {
          const taxableAmount = getTaxableAmountForBracket(taxBracket, salary)
          assert.strictEqual(taxableAmount, 0)
        })
      })

      describe('and a salary of 10000', () => {
        const salary = 10000

        it('returns 10000', () => {
          const taxableAmount = getTaxableAmountForBracket(taxBracket, salary)
          assert.strictEqual(taxableAmount, 10000)
        })
      })
    })

    describe('And a min of 10000', () => {
      const taxBracket: ITaxBracket = {
        min: 10000,
        max,
        rate: 0.1      
      }

      describe('and a salary of 0', () => {
        const salary = 0

        it('returns 0', () => {
          const taxableAmount = getTaxableAmountForBracket(taxBracket, salary)
          assert.strictEqual(taxableAmount, 0)
        })
      })

      describe('and a salary of 10000', () => {
        const salary = 10000

        it('returns 0', () => {
          const taxableAmount = getTaxableAmountForBracket(taxBracket, salary)
          assert.strictEqual(taxableAmount, 0)
        })
      })

      describe('and a salary of 10001', () => {
        const salary = 10001

        it('returns 1', () => {
          const taxableAmount = getTaxableAmountForBracket(taxBracket, salary)
          assert.strictEqual(taxableAmount, 1)
        })
      })

      describe('and a salary of 15001', () => {
        const salary = 15001

        it('returns 5000', () => {
          const taxableAmount = getTaxableAmountForBracket(taxBracket, salary)
          assert.strictEqual(taxableAmount, 5000)
        })
      })
    })
  })
})

describe('getSalaryBreakdown', () => {
  describe('Given no taxBrackets', () => {
    const taxBrackets: ITaxBracket[] = []
    describe('And a salary of 10', () => {
      const salary = 10

      const salaryBreakdown = getSalaryBreakdown(taxBrackets, salary)
      it('returns SalaryBreakdown.taxesTotal of 0', () => {
        assert.strictEqual(salaryBreakdown.taxesTotal, 0)
      })

      it('returns SalaryBreakdown.initialSalary equal to salary', () => {
        assert.strictEqual(salaryBreakdown.initialSalary, salary)
      })

      it('returns SalaryBreakdown.finalSalary equal to salary', () => {
        assert.strictEqual(salaryBreakdown.finalSalary, salary)
      })

      it('returns SalaryBreakdown.taxBracketsBreakdown is an empty array', () => {
        assert.strictEqual(salaryBreakdown.taxBracketsBreakdowns.length, 0)
      })
    })
  })

  describe('Given some taxBrackets', () => {
    const taxBrackets: ITaxBracket[] = [
      {
        min: 0,
        max: 5,
        rate: 0.1
      },
      {
        min: 5,
        rate: 0.5
      }
    ]
    describe('And a salary higher than the highest min', () => {
      const salary = 10

      const salaryBreakdown = getSalaryBreakdown(taxBrackets, salary)
      it('returns the correct taxesTotal', () => {
        assert.strictEqual(salaryBreakdown.taxesTotal, 3)
      })

      it('returns initialSalary equal to salary', () => {
        assert.strictEqual(salaryBreakdown.initialSalary, salary)
      })

      it('returns finalSalary equal to salary - taxesTotal', () => {
        assert.strictEqual(salaryBreakdown.finalSalary, 7)
      })

      it('returns a taxBracketBreakdown for each applicable TaxBracket', () => {
        assert.strictEqual(salaryBreakdown.taxBracketsBreakdowns.length, 2)
      })
    })

    describe('And a salary higher than only one of tax brackets mins', () => {
      const salary = 4

      const salaryBreakdown = getSalaryBreakdown(taxBrackets, salary)
      it('returns the correct taxesTotal', () => {
        assert.strictEqual(salaryBreakdown.taxesTotal, 0.4)
      })

      it('returns initialSalary equal to salary', () => {
        assert.strictEqual(salaryBreakdown.initialSalary, salary)
      })

      it('returns finalSalary equal to salary - taxesTotal', () => {
        assert.strictEqual(salaryBreakdown.finalSalary, 3.6)
      })

      it('returns a taxBracketBreakdown for each applicable TaxBracket', () => {
        assert.strictEqual(salaryBreakdown.taxBracketsBreakdowns.length, 1)
      })
    })
  })

  describe('Given some taxBrackets with maxs', () => {
    const taxBrackets: ITaxBracket[] = [
      {
        min: 0,
        max: 5,
        rate: 0.1
      },
      {
        min: 5,
        max: 10,
        rate: 0.5
      }
    ]
    describe('And a salary higher than the highest max', () => {
      const salary = 15

      const salaryBreakdown = getSalaryBreakdown(taxBrackets, salary)
      it('returns the taxesTotal applied only on the salary fitting the taxBrackets', () => {
        assert.strictEqual(salaryBreakdown.taxesTotal, 3)
      })

      it('returns initialSalary equal to salary', () => {
        assert.strictEqual(salaryBreakdown.initialSalary, salary)
      })

      it('returns finalSalary equal to salary - taxesTotal', () => {
        assert.strictEqual(salaryBreakdown.finalSalary, 12)
      })

      it('returns a taxBracketBreakdown for each applicable TaxBracket', () => {
        assert.strictEqual(salaryBreakdown.taxBracketsBreakdowns.length, 2)
      })
    })

    describe('And a salary higher than only one of tax brackets mins', () => {
      const salary = 4

      const salaryBreakdown = getSalaryBreakdown(taxBrackets, salary)
      it('returns the correct taxesTotal', () => {
        assert.strictEqual(salaryBreakdown.taxesTotal, 0.4)
      })

      it('returns initialSalary equal to salary', () => {
        assert.strictEqual(salaryBreakdown.initialSalary, salary)
      })

      it('returns finalSalary equal to salary - taxesTotal', () => {
        assert.strictEqual(salaryBreakdown.finalSalary, 3.6)
      })

      it('returns a taxBracketBreakdown for each applicable TaxBracket', () => {
        assert.strictEqual(salaryBreakdown.taxBracketsBreakdowns.length, 1)
      })
    })
  })
})