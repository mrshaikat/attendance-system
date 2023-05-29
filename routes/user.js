const router = require("express").Router();
const userController = require("../controller/user");

/**
 * Get all users, include
 * - filter
 * - sort
 * - pagination
 * @router /api/v1/users?sort=['by', 'name']
 * @method GET
 * @visibility private
 */

/**
 * Get user by mail or ID
 */
router.get("/:userId", userController.getUserByID);

/**
 * Delete User
 */
router.patch("/:userId", userController.patchUserById);

/**
 * Update user by id
 * @method PUT
 */
router.put('/:userId', userController.putUserById);

/**
 * Delete User
 */
router.delete("/:userId", userController.deleteUserById);

/**
 * Create User
 */
router.post("/", userController.postUser);

/**
 * get all users
 */
router.get("/", userController.getUsers);

module.exports = router;
