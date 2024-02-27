import { useParams } from 'react-router-dom';
import { nhost } from '../lib/nhost';
import { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";


const TierListPage = () => {
  const [loading, setLoading] = useState(true);
  const [tierons, setTierons] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const [images, setImages] = useState(null)
  const [imageURLs, setImageURLs] = useState(null)
  const { id } = useParams();
  const image_id_to_url = async (tierlists) => {
    const imgurl = await Promise.all(tierlists.map(async (e) => {
      return await openAttachment(e.image_id);
    }));
    setImageURLs(imgurl);
  };
  const openAttachment = async (file_id) => {
    const { presignedUrl, error } = await nhost.storage.getPresignedUrl({
      fileId: file_id
    })

    if (error) {
      console.error({ error })
      return
    }
    console.log(presignedUrl)
    return presignedUrl.url
  }
  const getTireons = `
  query($id: String!) {
    tierlist(where: { id: { _eq: $id } }) {
      id
      name
      category
      status
      description
      cover
      tiers
    }
  }
`
  const getImages = `
query($tierlist_id: String!) {
  tierlist_images(where: { tierlist_id: { _eq: $tierlist_id } }) {
    tierlist_id
    image_id
  }
}
`
const onDragEnd = (result) => {
  // TODO: Handle drag end logic here
  console.log(result)
};
  useEffect(() => {
    async function fetchTeirons() {
      setLoading(true)
      const { data, error } = await nhost.graphql.request(getTireons, { id })
      if (error) {
        console.error({ error })
        return
      }
      console.log(data.tierlist)
      fetchImages({ id: data.tierlist[0].id })
      setTierons(data.tierlist[0])
      setCoverImage(await openAttachment(data.tierlist[0].cover))
      setLoading(false)
    }
    async function fetchImages({ id }) {
      console.log(id)
      const tierlist_id = id;
      setLoading(true)
      const { data, error } = await nhost.graphql.request(getImages, { tierlist_id })
      if (error) {
        console.error({ error })
        return
      }
      console.log(data.tierlist_images)
      image_id_to_url(data.tierlist_images)
      setImages(data.tierlist)
      setLoading(false)

    }

    fetchTeirons()

  }, [])
  if (!loading && tierons && imageURLs) {
    console.log("IMG URLS", imageURLs)
    imageURLs.map((e) => {
      console.log("THis is E ", e)
    })
    console.log(imageURLs)
    return (
      <div className='p-8 h-10vh'>
        <div className="flex justify-center">
          <div className="w-4/5 bg-white shadow-lg rounded-lg overflow-hidden flex">
            <img className=" object-cover" src={coverImage} />
            <div className="p-4 w-1/2">
              <h2 className="text-xl font-semibold">{tierons.name}</h2>
              <p className="mt-2 text-gray-600">{tierons.description}</p>
            </div>
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="mt-8 w-60vh justify-center">
            <h2 className="text-lg font-semibold mb-4">Image Gallery</h2>
            <Droppable droppableId="image-gallery" direction="horizontal">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-6 gap-1">
                  {imageURLs.map((url, index) => (
                    <Draggable key={index} draggableId={index.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="object-cover h-32 w-32 rounded-lg"
                        >
                          <img src={url} alt={`Image ${index + 1}`} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    )
  } else {
    return (<div>Loading</div>)
  }
}

export default TierListPage