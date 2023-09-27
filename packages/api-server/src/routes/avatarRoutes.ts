import fs from 'fs';
import { promisify } from 'util';
import express from 'express';
import helmet from 'helmet';
import { upload } from '@/config/multer';
import { uploadFile, getFileStream, deleteFile } from '@/config/s3';
import OutsideTRPCError from '@/errors/outsideTRPCError';

const router = express.Router();

const unlinkFile = promisify(fs.unlink);

router
  .route('/:awsKey')
  .get(
    helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }),
    async (req, res) => {
      const awsKey = req.params.awsKey;
      const readStream = getFileStream(awsKey);

      readStream.pipe(res);
    }
  )
  .delete(async (req, res) => {
    const awsKey = req.params.awsKey;
    const result = await deleteFile(awsKey);
    res.status(204).json(result);
  });

router.post('*', upload.single('avatar'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      status: 'fail',
      message: 'No file provided.',
    });
  }

  try {
    const awsResult = await uploadFile(req.file);
    await unlinkFile(req.file.path);
    res.status(200).json({
      status: 'success',
      imagePath: `/api/v1/avatars/${awsResult.Key}`,
    });
  } catch (err) {
    throw new OutsideTRPCError({
      message: err.message,
      code: 'BAD_REQUEST',
      name: err.message,
    });
  }
});

export default router;
