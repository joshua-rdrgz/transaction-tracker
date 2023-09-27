import { deleteAvatarFromBucket as deleteAvatarFromBucketApi } from '@/lib/services/apiImage';
import { useMutation } from '@tanstack/react-query';

export const useDeleteUserAvatar = () => {
  const {
    isLoading: isDeletingAvatar,
    mutate: deleteAvatarFromBucket,
  } = useMutation({
    mutationFn: (avatarToDelete: string) =>
      deleteAvatarFromBucketApi(avatarToDelete),
  });

  return {
    isDeletingAvatar,
    deleteAvatarFromBucket,
  };
};
