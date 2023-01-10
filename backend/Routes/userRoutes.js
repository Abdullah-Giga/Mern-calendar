const {Router} = require('express')
const {signUp, signIn} = require('../Controllers/userControler')

const router = Router();

router.post('/signUp', signUp);

router.post('/signIn', signIn);

module.exports = router;