import React, { useState } from 'react';
import { useNhostClient, useFileUpload, useUserId } from '@nhost/react'
import { nhost } from '../lib/nhost';

const FormComponent = () => {
    const userId = useUserId()
    const nhostClient = useNhostClient()
    const { upload } = useFileUpload()
    const [tieronID, setTieronID] = useState('')
    const [formData, setFormData] = useState({
        tierListName: '',
        tierListDescription: '',
        category: '',
        coverImage: null,
        image: [],
        tiers: []
    });

    const createTierlist = `
  mutation($name: String, $description: String, $category: String, $cover: uuid, $images: [uuid], $tiers: [String], $user_id: uuid, $status: String) {
    insert_tierlist_one(object: {name: $name, description: $description, category: $category, cover: $cover tiers: $tiers, user_id: $user_id, status: $status}) {
      id
    }
  }
`;
    const createImageList = `
    mutation($tierlist_id: String, $image_id:uuid){
        insert_tierlist_images_one(object: {tierlist_id: $tierlist_id,image_id: $image_id}){
            image_id
        }
    }
    `
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCoverImageChange = (e) => {
        setFormData({ ...formData, coverImage: e.target.files[0] });
    };

    const handleImagesChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleTierNameChange = (index, value) => {
        const newTiers = [...formData.tiers];
        newTiers[index] = value;
        setFormData({ ...formData, tiers: newTiers });
    };

    const handleAddTier = () => {
        setFormData({ ...formData, tiers: [...formData.tiers, ''] });
    };

    const handleDeleteTier = (index) => {
        const newTiers = [...formData.tiers];
        newTiers.splice(index, 1);
        setFormData({ ...formData, tiers: newTiers });
    };
    const uploadImage = async (e) => {
        e.preventDefault();
        console.log(tieronID)
        try {
            const { id, error } = await upload({
                file: formData.image,
                name: formData.image.name
            })
            const sendImageData = {
                tierlist_id: tieronID,
                image_id: id
            }
            console.log(sendImageData)
            const resp = await nhost.graphql.request(createImageList, sendImageData)
            console.log(resp)
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let sendData = {
            name: formData.tierListName,
            description: formData.tierListDescription,
            category: formData.category,
            tiers: formData.tiers,
            user_id: userId,
            status: "active",
            cover: ""
        }
        try {
            const { id, error } = await upload({
                file: formData.coverImage,
                name: formData.coverImage.name
            })
            sendData.cover = id
        } catch (error) {
            console.log(error)
        }
        console.log(sendData)
        const { data } = await nhost.graphql.request(createTierlist, sendData)
        const tierlist_id = data.insert_tierlist_one.id
        setTieronID(tierlist_id)
    };
    return (
        <>
            <br></br>
            <br></br>
            <div className="max-w-3xl mx-auto bg-white text-black p-8 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Create Tier List</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="tierListName" className="block mb-1">Tier List Name</label>
                        <input type="text" id="tierListName" name="tierListName" value={formData.tierListName} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tierListDescription" className="block mb-1">Tier List Description</label>
                        <textarea id="tierListDescription" name="tierListDescription" value={formData.tierListDescription} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block mb-1">Select Category</label>
                        <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
                            <option value="">Select Category</option>
                            <option value="pop">Pop</option>
                            <option value="movies">Movies</option>
                            <option value="cartoon">Cartoon</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Upload Cover Image</h3>
                        <label htmlFor="cover-upload" className="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Cover Photo
                        </label>
                        <input id="cover-upload" type="file" accept="image/*" onChange={handleCoverImageChange} className="hidden" />
                    </div>
                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Setup Your Tiers</h3>
                        {formData.tiers.map((tier, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input type="text" value={tier} onChange={(e) => handleTierNameChange(index, e.target.value)} className="mr-2 px-3 py-2 border rounded-md" required />
                                <button type="button" onClick={() => handleDeleteTier(index)} className="px-3 py-1 bg-black text-white rounded-md">X</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddTier} className="px-3 py-1 bg-black text-white rounded-md">Add Tier</button>
                    </div>
                    <button type="submit" className="w-full bg-black text-white font-semibold py-2 rounded-md">Submit</button>
                </form>
                <br />
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Upload Images</h3>
                    <label htmlFor="images-upload" className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Images
                    </label>
                    <input id="images-upload" type="file" accept="image/*" multiple onChange={handleImagesChange} className="hidden" />
                    <button type="button" onClick={uploadImage} className="w-full bg-black text-white font-semibold py-2 rounded-md">Upload Image</button>

                </div>
            </div></>

    );
};

export default FormComponent;
