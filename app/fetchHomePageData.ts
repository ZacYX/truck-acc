import { WebPicture } from "@prisma/client";
import { SectionData } from "./lib/data";

export const fetchData = async (
  sectionName: string,
  initData: SectionData,
  cb: (data: SectionData) => void
) => {
  const response = await fetch(`/api/web-info?name=${sectionName}`);
  if (!response.ok) {
    console.error(`fetch section data ${sectionName} of home failed`);
    return;
  }
  const result = await response.json();
  if (!result) {
    console.error(`result of ${sectionName} is empty`);
    cb(initData);
    return;
  }
  //update image url to the presigned url
  const { images } = result;
  if (!images || images.length === 0) {
    cb({
      ...result,
      images: initData.images,
    })
    return
  }
  const urlPromises = images.map((image: WebPicture) => (
    fetch(`/api/upload?name=${image.url}`)
  ))
  const urlResponses = await Promise.all(urlPromises);
  const urls = await Promise.all(urlResponses.map((item) => (
    item.json()
  )));
  const updatedImages = images.map((item: WebPicture, index: number) => ({
    ...item,
    url: urls[index]
  }))
  cb({
    ...result,
    images: updatedImages
  });
}