const BASE_URL = "https://api.cloudinary.com/v1_1/djxv5r6hx/";

export const fileUpload = async (file: File) => {
  const URL = `${BASE_URL}upload`;
  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);
  try {
    const resp = await fetch(URL, {
      method: "POST",
      body: formData,
    });
    if (!resp.ok) throw new Error("No se pudo subir imagen");
    const cloudResp = await resp.json();
    return cloudResp.secure_url as string;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteFile = (url: string) => {
  const URL = `${BASE_URL}destroy`;
  const publicId = (url.split("/").pop() ?? "");
  const formData = new FormData();
  formData.append("public_id", `journal-app/${publicId}`);
  formData.append("api_key", "581924831268592");
  return fetch(URL, {
    method: "POST",
    body: formData,
  });
};
