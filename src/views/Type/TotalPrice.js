import React, {useRef} from 'react'
import { ECharts } from 'echarts'


export default function TotalPrice() {
  let refDiv = useRef()
  
  return (
    <div ref={refDiv}></div>
  )
}
