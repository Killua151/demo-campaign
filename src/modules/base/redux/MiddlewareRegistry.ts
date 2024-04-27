/* @flow */

import { applyMiddleware } from "redux";

/**
 * A registry for Redux middleware, allowing features to register their
 * middleware without needing to create additional inter-feature dependencies.
 */
class MiddlewareRegistry {
  _elements: any[];
  /**
   * Creates a MiddlewareRegistry instance.
   */
  constructor() {
    /**
     * The set of registered middleware.
     *
     * @private
     * @type {Middleware[]}
     */
    this._elements = [];
    this.register = MiddlewareRegistry.prototype.register;
  }

  /**
   * Applies all registered middleware into a store enhancer.
   * (@link http://redux.js.org/docs/api/applyMiddleware.html).
   *
   * @param {Middleware[]} additional - Any additional middleware that need to
   * be included (such as middleware from third-party modules).
   * @returns {Middleware}
   */
  applyMiddleware() {
    // $FlowExpectedError
    if (this._elements.length === 0) {
      return applyMiddleware();
    }
    return applyMiddleware(...this._elements);
  }

  /**
   * Adds a middleware to the registry.
   *
   * The method is to be invoked only before {@link #applyMiddleware()}.
   *
   * @param {Middleware[]} middlewares - A Redux middleware.
   * @returns {void}
   */
  register(middlewares: any) {
    this._elements = this._elements.concat(middlewares);
  }
}

/**
 * The public singleton instance of the MiddlewareRegistry class.
 */
export default new MiddlewareRegistry();
