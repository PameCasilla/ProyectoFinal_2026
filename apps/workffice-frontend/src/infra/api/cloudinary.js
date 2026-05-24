export const postImageToCloudinary = async imageData => {
    const data = new FormData()
    data.append("file", imageData)
    data.append("upload_preset", "testworkffice")
    data.append("cloud_name", "workffice")
    return await fetch("https://api.cloudinary.com/v1_1/workffice/image/upload", {
        method: "post",
        body: data
    }).then(resp => resp.json())
}
