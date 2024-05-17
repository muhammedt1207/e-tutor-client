import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMenu, AiOutlinePlus, AiOutlineUpload } from "react-icons/ai";
import GoogleDrivePicker from 'react-google-drive-picker';
import VideoUpload from "../../../util/VideoUploed";
import toast from "react-hot-toast";

const AddCurriculum = ({onNext}) => {
    // State variables
    const [sections, setSections] = useState([{ name: '', lectures: [] }]);
    const [newSectionName, setNewSectionName] = useState('');
    const [lectureTitles, setLectureTitles] = useState([['']]);
    const [newLectureVideo, setNewLectureVideo] = useState(null);
    const [uploadProgress, setUploadProgress] = useState({});
    const [videoUrls, setVideoUrls] = useState({});

    const handleAddSection = () => {
        const newSection = { title: '', SubLesson: [] };
        setSections([...sections, newSection]);

        setNewSectionName('');
        setLectureTitles([...lectureTitles, '']);
    };


const handleAddLecture = (sectionIndex) => {
    const updatedSections = [...sections];
    const updatedLectureTitles = [...lectureTitles];
    if (updatedSections[sectionIndex] && updatedSections[sectionIndex].lectures) {
        const newLectureTitle = `Lecture ${updatedSections[sectionIndex].lectures.length + 1}`;
        updatedLectureTitles[sectionIndex] = newLectureTitle;
        const newLecture = { title: newLectureTitle, videoUrl: null }; 
        updatedSections[sectionIndex].lectures.push(newLecture);
        setSections(updatedSections);
        setLectureTitles(updatedLectureTitles);
        setNewLectureVideo(null);
    } else {
        console.error('Invalid section index or structure:', sectionIndex, updatedSections);
    }
};

useEffect(()=>{
    console.log(sections,'...........,...**********');
},[sections])

const handleUploadVideo = async (sectionIndex, lectureIndex) => {
    const videoUrl = await VideoUpload(newLectureVideo.file);
    if (!videoUrl) {
        toast.error("Can't upload video");
        return;
    }
    const updatedSections = [...sections];
    updatedSections[sectionIndex].lectures[lectureIndex].videoUrl = videoUrl; 
    setSections(updatedSections);
    toast.success('Video uploaded');
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

    // const handleUploadVideo = async (sectionIndex, lectureIndex) => {
    //     const videoUrl=await VideoUpload(newLectureVideo.file)
    //     if(!videoUrl){
    //         toast.error("can't uplaod video")
    //         return
    //     }
    //     setNewLectureVideo(videoUrl)
    //     setVideoUrls(prevUrls => ({
    //         ...prevUrls,
    //         [`${sectionIndex}_${lectureIndex}`]: videoUrl,
    //     }));
    //     toast.success('video upload')
    //     console.log(sections,'ddddddddddddddddddddddddddkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    // };

    const handleUpload = () => {
        console.log('Uploaded file:', sections);
        onNext(sections)
    };

    return (
        <>
        <div className='flex justify-center items-center lg:ml-46 ml-52 p-16 pe-10 '>
            <div className='w-full h-1/2 ps-10 pe-10 '>
                <h1 className='text-2xl font-semibold'>Course Curriculum</h1>
                <hr />
                {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="flex justify-between flex-col border mt-10">
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
                                <div key={lectureIndex} className='ps-10 p-4 flex items-center space-x-8 '>
                                    <AiOutlineMenu />
                                    <input
                                    
                                        type="text"
                                        onChange={(e) => handleTitleChange(e, sectionIndex, lectureIndex)}
                                        placeholder="Enter title"
                                    />
                                    <input className="" type="file" onChange={(e) => handleVideoChange(e, sectionIndex, lectureIndex)} />
                                    <button type="button" className="flex bg-orange-100 p-2" onClick={() => handleUploadVideo(sectionIndex, lectureIndex)}>Upload Video <AiOutlineUpload className="ml-2 text-2xl" /></button>
                                    {videoUrls[`${sectionIndex}_${lectureIndex}`] && (
                                        <video src={videoUrls[`${sectionIndex}_${lectureIndex}`]} controls />
                                    )}
                                
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="flex justify-center">
                    <button className="p-2 mt-8 bg-orange-100 text-orange-600 w-full" onClick={handleAddSection}>Add Section</button>
                </div>
            </div>
        </div>
        <div className="flex items-end justify-end px-20 -mt-10">

            <button onClick={handleUpload} className="p-2 bg-orange-500 text-white mt-6 flex items-end">Create Course</button>
        </div>
        </>
    );
};

export default AddCurriculum;