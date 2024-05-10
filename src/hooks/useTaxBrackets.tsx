import React from 'react'
import { ITaxBracket } from '../models/ITaxBracket'

export const useTaxBrackets = (options: { cacheFirst?: boolean}): [
    Record<number, ITaxBracket[]>,
    boolean,
    string | undefined,
    (year: number) => void,
  ] => {
  const { cacheFirst = true } = options
  const [taxBrackets, setTaxBrackets] = React.useState<Record<number, ITaxBracket[]>>({})
  const [loading, setLoading] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined)

  const fetchTaxBracketsByYear = async (year: number) => {
    setErrorMessage(undefined)
    if (cacheFirst && !!taxBrackets[year]) return taxBrackets[year]
    try {
      setLoading(true)
      
      const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/tax-calculator/tax-year/${year}`)
      const responseBody = await response.json()

      if (response.status !== 200) throw new Error(responseBody?.errors[0]?.message)

      const { tax_brackets: yearTaxBrackets } = responseBody
      
      setTaxBrackets({ ...taxBrackets, [year]: yearTaxBrackets})
      setLoading(false)
    } catch(error) {
      setErrorMessage(`An error occured when getting tax brackets for ${year}`)
      console.error(error)
      setLoading(false)
    }
  }

  return [taxBrackets, loading, errorMessage, fetchTaxBracketsByYear]


}