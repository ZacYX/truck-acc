import { useFieldArray, useFormContext, Control } from "react-hook-form";
import ImageCard from "./ImageCard";
import { ProductDetails, } from "./NewProductDetailsForm";
import { FormEvent, forwardRef, useImperativeHandle, } from "react";


const ImageEditor = forwardRef(function ImageEditor(props, ref) {
  const { register, control, getValues } = useFormContext<ProductDetails>();
  const { fields, append, update, remove } = useFieldArray({
    name: "images",
    control
  });

  useImperativeHandle(ref, () => {
    return { remove() { remove(); } }
  }, []);

  const handleFileChange = async (event: FormEvent<HTMLInputElement>) => {
    const selectedFiles = event.currentTarget.files;
    if (!selectedFiles) {
      console.debug("No file selected");
      return;
    }
    const formData = new FormData();
    Object.values(selectedFiles).forEach((file, index) => {
      formData.append(`file${index}`, file);
    })
    try {
      //upload file to server
      const uploadResponse = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
      });
      if (!uploadResponse.ok) {
        console.error("Post file response failed");
        return;
      }
      const urls = await uploadResponse.json();
      if (!urls) {
        console.error("Post file failed");
        return;
      }
      //write image info to database
      const data = urls.map(((url: string) => ({ url: url })));
      console.debug(`data: ${JSON.stringify(data)}`);
      const createResponse = await fetch(`/api/picture`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!createResponse.ok) {
        console.error(`create database info of uploaded images failed`);
        return;
      }
      const returnedImages = await createResponse.json();
      append(returnedImages);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {
        fields.map((field, index) => (
          <div key={field.id}>
            <ImageCard
              field={field}
              index={index}
              remove={remove}
            />
          </div>
        ))
      }

      <div className="py-4">
        <input
          type="file"
          accept=".jpg"
          multiple
          onChange={handleFileChange}
        />
      </div>
    </div>
  )
})

ImageEditor.displayName = "ImageEditor";

export default ImageEditor;
