import React, { useEffect, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 120,
  height: 120,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function DropzoneWithPreview({
  onFilesDrop,
  multiple = true,
  title,
  maxFiles,
  files = [],
}) {
  const [localFiles, setLocalFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple,
    maxFiles,
    onDrop: (acceptedFiles) => {
      createPreview(acceptedFiles);

      onFilesDrop(acceptedFiles);
    },
  });

  const createPreview = (acceptedFiles) => {
    setLocalFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const thumbs = localFiles.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(() => {
    if (!!files.length) {
      createPreview(files);
    }
    return () => {
      localFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <div className="card card-body border-0 shadow-sm p-4 mb-4" id="photos">
      <h2 className="h4 mb-4">
        <i className="fi-image text-primary fs-5 mt-n1 me-2"></i>
        {title}
      </h2>
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
    </div>
  );
}

export default DropzoneWithPreview;
