import {api} from '../../@services';
import * as actions from './actions';
import {sendMessage} from "../messages/thunks";


export const getUserProfile = () => async (dispatch) => {
    try {
        const {data} = await api.get('/v1/profile');
        await dispatch(actions.updateUserProfile(data.profile));
        await dispatch(actions.loadProfileForm(data.profile));
        await dispatch(actions.loadCocodesList(data.cocodes))
    } catch (e) {
        // dispatch(sendMessage(e.message, true))
    }
};

export const updateProfile = profile => {
    return async dispatch => {
        try {
            await api.patch('/v1/profile', profile);
            await dispatch(getUserProfile());
            dispatch(sendMessage('Your profile was updated'))
        } catch (e) {
            dispatch(sendMessage(e.message, true));
        }
    }
};
export const useCode = (profile,cocode) => {
    return async dispatch => {
        try {
            const data = await api.post('/v1/use-cocode', {profile , cocode});
            console.log("data", data);
            await dispatch(getUserProfile());
            if(data.data.result === true){
                dispatch(sendMessage(data.data.message));
            }else{
                dispatch(sendMessage(data.data.message, true));    
            }
        } catch (e) {
            dispatch(sendMessage(e.message, true));
        }
    }
};

