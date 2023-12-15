import  express  from "express";
import { adminAccess, requestSignIn } from "../middleware/authMiddleware.js";
import  createCategoryController, { categoryController, deleteCategoryController, singleCategoryController, updateCategoryController }  from "../controllers/categoryController.js";

const route  = express.Router();
route.post('/create-cetegory',requestSignIn,adminAccess,createCategoryController);
route.put('/update-category/:id',requestSignIn,adminAccess,updateCategoryController)

route.get('/all-category',categoryController);
route.get('/all-category/:slug',singleCategoryController);
route.delete('/delete-category/:slug',requestSignIn,adminAccess,deleteCategoryController);

export default route;