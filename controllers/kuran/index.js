import fs from "fs"
import { DATA_PATH } from "../../API/API_PATH"

const between = (x, min, max) => {
    return x >= min && x <= max
}

function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => Number(start) + idx)
}

const get_infos = (info_path) => {
  return JSON.parse(fs.readFileSync(info_path, "utf8"))
}

const get_mp3_path = (kuran_nummer, sure) => {
  return DATA_PATH + "/" + kuran_nummer + "/" + sure + "/mp3"
}

const get_photo_path = (kuran_nummer, sure) => {
  return DATA_PATH + "/" + kuran_nummer + "/" + sure + "/photo"
}

const get_infos_path = (kuran_nummer, sure) => {
  return DATA_PATH + "/" + kuran_nummer + "/" + sure + "/info.json"
}

const get_mp3_files = (mp3_path, index_von, index_zu) => {
    return fs.readdirSync(mp3_path).filter(file => {
        const file_number = Number(file.split(".")[0])
        return between(file_number, index_von, index_zu)
    }).sort((a, b) => {
        return Number(a.split(".")[0]) > Number(b.split(".")[0])
    }).map(file => {
        return {
            path: mp3_path + "/" + file,
            name: file
        }
    })
}

const get_mp3_files_ein_ayah = (mp3_path, ayah) => {
  return fs.readdirSync(mp3_path).filter(file => {
        const file_number = Number(file.split(".")[0])
        return file_number == Number(ayah) 
    }).map(file => {
        return {
            path: mp3_path + "/" + file,
            name: file
        }
    })
}

const get_photos = (photo_path, index_von, index_zu) => {
  return fs.readdirSync(photo_path).filter(file => {
        const [von, bis] = file.split(".")[0].split("-")
        const s1 = new Set(range(von, bis))
        const s2 = new Set(range(index_von, index_zu))
        let res = new Set([...s1].filter(x => {
            return s2.has(x)
        }))
        return res.size > 0
    }).sort((a, b) => {
        return Number(a.split(".")[0].split("-")[0]) > Number(b.split(".")[0].split("-")[0])
    }).map(file => {
        return {
            path: photo_path + "/" + file,
            name: file
        }
    })
}

const get_photos_ein_ayah = (photo_path, ayah) => {
  return fs.readdirSync(photo_path).filter(file => {
        const [von, bis] = file.split(".")[0].split("-")
        const s1 = new Set(range(von, bis))
        return s1.has(Number(ayah))
    }).map(file => {
        return {
            path: photo_path + "/" + file,
            name: file
        }
    })
}

export {
    get_infos,
    get_mp3_path,
    get_photos_ein_ayah,
    get_photos,
    get_mp3_files_ein_ayah,
    get_mp3_files,
    get_infos_path,
    get_photo_path
}