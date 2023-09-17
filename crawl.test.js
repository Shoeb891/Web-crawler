const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect} = require('@jest/globals')

test('normalizeURL strip protocol', ()=>{
    const input = "https://roadmap.sh/backend/"
    const actual = normalizeURL(input)
    const expected = "roadmap.sh/backend"
    expect(actual).toEqual(expected)
})

test('normalizeURL case', ()=>{
    const input = "https://ROADMAP.sh/backend/"
    const actual = normalizeURL(input)
    const expected = "roadmap.sh/backend"
    expect(actual).toEqual(expected)
})

test('normalizeURL HTTP', ()=>{
    const input = "http://roadmap.sh/backend/"
    const actual = normalizeURL(input)
    const expected = "roadmap.sh/backend"
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', ()=>{
    const inputURL = "https://roadmap.sh/backend"
    const inputBody =` <html><body><a href="https://roadmap.sh/backend">roadmap</a></body></html>`
    const actual = getURLsFromHTML(inputBody,inputURL)
    const expected = ['https://roadmap.sh/backend']
    expect(actual).toEqual(expected)

})

test('getURLsFromHTML relative', ()=>{
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one' ]
    expect(actual).toEqual(expected)

})

test('getURLsFromHTML both', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML handle error', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ ]
    expect(actual).toEqual(expected)
  })
