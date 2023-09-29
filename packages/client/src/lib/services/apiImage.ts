import { TRPCClientError } from '@trpc/client';

export const uploadAvatarToBucket = async (
  file: any
): Promise<string | null> => {
  if (!file) return null;

  const formData = new FormData();
  formData.append('avatar', file);

  const res = await fetch(`${process.env.SERVER_BASE_URL}/api/v1/avatars`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok)
    throw new TRPCClientError('Something went wrong uploading your avatar!');

  const data = JSON.parse(await res.text());

  return data.imagePath;
};

export const deleteAvatarFromBucket = async (key: string) => {
  if (!key) return null;

  const res = await fetch(`${process.env.SERVER_BASE_URL}${key}`, {
    method: 'DELETE',
  });

  if (!res.ok)
    throw new TRPCClientError('Something went wrong deleting your avatar!');

  return null;
};
