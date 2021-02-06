import { get_mp3_files, get_photo_files } from ".."
import { get_mp3_path, get_photo_path } from "../../controllers/hadith"


const set_photos = (req, res, next) => {
    const photo_path = get_photo_path(req.type)
    console.log("Set photo files ", photo_path)
    const photos = get_photo_files(photo_path, req.nummer)
    req.result.photos = photos
    next()
}

const set_mp3_files = (req, res, next) => {
    const mp3_path = get_mp3_path(req.type)
    console.log("Set mp3 files ", mp3_path)
    const mp3_files = get_mp3_files(mp3_path, req.nummer)
    console.log(mp3_files)
    req.result.mp3 = mp3_files
    next()
}



export {
    set_photos,
    set_mp3_files
}