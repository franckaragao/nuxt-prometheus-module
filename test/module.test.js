// import { JSDOM } from 'jsdom'

jest.setTimeout(60000)

const { Nuxt, Builder } = require('nuxt-edge')
const request = require('request-promise-native')
const getPort = require('get-port')
const config = require('../example/nuxt.config')

config.dev = false

let nuxt, port

const url = path => `http://localhost:${port}${path}`
const get = path => request(url(path))

describe('basic', () => {
  beforeAll(async () => {
    nuxt = new Nuxt(config)
    await nuxt.ready()
    await new Builder(nuxt).build()
    port = await getPort()
    await nuxt.listen(port)
  })

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    const html = await get('/')
    expect(html).toContain('Works!')
  })

  // test('Route / exits and google is in window object', async () => {
  //   const context = {}
  //   const { html } = await nuxt.server.renderRoute('/', context)
  //   const { window } = new JSDOM(html).window
  //   // setTimeout(() => {
  //   expect(window.google).not.toBeNull()
  //   // }, 4000)
  // })

  // test('$google in accessbile in the global context ', () => {
  //   expect(nuxt).not.toBeNull()
  //   // expect(nuxt.context.$google).not.toBeNull()
  // })
})
