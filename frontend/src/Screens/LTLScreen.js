import React, { useEffect, useState } from 'react'
import '../Styles/_LTLScreen.scss'
import InputSuggestions from '../Components/InputSuggestions'
import { useDispatch, useSelector } from 'react-redux'
import { listLTL } from '../Actions/LTLActions'

const complexStates = ['NY', 'PA', 'TX']

const LTLScreen = ({ match }) => {
  const [LTLsearch, setLTLSearch] = useState('')
  const [pallets, setPallets] = useState(1)
  const [oregonCity, setOregonCity] = useState('Eugene')
  const [zipCode, setZipCode] = useState('')
  const [stateRegion, setStateRegion] = useState('')
  const [valueLevel, setValueLevel] = useState(0)
  const [selectedState, setSelectedState] = useState('')
  const [stateRegionOrCity, setStateRegionOrCity] = useState('')
  const [selectedLTLCost, setSelectedLTLCost] = useState(null)
  const [fiftySelected, setFiftySelected] = useState(false)

  const dispatch = useDispatch()

  const LTLList = useSelector((state) => state.LTLList)
  const { loading, error, data } = LTLList

  useEffect(() => {
    dispatch(listLTL())
  }, [dispatch, match])

  useEffect(() => {
    if (LTLsearch && LTLsearch === 'OR' && oregonCity) {
      setSelectedState('OR')
      setStateRegionOrCity(oregonCity)
      setSelectedLTLCost(
        // Solves JS's floating point multiplication precision issue
        Math.round(data.LTL.OR[oregonCity][valueLevel] * pallets * 100) / 100
      )
    } else if (LTLsearch && complexStates.includes(LTLsearch) && stateRegion) {
      setSelectedState(LTLsearch)
      setStateRegionOrCity(stateRegion)
      setSelectedLTLCost(
        Math.round(
          data.LTL[LTLsearch][stateRegion].values[valueLevel] * pallets * 100
        ) / 100
      )
    } else if (
      Object.keys(data.LTL).includes(LTLsearch) &&
      !complexStates.includes(LTLsearch)
    ) {
      setSelectedState(LTLsearch)
      setStateRegionOrCity('')
      setSelectedLTLCost(
        Math.round(data.LTL[LTLsearch][valueLevel] * pallets * 100) / 100
      )
    } else {
      setSelectedState('')
      setStateRegionOrCity('')
      setSelectedLTLCost(null)
    }
  }, [LTLsearch, oregonCity, pallets, stateRegion, valueLevel, data])

  useEffect(() => {
    if (data.LTL) {
      if (complexStates.includes(LTLsearch)) {
        if (
          data.LTL[LTLsearch][
            Object.keys(data.LTL[LTLsearch])[0] // First key
          ].zipCodes.includes(parseInt(zipCode))
        ) {
          setStateRegion(Object.keys(data.LTL[LTLsearch])[0])
        } else if (
          data.LTL[LTLsearch][
            Object.keys(data.LTL[LTLsearch])[1] // Second key
          ].zipCodes.includes(parseInt(zipCode))
        ) {
          setStateRegion(Object.keys(data.LTL[LTLsearch])[1])
        } else {
          setStateRegion('')
        }
      }
    }
  }, [zipCode, LTLsearch, data])

  useEffect(() => {
    setStateRegion('')
    setStateRegionOrCity('')
    setZipCode('')
  }, [LTLsearch])

  const handlePalletChange = (eValue) => {
    if (!isNaN(eValue)) {
      setPallets(eValue)
      if (eValue === 1) {
        setValueLevel(0)
      } else if (eValue >= 2 && eValue <= 3) {
        setValueLevel(1)
      } else if (eValue >= 4 && eValue <= 8) {
        setValueLevel(2)
      } else if (eValue >= 9 && eValue <= 13) {
        setValueLevel(3)
      }
    }
  }

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="ltl-container">
      <div className="ltl-title">LTL Calculator</div>
      <div className="ltl-form">
        <div className="ltl-select-state">
          <label>Select a State</label>
          <InputSuggestions
            optionArray={Object.keys(data.LTL)}
            widthValue="100px"
            placeholder="State"
            search={LTLsearch}
            setSearch={setLTLSearch}
            setSelectedOption={setLTLSearch}
          />
        </div>
        {LTLsearch === 'OR' && (
          <div className="oregon-container">
            Please select a city
            <select
              id="oregon"
              name="oregon"
              value={oregonCity}
              onChange={(e) => setOregonCity(e.target.value)}
            >
              <option key="Eugene" value="Eugene">
                Eugene
              </option>
              <option key="Portland" value="Portland">
                Portland
              </option>
            </select>
          </div>
        )}
        {complexStates.includes(LTLsearch) && (
          <div className="zip-code">
            {`Zip Code (first 3 digits)`}
            <input
              name="zip-code-input"
              placeholder="Enter a Number"
              type="text"
              pattern="[0-9]{3}"
              maxLength={3}
              min={1}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/, ''))} // Input only accepts digits [0-9]
            />
          </div>
        )}
        <div className="pallet-number">
          <div>Number of Pallets</div>
          <input
            name="pallet-number-input"
            placeholder="Enter a Number"
            type="number"
            min="1"
            max="13"
            value={pallets}
            onChange={(e) => handlePalletChange(parseInt(e.target.value))}
          />
        </div>
        <div className="fifty-container">
          50%
          <input
            name="fifty-checkbox"
            type="checkbox"
            id="fifty-checkbox"
            onChange={(e) => setFiftySelected(e.target.checked)}
          />
        </div>
        {selectedState && (
          <div className="ltl-results">
            <div className="md-bold">RESULTS</div>
            <div className="ltl-results-container">
              <div className="ltl-results-col1 sm-bold">STATE</div>
              <div className="ltl-results-col2">
                {selectedState} {stateRegionOrCity && `(${stateRegionOrCity})`}
              </div>
            </div>
            <div className="ltl-results-container">
              <div className="ltl-results-col1 sm-bold">PALLETS</div>
              <div className="ltl-results-col2">{pallets}</div>
            </div>
            <div className="ltl-results-container">
              <div className="ltl-results-col1 sm-bold">LTL</div>
              <div className="ltl-results-col2">{selectedLTLCost}</div>
            </div>

            {fiftySelected ? (
              <div className="ltl-results-container">
                <div className="ltl-results-col1 sm-bold">+61% +50%</div>
                <div className="ltl-results-col2">
                  {Math.ceil(selectedLTLCost * 1.61 * 1.5)}
                </div>
              </div>
            ) : (
              <div className="ltl-results-container">
                <div className="ltl-results-col1 sm-bold">+61%</div>
                <div className="ltl-results-col2">
                  {Math.ceil(selectedLTLCost * 1.61)}
                </div>
              </div>
            )}
            <div className="ltl-results-container">
              <div className="ltl-results-col1 sm-bold">3PL</div>
              <div className="ltl-results-col2">{data.threePL * pallets}</div>
            </div>
            <div className="ltl-results-container">
              <div className="ltl-results-col1 sm-bold">TOTAL</div>
              <div className="ltl-results-col2">
                {fiftySelected ? (
                  <div>
                    ${' '}
                    {Math.ceil(selectedLTLCost * 1.61 * 1.5) +
                      data.threePL * pallets}
                  </div>
                ) : (
                  <div>
                    ${' '}
                    {Math.ceil(selectedLTLCost * 1.61) + data.threePL * pallets}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LTLScreen
