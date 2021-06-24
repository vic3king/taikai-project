/* eslint-disable no-return-assign */
import Joi from '@hapi/joi';
import joiFormatter from '../helpers/joi-formatter';
import { userService } from '../services/userService';

const validate = (error, res) => {
  const { message } = error.details[0];
  const formattedMessage = joiFormatter(message);

  return res.status(400).send({
    status: false,
    error: formattedMessage,
  });
};

const subscriptionValidation = route => {
  return (
    subscriptionValidation[route] ||
    (subscriptionValidation[route] = async (req, res, next) => {
      if (route === 'create') {
        const { body } = req;
        const schema = Joi.object({
          email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required(),
        });

        const { error } = schema.validate(body, res);

        if (error) return validate(error, res);

        const user = await userService.find({ email: body.email });

        if (user) {
          return res.status(409).json({
            status: false,
            error: 'This email already exists',
          });
        }
      }

      if (route === 'toggleSubscribe') {
        const { body } = req;
        const schema = Joi.object({
          email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required(),
          isSubscribed: Joi.boolean().required(),
        });

        const { error } = schema.validate(body);

        if (error) return validate(error, res);

        const user = await userService.find({ email: body.email });

        if (!user) {
          return res.status(404).json({
            status: false,
            error: "This email doesn't exists",
          });
        }

        req.user = user;
      }
      next();
    })
  );
};

export default subscriptionValidation;
