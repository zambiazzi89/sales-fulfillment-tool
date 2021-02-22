import React, { useEffect, useState, useRef } from 'react'
import '../Styles/_LbsToCases.scss'

const LbsToCases = ({ lbsPerCase, casePerPallet }) => {
  const [numLbs, setNumLbs] = useState('')
  const [numCases, setNumCases] = useState(0)
  const [numPallets, setNumPallets] = useState(0)
  const inputRef = useRef()

  // Focus on input when component first renders
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  // Resets values when component unmounts (clean up)
  useEffect(() => {
    return () => {
      setNumLbs('')
      setNumCases(0)
      setNumPallets(0)
    }
  }, [lbsPerCase, casePerPallet])

  const fixDecimals = (num) => {
    if (num) {
      num = Number(num)
      if (!Number.isInteger(num)) {
        num = num.toFixed(2)
      }
    }
    return num
  }

  const handleLbsChange = (e) => {
    let lbs = e.target.value.replace(/\D/, '') // Input only accepts digits [0-9]
    let cases = fixDecimals(lbs / lbsPerCase)
    let pallets = fixDecimals(lbs / lbsPerCase / casePerPallet)
    setNumLbs(lbs)
    setNumCases(cases)
    setNumPallets(pallets)
  }

  const handleCaseChange = (e) => {
    let cases = fixDecimals(e.target.value)
    let lbs = fixDecimals(cases * lbsPerCase)
    let pallets = fixDecimals(cases / casePerPallet)
    setNumCases(cases)
    setNumLbs(lbs)
    setNumPallets(pallets)
  }

  const handlePalletChange = (e) => {
    let pallets = fixDecimals(e.target.value)
    let cases = fixDecimals(pallets * casePerPallet)
    let lbs = fixDecimals(pallets * casePerPallet * lbsPerCase)
    setNumPallets(pallets)
    setNumCases(cases)
    setNumLbs(lbs)
  }

  return (
    <div className="lbs-to-cases-container">
      <div>
        <input
          ref={inputRef}
          autoComplete="off"
          id="lbs-to-cases-input"
          placeholder="Type a value"
          value={numLbs}
          onChange={(e) => handleLbsChange(e)}
        />
        Lbs
      </div>
      <div className="input-and-warning">
        <input
          autoComplete="off"
          type="number"
          min={0}
          id="numcases-input"
          placeholder="Type a value"
          value={numCases}
          onChange={(e) => handleCaseChange(e)}
        />
        Cases
        {!Number.isInteger(numCases) && (
          <div className="danger sm-bold">Not Full Case Quantity!</div>
        )}
      </div>
      <div className="input-and-warning">
        <input
          autoComplete="off"
          type="number"
          min={0}
          id="numpallets-input"
          placeholder="Type a value"
          value={numPallets}
          onChange={(e) => handlePalletChange(e)}
          maxLength={4}
        />
        Pallets
        {!Number.isInteger(numPallets) && (
          <div className="danger sm-bold">Not Full Pallet Quantity!</div>
        )}
      </div>
    </div>
  )
}

export default LbsToCases
