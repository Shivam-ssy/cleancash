import React, { useEffect } from 'react'
import PollutionReportsTable from '../components/PollutionReportsTable'
import axiosInstance from '../config/axiosInstance'

function UserDashBoard() {
    const [data, setData] = React.useState([])
   useEffect(()=>{
    const get= async()=>{
        const res=await axiosInstance.get('/report/get-report-by-user')
        console.log(res.data.data);
        
        setData(res.data.data)
    }
    get()
   },[])
  return (
    <div className="container mx-auto px-4 py-8">
      <PollutionReportsTable reports={data} />
    </div>
  )
}

export default UserDashBoard
