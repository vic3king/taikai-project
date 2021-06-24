import models from '../database/models';
import BaseService from './baseService';

const { Job } = models;

/**
 * @class JobsService
 */
export default class JobsService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(Job);
  }
}

export const jobsService = new JobsService();
