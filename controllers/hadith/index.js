import fs from "fs"
import { DATA_HADITH_PATH } from "../../data/data_path"


const get_mp3_path = (hadith_type) => {
    return DATA_HADITH_PATH + "/" + hadith_type + "/mp3"
}

const get_photo_path = (hadith_type) => {
  return DATA_HADITH_PATH + "/" + hadith_type  + "/photo"
}





export {
    get_mp3_path,
    get_photo_path
}