import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { subscriptionValidation } = middlewares;

const { subscriptionController } = controllers;

const usersRoute = express.Router();

usersRoute.post(
  '/users/create',
  [subscriptionValidation('create')],
  subscriptionController.subscribe
);

usersRoute.patch(
  '/users/toggle-subscription',
  [subscriptionValidation('toggleSubscribe')],
  subscriptionController.toggleSubscribe
);

export default usersRoute;
