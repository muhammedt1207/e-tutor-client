import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../../../Common/api';
import axios from 'axios';
import toast, { LoaderIcon } from 'react-hot-toast';

const MemberShipSuccess = () => {
    const items = localStorage.getItem('MemberShipData');
    const data = JSON.parse(items);
    console.log(data, 'resp');
    const navigate = useNavigate();
    const [isPosted, setIsPosted] = useState(false);
    const [isPosting, setIsPosting] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('MemberShipData')) {
            navigate('/teachers');  
            return;
        }

        if (!isPosted && !isPosting) {
            postingData();
        }
    }, [isPosted, isPosting]);

    const postingData = async () => {
        setIsPosting(true);
        console.log(data, 'posting data');
        try {
            const response = await axios.post(`${URL}/payment/subscription/save`, data);
            console.log(response, 'save payment response');
            localStorage.removeItem('MemberShipData');
            toast.success('Payment Success');
            navigate(`/teachers`);
        } catch (error) {
            console.error('Error posting data:', error);
            toast.error('Error processing payment.');
        } finally {
            setIsPosted(true);
            setIsPosting(false);
        }
    };

    return (
        <div className='flex justify-center items-center'>
            <LoaderIcon />
        </div>
    );
}

export default MemberShipSuccess;
