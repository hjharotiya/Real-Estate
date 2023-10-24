import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";

import { useDispatch } from "react-redux";
const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileuploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updatedSuccess, setUpdatedSuccess] = useState(false);

  const Dispatch = useDispatch();

  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (file) {
      handelFileUpload(file);
    }
  }, [file]);

  const handelFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snpashot) => {
        const progress =
          (snpashot.bytesTransferred / snpashot.totalBytes) * 100;
        console.log(`upload is ${progress}% done `);
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileuploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...FormData, avatar: downloadURL });
        });
      }
    );
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      Dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        Dispatch(updateUserFailure(data.message));
        return;
      }
      Dispatch(updateUserSuccess(data));
      setUpdatedSuccess(true);
      console.log(updatedSuccess);
    } catch (error) {
      Dispatch(updateUserFailure(error.message));
    }
  };

  const handelDeleteUser = async () => {
    try {
      Dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        Dispatch(deleteUserFailure(data.message));
        return;
      }
      Dispatch(deleteUserSuccess(data));
    } catch (error) {
      Dispatch(deleteUserFailure(error.message));
    }
  };

  const handelSignOut = async () => {
    try {
      Dispatch(signOutUserStart());
      const res = await fetch("api/user/signout");
      const data = await res.json();
      if (data.success === false) {
        Dispatch(signOutUserFailure(data.message));
        return;
      }
      Dispatch(signOutUserSuccess(data));
    } catch (error) {
      Dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handelSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover self-center mt-2 cursor-pointer"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error In upload (img must be less than 2Mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700"> {`uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image Successfully Uploaded!</span>
          ) : (
            ""
          )}{" "}
        </p>
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          className="rounded-lg border p-3"
          id="username"
          onChange={handelChange}
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="rounded-lg border p-3"
          id="email"
          onChange={handelChange}
        />
        <input
          type="password"
          placeholder="password"
          className="rounded-lg border p-3"
          id="password"
          onChange={handelChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 uppercase text-white rounded-lg p-3 hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading..." : "update"}
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span
          onClick={handelDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handelSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
      <p className="text-red-700 self-center">{error ? error : ""}</p>
      <p className="text-green-700 self-center">
        {updatedSuccess ? "User is Successfully updated !" : ""}
      </p>
    </div>
  );
};

export default Profile;
