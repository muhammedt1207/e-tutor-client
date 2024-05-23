import React, { useEffect, useState, useRef } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMenu, AiOutlinePlus, AiOutlineUpload } from "react-icons/ai";
import toast from "react-hot-toast";
import VideoUpload from "../../../util/VideoUploed";

const AddCurriculum = ({ onNext, initialData }) => {
    console.log(initialData,'initial data in add curriculam');
    const [sections, setSections] = useState(initialData.sections || [{ title: '', SubLesson: [] }]);
    const [uploadProgress, setUploadProgress] = useState({});
    const [videoUrls, setVideoUrls] = useState({});
    const fileInputRef = useRef(null);
    const [currentUpload, setCurrentUpload] = useState({ sectionIndex: null, SubLessonIndex: null });

    const handleAddSection = () => {
        const newSection = { title: '', SubLesson: [] };
        setSections([...sections, newSection]);
    };

    const handleDeleteSection = (sectionIndex) => {
        const updatedSections = sections.filter((_, index) => index !== sectionIndex);
        setSections(updatedSections);
    };

    const handleDeleteLecture = (sectionIndex, SubLessonIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].SubLesson.splice(SubLessonIndex, 1);
        setSections(updatedSections);
    };

    const handleAddLecture = (sectionIndex) => {
        const updatedSections = [...sections];
        if (updatedSections[sectionIndex]) {
            if (!updatedSections[sectionIndex].SubLesson) {
                updatedSections[sectionIndex].SubLesson = []; 
            }
            const newSubLesson = { title: `Lecture ${updatedSections[sectionIndex].SubLesson.length + 1}`, videoUrl: null };
            updatedSections[sectionIndex].SubLesson.push(newSubLesson);
            setSections(updatedSections);
        } else {
            console.error('Invalid section index or structure:', sectionIndex, updatedSections);
        }
    };
    

    const handleUploadVideo = async (file) => {
        const { sectionIndex, SubLessonIndex } = currentUpload;
        const videoUrl = await VideoUpload(file);
        if (!videoUrl) {
            toast.error("Can't upload video");
            setUploadProgress(prev => ({ ...prev, [sectionIndex + "_" + SubLessonIndex]: false }));
            return;
        }
        const updatedSections = [...sections];
        updatedSections[sectionIndex].SubLesson[SubLessonIndex].videoUrl = videoUrl;
        setSections(updatedSections);
        setVideoUrls(prev => ({
            ...prev,
            [sectionIndex + "_" + SubLessonIndex]: videoUrl
        }));
        toast.success('Video uploaded');
        setUploadProgress(prev => ({ ...prev, [sectionIndex + "_" + SubLessonIndex]: false }));
    };

    const handleTitleChange = (e, sectionIndex, SubLessonIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].SubLesson[SubLessonIndex].title = e.target.value;
        setSections(updatedSections);
    };

    const handleSectionNameChange = (e, sectionIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].title = e.target.value;
        setSections(updatedSections);
    };

    const handleVideoButtonClick = (sectionIndex, SubLessonIndex) => {
        setCurrentUpload({ sectionIndex, SubLessonIndex });
        fileInputRef.current.click();
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith('video/')) {
            toast.error('Please upload a valid video file');
            return;
        }
        const { sectionIndex, SubLessonIndex } = currentUpload;
        setUploadProgress(prev => ({ ...prev, [sectionIndex + "_" + SubLessonIndex]: true }));
        handleUploadVideo(file);
    };

    const handleUpload = () => {
        let isValid = true;
        sections.forEach(section => {
            if (!section.title) {
                toast.error("Section title is required");
                isValid = false;
            }
            section.SubLesson.forEach(subLesson => {
                if (!subLesson.title) {
                    toast.error("Lecture title is required");
                    isValid = false;
                }
                if (!subLesson.videoUrl) {
                    toast.error("Video is required for each lecture");
                    isValid = false;
                }
            });
        });

        if (isValid) {
            onNext(sections);
        }
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
                                        value={section.title}
                                        onChange={(e) => handleSectionNameChange(e, sectionIndex)}
                                        placeholder="Enter section name"
                                        required
                                    />
                                </div>
                                <div className='flex pt-6 px-10 space-x-5'>
                                    <h1 className=' text-xl' onClick={() => handleAddLecture(sectionIndex)}><AiOutlinePlus /></h1>
                                    <p className=' text-xl'><AiOutlineEdit /></p>
                                    <p className=' text-xl' onClick={() => handleDeleteSection(sectionIndex)}><AiOutlineDelete /></p>
                                </div>
                            </div>
                            <div className='border p-5'>
                            {section && section.SubLesson && section.SubLesson.map((lecture, lectureIndex) => (
                                    <div key={lectureIndex} className="ps-10 p-4 flex items-center space-x-8 ">
                                        <AiOutlineMenu />
                                        <input
                                            type="text"
                                            value={lecture.title}
                                            onChange={(e) => handleTitleChange(e, sectionIndex, lectureIndex)}
                                            placeholder="Enter title"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="flex bg-orange-100 p-2"
                                            onClick={() => handleVideoButtonClick(sectionIndex, lectureIndex)}
                                        >
                                            {uploadProgress[sectionIndex + "_" + lectureIndex] ? "Uploading..." : "Upload Video"}
                                            <AiOutlineUpload className="ml-2 text-2xl" />
                                        </button>
                                        {videoUrls[`${sectionIndex}_${lectureIndex}`] && (
                                            <video src={videoUrls[`${sectionIndex}_${lectureIndex}`]} controls width="200" />
                                        )}
                                        <AiOutlineDelete onClick={() => handleDeleteLecture(sectionIndex, lectureIndex)} />
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
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleVideoChange}
                required
            />
        </>
    );
};

export default AddCurriculum;
