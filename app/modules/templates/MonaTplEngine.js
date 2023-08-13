import concatMetaTags from './concatMetaTags.js'
import mapTplVars from './mapTplVars.js'
import mapTplIncldes from './mapTplIncldes.js'

/**
 * Mona template engine.
 * @module MonaTplEngine
 */

/**
 * Mona Template engine instance.
 * @typedef {object} MonaTplEngineInstance
 * @property {function} useMeta - Interpolation meta tags.
 * @property {function} useVars - Interpolation variables.
 * @property {function} useIncludesAsync - Interpolation includes.
 * @property {function} useContent - Interpolation layout content.
 * @property {function} render - Get rendered result.
 */

/**
 * Create a Mona template engine instance.
 * @param {string} template - Template string.
 * @returns {MonaTplEngineInstance} Mona template engine instance object.
 */
export default function MonaTplEngine(template) {
  const slots = {
    meta: '{{ use meta }}',
    list: '{{ use list }}',
  }

  let ctx = template

  return {
    /**
     * Interpolation meta tags
     * @returns {MonaTplEngineInstance}
     */
    useMeta(metas) {
      const metaTags = concatMetaTags(metas)
      const rendered = ctx.replace(slots.meta, metaTags)

      ctx = rendered

      return this
    },

    /**
     * Interpolation variables.
     * @param {object} variables
     * @returns {MonaTplEngineInstance}
     */
    useVars(variables) {
      const mapedSlotArr = mapTplVars(ctx, variables)

      mapedSlotArr.forEach(({ slot, value }) => {
        ctx = ctx.replace(slot, value)
      })

      return this
    },

    async useIncludesAsync() {
      const mapedSlotArr = await mapTplIncldes(ctx)

      mapedSlotArr.forEach(({ slot, value }) => {
        ctx = ctx.replace(slot, value)
      })

      return this
    },

    useList() {
      return this
    },

    /**
     * Get rendered result
     * @returns {string} Rendered template result.
     */
    render() {
      return ctx
    },
  }
}
