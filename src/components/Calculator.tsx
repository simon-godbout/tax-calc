import React from 'react'
import { Col, Container, Form, Row, Spinner, Toast } from 'react-bootstrap'

import { useTaxBrackets } from '../hooks/useTaxBrackets'
import { getSalaryBreakdown } from '../utils/getSalaryBreakdown'
import { useTaxYears } from '../hooks/useTaxYears'
import { SalaryBreakdown } from './SalaryBreakdown'

export const Calculator: React.FC = () => {
  const [
    taxBrackets,
    loading,
    errorMessage,
    fetchTaxBracketsByYear,
  ] = useTaxBrackets({})
  const [yearlySalary, setYearlySalary] = React.useState<number>(0)
  const [year, setYear] = React.useState<number | undefined>(undefined)
  const taxYears = useTaxYears()

  const onYearChange = async (year: number) => {
    await fetchTaxBracketsByYear(year)
    setYear(year)
  }

  const salaryBreakdown = year && taxBrackets[year] && getSalaryBreakdown(taxBrackets[year], yearlySalary)

  return (
    <Container className='py-4'>
      <Row>
        <Col>
          <Form>
            <Form.Group className='mb-2'>
              <Form.Label htmlFor='yearly-salary'>Yearly salary: </Form.Label>
              <Form.Control id='yearly-salary' type='number' min={0} onChange={(input) => setYearlySalary(+input.target.value)} value={yearlySalary}/>
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label htmlFor='year'>Taxation year: </Form.Label>
              <Form.Select id='year' onChange={(input) => onYearChange(+input.target.value) } value={year}>
                <option>-- Select a year --</option>
                {taxYears.map(year => <option key={year} value={year}>{year}</option>)}
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>
        <Col className='pt-4'>
          {loading &&     
            <div className='text-center'>
              <Spinner animation='border' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </Spinner>
            </div>
          }
          {errorMessage && (
            <Toast bg='danger'>
              <Toast.Body>
                {errorMessage}
              </Toast.Body>
            </Toast>
          )}
          {salaryBreakdown && !loading && <SalaryBreakdown salaryBreakdown={salaryBreakdown} />}
        </Col>
      </Row>
    </Container>
  )
}