
import shell from "child_process"
import fs from "fs"
import { DATA_HADITH_PATH, DATA_KURAN_PATH } from "../data/data_path"

var dataMap = new Map()
dataMap.set("1", DATA_KURAN_PATH)
dataMap.set("2",DATA_HADITH_PATH)


const get_mp3_path = (kuran_nummer) => {
  return set.get() + "/" + kuran_nummer + "/mp3"
}


const set_result_object = (req, res, next) => {
    req.result = {}
    req.source = req.query.source
    console.log("Source :",req.source)
    next()
}

const execute_shell = (source, file_path, file_name) => {
    shell.exec("sh symlink_script.sh "+source+ " "+file_path+" "+file_name,(error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
    })
}

const make_symlinks = (req, res, next) => {
    
    if (req.source) {
        console.log("Make Links")
        const source = req.source
        const mp3_files = req.result.mp3
        mp3_files.forEach(file => {
            console.log("---->Link mp3 : ", file.name)
            execute_shell(source,file.path, file.name)
        });

        const photos = req.result.photos
        photos.forEach(file => {
            console.log("---->Link photo : ", file.name)
            execute_shell(source,file.path, file.name)
        })
    }
    next()
}


const get_mp3_files = (mp3_path, nummer) => {
    return fs.readdirSync(mp3_path).filter(file => {
        const file_number = Number(file.split("-")[0])
        return file_number == Number(nummer) 
    }).map(file => {
        return {
            path: mp3_path,
            name: file
        }
    })
}

const set_type = (req, res, next) => {
    const type = req.query.type
    req.type = type
    console.log("type Nummer : ",type)
    next()
}

const set_nummer = (req, res, next) => {
    const nummer = req.query.nummer
    req.nummer = nummer
    console.log("Nummer : ", nummer)
    next()
}
 

const get_photo_files = (photo_path, ayah) => {
  return fs.readdirSync(photo_path).filter(file => {
        const file_number = Number(file.split("-")[0])
        return file_number == Number(ayah) 
    }).map(file => {
        return {
            path: photo_path,
            name: file
        }
    })
}


export {get_photo_files,set_nummer,set_type, set_result_object, make_symlinks,get_mp3_files}