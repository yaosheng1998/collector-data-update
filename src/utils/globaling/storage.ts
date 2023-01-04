import request from '@/api';

export const readFileFromArrayBuffer = async (file: File): Promise<ArrayBuffer> => {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.addEventListener('loadend', event => {
            resolve(event.target.result as ArrayBuffer);
        });
        reader.readAsArrayBuffer(file);
    });
};

export const getFileUrl = async (uuid: string, fileName: string) => {
    const data = await request.get('/investment_service/storage/download/grant', {
        route_type: 'datlas',
        grant_type: 'download',
        collector_template_uuid: uuid,
        file_name: fileName,
        expires: 60 * 60 * 24 * 30
    });
    if (!data || data['code'] !== 0) return Promise.reject();
    return Promise.resolve((data['data'] || {}).presigned_url || '');
};

export const getFileBuffer = async (uuid: string, fileName: string) => {
    const url = await getFileUrl(uuid, fileName);
    const data = (await request.get(url, {}, { responseType: 'blob' })) as unknown as string;
    return await readFileFromArrayBuffer(new File([data], fileName.split('/').pop()));
};

export const uploadFile = async (uuid: string, fileName: string, file: File) => {
    const grant = await request.get('/investment_service/storage/upload/grant', {
        route_type: 'datlas',
        grant_type: 'upload',
        collector_template_uuid: uuid,
        content_type: 'application/octet-stream',
        file_name: fileName
    });
    const arraybuffer = await readFileFromArrayBuffer(file);
    if (!grant || grant['code'] !== 0) return Promise.reject();
    const uploadUrl = (grant['data'] || {}).presigned_url || '';
    return request.put(uploadUrl, arraybuffer);
};
