import Joi from '@hapi/joi';
import joiFormatter from '../helpers/joi-formatter';

const forgotPasswordValidation = async (req, res, next) => {
  const { body } = req;
  const schema = Joi.object({
    description: Joi.string().required(),
    title: Joi.string().required(),
    recruiter: Joi.string().required(),
    recruiterContact: Joi.string().required(),
    numberOfHires: Joi.number(),
    typeId: Joi.string().required(),
    skillId: Joi.string().required(),
    locationId: Joi.string().required(),
  });

  const { error } = schema.validate(body);

  if (error) {
    const { message } = error.details[0];
    const formattedMessage = joiFormatter(message);

    return res.status(400).send({
      status: false,
      error: formattedMessage,
    });
  }

  return next();
};

export default forgotPasswordValidation;
