'use strict';

const urls = {
    urls: {
        '/': [''],
        '/login/': ['login'],
        '/signup/': ['registerUser'],
        '/forgotpassword/': ['sendLink', 'passwordReset'],
        '/commonroutes/': ['activateEmail', 'checkUsername'],
        '/social/': ['socialFacebook', 'socialFacebookApp', '/auth/facebook', 'auth/facebook/callback', 'socialGoogle', 'socialGoogleApp', '/auth/google', 'auth/google/callback']
    },
    authUrls: {
        '/': ['webindex', 'sendActivationLink', 'logout'],
        '/profile/': ['changeUsername', 'updateProfileData', 'updateMobile', 'verifyCode', 'setNewPassword', 'uploadPic']
    },
}

module.exports = urls;