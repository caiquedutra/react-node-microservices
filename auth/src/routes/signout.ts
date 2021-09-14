import express from 'express';

const router = express.Router();

router.get('/api/users/signout', (req, res) => {
    req.session = null
})

export { router as signOutRouter };
