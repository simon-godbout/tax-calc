import React from 'react'
import { ISalaryBreakdown } from '../models/ISalaryBreakdown'
import { Card, ListGroup } from 'react-bootstrap'

interface ISalaryBreakdownProps {
  salaryBreakdown: ISalaryBreakdown
}

export const SalaryBreakdown:React.FC<ISalaryBreakdownProps> = (props: ISalaryBreakdownProps) => {
  const { salaryBreakdown } = props
  return (
    <Card className='px-3 py-2'>
      <Card.Title>
        Salary / Taxes Breakdown
      </Card.Title>
      <Card.Body>
        <h4>Initial Salary: {salaryBreakdown.initialSalary.toFixed(2)}$</h4>
        <ListGroup>
          {salaryBreakdown.taxBracketsBreakdowns.map((taxBracketBreakdown, index) => (
            <ListGroup.Item>
              <strong>Tax bracket #{index + 1}:</strong><br/>
              Starts at: {taxBracketBreakdown.min}$<br/>
              {taxBracketBreakdown.max && `ends at: ${taxBracketBreakdown.max}$`}<br/>
              Tax rate: {((taxBracketBreakdown.rate * 100).toFixed(2))}%<br/>
              <strong>Taxes: {taxBracketBreakdown.amount.toFixed(2)}$</strong>
            </ListGroup.Item>
          ))}
          <ListGroup.Item>
            <h5>Total taxes: {salaryBreakdown.taxesTotal.toFixed(2)}$</h5>
          </ListGroup.Item>
          <ListGroup.Item>
            <h4>Final Salary: {salaryBreakdown.finalSalary.toFixed(2)}$</h4>

          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  )
}