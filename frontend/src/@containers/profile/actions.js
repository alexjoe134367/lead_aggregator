export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const LOAD_PROFILE_FORM = 'LOAD_PROFILE_FORM';
export const CHANGE_PROFILE_FORM = 'CHANGE_PROFILE_FORM';
export const CHANGE_PASSWORD_RESET_FORM = 'CHANGE_PASSWORD_RESET_FORM';
export const UPDATE_COCODE = 'UPDATE_COCODE';
export const USE_REDEEMCODE = 'USE_REDEEMCODE';
export const LOAD_COCODE_LIST = 'LOAD_COCODE_LIST';

export const updateUserProfile = profile => ({
    type: UPDATE_USER_PROFILE,
    profile,
});

export const loadProfileForm = profile => ({
    type: LOAD_PROFILE_FORM,
    profile,
});

export const changeProfileForm = profile => ({
    type: CHANGE_PROFILE_FORM,
    profile,
});

export const changePasswordResetForm = passwordResetForm => ({
    type: CHANGE_PASSWORD_RESET_FORM,
    passwordResetForm,
});

export const updateCocode = cocode => ({
    type: UPDATE_COCODE,
    cocode,
});
// export const useRedeemCode = cocode => ({
//     type: USE_REDEEMCODE,
//     cocode,
// })
export const loadCocodesList = cocodeList => ({
    type: LOAD_COCODE_LIST,
    cocodeList,
});
