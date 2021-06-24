import dotenv from 'dotenv';
import { userService } from '../services/userService';

dotenv.config();
/**
 * @class SubscriptionController
 */
export default class SubscriptionController {
  /**
   * @method subscribe
   * @description subscribes a user with their email
   * @param {*} req
   * @param {*} res
   * @returns {object} subscribed user
   */
  static async subscribe(req, res) {
    try {
      const { body } = req;

      const user = await userService.create(body);

      return res.status(201).send({
        status: true,
        user,
        message: `user successfully subscribed`,
      });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).send({
        status: false,
        message: 'something went wrong',
        error,
      });
    }
  }

  /**
   * @method toggleSubscribe
   * @description subscribes/unsubscribes a user with their email
   * @param {*} req
   * @param {*} res
   * @returns {object} subscribed/unsubscribed user
   */
  static async toggleSubscribe(req, res) {
    try {
      const {
        user: { id },
        body: { isSubscribed },
      } = req;

      const user = await userService.update(
        {
          isSubscribed,
        },
        { id }
      );

      return res.status(200).send({
        status: true,
        user: user[1],
        message: `user successfully unsubscribed`,
      });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).send({
        status: false,
        message: 'something went wrong',
        error,
      });
    }
  }
}
