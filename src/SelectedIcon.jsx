import './App.css'
import IconPicker from './IconPicker'
import React from 'react'
export const iconSelectorFunction = (iconPath) => {
    return iconPath;
}
function App() {
  const iconPath = iconSelectorFunction();
  return (
    <>
      {iconPath && <img src={iconPath} alt='icon'/> || 'No icon selected'}
    </>
  )
}

export default App
