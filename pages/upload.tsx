import { useState, useEffect, useRef, Fragment } from "react";
import { Dialog, Transition, Switch } from "@headlessui/react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { categories } from "../utils/data";
import ButttonDisabled from "../components/Utils/ButtonDisabled";
import { reset, createPost } from "../redux/features/post/postSilce";
import type { RootState, AppDispatch } from "../redux/store";
import { BsCheck2Circle } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import app from "../utils/firebase";
import Head from "next/head";
import Layout from "../components/Layout";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Upload = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    posts,
    post,
    isLoading: isAddLoadin,
    isSuccess,
    isError,
    messageError,
    isAdded,
  } = useSelector((state: RootState) => state.post);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [videoPre, setVideoPre] = useState<string>("");
  const [videoPer, setVideoPer] = useState<number>(0);
  const [videoInProgress, setVideoInProgress] = useState<boolean>(false);
  const [isPostData, setIsPostData] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    caption: "",
    publish: "",
    category: "",
  });

  const { caption, category, publish } = formData;

  function closeModal() {
    setIsOpen(false);
    setFormData({ caption: "", publish: "", category: "" });
    setVideo("");
    setSelectedVideo("");
    setVideoPre("");
    setVideoPer(0);
    setIsPostData(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (isError) {
      toast.error(messageError);
    }

    if (isAdded) {
      openModal();
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, messageError, isAdded]);

  const handleClickLabel = () => {
    inputRef.current?.click();
  };

  //Get inputs value
  const handleChange = async (e: any) => {
    if (e.target.name === "upload-video") {
      const selectedFile = e.target.files[0];

      const fileTypes = ["video/mp4", "video/webm"];
      if (fileTypes.includes(selectedFile.type)) {
        setSelectedVideo(e.target.files[0]);
      } else {
        toast.error("Unsupported files, use MP4 or WebM instead");
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  //Upload video to firebase and get url
  const uploadFile = (file: any, urlType: string) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    let storageRef;
    if (urlType === "video") {
      storageRef = ref(storage, "videos/" + fileName);
    } else {
      storageRef = ref(storage, "images/" + fileName);
    }

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // urlType === "imgUrl"
        //   ? setImgPer(Math.round(progress))
        //   : setVideoPer(Math.round(progress));
        setVideoPer(Math.round(progress));
        setVideoInProgress(true);
        switch (snapshot.state) {
          case "paused":
            setVideoInProgress(false);
            console.log("something went wrong");
            break;
          case "running":
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideoPre(downloadURL);
          setVideo(downloadURL);
          setVideoInProgress(false);
        });
      }
    );
  };

  useEffect(() => {
    selectedVideo && uploadFile(selectedVideo, "video");
  }, [selectedVideo]);

  //Check all input are exists
  useEffect(() => {
    if (caption && category && video && publish) {
      setIsPostData(true);
    }
  }, [caption, category, video, publish]);

  //handle create new post api
  const handlePost = async () => {
    const postData = {
      caption,
      category,
      publish,
      video,
    };

    dispatch(createPost(postData));
  };

  return (
    <>
      <Head>
        <title>Upload Video</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout searchValue="">
        <div className="bg-gray-100 min-h-screen xl:px-28 px-2 py-10">
          <div className=" bg-white rounded-md shadow-sm xl:px-10 md:px-5 px-4 py-7 mt-16">
            <div>
              <h1 className="font-bold text-dark text-[22px]">Upload video</h1>
              <h6 className="text-gray-400 mt-2">
                Post a video to your account
              </h6>
            </div>

            <div className="flex md:flex-row flex-col gap-10 mt-10">
              <div className="border-dashed rounded-xl border-2 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 md:w-[350px] w-full h-[460px] p-2 cursor-pointer hover:border-red-300 hover:bg-gray-100 duration-200 ease-in">
                {videoInProgress ? (
                  <div>
                    <p className="mb-4"> Video in processing...</p>
                    <p className="mb-4 text-center bg-primary/20 text-primary border border-primary/30 font-semibold rounded-[20px]">
                      {videoPer && videoPer}%
                    </p>
                    <div className="h-2 rounded-md w-full bg-primary/20 shadow-sm">
                      <div
                        className={`h-full bg-primary rounded-md flex justify-center items-center`}
                        style={{
                          width: `${videoPer}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {videoPre ? (
                      <div className="py-2">
                        <video
                          className="rounded-xl h-[440px] bg-dark"
                          controls
                          loop
                          src={videoPre}
                        />
                      </div>
                    ) : (
                      <>
                        <label className="cursor-pointer">
                          <div className="flex flex-col h-full items-center justify-center ">
                            <p className="mb-4">
                              <FaCloudUploadAlt className="text-gray-400 text-4xl" />
                            </p>
                            <p className="font-semibold text-dark">
                              Select video to upload
                            </p>
                            <p className="text-gray-400 text-[13px] mt-3">
                              Or drag and drop a file
                            </p>
                            <div className="my-9 text-center space-y-3 text-gray-400 text-[13px]">
                              <p>MP4 or WebM</p>
                              <p>720x1280 resolution or higher</p>
                              <p>Up to 10 minutes</p>
                              <p>Less than 2 GB</p>
                            </div>

                            <button
                              className="btn btn-primary"
                              onClick={() => handleClickLabel()}
                            >
                              Select file
                            </button>
                          </div>
                          <input
                            ref={inputRef}
                            type="file"
                            name="upload-video"
                            id="upload-video"
                            className="w-0 h-0"
                            onChange={handleChange}
                          />
                        </label>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="w-full">
                <div className="">
                  <label className="flex mb-2 justify-between">
                    <span className="text-[14px] font-semibold">Caption</span>
                    <span className="text-sm text-gray-400">
                      {caption.length}/150
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input-outline w-full"
                    name="caption"
                    value={caption}
                    onChange={(e) => {
                      if (e.target.value.length <= 150) {
                        handleChange(e);
                      } else {
                        e.target.value = e.target.value.slice(0, 2);
                      }
                    }}
                  />
                </div>
                <div className="mt-5">
                  <label className="text-[14px] font-semibold">Category</label>
                  <select
                    onChange={handleChange}
                    name="category"
                    className="input-outline w-full mt-2"
                  >
                    <option value="">Select category</option>
                    {categories.map((el, index) => (
                      <option key={index} value={el.name}>
                        {el.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-5">
                  <label className="text-[14px] font-semibold">
                    Who can view this video
                  </label>
                  <select
                    onChange={handleChange}
                    name="publish"
                    className="input-outline w-full mt-2"
                  >
                    <option value="">Select type</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                <div className="mt-5">
                  <div className="flex gap-3 items-center mb-3">
                    <label className="text-[14px] font-semibold">
                      Run a copyright check
                    </label>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={`${enabled ? "bg-green-500" : "bg-gray-300"}
          relative inline-flex h-[24px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={`${
                          enabled ? "translate-x-9" : "translate-x-0"
                        }
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>

                  {enabled ? (
                    <p className="flex gap-2 items-center bg-gray-200 p-3 rounded-sm">
                      <AiOutlineInfoCircle className="text-primary" />
                      <span className="text-[12px] text-gray-500">
                        Copyright check will not begin until your video is
                        uploaded.
                      </span>
                    </p>
                  ) : (
                    <p className="text-[12px] text-gray-400">
                      We will check your video for potential copyright
                      infringements on used sounds. If infringements are found,
                      you can edit the video before posting
                    </p>
                  )}
                </div>
                <div className="flex gap-10 xl:w-[50%] md:w-[80%] w-full mt-20">
                  <button
                    className="btn-light btn-light-primary"
                    onClick={() => {}}
                  >
                    Discard
                  </button>
                  {isPostData ? (
                    <button className="btn btn-primary" onClick={handlePost}>
                      Post
                    </button>
                  ) : (
                    <ButttonDisabled text="Post" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-[35rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <BsCheck2Circle className="text-green-500 mx-auto text-[5rem] mb-8" />
                      <Dialog.Title as="h3" className="flex justify-center">
                        <p className="text-md leading-6 font-normal py-2 px-8 inline-block text-green-600 bg-green-200 border border-green-300 rounded-md mx-auto mb-6">
                          Post published successfully
                        </p>
                      </Dialog.Title>

                      <div className="flex gap-10">
                        <button
                          className="btn-outline btn-outline-primary outline-none"
                          onClick={() => router.push("/")}
                        >
                          Home
                        </button>

                        <button
                          className="btn btn-primary"
                          onClick={closeModal}
                        >
                          New Post
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </Layout>
    </>
  );
};

export default Upload;
