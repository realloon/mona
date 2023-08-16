/**
 * Mona template engine.
 * @module MonaTplEngine
 */

// extractor
import { isString } from '../validators/validators.js'
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
 * @returns {MonaTplEngineInstance} - Mona template engine instance object.
 */
export default function MonaTplEngine(template) {
  if (!isString(template)) {
    throw new Error('Invalid input: A string must be passed in.')
  }

  let ctx = template

  return {
    /**
     * Interpolates meta tags in the template.
     * @param {object} metas - The metadata to be interpolated.
     * @returns {MonaTplEngineInstance} - The Mona template engine instance object.
     */
    useMeta(metas) {
      const metaTags = reduceMetaTags(rawMetas, metas)
      const rendered = ctx.replace(slots.meta, metaTags)

      ctx = rendered

      return this
    },

    /**
     * Interpolates style links in the template.
     * @returns {MonaTplEngineInstance} - The Mona template engine instance object.
     */
    useStyle() {
      const links = reduceStyleLinks(cdn.styles)
      const rendered = ctx.replace(slots.style, links)

      ctx = rendered

      return this
    },

    /**
     * Interpolates variables in the template.
     * @param {object} variables - The variables to be interpolated.
     * @returns {MonaTplEngineInstance} - The Mona template engine instance object.
     */
    useVars(variables) {
      const mapedSlotArr = mapTplVars(ctx, rawVars, variables)

      mapedSlotArr.forEach(({ slot, value }) => {
        ctx = ctx.replace(slot, value)
      })

      return this
    },

    /**
     * Interpolates includes in the template asynchronously.
     * @returns {Promise<MonaTplEngineInstance>} - A promise that resolves to the Mona template engine instance object.
     */
    async useIncludesAsync() {
      const mapedSlotArr = await mapTplIncldes(ctx, slots.include)

      mapedSlotArr.forEach(({ slot, value }) => {
        ctx = ctx.replace(slot, value)
      })

      return this
    },

    /**
     * Interpolates the content in the template.
     * @param {string} content - The content to be interpolated.
     * @returns {MonaTplEngineInstance} - The Mona template engine instance object.
     */
    useContent(content) {
      ctx = ctx.replace(slots.content, content)

      return this
    },

    /**
     * Interpolates the posts list in the template asynchronously.
     * @returns {Promise<MonaTplEngineInstance>} - A promise that resolves to the Mona template engine instance object.
     */
    async useListAsync() {
      const listTages = await reduceListTags(dir.posts)

      ctx = ctx.replace(slots.list, listTages)

      return this
    },

    /**
     * Gets the rendered result of the template.
     * @returns {string} - The rendered template result.
     */
    render() {
      return ctx
    },
  }
}

/**
 * Mona Template engine instance.
 * @typedef {object} MonaTplEngineInstance
 * @property {function} useMeta - Interpolates meta tags.
 * @property {function} useStyle - Interpolates style links.
 * @property {function} useVars - Interpolates variables.
 * @property {function} useListAsync - Interpolates posts list asynchronously.
 * @property {function} useIncludesAsync - Interpolates includes asynchronously.
 * @property {function} useContent - Interpolates layout content.
 * @property {function} render - Gets the rendered result.
 */
