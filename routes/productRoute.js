import express from 'express';
import { adminAccess, requestSignIn } from '../middleware/authMiddleware.js';
import cerateProductController, { braintreePaymentController, braintreeTokenController, deleteProductController, 
    getAllProductsController, getProductPhotoController, 
    getSingleProductController, productCountController, 
    productFilterController, productListController, 
    relatedProductController, 
    searchProductController, 
    updateProductController } 
    from '../controllers/productController.js';
import ExpressFormidable from 'express-formidable';
import route from './categoryRoute.js';
const router = express.Router();

router.post('/create-product',
requestSignIn,
adminAccess,
ExpressFormidable(),
cerateProductController);
router.put('/update-product/:slug',
requestSignIn,
adminAccess,
ExpressFormidable(),
updateProductController);
router.get('/all-product',getAllProductsController);
router.get('/all-product/:slug',getSingleProductController);
router.get('/product-photo/:pid',getProductPhotoController);
router.delete('/delete-product/:id',deleteProductController);
router.post('/product-filters',productFilterController);
router.get('/product-count',productCountController);
router.get('/product-list/:page',productListController);
router.get('/search/:keyword',searchProductController);
router.get('/related-product/:pid/:cid',relatedProductController);
router.get('/braintree/token',braintreeTokenController);
router.post('braintree/payment',requestSignIn,braintreePaymentController);

export default router;