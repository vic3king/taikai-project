/**
 * @class BaseService
 */
export default class BaseService {
  /**
   * @method constructor
   * @param {object} model
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * @method create
   * @description
   * @param {object} dataObject
   * @returns {object} created object
   */
  async create(dataObject) {
    const data = this.model.create(dataObject);
    return data;
  }

  /**
   * @method find
   * @param {object} missingObject
   * @param {array} includeResource
   * @returns {object} found object
   */
  async find(missingObject, includeResource) {
    const found = this.model.findOne({
      where: missingObject,
      include: includeResource,
    });
    return found;
  }

  /**
   * @method update
   * @param {*} dataObject
   * @param {*} whereObject
   * @returns {object} updated row
   */
  async update(dataObject, whereObject) {
    const data = await this.model.update(dataObject, {
      where: whereObject,
      returning: true,
      plain: true,
    });
    return data;
  }

  /**
   * @method findAll
   * @param {object} missingObject
   * @param {array} includeResource models to include
   * @param {array} orderByArray models to include
   * @param {number} limit result limit
   * @param {number} offset skip over
   * @returns {object} found object
   */
  async findAll(missingObject, includeResource, orderByArray, limit, offset) {
    return this.model.findAll({
      where: missingObject,
      include: includeResource,
      order: orderByArray,
      limit,
      offset,
    });
  }

  /**
   * @method delete
   * @param {object} missingObject
   * @returns {null} null
   */
  async delete(missingObject) {
    await this.model.destroy({ where: missingObject });
  }
}
