import Joi from '@hapi/joi';
import joiFormatter from '../helpers/joi-formatter';
import { jobsService } from '../services/jobsService';

const jobParamValidator = async (req, res, next) => {
  const {
    body,
    params: { jobId: id },
  } = req;
  const schema = Joi.object({
    description: Joi.string(),
    title: Joi.string(),
    recruiter: Joi.string(),
    recruiterContact: Joi.string(),
    numberOfHires: Joi.number(),
    typeId: Joi.string(),
    skillId: Joi.string(),
    locationId: Joi.string(),
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

  const job = await jobsService.find({ id });

  if (!job) {
    return res.status(404).send({
      status: false,
      error: 'Job does not exist',
    });
  }

  req.job = job;
  return next();
};

export default jobParamValidator;
