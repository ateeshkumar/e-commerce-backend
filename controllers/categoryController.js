import slugify from "slugify";
import categoryModels from "../models/categoryModels.js";

const createCategoryController = async(req,res)=>{
    try {
        const {name} = req.body;
        if(!name){
            return res.status(400).send({
                success: false,
                massage: "Please enter category name"
            });
        }
        const existingCategory = await categoryModels.findOne({name});
        if(existingCategory){
            return res.status(400).send({
                success: false,
                massage: "Category already exists"
            });
        }
        const category = new categoryModels({name,slug:slugify(name)}); 
        await category.save();
        res.status(200).send({
            success: true,
            massage: "Category created successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "Error in creating category",
            error

        });
        
    }
}
export const updateCategoryController = async(req,res)=>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        if(!name || !id){
            return res.status(400).send({
                success: false,
                massage: "Please enter category name"
            });
        }
        const category = await categoryModels.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(200).send({
            success: true,
            massage: "Category updated successfully",
            category
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            massage: "Error in updating category",
            error
        });
    }
}
export const categoryController = async(req,res)=>{
    try {
        const category = await categoryModels.find();
        res.status(200).send({
            success: true,
            massage: "Category list",
            category
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            massage: "Error in getting category",
            error
        })
    }
}
export const singleCategoryController = async(req,res)=>{
    try {
        const {slug} = req.params;
        const category = await categoryModels.findOne({slug}); 
        res.status(200).send({
            success: true,
            massage: "Category list",
            category
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            massage: "Error in getting category",
            error
        });
    }
}

export const deleteCategoryController = async(req,res)=>{
    try {
        const {slug} = req.params;
        const category = await categoryModels.findOneAndDelete({slug});
        res.status(200).send({
            success: true,
            massage: "Category deleted",
            category
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            massage: "Error in deleting category",
            error
        });
    }
}
export default createCategoryController;