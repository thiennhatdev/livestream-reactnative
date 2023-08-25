import requestAgora from '../utils/request/request-agora';

export const getAllChanelLivestream = async (appid) => {
    return requestAgora.get(`channel/${appid}`);
}