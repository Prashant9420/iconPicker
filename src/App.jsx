import './App.css'
import IconPicker from './IconPicker'
import React from 'react'
function App() {
  const [icon, setIcon] = React.useState({
    iconPath: '',
    iconHeight: 24,
    iconWidth: 24,
  })
  return (
    <>
    <div id='iconContainer'>
      {icon.path && <img src={icon.path} style={{width:icon.iconWidth,height:icon.iconHeight}} alt='icon'/> || 'No icon selected'}
    </div>
      <IconPicker
        columnsInOnePage = {5}
        rowsInOnePage = {5}
        iconHeight = {24}
        iconWidth = {24}
        pickerHeight={100}
        pickerWidth={100}   
        setterFunction = {setIcon}
      />
    </>
  )
}

export default App
