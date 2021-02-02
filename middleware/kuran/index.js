import { KURAN_PATH } from "../../API/API_PATH"
import { get_infos, get_infos_path, get_mp3_files, get_mp3_files_ein_ayah, get_mp3_path, get_photos, get_photos_ein_ayah, get_photo_path } from "../../controllers/kuran"
import shell from "child_process"

const set_indexes = (req, res, next) => {
    const nummer = req.query.nummer
    console.log("Nummer : ",nummer)
    var index_von = ((nummer - 1) * 5) + 1
    var index_zu = index_von + 4
    req.index_von = index_von
    req.index_zu = index_zu
    next()
}

const set_result_object = (req, res, next) => {
    req.result = {}
    req.source = req.query.source
    console.log("Source :",req.source)
    next()
}

const set_kuran_nummer = (req, res, next) => {
    const kuran_nummer = req.query.kuran
    req.kuran = kuran_nummer
    console.log("Kuran Nummer : ",kuran_nummer)
    next()
}

const set_sure_nummer = (req, res, next) => {
    const sure_nummer = req.query.sure
    req.sure = sure_nummer
    console.log("Sure Nummer : ", sure_nummer)
    next()
}

const set_ayah_nummer = (req, res, next) => {
    const ayah_nummer = req.query.ayah
    req.ayah = ayah_nummer
    console.log("Ayah Nummer : ", ayah_nummer)
    next()
}


const set_mp3_files = (req, res, next) => {
    const mp3_path = get_mp3_path(req.kuran, req.sure)
    console.log("Set mp3 files ", mp3_path)
    const mp3_files = get_mp3_files(mp3_path, req.index_von, req.index_zu)
    console.log(mp3_files)
    req.result.mp3 = mp3_files
    next()
}

const set_mp3_files_ein_ayah = (req, res, next) => {
    const mp3_path = get_mp3_path(req.kuran, req.sure)
    console.log("Set mp3 files ", mp3_path)
    const mp3_files = get_mp3_files_ein_ayah(mp3_path, req.ayah)
    console.log(mp3_files)
    req.result.mp3 = mp3_files
    next()
}

const set_photos = (req, res, next) => {
    const photo_path = get_photo_path(req.kuran, req.sure)
    console.log("Set photo files ", photo_path)
    const photos = get_photos(photo_path, req.index_von, req.index_zu)
    req.result.photos = photos
    next()
}

const set_photos_ein_ayah = (req, res, next) => {
    const photo_path = get_photo_path(req.kuran, req.sure)
    console.log("Set photo files ", photo_path)
    const photos = get_photos_ein_ayah(photo_path, req.ayah)
    req.result.photos = photos
    next()
}

const set_infos = (req, res, next) => {
    const info_path = get_infos_path(req.kuran, req.sure)
    console.log("Set Infos ", info_path)
    const infos = get_infos(info_path)
    req.result.infos = infos
    next()
}

const execute_shell = (source, file) => {
    shell.exec("sh symlink_script.sh "+source+ " "+file,(error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
    })
}

const make_symlinks = (req, res, next) => {
    next()
    if (req.source) {
        console.log("Make Links")
        const source = req.source
        const mp3_files = req.result.mp3
        mp3_files.forEach(file => {
            console.log("---->Link : ", file.name)
            execute_shell(source,file.path)
        });
    }
    
}



export {
    set_indexes,
    set_kuran_nummer,
    set_sure_nummer,
    set_ayah_nummer,
    set_mp3_files,
    set_result_object,
    set_photos,
    set_infos,
    set_mp3_files_ein_ayah,
    set_photos_ein_ayah,
    make_symlinks
}