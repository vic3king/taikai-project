import dotenv from 'dotenv';
import sequelize from 'sequelize';
import { jobsService } from '../services/jobsService';
import notifications from '../helpers/notifications';
import models from '../database/models';

const { Location, Type, Skill, Job } = models;
dotenv.config();
/**
 * @class JobController
 */
export default class JobController {
  /**
   * @method post
   * @description posts a new job opening
   * @param {*} req
   * @param {*} res
   * @returns {object} posted job opportunity
   */
  static async post(req, res) {
    try {
      const { body } = req;

      const job = await jobsService.create(body);

      await notifications.notifyUsersOfNewJobEntry(job);

      return res.status(201).send({
        status: true,
        job,
        message: `job successfully posted`,
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: 'something went wrong',
        error,
      });
    }
  }

  /**
   * @method getAll
   * @description returns all job openings
   * @param {*} req
   * @param {*} res
   * @returns {object} job openings
   */
  static async getAll(req, res) {
    try {
      const { query } = req;

      const condition = query.active ? { isActive: query.active } : {};

      const include = [
        {
          model: Location,
          as: 'locations',
          created_at: 'dsc',
          attributes: [
            'id',
            'jobId',
            'latitude',
            'longitude',
            'address',
            'state',
            'city',
            'country',
          ],
        },
        {
          model: Type,
          as: 'contractTypes',
          created_at: 'dsc',
          attributes: ['id', 'jobId', 'jobType'],
        },
        {
          model: Skill,
          as: 'skills',
          created_at: 'dsc',
          attributes: ['id', 'jobId', 'skill'],
        },
      ];

      const job = await jobsService.findAll(condition, include);

      return res.status(200).send({
        status: true,
        job,
        message: `jobs successfully retrieved`,
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: 'something went wrong',
        error,
      });
    }
  }

  /**
   * @method update
   * @description updates a job opening
   * @param {*} req
   * @param {*} res
   * @returns {object} updated job
   */
  static async update(req, res) {
    try {
      const {
        job: { id },
        body: {
          description,
          title,
          recruiter,
          recruiterContact,
          numberOfHires,
          typeId,
          skillId,
          locationId,
        },
      } = req;

      const data = await jobsService.update(
        {
          description,
          title,
          recruiter,
          recruiterContact,
          numberOfHires,
          typeId,
          skillId,
          locationId,
        },
        { id }
      );

      return res.status(200).json({
        status: true,
        data: data[1],
        message: 'job Updated successfully',
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: 'something went wrong',
        error,
      });
    }
  }

  /**
   * @method delete
   * @description deletes a job opening
   * @param {*} req
   * @param {*} res
   * @returns {object} deleted job opening
   */
  static async delete(req, res) {
    try {
      const {
        job: { id },
      } = req;

      await jobsService.delete({ id });

      return res.status(200).send({
        status: true,
        message: `job successfully deleted`,
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: 'something went wrong',
        error,
      });
    }
  }

  /**
   * @method searchJobs
   * @description search for a job opening
   * @param {*} req
   * @param {*} res
   * @returns {object} jobs
   */
  static async searchJobs(req, res) {
    try {
      if (!Object.keys(req.query).length) {
        return res.status(400).json({
          errors: {
            body: ['No search query provided'],
          },
        });
      }
      const searchFilter = req.query.filter;
      const limit = 3;
      const jobs = Job.findAll({
        limit,
        where: {
          title: {
            [sequelize.Op.iLike]: `%${searchFilter}%`,
          },
        },
        include: [
          {
            model: Location,
            as: 'locations',
            created_at: 'dsc',
            attributes: [
              'id',
              'jobId',
              'latitude',
              'longitude',
              'address',
              'state',
              'city',
              'country',
            ],
          },
          {
            model: Type,
            as: 'contractTypes',
            created_at: 'dsc',
            attributes: ['id', 'jobId', 'jobType'],
          },
          {
            model: Skill,
            as: 'skills',
            created_at: 'dsc',
            attributes: ['id', 'jobId', 'skill'],
          },
        ],
      });

      const location = Location.findAll({
        limit,
        where: {
          address: {
            [sequelize.Op.iLike]: `%${searchFilter}%`,
          },
        },

        include: [
          {
            model: Job,
            include: [
              {
                model: Type,
                as: 'contractTypes',
                created_at: 'dsc',
                attributes: ['id', 'jobId', 'jobType'],
              },
              {
                model: Skill,
                as: 'skills',
                created_at: 'dsc',
                attributes: ['id', 'jobId', 'skill'],
              },
            ],
          },
        ],
      });

      const skills = Skill.findAll({
        limit,
        where: {
          skill: {
            [sequelize.Op.iLike]: `%${searchFilter}%`,
          },
        },
        include: [
          {
            model: Job,
            include: [
              {
                model: Type,
                as: 'contractTypes',
                created_at: 'dsc',
                attributes: ['id', 'jobId', 'jobType'],
              },
              {
                model: Skill,
                as: 'skills',
                created_at: 'dsc',
                attributes: ['id', 'jobId', 'skill'],
              },
            ],
          },
        ],
      });

      const [jobsFilter, locationFilter, skillsFilter] = await Promise.all([
        jobs,
        location,
        skills,
      ]);

      return res.status(200).json({
        status: true,
        message: 'jobs successfully retrieved',
        jobsFilter,
        locationFilter,
        skillsFilter,
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: 'something went wrong',
        error,
      });
    }
  }
}
