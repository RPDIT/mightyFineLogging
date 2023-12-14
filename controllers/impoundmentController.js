import express from "express";

import utils from "../utils/transaction.js";
import lumberServices from "../services/lumberServices.js";
import transactionServices from "../services/transaction.js";

const getUserImpoundment = async(req, res) => {
    const id = req.params.id;
    const dbUser = await lumberServices.user_by_id(id);
    console.log(dbUser);
    if (dbUser.impoundment)  {
        return await res.status(200).send(dbUser);
    } else { 
        res.send("no impoundment.")
    };
};

const allTransactions = async(req, res) => {
    try {
        const all_transactions = await transactionServices.allTransactions()
        return await res.status(200).json(all_transactions)
    } catch (error) {
        return res.status(400).send(error);
    }
}; 

const getTransactions = async(req, res) => {
    const id = req.params.id;
    const allTransactions = await transactionServices.allTransactionsById(id);
    const dbUser = await lumberServices.user_by_id(id);
    if (allTransactions.length > 0)  {
        const running_total = utils.getRunningTotal(allTransactions);
        dbUser.impoundment.running_total = running_total;
        await dbUser.save();
        return await res.status(200).json(allTransactions);
    } else { 
        res.send("no transactions.")
    };
};

const newTransaction = async(req, res) => {
    const id = req.params.id;
    try {
        const dbUser = await lumberServices.user_by_id(id);
        const newTransaction = await transactionServices.newTransaction(
            req.body.company, 
            Date.now(), 
            req.body.transType, 
            req.body.dolValue, 
            id
            );
        if (newTransaction)  {
            dbUser.impoundment.transactions.push(newTransaction.id);
            await dbUser.save();
            await res.status(200).json(dbUser);
        } else { 
            await res.status(404).send("no impoundment.");
    }} catch (error) {
        res.status(400).send(error);
    };
};

const createImpoundment = async(req, res) => {
    const id = req.params.id;
    const dbUser = await lumberServices.user_by_id(id);
    // if (dbUser.impoundment)  {
    //     return await res.status(200).send("Impoundment already present")
    // }
    dbUser.impoundment = {"running_total":0};
    try {
        await dbUser.save();
        res.status(200).json(dbUser.impoundment);
    } catch (error) {
        res.status(error).send(" Error!");
    }
};



export default {getUserImpoundment, createImpoundment, newTransaction, getTransactions, allTransactions};