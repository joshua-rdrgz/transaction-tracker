import { uploadAvatarToServer } from '@/services/apiImageUpload';

export const signupWithAvatar = async (
  file: File,
  callback: (avatarWasUploaded: boolean, avatarFile?: string) => void
) => {
  let avatarFile = '';
  if (file) {
    avatarFile = await uploadAvatarToServer(file);
  }
  const avatarWasUploaded = avatarFile.trim().length > 0;

  callback(avatarWasUploaded, avatarFile);
};
