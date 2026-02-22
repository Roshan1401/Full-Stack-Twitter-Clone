import Router from "express";

import { searchUsers } from "../controllers/search.controller.js";

const router = Router();

router.route("/users").get(searchUsers);

export default router;
