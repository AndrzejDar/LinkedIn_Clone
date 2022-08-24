import React from 'react'

const OptionDropdown = ({label, options}) => {
  return (
    <div className='dropdown'>
        <label>
            {label}
        <select>
            {options.map((option)=>(
                <option value={option.value}>{option.label}</option>
            ))}
        </select>
        </label>
    </div>
  )
}

export default OptionDropdown