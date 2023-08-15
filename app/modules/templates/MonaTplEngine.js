/**
 * Mona template engine.
 * @module MonaTplEngine
 */

// extractor
import { isString } from '../validators/baseValidators.js'
import reduceMetaTags from './reduceMetaTags.js'
import mapTplVars from './mapTplVars.js'
import mapTplIncldes from './mapTplIncldes.js'
import reduceListTags from './reduceListTags.js'
import reduceStyleLinks from './reduceStyleLinks.js'

// external dependency
import {
  metas as rawMetas,
  data as rawVars,
  cdn,
  slots,
  dir,
} from '../../../mona.config.js'

/**
 * Create a Mona template engine instance.
 * @param {string} template - Template string.
 * @returns {MonaTplEngineInstance} Mona template engine instance object.
 */
export default function MonaTplEngine(template) {
  if (!isString(template)) {
    throw new Error('Invalid input: A string must be passed in.')
  }

  let ctx = template

  return {
    /**
     * Interpolation meta tags
     * @returns {MonaTplEngineInstance}
     */
    useMeta(metas) {
      const metaTags = reduceMetaTags(rawMetas, metas)
      const rendered = ctx.replace(slots.meta, metaTags)

      ctx = rendered

      return this
    },

    useStyle() {
      const links = reduceStyleLinks(cdn.styles)
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
      const mapedSlotArr = mapTplVars(ctx, rawVars, variables)

      mapedSlotArr.forEach(({ slot, value }) => {
        ctx = ctx.replace(slot, value)
      })

      return this
    },

    async useIncludesAsync() {
      const mapedSlotArr = await mapTplIncldes(ctx, slots.include)

      mapedSlotArr.forEach(({ slot, value }) => {
        ctx = ctx.replace(slot, value)
      })

      return this
    },

    useContent(content) {
      ctx = ctx.replace(slots.content, content)

      return this
    },

    async useListAsync() {
      const listTages = await reduceListTags(dir.posts)

      ctx = ctx.replace(slots.list, listTages)
      
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
 * @property {function} useListAsync - Interpolation posts list.
 * @property {function} useIncludesAsync - Interpolation includes.
 * @property {function} useContent - Interpolation layout content.
 * @property {function} render - Get rendered result.
 */
