import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { URL } from '../../../../Common/api'
import axios from 'axios'
import toast, { LoaderIcon } from 'react-hot-toast'

const MemberShipSuccess = () => {
    const items = localStorage.getItem('MemberShipData')
    const data = JSON.parse(items)
    console.log(data, 'resp');
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('data')) {
            // navigate()
        }

        postingData()
    }, [])
    const postingData = async () => {
        console.log(data, 'posting data');

        const response = await axios.post(`${URL}/payment/subscription/save`, data)
        console.log(response, 'save payment response');
        localStorage.removeItem('data')
        toast.success('Payment Success')
        navigate(`/teacherView/${data.instructorId.teacherId}`)
    }
    return (
        <div className='flex justify-center items-center'>
                <LoaderIcon/>
        </div>
    )
}

export default MemberShipSuccess
