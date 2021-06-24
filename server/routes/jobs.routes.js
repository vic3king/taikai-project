import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { jobPostValidation, jobParamValidator } = middlewares;

const { jobsController } = controllers;

const jobsRoute = express.Router();

jobsRoute.post('/jobs', [jobPostValidation], jobsController.post);

jobsRoute.get('/jobs', jobsController.getAll);

jobsRoute.patch('/jobs/:jobId', [jobParamValidator], jobsController.update);

jobsRoute.delete('/jobs/:jobId', [jobParamValidator], jobsController.delete);

jobsRoute.get('/jobs/search', jobsController.searchJobs);

export default jobsRoute;
