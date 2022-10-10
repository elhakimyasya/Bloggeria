const userProfile = (data, container, options) => {
    const userData = data.data();
    const userDisplayName = userData.userCustomDisplayName ? userData.userCustomDisplayName : userData.displayName;
    const userPhotoUrl = userData.userPhotoUrl;
    const userRole = userData.userRole;
    const userWebURL = userData.userWebURL;
    const userBio = userData.userBio;

    const htmlTemplate = `
        <div class='relative flex w-full flex-col items-center justify-center rounded-lg border border-colorBorder p-3 dark:border-colorColorModeDarkBorder'>
            <div class='flex w-full flex-col items-center justify-center lg:flex-row'>
                <div class='relative h-[100px] w-[100px] flex-shrink-0 flex-grow-0'>
                    <img src='${userPhotoUrl ? userPhotoUrl : options.imageUserDefault}' alt='${userDisplayName}' title='${userDisplayName}' class='h-full w-full rounded-full text-transparent'/>
                    ${userRole ? (userRole == 'admin' ? `<svg class='absolute bottom-0 rounded-full bg-colorBackground fill-current p-1 text-colorKey ltr:right-0 rtl:left-0 dark:bg-colorColorModeDarkBackground dark:text-colorColorModeDarkKey' height='28' viewBox='0 0 24 24' width='28' title='Admin'>${options.icon.elementIconVerified}</svg>` : '') : ''}
                </div>
                <div class='mt-3 flex w-full flex-col items-center justify-center lg:mt-0 lg:items-start ltr:lg:ml-4 rtl:lg:mr-4'>
                    <div class='text-lg text-colorText dark:text-colorColorModeDarkText'>
                        <strong>${userDisplayName}</strong>
                    </div>
                    <div class='flex w-full flex-row items-center justify-center text-sm lg:justify-start'>
                        ${userWebURL ? `<a href='${userWebURL}' class='text-colorKey hover:underline dark:text-colorColorModeDarkKey' target='_blank' rel='nofollow noopener noreferer'>Website</a>` : ''}
                    </div>
                    ${userBio ? `<div class='mt-1 w-full text-center text-sm text-colorMeta dark:text-colorColorModeDarkMeta lg:text-start'>${userBio}</div>` : ''}
                </div>
            </div>
            <button class='elcreative_button_icon elcreative_ripple absolute top-3 text-colorMeta hover:bg-colorTextTrans1 focus:bg-colorTextTrans1 active:bg-colorTextTrans2 ltr:right-3 rtl:left-3 dark:text-colorColorModeDarkMeta' aria-label='More' title='More' aria-expanded='false' aria-haspopup='listbox' data-toggle-class-on-target='active'  data-toggle-target='#dropdown_auth_profile_more' data-toggle-escape data-toggle-outside><svg width='20' height='20' viewBox='0 0 24 24'>${options.icon.elementIconSettings}</svg></button>
        </div>
    `

    container.innerHTML = htmlTemplate;
}

export default userProfile;