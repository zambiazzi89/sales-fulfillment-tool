import React, { createRef, useEffect, useRef, useState } from 'react'
import './_InputSuggestions.scss'

const InputSuggestions = ({
  placeholder,
  optionArray,
  widthValue,
  search,
  setSearch,
  setSelectedOption,
}) => {
  const [display, setDisplay] = useState(false)
  const wrapperRef = useRef(null)
  const inputRef = useRef(false)

  // Creates optionRef where current is an array of "current: null" for each option
  const optionRefs = useRef(optionArray.map(createRef))
  // Defines "options" as the array created above
  // "current" values will be populated when wrapper is rendered
  const { current: options } = optionRefs

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  })

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false)
    }
  }

  const handleClickInput = () => {
    setDisplay(true)
    setSearch('')
  }

  const handleClickOption = (e) => {
    updateSearch(e.target.innerText)
    setSelectedOption(e.target.innerText)
  }

  const handlePressKey = (e) => {
    const { current: wrap } = wrapperRef
    if (wrap && e.code === 'Escape') {
      setDisplay(false)
    } else if (wrap && e.code === 'ArrowDown') {
      e.preventDefault() // Prevents div from scrolling every time
      if (e.target === inputRef.current && options[0].current) {
        options[0].current.focus()
      } else if (e.target.nextSibling) {
        e.target.nextSibling.focus()
      }
    } else if (wrap && e.code === 'ArrowUp') {
      e.preventDefault()
      if (e.target.previousSibling) {
        e.target.previousSibling.focus()
      } else {
        inputRef.current.focus()
      }
    } else if (wrap && (e.code === 'Enter' || e.key === 'Enter')) {
      if (e.target === inputRef.current) {
        updateSearch(e.target.defaultValue.toUpperCase())
        setSelectedOption(e.target.defaultValue.toUpperCase())
      } else {
        updateSearch(e.target.innerText)
        setSelectedOption(e.target.innerText)
      }
    }
  }

  const updateSearch = (opt) => {
    setSearch(opt)
    setDisplay(false)
  }

  const handleInputChange = (e) => {
    if (!display) {
      setDisplay(true)
    }
    setSearch(e.target.value)
  }

  return (
    <div
      ref={wrapperRef}
      className="flex-container"
      onKeyDown={handlePressKey}
      style={{ width: widthValue }}
    >
      <input
        autoComplete="off"
        ref={inputRef}
        className="input-with-suggestions"
        placeholder={placeholder}
        value={search}
        onClick={handleClickInput}
        onChange={(e) => handleInputChange(e)}
        style={{ width: widthValue }}
      />
      {display && (
        <div className="suggestion-container" style={{ width: widthValue }}>
          {optionArray
            .filter(
              (option) =>
                option.toLowerCase().indexOf(search.toLowerCase()) > -1
            )
            .map((option, i) => {
              return (
                <div
                  ref={optionRefs.current[i]}
                  onClick={(e) => handleClickOption(e)}
                  className="option"
                  key={option}
                  tabIndex="0"
                >
                  <span>{option}</span>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default InputSuggestions
