import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import GoogleDrivePicker from 'react-google-drive-picker';

const AddCurriculum = () => {
    // State variables
    const [sections, setSections] = useState([{ name: '', lectures: [] }]);
    const [newSectionName, setNewSectionName] = useState('');
    const [lectureTitles, setLectureTitles] = useState([['']]);
    const [newLectureVideo, setNewLectureVideo] = useState(null);
    const [uploadProgress, setUploadProgress] = useState({});
    const [videoUrls, setVideoUrls] = useState({});

    // Function to handle section addition
    const handleAddSection = () => {
        // Add a new section
        const newSection = { name: '', lectures: [] };
        setSections([...sections, newSection]);

        // Reset section name and lecture titles
        setNewSectionName('');
        setLectureTitles([...lectureTitles, '']);
    };

    // Function to handle adding a new lecture
    const handleAddLecture = (sectionIndex) => {
        // Add a new lecture to the specified section
        const updatedSections = [...sections];
        const updatedLectureTitles = [...lectureTitles];
        if (updatedSections[sectionIndex] && updatedSections[sectionIndex].lectures) {
            const newLectureTitle = `Lecture ${updatedSections[sectionIndex].lectures.length + 1}`;
            updatedLectureTitles[sectionIndex] = newLectureTitle;
            const newLecture = { title: newLectureTitle, video: null };
            updatedSections[sectionIndex].lectures.push(newLecture);
            setSections(updatedSections);
            setLectureTitles(updatedLectureTitles);
            setNewLectureVideo(null);
        } else {
            console.error('Invalid section index or structure:', sectionIndex, updatedSections);
        }
    };

    const handleTitleChange = (e, sectionIndex, lectureIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].lectures[lectureIndex].title = e.target.value;
        setSections(updatedSections);
    };

    const handleSectionNameChange = (e, sectionIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].name = e.target.value;
        setSections(updatedSections);
    };

    const handleVideoChange = (e, sectionIndex, lectureIndex) => {
        setNewLectureVideo({ file: e.target.files[0], sectionIndex, lectureIndex });
    };

    const handleUploadVideo = async (sectionIndex, lectureIndex) => {
        // Handle video upload
    };

    const handleUpload = (data, sectionIndex, lectureIndex) => {
        console.log('Uploaded file:', data);
        setVideoUrls(prevUrls => ({
            ...prevUrls,
            [`${sectionIndex}_${lectureIndex}`]: data.url,
        }));
    };

    return (
        <div className='flex justify-center items-center lg:ml-46 ml-52 p-16 pe-10 '>
            <div className='w-full h-1/2 ps-10 pe-10 border'>
                <h1 className='text-2xl font-semibold'>Course Curriculum</h1>
                <hr />
                {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="flex justify-between flex-col border">
                        <div className='flex justify-between'>
                            <div className='pt-6 flex space-x-4'>
                                <h1 className='ps-10 flex items-center'><AiOutlineMenu />Section {sectionIndex + 1}:</h1>
                                <input
                                    type="text"
                                    value={section.name}
                                    onChange={(e) => handleSectionNameChange(e, sectionIndex)}
                                    placeholder="Enter section name"
                                />
                            </div>
                            <div className='flex pt-6 px-10 space-x-5'>
                                <h1 className=' text-xl' onClick={() => handleAddLecture(sectionIndex)}><AiOutlinePlus /></h1>
                                <p className=' text-xl'><AiOutlineEdit /></p>
                                <p className=' text-xl'><AiOutlineDelete /></p>
                            </div>
                        </div>
                        <div className='border  p-5'>
                            {section.lectures.map((lecture, lectureIndex) => (
                                <div key={lectureIndex} className='ps-10 p-4 flex items-center'>
                                    <AiOutlineMenu />{lecture.title}:
                                    <input
                                        type="text"
                                        onChange={(e) => handleTitleChange(e, sectionIndex, lectureIndex)}
                                        placeholder="Enter title"
                                    />
                                    <input type="file" onChange={(e) => handleVideoChange(e, sectionIndex, lectureIndex)} />
                                    <button onClick={() => handleUploadVideo(sectionIndex, lectureIndex)}>Upload Video</button>
                                    {videoUrls[`${sectionIndex}_${lectureIndex}`] && (
                                        <video src={videoUrls[`${sectionIndex}_${lectureIndex}`]} controls />
                                    )}
                                    <GoogleDrivePicker
                                        clientId="AIzaSyCveKYMIW-Q5Zqo9KN4hOTNUgiIpwXMvZc"
                                        developerKey="AIzaSyCveKYMIW-Q5Zqo9KN4hOTNUgiIpwXMvZc"
                                        scope={['https://www.googleapis.com/auth/drive']}
                                        onChange={(data) => handleUpload(data, sectionIndex, lectureIndex)}
                                        onAuthenticate={(token) => console.log('Authenticated:', token)}
                                        onError={(error) => console.error('Error:', error)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="flex justify-center">
                    <button className="p-2 mt-8 bg-orange-500 w-full" onClick={handleAddSection}>Add Section</button>
                </div>
            </div>
        </div>
    );
};

export default AddCurriculum;