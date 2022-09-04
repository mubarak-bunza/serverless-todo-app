import * as AWS from 'aws-sdk'
import { createLogger } from '../utils/logger'
import { Types } from 'aws-sdk/clients/s3';

const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('AttachmentUtils')

// TODO: Implement the fileStogare logic
export class AttachMentUtils {
    constructor(
        private readonly s3Client: Types = new XAWS.S3({ signatureVersion: 'v4' }),
        private readonly s3BucketName = process.env.ATTACHMENT_S3_BUCKET) {
    }    

    async createAttachmentPresignedUrl(todoId: string): Promise<string> {
        logger.info("Generating Presigned URL");

        const url = this.s3Client.getSignedUrl('putObject', {
            Bucket: this.s3BucketName,
            Key: todoId,
            Expires: 300,
        });

        logger.info(url);
        return url as string;
    }
}