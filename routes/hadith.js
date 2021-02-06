import express from "express"
import { HADITH_PATH } from "../API/API_PATH"
import { make_symlinks, set_nummer, set_type } from "../middleware"
import {  set_mp3_files, set_photos } from "../middleware/hadith"

var router_hadith = express.Router()


router_hadith.get("/", (req, res) => {
    console.log(req.result)
    res.status(200).send(req.result)
})


const set_hadith_router = (app) => {
    app.use(HADITH_PATH,
        set_type,
        set_nummer,
        set_mp3_files,
        set_photos,
        make_symlinks, router_hadith)
}

export {set_hadith_router}