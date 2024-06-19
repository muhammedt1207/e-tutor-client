import React, { useState, useEffect } from 'react';
import TeachesListCard from './components/TeachesListCard';
import { URL } from '../../../Common/api';
import axios from 'axios';

const TeachersList = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get(`${URL}/user/acceptedInstructor`);
                const instructors = response.data.data;

                const instructorEmails = instructors.map(instructor => instructor.email);

                const detailedResponse = await axios.post(`${URL}/auth/getUsers`, { userIds: instructorEmails });
               console.log(detailedResponse.data.data,'---');
                const detailedInstructors = detailedResponse.data.data;

                const combinedData = instructors.map(instructor => {
                    const detailedInstructor = detailedInstructors.find(detail => detail.email === instructor.email);
                    return { ...detailedInstructor, ...instructor };
                });

                setTeachers(combinedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, []);

    return (
        <div>
            <div className="bg-slate-200 p-8">
                <h1 className="text-center text-3xl font-medium">
                    Our Instructors
                </h1>
            </div>
            <div className="flex flex-wrap justify-center items-start">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && teachers.map(teacher => (
                    <TeachesListCard key={teacher.id} teacher={teacher} />
                ))}
            </div>
        </div>
    );
};

export default TeachersList;
