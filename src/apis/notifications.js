
import qs from 'qs';
import requestAuth from '../utils/request/request-auth';

export const getNotifications = async (params = {}, pageParam) => {
    const query = qs.stringify(params);
    const data = await requestAuth.get(`notifications?${query}&pagination[page]=${pageParam}`);
    return {data, pageParam};
}

export const getUnreadNotifications = async (params = {}) => {
    const query = qs.stringify(params);
    return await requestAuth.get(`notifications?${query}`);
}

export const readNotifications = async () => {
    return requestAuth.put('notifications/read');
}
