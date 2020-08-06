/*
    Includes the IDs and the keys needed for authentication with Google, Facebook, etc.
    Includes several settings as well.
 */


//Google
GOOGLE_CLIENT_ID = "541694063522-hviuvatfksluu2omm9tsg6senh5lgg30.apps.googleusercontent.com";
GOOGLE_CLIENT_SECRET = "OJwiNpA5-likC6WuXjP-lbCl";

googleConfig = {
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    redirect: 'http://localhost:3000/gamothpanagiamoupia' // this must match your google api settings
};




//Facebook







module.exports = {
    googleConfig: googleConfig
};
