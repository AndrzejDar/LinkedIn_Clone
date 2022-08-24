import React from 'react';
import './OptionModal.scss';

const OptionModal = ({open, options}) => {
  return (
    <div className='optionModal' style={!open?{display: 'none'}:{}}>

        {options.map((option, id)=>(
            <div key={id} className="optionModal-option disabled" onClick={option.action} >{option.label}</div>
        ))}
        
    </div>
  )
}

export default OptionModal