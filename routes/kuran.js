import express from "express"
import { get_infos, get_infos_path, get_mp3_files, get_mp3_files_ein_ayah, get_mp3_path, get_photos, get_photos_ein_ayah, get_photo_path } from "../controllers/kuran";


var router_nummer = express.Router();
var router_ayah_nummer = express.Router();




router_nummer.get("/", (req, res) => {
    res.status(200).send(req.result)
})



router_ayah_nummer.get("/", (req, res) => {
    res.status(200).send(req.result)
})


export {router_ayah_nummer, router_nummer}