import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from './firebase'
import { toast } from "react-toastify";

// export const upload = (file) => {
//     const storage = getStorage(app);
//     const toastId = toast.success('uploading file...', { autoClose: false }) //TODO
//     // Upload file and metadata to the object 'images/mountains.jpg'
//     const storageRef = ref(storage, crypto.randomUUID() + '-' + file.name);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     // Listen for state changes, errors, and completion of the upload.
//     uploadTask.on('state_changed',
//         (snapshot) => {
//             // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log('Upload is ' + progress + '% done');
//             toast.update(toastId, { render: `Uploading file... ${Math.round(progress)}%`, progress: progress / 100 });//TODO
//         },
//         (error) => {
//             console.log(error);
//             console.log(error.code);
//             console.log(error.message);
//             toast.dismiss(toastId)
//             toast.error('Error uploading file' + error.message)
//         },
//         () => {
//             // Upload completed successfully, now we can get the download URL
//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                 console.log('File available at', downloadURL);
//                 file = downloadURL
//                 toast.update(toastId, { autoClose: 3000, render: 'FILE UPLOADED SUCCESFULLY' });//TODO
//             });
//         }
//     );
// }





export const upload = (files) => {
    const storage = getStorage(app);
    const uploadPromises = [];

    files.forEach((file) => {
        const toastId = toast.success('Uploading file...', { autoClose: false });

        const storageRef = ref(storage, crypto.randomUUID() + '-' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        const uploadPromise = new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    toast.update(toastId, { render: `Uploading file... ${Math.round(progress)}%`, progress: progress / 100 });
                },
                (error) => {
                    console.log(error);
                    console.log(error.code);
                    console.log(error.message);
                    toast.dismiss(toastId);
                    toast.error('Error uploading file: ' + error.message);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log(`File ${file.name} available at`, downloadURL);
                        toast.update(toastId, { autoClose: 3000, render: `File ${file.name} uploaded successfully` });
                        resolve({ file, downloadURL });
                    }).catch((error) => {
                        console.error(`Error getting download URL for file ${file.name}:`, error);
                        reject(error);
                    });
                }
            );
        });

        uploadPromises.push(uploadPromise);
    });

    return Promise.all(uploadPromises);
};

