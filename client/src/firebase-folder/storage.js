import { storage } from "./firebase";
export const storageRef = () => storage.ref();

export const uploadFile = (file, onProgress) => new Promise((resolve, reject) => {
    let uploadTask = storageRef().child(file.uploadPath).put(file.file);
    uploadTask.on(
        'state_changed',
        snapshot => {
            onProgress({ loaded: snapshot.bytesTransferred, total: snapshot.totalBytes });
        },
        error => {
            reject(error)
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => resolve(downloadURL))
        }
    )
})

export const removeFile = (path) => storageRef().child(path).delete();