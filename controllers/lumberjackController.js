import asyncHandler from "express-async-handler";
import lumberServices from "../services/lumberServices.js";
import bcrypt from "bcrypt"

let user_list, create_user, find_user, reset_session
let lumber_controller


user_list = asyncHandler(async (req,res,next) => {
    res.json(await lumberServices.all_users());
});

create_user = asyncHandler(async (req,res,next) => {
    console.log(req.body);
    
    
    try {
        const newLumberjack = await lumberServices.user_creation(req.body.email_address, pw);
        console.log("New user created with email address: "+ newLumberjack.email_address + "\n At: " + newLumberjack.created);
        res.json(newLumberjack);
        
    } catch (error) {
        res.status(error).send(" Error!");
    };
});

find_user = asyncHandler(async (req,res,next) => {
    let user_status,db_data, pw;
    let results_list = await lumberServices.user_by_email(req.body.email_address);
    pw = await bcrypt.hash(req.body.password, 10);
    // console.log(results_list)

    if (results_list.length === 0) {
        res.send("No User Found")
    } else {
        for (let i = 0; i < results_list.length; i++) {
            let current_result = results_list[i];
            if (bcrypt.compare(req.body.password, current_result.password)) {
                user_status = true;
                db_data = current_result
                let found_results = {
                    user_exists: user_status,
                    user_data: db_data
                };
                res.json(found_results);
            } else {
                user_status = false;
                let found_results = {
                    user_exists: user_status,
                    user_data: []
                };
                res.json(found_results);
            };
    };}
    
});



export default lumber_controller = {user_list, create_user, find_user};
