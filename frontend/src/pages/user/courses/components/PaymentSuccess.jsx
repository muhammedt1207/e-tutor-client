import React, { useEffect } from 'react'
import paymentSuccessImg from '../../../../assets/paymentSuccess.jpg'
import { useNavigate } from 'react-router-dom'
import { URL } from '../../../../Common/api'
import axios from 'axios'
const PaymentSuccess = () => {
    const items=localStorage.getItem('data')
    const data=JSON.parse(items)
    console.log(data,'resp');
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('data')) {
            // navigate()
        }
        
        const postingData = async() => {
            console.log(data,'posting data');
            const response=await axios.post(`${URL}/payment/savePayment`,data)
            console.log(response,'save payment response');
            localStorage.removeItem('data')
        }
        postingData()
    },[])
    return (
        <div className='flex flex-col justify-center items-center'>

            <img className='w-1/4' src={paymentSuccessImg} alt="" />
            <h1 className='text-5xl font-semibold text-green-600'>Payment Done</h1>
            <button className='bg-orange-400 py-2 px-8 mt-10 text-white rounded-lg'>View Course</button>
        </div>
    )
}

export default PaymentSuccess
