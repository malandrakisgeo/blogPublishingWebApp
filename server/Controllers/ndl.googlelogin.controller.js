const {google} = require('googleapis');
const loginConfig = require('../Config/ndl.login.config');


function createConnection() {
    return new google.auth.OAuth2(
        loginConfig.googleConfig.clientId,
        loginConfig.googleConfig.clientSecret,
        loginConfig.googleConfig.redirect
    );
}

function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: ['https://www.googleapis.com/auth/userinfo.email']
    });
}

function getGooglePlusApi(auth) {
    return google.plus({version: 'v1', auth});
}


function urlGoogle() {
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    console.log(url);
    return url;
}


function getGoogleAccountFromCode(code) {
    /*const data = auth.getToken(code);
    const tokens = data.tokens;
    const auth = createConnection();
    auth.setCredentials(tokens);
    const plus = getGooglePlusApi(auth);
    const me = plus.people.get({userId: 'me'});
    const userGoogleId = me.data.id;
    const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
    return {
        id: userGoogleId,
        email: userGoogleEmail,
        tokens: tokens,
    };*/
}





module.exports = {
    getURL: urlGoogle(),
    getAccountAndTokens: getGoogleAccountFromCode()
};
