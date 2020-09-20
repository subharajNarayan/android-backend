

const auth = function(req,res,next){
    console.log("WOWWWW");

    next();
}

module.exports = auth;