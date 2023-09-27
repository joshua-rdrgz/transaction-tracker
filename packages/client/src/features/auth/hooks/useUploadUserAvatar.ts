import { uploadAvatarToBucket as uploadAvatarToBucketApi } from '@/lib/services/apiImage';
import { useMutation } from '@tanstack/react-query';

export const useUploadUserAvatar = () => {
  const {
    isLoading: isUploadingAvatar,
    mutate: uploadAvatarToBucket,
    data: uploadedAvatar,
  } = useMutation({
    mutationFn: (avatar: File) => uploadAvatarToBucketApi(avatar),
  });

  return {
    isUploadingAvatar,
    uploadAvatarToBucket,
    uploadedAvatar,
  };
};
