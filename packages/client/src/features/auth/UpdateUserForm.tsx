import { useCallback, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import sharedZodSchemas from 'shared-zod-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/ui/form';
import { FormItem } from '@/ui/form-item';
import { Button } from '@/ui/button';
import { useUpdateUser } from '@/features/auth/useUpdateUser';
import { useUser } from '@/features/auth/useUser';
import { toast } from 'react-hot-toast';
import { useUploadUserAvatar } from './useUploadUserAvatar';
import { useDeleteUserAvatar } from './useDeleteUserAvatar';

const updateUserSchema = sharedZodSchemas.authRouteSchemas.updateCurrentUser;
type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const UpdateUserForm = () => {
  const { user } = useUser();

  const { uploadAvatarToBucket, isUploadingAvatar } = useUploadUserAvatar();
  const { deleteAvatarFromBucket, isDeletingAvatar } = useDeleteUserAvatar();
  const { isUpdatingUser, updateUser } = useUpdateUser();

  const [currentUserAvatar, setCurrentUserAvatar] = useState<
    string | null | undefined
  >(user?.avatar);

  const updateUserForm = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name || '',
      avatar: '',
    },
  });

  const commonMutationHandlers = {
    onError: (err: any) => toast.error(err.message),
    onSettled: () => updateUserForm.reset(),
  };

  const onSubmit = useCallback(async (values: UpdateUserSchema) => {
    const avatarCurrentlyExists = !!currentUserAvatar;
    const avatarWillExist = !!values.avatar;

    if (!avatarCurrentlyExists && !avatarWillExist) {
      if (!values.name) return;
      updateUser({ name: values.name }, commonMutationHandlers);
      updateUserForm.setValue('name', values.name);
    }

    const performSuccessActions = (newAvatarPath: string | null) => {
      setCurrentUserAvatar(newAvatarPath);
      updateUserForm.setValue('name', values.name);
    };

    if (avatarCurrentlyExists && avatarWillExist) {
      deleteAvatarFromBucket(currentUserAvatar);

      uploadAvatarToBucket(values.avatar, {
        onSuccess: (updatedAvatarPath) => {
          updateUser(
            // Switch DB to New Path
            { name: values.name, avatar: updatedAvatarPath },
            {
              onSuccess: () => performSuccessActions(updatedAvatarPath),
              onError: commonMutationHandlers['onError'],
            }
          );
        },
        ...commonMutationHandlers,
      });
    }

    if (!avatarCurrentlyExists && avatarWillExist) {
      uploadAvatarToBucket(values.avatar, {
        onSuccess: (uploadedAvatar) => {
          updateUser(
            { name: values.name, avatar: uploadedAvatar },
            {
              onSuccess: () => performSuccessActions(uploadedAvatar),
              onError: commonMutationHandlers['onError'],
            }
          );
        },
        ...commonMutationHandlers,
      });
    }

    if (avatarCurrentlyExists && !avatarWillExist) {
      deleteAvatarFromBucket(currentUserAvatar, {
        onSuccess: () => {
          updateUser(
            { name: values.name, avatar: null },
            {
              onSuccess: () => performSuccessActions(null),
              onError: commonMutationHandlers['onError'],
            }
          );
        },
        ...commonMutationHandlers,
      });
    }
  }, []);

  return (
    <Form form={updateUserForm}>
      <form
        onSubmit={updateUserForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
        encType='multipart/form-data'
      >
        <div className='bg-muted p-6 rounded shadow-lg dark:shadow-secondary flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <Form.Field
              control={updateUserForm.control}
              name='name'
              disabled={isUploadingAvatar || isUpdatingUser || isDeletingAvatar}
              render={({ field }) => {
                return <FormItem label='Name' field={field} />;
              }}
            />
            <Form.Field
              control={updateUserForm.control}
              name='avatar'
              disabled={isUploadingAvatar || isUpdatingUser || isDeletingAvatar}
              render={({ field }) => {
                const inputProps = {
                  type: 'file',
                  onChange: (event: any) =>
                    field.onChange(event.target.files[0]),
                  value: field.value?.fileName,
                  className: 'h-11',
                };
                return (
                  <FormItem
                    label='Profile Picture'
                    field={field}
                    inputProps={inputProps}
                  />
                );
              }}
            />
          </div>
          <div className='flex gap-2 justify-end'>
            <Button
              variant='outline'
              type='button'
              className='hover:bg-primary hover:text-primary-foreground'
              disabled={isUploadingAvatar || isUpdatingUser || isDeletingAvatar}
              onClick={() => updateUserForm.reset()}
            >
              Cancel
            </Button>
            <Button
              disabled={isUploadingAvatar || isUpdatingUser || isDeletingAvatar}
            >
              Update Info
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
