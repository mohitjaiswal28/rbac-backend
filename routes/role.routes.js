
const express = require('express');
const roleController = require('../controllers/role.controllers');

const router = express.Router();

router.
    route('/').
    get(roleController.getAllRole).
    post(roleController.createRole);

router
    .route('/active')
    .get(roleController.getActiveRoles);
    
router.
    route('/:roleId').
    get(roleController.getRole).
    patch(roleController.updateRole).
    delete(roleController.deleteRole);

module.exports = router;