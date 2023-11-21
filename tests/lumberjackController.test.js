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
    getRequest (route) {
        chai.request(server)
            .get('/'+ route)
            .end((err,res) => {
                this.data =  res.body;
            })};

    postRequest (route) {
        console.log(this.email, this.password)
        chai.request(server)
            .post(route, (req, err) => {
                req.body = {
                    "email_address": this.email,
                    "password": this.password
                }
            })
            .end((err,res) => {
                this.data = res.body;
            })};
}

describe ('Testing Lumberjack (User) Controller', () => {
    const testUser = new newTest(faker.internet.email(), faker.internet.password())
    // console.log(testUser.email, testUser.password);
    describe ('GET /permit', () => {
        it ('It should return an array', () => {
            chai.request(server)
                .get('/permit')
                .end((err,res) => {
                    res.body.should.be.a('array');
            })
            
        });
    });
    describe ('POST /permit to create a new User', () => {
        it ('It should return a new user Object', () => {
            chai.request(server)
            .post('/permit', (req, err) => {
                req.body = {
                    "email_address": this.email,
                    "password": this.password
                }
            })
            .end((err,res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('email_address');
            })
            
        })
    })
    describe ('POST /login to return a single user', () => {
        const testEmail= "creationTesting@gmail.de"
        const testPw = "a&+_/asdfb4"
        it (`It shoud return the user ${testEmail}`, async () => {
            chai.request(server)
            .post('/permit', (req, err) => {
                req.body = {
                    "email_address": testEmail,
                    "password": testPw
                }
            })
            .end((err,res) => {
                console.log(res.body)
                res.body.should.be.a('object');
                res.body.should.have.property('userData');
                res.body.userData.email_address.should.equal(testEmail);
                console.log(testEmail, res.body.userData.email_address)
        })
            })
            
    })
})
