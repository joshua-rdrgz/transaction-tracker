import { z } from 'zod';
import { TRPCClientError } from '@trpc/client';

import zodSchemas from 'shared-zod-schemas';

import { uploadAvatarToServer } from '@/lib/services/apiImageUpload';
import { waitToFinishViaPromise } from '@/lib/utils';

type SignupFormSchema = z.infer<typeof zodSchemas.authRouteSchemas.signup>;
type UpdateUserSchema = z.infer<
  typeof zodSchemas.authRouteSchemas.updateCurrentUser
>;

export const signupUser = async (
  values: SignupFormSchema,
  signup: (values: SignupFormSchema) => void,
  updateUser: (values: UpdateUserSchema) => void
) => {
  const avatarWasProvided = !!values.avatar;

  await waitToFinishViaPromise(() => signup({ ...values, avatar: undefined }));

  if (!avatarWasProvided) return;

  const avatarFile = await uploadAvatarToServer(values.avatar);
  const avatarWasUploaded = avatarFile.trim().length > 0;

  if (!avatarWasUploaded)
    throw new TRPCClientError(
      'The avatar you provided was not able to be uploaded to the server. Please try again or pick a different image!'
    );

  await waitToFinishViaPromise(() =>
    updateUser({ ...values, avatar: avatarFile })
  );
};
