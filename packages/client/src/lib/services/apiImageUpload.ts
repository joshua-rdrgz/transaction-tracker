export const uploadAvatarToServer = async (file: any): Promise<string> => {
  const formData = new FormData();
  formData.append('avatar', file);

  const res = await fetch(`${process.env.SERVER_BASE_URL}/api/v1/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = JSON.parse(await res.text());

  return data.imageName;
};
