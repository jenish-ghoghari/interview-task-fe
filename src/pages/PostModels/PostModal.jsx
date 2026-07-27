import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; 
export default function PostModal({
    isOpen,
    onClose,
    onSubmit,
    editData,
}) {


    const postSchema = yup.object({
        title: yup.string().required("Title is required"),
        content: yup.string().required("Content is required"),
        author: yup.string().required("Author is required"),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(postSchema),
    });

    useEffect(() => {
        if (editData) {
            reset(editData);
        } else {
            reset({
                title: "",
                content: "",
                author: "",
            });
        }
    }, [editData, reset]);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[500px]">
                <h2 className="text-xl font-bold mb-5">
                    {editData ? "Edit Post" : "Add Post"}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("title")}
                        placeholder="Title"
                        className="border w-full p-2 rounded"
                    />
                    <p className="text-red-500">
                        {errors.title?.message}
                    </p>
                    <textarea
                        {...register("content")}
                        placeholder="Content"
                        className="border w-full p-2 rounded mt-4"
                    />
                    <p className="text-red-500">
                        {errors.content?.message}
                    </p>
                    <input
                        {...register("author")}
                        placeholder="Author"
                        className="border w-full p-2 rounded mt-4"
                    />
                    <p className="text-red-500">
                        {errors.author?.message}
                    </p>
                    <div className="flex justify-end gap-3 mt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-400 rounded text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 rounded text-white"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}