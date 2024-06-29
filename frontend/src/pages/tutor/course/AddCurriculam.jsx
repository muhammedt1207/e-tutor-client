import React, { useState } from "react";
import { AiOutlineDelete, AiOutlinePlus, AiOutlineUpload } from "react-icons/ai";
import toast from "react-hot-toast";
import VideoUpload from "../../../util/VideoUploed";

const AddCurriculum = ({ onNext, initialData = { sections: [] } }) => {
    console.log(initialData,'initail data from ');
    const [sections, setSections] = useState(
        initialData?.sections?.length > 0
            ? initialData.sections.map(section => ({
                  name: section.name,
                  subLessons: section.subLessons?.map(lecture => ({
                      title: lecture.title,
                      videoUrl: lecture.videoUrl,
                  })),
              }))
            : [{ name: "", subLessons: [] }]
    );

    const handleAddSection = () => {
        setSections([...sections, { name: "", subLessons: [] }]);
    };

    const handleDeleteSection = (index) => {
        const updatedSections = sections.filter((_, i) => i !== index);
        setSections(updatedSections);
    };

    const handleAddLecture = (sectionIndex) => {
        const updatedSections = [...sections];
        const section = { ...updatedSections[sectionIndex] };
        if (!section.subLessons) {
            section.subLessons = [];
        }
        const newLecture = { title: "", videoUrl: null };
        section.subLessons.push(newLecture);
        updatedSections[sectionIndex] = section;
        setSections(updatedSections);
    };

    const handleDeleteLecture = (sectionIndex, lectureIndex) => {
        const updatedSections = [...sections];
        const section = { ...updatedSections[sectionIndex] };
        section.subLessons.splice(lectureIndex, 1);
        updatedSections[sectionIndex] = section;
        setSections(updatedSections);
    };

    const handleTitleChange = (e, sectionIndex, lectureIndex) => {
        const updatedSections = [...sections];
        const section = { ...updatedSections[sectionIndex] };
        const lecture = { ...section.subLessons[lectureIndex] };
        lecture.title = e.target.value;
        section.subLessons[lectureIndex] = lecture;
        updatedSections[sectionIndex] = section;
        setSections(updatedSections);
    };

    const handleSectionNameChange = (e, sectionIndex) => {
        const updatedSections = [...sections];
        const section = { ...updatedSections[sectionIndex] };
        section.name = e.target.value;
        updatedSections[sectionIndex] = section;
        setSections(updatedSections);
    };

    const handleVideoUpload = async (file, sectionIndex, lectureIndex) => {
        const allowedVideoFormats = ["video/mp4", "video/webm", "video/ogg", "video/mov"];
        const isValidVideoFormat = allowedVideoFormats.includes(file.type);
    
        if (!isValidVideoFormat) {
            toast.error("Invalid video format. Please upload a valid video file.");
            return;
        }
        const videoUrl = await VideoUpload(file);
        if (!videoUrl) {
            toast.error("Can't upload video");
            return;
        }
        const updatedSections = [...sections];
        const section = { ...updatedSections[sectionIndex] };
        const lecture = { ...section.subLessons[lectureIndex] };
        lecture.videoUrl = videoUrl;
        section.subLessons[lectureIndex] = lecture;
        updatedSections[sectionIndex] = section;
        setSections(updatedSections);
        toast.success("Video uploaded");
    };

    const handleUpload = () => {
        const isValid = sections.every((section) =>
            section.name.trim() !== "" &&
            section.subLessons.every(
                (lecture) =>
                    lecture.title.trim() !== "" && lecture.videoUrl !== null
            )
        );

        if (!isValid) {
            toast.error("Please fill in all required fields");
            return;
        }

        onNext(sections);
    };



    return (
        <div className=" lg:ml-46 ml-52 p-16 pe-10">
            <h1 className="text-2xl font-semibold">Course Curriculum</h1>
            <hr />
            {sections && sections.length > 0 ? (
                sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border mt-10">
                        <div className="flex justify-between">
                            <div className="pt-6 flex space-x-4">
                                <h1 className="ps-10 flex items-center">
                                    <AiOutlinePlus />
                                    Section {sectionIndex + 1}:
                                </h1>
                                <input
                                    type="text"
                                    value={section.name}
                                    onChange={(e) => handleSectionNameChange(e, sectionIndex)}
                                    placeholder="Enter section name"
                                    required
                                />
                            </div>
                            <div className="flex pt-6 px-10 space-x-5">
                                <button onClick={() => handleAddLecture(sectionIndex)}>
                                    <AiOutlinePlus />
                                </button>
                                <button onClick={() => handleDeleteSection(sectionIndex)}>
                                    <AiOutlineDelete />
                                </button>
                            </div>
                        </div>
                        <div className="border p-5">
                            {section.subLessons && section.subLessons.length > 0 ? (
                                section.subLessons.map((lecture, lectureIndex) => (
                                    <div key={lectureIndex} className="ps-10 p-4 flex items-center space-x-8">
                                        <input
                                            type="text"
                                            value={lecture.title}
                                            onChange={(e) => handleTitleChange(e, sectionIndex, lectureIndex)}
                                            placeholder="Enter title"
                                            required
                                        />
                                        <input
                                            type="file"
                                            accept="video/*"
                                            onChange={(e) => handleVideoUpload(e.target.files[0], sectionIndex, lectureIndex)}
                                        />
                                        {lecture.videoUrl && (
                                            <video src={lecture.videoUrl} controls width="200" />
                                        )}
                                        <button onClick={() => handleDeleteLecture(sectionIndex, lectureIndex)}>
                                            <AiOutlineDelete />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No lectures added yet.</p>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p>No sections added yet.</p>
            )}
            <div className="flex justify-center">
                <button className="p-2 mt-8 bg-orange-100 text-orange-600 w-full" onClick={handleAddSection}>
                    Add Section
                </button>
            </div>
            <div className="flex items-end justify-end px-20 -mt-10">
                <button onClick={handleUpload} className="p-2 bg-orange-500 text-white mt-14 flex items-end">
                    Create Course
                </button>
            </div>
        </div>
    );
};

export default AddCurriculum;