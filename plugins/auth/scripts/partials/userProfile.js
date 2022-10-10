const userProfile = (data) => {
    const userData = data.data();
    const userDisplayName = userData.userCustomDisplayName ? userData.userCustomDisplayName : userData.displayName;
    const userPhotoUrl = userData.userPhotoUrl;

    const htmlTemplate = `
        <div class='elcreative_auth_profile'>
            <img src='${userPhotoUrl}' />
        </div>
    `

    document.body.innerHTML = htmlTemplate;
}

export default userProfile;