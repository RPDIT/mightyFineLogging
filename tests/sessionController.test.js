import chai from 'chai';
import chaitHttp from 'chai-http';
import server from '../index.js';
import express from 'express';



const should = chai.should();
chai.use(chaitHttp);

describe ('Testing Session Controller', () => {
    // let CURRENT_LIST = CURRENT_HANDLER.sessions

    // describe ('Testing the active Session List', async () => {
    //         it ('It should return an array of ids', async () => {
    //             // console.log(CURRENT_LIST);
    //             CURRENT_LIST.should.be.a('array');
    //             // CURRENT_LIST.should.have.lengthOf('1');
    //         });
    //     });
    // CURRENT_LIST = CURRENT_HANDLER.sessions
    // let session_list, test_result;

    describe ('GET Request', () => {
        it ('It should return an array', async () => {
            chai.request(server)
            .get('/forest')
            .end((err,res) => {
                let results = res.body;
                let test_result = results[0];
                results.should.be.a('array');
            });
        });
    });

    
    describe ('GET Session With Test Route', () => {
        it ('It should return a single object with testing values', async () => {
            chai.request(server)
            .get(`/test/647e7e934ab67e89997bf058`)
            .end((err,res) => {
                let results = res.body; 
                results.should.be.a('object');
                results.active.should.equal(true);
                results.clientUser.should.equal({ name: "testing" });
            });
        });
    });

    describe ('GET Session With Clear Route', () => {
        it ('It should return a single object with default values', async () => {
            chai.request(server)
            .get(`/clear/647e7e934ab67e89997bf058`)
            .end((err,res) => {
                let results = res.body; 
                results.should.be.a('object');
                results.active.should.equal(false);
            });
        });
    });

    describe ('GET All Available Sessions', () => {
        it ('It should return an Array of Session objects with "active: false"', async () => {
            chai.request(server)
            .get(`/forest`)
            .end((err,res) => {
                let results = res.body; 
                results.should.be.a('array');
                results[0].active.should.equal(false);
            });
        });
    });

    describe ('GET All Unvailable Sessions', () => {
        it ('It should return an Array of Session objects with "active: true"', async () => {
            chai.request(server)
            .get(`/deforested`)
            .end((err,res) => {
                let results = res.body; 
                results.should.be.a('array');
                results[0].active.should.equal(true);;
            });
        });
    });

    describe ('GET Session Creation', () => {
        it ('It should return a fresh Session Object', async () => {
            chai.request(server)
            .get(`/creation`)
            .end((err,res) => {
                let result = res.body;
                result.should.be.a('object');
                result.active.should.equal(false);
            });
        });
    });
    
});


// Remaining:
// New Session

//