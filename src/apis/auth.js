import request from '../utils/request/request';

export const loginGoogle = async (accessToken) => {
    return request.get(`auth/google/callback?access_token=${accessToken}`);
}