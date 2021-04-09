import pkg from 'mocha'
import chai from 'chai'
import request from 'supertest'
import '../server.js'

const backend = request.agent('http://localhost:3000/api')
const expect = chai.expect
const { describe, it } = pkg
let accessToken
let id

// Testing register
describe('POST /register', () => {
  it('Should respond with error status 400 if all fields are not filled', (done) => {
    backend.post('/register', {}).end((err, res) => {
      if (err) throw err
      expect(res.status).to.equal(400)
      done()
    })
  })
  it('Should respond with error status 400 if the email is not an email', (done) => {
    backend
      .post('/register')
      .send({
        username: 'test',
        email: 'testmail.com',
        password: '1234567%',
        password2: '1234567%'
      })
      .end((err, res) => {
        if (err) throw err
        expect(res.status).to.equal(400)
        expect(res.body.email).to.equal('Not a valid email')
        done()
      })
  })

  it('Should respond with error status 400 if the password has less than 7 characters', (done) => {
    backend
      .post('/register')
      .send({
        username: 'test',
        email: 'test@mail.com"',
        password: '12345',
        password2: '12345'
      })
      .end((err, res) => {
        if (err) throw err
        expect(res.status).to.equal(400)
        expect(res.body.password).to.equal(
          'Password must be minst 7 characters long'
        )
        done()
      })
  })

  it('Should add the user to the database', (done) => {
    backend
      .post('/register')
      .send({
        username: 'test',
        email: 'test@mail.com',
        password: 'abc1234@',
        password2: 'abc1234@'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) throw err
        expect(res.status).to.equal(200)
        done()
      })
  })

  it('Should respond with error status 409 if the email already exists', (done) => {
    backend
      .post('/register')
      .send({
        username: 'test',
        email: 'test@mail.com',
        password: '1234567',
        password2: '1234567'
      })
      .end((err, res) => {
        if (err) throw err
        expect(res.status).to.equal(409)
        expect(res.body.message).to.equal('Conflict')
        done()
      })
  })
})

// Testing loggain
describe('POST /login', () => {
  it('Should respond with error status 400 if not all fields are filled', (done) => {
    backend.post('/login', {}).end(function (err, res) {
      if (err) throw err
      expect(res.status).to.equal(400)
      done()
    })
  })
  it('Should respond with error 401 if the email is not found', (done) => {
    backend
      .post('/login')
      .send({
        username: 'test1',
        email: 'test1@mail.com',
        password: '1234567',
        password2: '1234567'
      })
      .end((err, res) => {
        if (err) throw err
        expect(res.status).to.equal(401)
        done()
      })
  })

  it('Should respond with error 401 if the email or the password is incorrect', (done) => {
    backend
      .post('/login')
      .send({
        username: 'test',
        email: 'test@mail.com',
        password: '1234567',
        password2: '1234567'
      })
      .end((err, res) => {
        if (err) throw err
        expect(res.status).to.equal(401)
        done()
      })
  })

  it('should sign in the user', (done) => {
    backend
      .post('/login')
      .send({
        username: 'test',
        email: 'test@mail.com',
        password: 'abc1234@',
        password2: 'abc1234@'
      })
      .end(function (err, res) {
        if (err) throw err
        accessToken = res.body.access_token
        expect(res.status).to.equal(200)
        done()
      })
  })
})

// Testing get all recipes
describe('GET /recipe', () => {
  it('Should get all recipe', (done) => {
    backend
      .get('/recipe')
      .set({ Authorization: `Bearer ${accessToken}` })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) throw err
        expect(res.status).to.equal(200)
        done()
      })
  })
})

// Testing create new recipe
describe('POST /recipe', () => {
  it('Should create new recipe', (done) => {
    backend
      .post('/recipe')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ title: 'test recipe', ingredients: 'test', instructions: 'recipe', category: 'dinner' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) throw err
        id = res.body.id
        expect(res.status).to.equal(201)
        expect(res.body.title).to.equal('test recipe')
        expect(res.body.ingredients).deep.equal(['test'])
        expect(res.body.instructions).to.equal('recipe')
        expect(res.body.category).to.equal('dinner')
        done()
      })
  })
})

// Testing get the specific recipe
describe('GET /recipe/:id', () => {
  it('Should get the specific recipe', (done) => {
    backend
      .get(`/recipe/${id}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) throw err
        expect(res.status).to.equal(200)
        done()
      })
  })
})

// Testing change the recipe
describe('PUT /recipe', () => {
  it('Should create new recipe', (done) => {
    backend
      .put(`/recipe/${id}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ title: 'test recipe 2', ingredients: 'test2', instructions: 'recipe2', category: 'BBQ' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) throw err
        expect(res.status).to.equal(204)
        done()
      })
  })
})

// Testing delete the recipe
describe('DELETE /recipe', () => {
  it('Should create new recipe', (done) => {
    backend
      .delete(`/recipe/${id}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) throw err
        expect(res.status).to.equal(204)
        done()
      })
  })
})
