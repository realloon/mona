/**
 * Mona template engine.
 * @module MonaTplEngine
 */

import concatMetaTags from './concatMetaTags.js'
import mapTplVars from './mapTplVars.js'
import mapTplIncldes from './mapTplIncldes.js'
import { cdn } from '../../../mona.config.js'
import reduceStyleLinks from './reduceStyleLinks.js'

const { styles } = cdn

/**
 * Create a Mona template engine instance.
 * @param {string} template - Template string.
 * @returns {MonaTplEngineInstance} Mona template engine instance object.
 */
export default function MonaTplEngine(template) {
  const slots = {
    meta: '{{ use meta }}',
    list: '{{ use list }}',
    style: '{{ use style }}',
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

    useStyle() {
      const links = reduceStyleLinks(styles)
      const rendered = ctx.replace(slots.style, links)

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

/**
 * Mona Template engine instance.
 * @typedef {object} MonaTplEngineInstance
 * @property {function} useMeta - Interpolation meta tags.
 * @property {function} useStyle - Interpolation cdn styles.
 * @property {function} useVars - Interpolation variables.
 * @property {function} useIncludesAsync - Interpolation includes.
 * @property {function} useContent - Interpolation layout content.
 * @property {function} render - Get rendered result.
 */
