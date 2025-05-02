import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    constructor() {
        const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY } =
            process.env;

        v2.config({
            cloud_name: CLOUDINARY_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_SECRET_KEY,
        });
    }

    async uploadImage(
        fileName: string,
        filePath: string,
        width: number
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            v2.uploader.upload(
                filePath,
                {
                    folder: 'tasks/avatars',
                    public_id: fileName,
                    transformation: {
                        width: width,
                        height: width,
                        crop: 'fill',
                    },
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
        });
    }

    async destroyImage(publicId: string) {
        return new Promise((resolve, reject) => {
            v2.uploader.destroy(publicId, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
        });
    }
}
