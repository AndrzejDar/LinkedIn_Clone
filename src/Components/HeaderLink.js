import React from 'react'
import { useState } from 'react'
import OptionModal from './OptionModal'
import { FaCaretDown } from 'react-icons/fa'

const HeaderLink = ({graphic,label, target, dropdown=false,options}) => {
    const [optionsOpen, setOptionsOpen] = useState(false);
  return (
    <div className='header_menu-link' onClick={()=>{setOptionsOpen(!optionsOpen)}}
    tabIndex="0"
    onBlur={()=>{setOptionsOpen(false)}}
    >
        {graphic}
        <span>
            {label}
            {dropdown?<FaCaretDown />:''}</span>
        {dropdown?<OptionModal open={optionsOpen} options={options} />:''}
        </div>
  )
}

export default HeaderLink