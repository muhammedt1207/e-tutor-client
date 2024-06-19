import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { URL } from '../../../../Common/api';

const ProfileCard = ({ instructordInformations }) => {
    const [instrocterData, setInstrocterData] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(instructordInformations, 'id ');
                if (instructordInformations) {
                    const detailsOfInstructers = await axios.get(`${URL}/auth//findUser/${instructordInformations.email}`)
                    const data = {
                        ...instructordInformations, ...detailsOfInstructers.data.data
                    }
                    setInstrocterData(data)
                } else {
                    console.log('cant find the instrucoter data');
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [instructordInformations])
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center">
                <img src={instrocterData.profileImageUrl || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} alt="Profile" className="rounded-full w-24 h-24 object-cover" />
            </div>
            <div className="text-center mt-4">
                <h2 className="text-xl font-semibold">{instrocterData.userName}</h2>
                <p className="text-gray-600">{instrocterData.profession}</p>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
                {/* <a href="#" className="text-orange-500"><FaFacebookF /></a>
                <a href="#" className="text-orange-500"><FaTwitter /></a>
                <a href="#" className="text-orange-500"><FaInstagram /></a> */}
                {instrocterData.githubLink && <a href={instrocterData.githubLink} className="text-orange-500"><FaGithub /></a>}
                {instrocterData.linkedinLink && <a href={instrocterData.linkedinLink} className="text-orange-500"><FaLinkedinIn /></a>}
            </div>
            <div className="mt-4 text-center">
                <div className="flex justify-center items-center space-x-2">
                    <span className="text-orange-500"><i className="fas fa-book"></i></span>
                    <span>{instrocterData.totalCourses} Courses</span>
                </div>
                <div className="flex justify-center items-center space-x-2 mt-2">
                    <span className="text-orange-500"><i className="fas fa-users"></i></span>
                    <span>8 Students Enrolled</span>
                </div>
                <div className="flex justify-center items-center space-x-2 mt-2">
                    <span className="text-orange-500"><i className="fas fa-star"></i></span>
                    <span>{instructordInformations.totalStudents} Students</span>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="font-semibold">About Me</h3>
                <p className="text-gray-600 text-sm">{instrocterData.profileDescription}</p>
            </div>
        </div>
    );
};

export default ProfileCard;
