
import shell from "child_process"
import fs from "fs"
import { DATA_HADITH_PATH, DATA_KURAN_PATH } from "../data/data_path"
import getMP3Duration from "get-mp3-duration"

var dataMap = new Map()
dataMap.set("1", DATA_KURAN_PATH)
dataMap.set("2",DATA_HADITH_PATH)



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

const get_time = (file) => {
    const buffer = fs.readFileSync(file)
    const duration = getMP3Duration(buffer)
    return (duration/1000)/60
}

const get_mp3_nach_minute = (mp3_path, start, von, zu) => {
    var minute = 0.0
    var stop_loop = false
    const files =  fs.readdirSync(mp3_path).filter(file => {
        return Number(file.split("-")[0]) > start
    }).sort((a, b) => {
        return Number(a.split("-")[0]) - Number(b.split("-")[0])
    })

    
    return files.filter(file => {
        if(stop_loop) return false // gut für performance
        const tmp = minute + get_time(mp3_path + "/" + file)

        if (tmp < von || tmp < zu) {
            //console.log(tmp,minute)
            minute = tmp;
            return true
        } else {
            stop_loop = true
            return false
        }
    })
    
}

const get_mp3_nach_bab = (mp3_path, kitab, bab) => {
    var infos = JSON.parse(fs.readFileSync(mp3_path + "/info.json", "utf8")).INFO
    infos = infos.filter(info => info.nummer == kitab)
    [0].Bab.filter(file => {
        console.log(file,file.Bab == bab)
            return file.Bab == bab
        }).map(file => file.hadiths)[0]
    console.log(infos)

    return fs.readdirSync(mp3_path).filter(file => {
            const file_number = Number(file.split("-")[0])
            return infos.includes(file_number)
        }).map(file => {
            return {
                path: mp3_path,
                name: file
            }
        })

}

const get_mp3_files = (mp3_path, nummer, option = null, start = null,
    von = null, zu = null, kitab = null, bab = null) => {
    
    if (option != undefined) {
        console.log("Option", option)
        if (option == "minute") {
            return get_mp3_nach_minute(mp3_path, start, von, zu).map(file => {
                return {
                    path: mp3_path,
                    name: file
                }
            })
        } else if (option == "bab") {
            return get_mp3_nach_bab(mp3_path, kitab, bab)
        }
        
    } else {
        //Normale Variante --> Nummerweise
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
}

const set_type = (req, res, next) => {
    const type = req.query.type
    req.type = type
    console.log("type Nummer : ",type)
    next()
}

const set_option = (req, res, next) => {
    const option = req.query.option
    req.option = option
    console.log("Option Nummer : ",option)
    next()
}

const set_nummer = (req, res, next) => {
    const nummer = req.query.nummer
    req.nummer = nummer
    console.log("Nummer : ", nummer)
    next()
}

const set_kitab = (req, res, next) => {
    const nummer = req.query.kitab
    req.kitab = nummer
    console.log("Kitab : ", nummer)
    next()
}

const set_bab = (req, res, next) => {
    const nummer = req.query.bab
    req.bab = nummer
    console.log("Bab : ", nummer)
    next()
}

const set_start_nummer = (req, res, next) => {
    const start = req.query.start
    req.start = start
    console.log("Start Nummer : ", start)
    next()
}

const set_von_minute = (req, res, next) => {
    const von_minute = req.query.von_minute
    req.von_minute = von_minute
    console.log("von Minute : ", von_minute)
    next()
}

const set_zu_minute = (req, res, next) => {
    const zu_minute = req.query.zu_minute
    req.zu_minute = zu_minute
    console.log("zu Minute : ", zu_minute)
    next()
}
 

const get_photo_files = (photo_path, ayah, option = null) => {
    return fs.readdirSync(photo_path).filter(file => {
        const file_number = Number(file.split("-")[0])
        return file_number == Number(ayah) 
    })
}


export {
    get_photo_files,
    set_nummer, set_type,
    set_result_object,
    make_symlinks,
    get_mp3_files,
    set_start_nummer,
    set_von_minute,
    set_zu_minute,
    set_option,
    set_kitab,
    set_bab
}