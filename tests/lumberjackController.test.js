import chai from 'chai';
import chaitHttp from 'chai-http';
import server from '../index.js';
import express from 'express';
import {faker} from '@faker-js/faker';



const should = chai.should();
chai.use(chaitHttp);

class newTest {
    constructor ( email, password) {
        this.email = email;
        this.password = password;
    }
    getRequest (route, typeAssertion) {
        chai.request(server)
            .get('/'+ route)
            .end((err,res) => {
                let results = res.body;
                let test_result = results[0];
                console.log(test_result)
                results.should.be.a(typeAssertion);
            })};


    createUser () {
        chai.request(server)
            .post('/permit', (req, err) => {
                req.body = {
                    "email_address": this.email,
                    "password": this.password
                }
            })
            .end((err,res) => {
                let results = res.body;
                console.log(results)
                results.should.be.a('object');
                
            })};
}

describe ('Testing Lumberjack (User) Controller', () => {
    const testUser = new newTest(faker.internet.email(), faker.internet.password())
    // console.log(testUser.email, testUser.password);
    describe ('GET /permit', () => {
        it ('It should return an array', async () => {
            testUser.getRequest('permit', 'array');
        });
    });
    describe ('POST /PERMIT', () => {
        it ('It should return a new user Object', async () => {
            testUser.createUser()
        })
    })
})