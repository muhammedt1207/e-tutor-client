// import axios from 'axios';
// import toast from 'react-hot-toast';

// const CHUNK_SIZE = 10 * 1024 * 1024; 

// const VideoUpload = async (video) => {
//     console.log(video,'vidrooooooooooooooooooo');
//   const preset_key = import.meta.env.VITE_REACT_APP_PRESET_KEY; 
//   const cloud_name = import.meta.env.VITE_REACT_APP_CLD_USER_NAME; 
//   let start = 0;
//   let end = CHUNK_SIZE;
//   let partNumber = 1;
//   let uploadId = null;
//   let secureUrl = null;
//   const transformationParams = {
//     quality: 'auto',
//     resource_type: 'video',
//   };

//   while (start < video.size) {
//     const chunk = video.slice(start, end);
//     const formData = new FormData();
//     formData.append('file', chunk);
//     formData.append('upload_preset', preset_key);
//     formData.append('cloud_name', cloud_name);
//     formData.append('part_number', partNumber);
//     formData.append('upload_id', uploadId);

//     try {
//       const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`, formData, {
//         params: transformationParams,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (!uploadId) {
//         uploadId = res.data.upload_id;
//       }

//       start = end;
//       end = start + CHUNK_SIZE;
//       partNumber++;

//       if (res.data.secure_url) {
//         secureUrl = res.data.secure_url;
//       }

//       if (res.data.done) {
//         const { format, secure_url } = res.data;
//         console.log('Video uploaded successfully:', secure_url);
//         if (['mp4', 'mov', 'avi'].includes(format)) {
//           return secure_url;
//         } else {
//           console.log('Unsupported video format');
//           return null;
//         }
//       }
//     } catch (error) {
//       toast.error("Can't upload video");
//       console.error('Error uploading video:', error);
//       throw error;
//     }
//   }

//   return secureUrl;
// };

// export default VideoUpload;






























import axios from 'axios';
import toast from 'react-hot-toast';

const VideoUpload = async (video) => {
    const preset_key = import.meta.env.VITE_REACT_APP_PRESET_KEY; // Assuming you have preset key for video uploads
    const cloud_name = import.meta.env.VITE_REACT_APP_CLD_USER_NAME; // Cloudinary cloud name
    const formData = new FormData();
    formData.append('file', video);
    formData.append('upload_preset', preset_key);
 
    const transformationParams = {
        quality: 'auto', 
        resource_type: 'video', 
    };
    try {
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`, formData, {
        params:transformationParams,   
        headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Video uploaded successfully:', res);
        const { format, secure_url } = res.data;
        console.log(secure_url);
        return secure_url;
        if (['mp4', 'mov', 'avi','webm'].includes(format)) { 
            console.log('Video uploaded successfully:', secure_url);
        } else {
            console.log('Unsupported video format');
            return null;
        }
    } catch (error) {
        toast.error("can't upload video")
        console.error('Error uploading video:', error);
        throw error;
    }
};

export default VideoUpload;



    // try {
        //     const uploadAsset = createUploadAsset({
        //         endpoint: "https://uploads.mux.com",
        //         credentials: {
        //             policy: "YOUR_MUX_POLICY_KEY",
        //             signature: "YOUR_MUX_SIGNATURE_KEY",
        //         },
        //         data: {
        //             env_key: "YOUR_MUX_ENV_KEY",
        //         },
        //     });

        //     const uploader = await uploadAsset.createUpload({
        //         timeout: 600,
        //         cors_origin: "*",
        //     });

        //     uploader.on("progress", (progress) => {
        //         setUploadProgress((prevProgress) => ({
        //             ...prevProgress,
        //             [`${sectionIndex}_${lectureIndex}`]: Math.round((progress.uploadedBytes / progress.totalBytes) * 100),
        //         }));
        //     });

        //     uploader.on("success", (data) => {
        //         const videoUrl = data.playback_ids[0].policy ||
        //             `https://stream.mux.com/${data.playback_ids[0].id}.m3u8`;
        //         console.log(videoUrl, '****************************************************');
        //         setVideoUrls((prevVideoUrls) => ({
        //             ...prevVideoUrls,
        //             [`${sectionIndex}_${lectureIndex}`]: videoUrl,
        //         }));
        //         setUploadProgress((prevProgress) => ({
        //             ...prevProgress,
        //             [`${sectionIndex}_${lectureIndex}`]: 0,
        //         }));
        //     });

        //     uploader.on("error", (error) => {
        //         console.error("Upload error:", error);
        //     });

        //     await uploader.upload(file);
        // } catch (error) {
        //     console.error("Error uploading video:", error);
        // }