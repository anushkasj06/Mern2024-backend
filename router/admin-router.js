const express = require("express");
const { getAllUsers, getAllContacts,getUserById,deleteUserById , updateUserById, deleteContactById} = require("../controllers/admin-controller"); 
const authMiddleware = require("../middlewares/auth-middleware"); 
const adminMiddleware = require("../middlewares/admin-middleware"); 


const router = express.Router();

router.route('/users').get(authMiddleware,adminMiddleware,getAllUsers); 
router.route('/users/:id').get(authMiddleware,adminMiddleware,getUserById);
router.route('/users/update/:id').patch(authMiddleware, adminMiddleware, updateUserById);
router.route('/users/delete/:id').delete(authMiddleware, adminMiddleware, deleteUserById);
router.route('/contacts').get(authMiddleware,adminMiddleware,getAllContacts); 
router.route('/contacts/delete/:id').delete(authMiddleware, adminMiddleware, deleteContactById);


module.exports = router; 
