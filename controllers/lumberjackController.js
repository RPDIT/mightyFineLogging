import asyncHandler from "express-async-handler";
import lumberServices from "../services/lumberServices.js";
import bcrypt from "bcrypt"

let user_list, create_user, find_user, delete_user
let lumber_controller


user_list = asyncHandler(async (req,res,next) => {
    res.json(await lumberServices.all_users());
});

create_user = asyncHandler(async (req,res,next) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, async(err, pw) => {
        try {
            const newLumberjack = await lumberServices.user_creation(req.body.email_address, pw);
            console.log("New user created with email address: "+ newLumberjack.email_address + "\n At: " + newLumberjack.created);
            res.json(newLumberjack);
            
        } catch (error) {
            res.status(error).send(" Error!");
        };
    });
    
});

find_user = asyncHandler(async (req,res,next) => { // Parts of this function and delete user may be able to be moved into their own functions or run as a middlewear
    let user_status, found_results
    const  results_list = await lumberServices.user_by_email(req.body.email_address );
    console.log(results_list);
    if (results_list.length === 0) {
        res.send("No User Found")
    } else {
        for (let i = 0; i < results_list.length; i++) {
            let current_result = results_list[i];
            bcrypt.compare(req.body.password, current_result.password,(err, result) => {
                console.log(`Nice password: ${result}`);
                if (result =! true){
                    user_status = false;
                    found_results = {
                    user_exists: user_status,
                    user_data: "No User"
                    };
                    console.log(err);
                    return res.send(err);
                } else {
                    user_status = true;
                    found_results = {
                        user_exists: user_status,
                        user_data: current_result
                    };
                    return res.json(found_results);
            }
    })};}    
});

delete_user = asyncHandler(async(req, res) => {
    const  results_list = await lumberServices.user_by_email(req.body.email_address );
    console.log(results_list);
    if (results_list.length != 0) {
        for (let i = 0; i < results_list.length; i++) {
            let current_result = results_list[i];
    //         bcrypt.compare(req.body.password, current_result.password,(err, result) => {
    //             console.log(`Nice password: ${result}`);
    //             if (result =! true){
    //                 res.send("Nothing was deleted")
    //             } else {
    //                 let results = await lumberServices.delete_user(current_result._id)
    //                 res.json(results);
    //         }.
    // })}
            const comparison = bcrypt.compareSync(req.body.password, current_result.password);
            if (comparison == true) {
                let results = await lumberServices.delete_user(current_result._id)
                res.json(results);
            };
        };
    } else {
        res.send("No User Deleted")
    };
});



export default lumber_controller = {user_list, create_user, find_user, delete_user};
