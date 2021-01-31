// import { JSDOM } from 'jsdom'

jest.setTimeout(60000)

const { Nuxt, Builder } = require('nuxt-edge')
const config = require('../example/nuxt.config')

config.dev = false

let nuxt

describe('basic', () => {
  beforeAll(async () => {
    nuxt = new Nuxt(config)
    await nuxt.ready()
    await new Builder(nuxt).build()
  })

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', () => {
    expect('Works!').toContain('Works!')
  })
})
