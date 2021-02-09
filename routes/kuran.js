import express from "express"
import { KURAN_PATH } from "../API/API_PATH";
import { make_symlinks, set_nummer, set_option, set_start_nummer, set_type, set_von_minute, set_zu_minute } from "../middleware";
import { set_mp3_files, set_photos } from "../middleware/kuran";

var router = express.Router();


router.get("/", (req, res) => {
    res.status(200).send(req.result)
})



const set_kuran_router = (app) => {
    app.use(KURAN_PATH,
        set_type, 
        set_nummer,
        set_option,
        set_start_nummer,
        set_von_minute,
        set_zu_minute,
        set_mp3_files,
        set_photos,
        make_symlinks,
        router);
}

export {set_kuran_router}