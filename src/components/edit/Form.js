import { useState } from "react";
import { useEditVideoMutation } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import Success from "../ui/Success";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";

export default function Form({video}) {
 
    const [editVideo, { isLoading, isError, isSuccess}] = useEditVideoMutation()

    const {
        id,
        title: initTitle,
        author : initAuthor,
        description : initDescription,
        link:initLink,
        thumbnail: initThumbnail,
        date: initDate,
        duration: initDuration,
        views: initViews,
        } = video 

    const [title, setTitle] = useState(initTitle);
    const [author, setAuthor] = useState(initAuthor);
    const [description, setDescription] = useState(initDescription);
    const [link, setLink] = useState(initLink);
    const [thumbnail, setThumbnail] = useState(initThumbnail);
    const [date, setDate] = useState(initDate);
    const [duration, setDuration] = useState(initDuration);
    const [views, setViews] = useState(initViews);

    const resetForm = () => {
        setTitle('');
        setAuthor('');
        setDescription('');
        setLink('');
        setThumbnail('');
        setDate('');
        setDuration('');
        setViews('')
    }

    const handleEditSubmit =(e)=>{
       e.preventDefault();
       editVideo({
        id, 
        data:{
         title, author, description, link , thumbnail, date, duration, views
        }
    });
       resetForm()
    }

    return (
        <form onSubmit={handleEditSubmit} method="POST">
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <TextInput title="Video Title" 
                             value={title}
                             onChange={(e)=> setTitle(e.target.value)}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <TextInput title="Author" 
                             value={author}
                             onChange={(e)=> setAuthor(e.target.value)}
                            />
                        </div>

                        <div className="col-span-6">
                            <TextArea title="Description" 
                              value={description}
                              onChange={(e)=>setDescription(e.target.value)}
                            />
                        </div>

                        <div className="col-span-6">
                            <TextInput title="YouTube Video link" 
                              value={link}
                              onChange={(e)=>setLink(e.target.value)}
                            />
                        </div>

                        <div className="col-span-6">
                            <TextInput title="Thumbnail link" 
                              value={thumbnail}
                              onChange={(e)=> setThumbnail(e.target.value)}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <TextInput title="Upload Date" 
                             value={date}
                             onChange={(e)=> setDate(e.target.value)}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput title="Video Duration" 
                              value={duration}
                              onChange={(e)=> setDuration(e.target.value)}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput title="Video no of views" 
                             value={views}
                             onChange={(e)=> setViews(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
                
                {
                    isSuccess && <Success message="Video was Edit successfully" />
                }

                { isError && (
                    <Error message="There was an Error Editing Video" />
                )}
            </div>
        </form>
    );
}
