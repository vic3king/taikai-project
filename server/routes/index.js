import express from 'express';

// user Routes
import userRoute from './user.routes';

// job Routes
import jobsRoute from './jobs.routes';

// express router
const router = express.Router();

router.use(userRoute);
router.use(jobsRoute);

export default router;
