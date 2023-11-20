
let sessionUtils;
function sessionReset (session_obj) {
    session_obj.active = false;
    session_obj.clientUser = {};
    session_obj.dbResults = {};
    session_obj.edited = Date.now();
    return session_obj;
};

function sessionTesting (session_obj) {
    session_obj.active = true;
    session_obj.clientUser = {name: "testing"};
    session_obj.dbResults = {results: "tested"};
    session_obj.edited = Date.now();
    return session_obj
}

function findRandom (session_array) {
    session_count = session_array.length;
    random = Math.floor(Math.random() * session_count);
    single_result = available_array[random];
    single_result.active = true;
    return single_result;
}

export default sessionUtils = {sessionReset, findRandom, sessionTesting};