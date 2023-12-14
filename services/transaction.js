import mongoose from "mongoose";
import Transaction from "../models/transaction.js";
import utils from "../utils/transaction.js";

let Services;

async function allTransactions () {
    return await Transaction.find();
}

async function  newTransaction (company, DOT, typeOfTrans, dolVal, owner) {
    const localTrans = new Transaction({
        company: company, 
        DOT: DOT, 
        transType: typeOfTrans, 
        dolValue: dolVal, 
        owner: owner
    });
    await localTrans.save();
    return localTrans;
}

async function allTransactionsById (tarID){
    return await Transaction.find({owner: tarID})
}

async function aTransaction(tarID){
    return await Transaction.findById(tarID);
}

export default Services = {newTransaction, allTransactionsById, aTransaction, allTransactions}