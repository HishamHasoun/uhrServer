import fs from "fs"
import { DATA_KURAN_PATH } from "../../data/data_path"



const get_mp3_path = (kuran_nummer) => {
  return DATA_KURAN_PATH + "/" + kuran_nummer + "/mp3"
}

const get_photo_path = (kuran_nummer) => {
  return DATA_KURAN_PATH + "/" + kuran_nummer + "/photo"
}




export {
    get_mp3_path,
    get_photo_path
}