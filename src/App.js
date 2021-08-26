import React, { useState, useEffect } from "react";
import FbImageLibrary from "react-fb-image-grid";
import Gallery from "react-grid-gallery";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import ProTip from "./ProTip";
import Button from "@material-ui/core/Button";
import TopAppBar from "./components/TopAppBar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import RefreshIcon from "@material-ui/icons/Refresh";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";

import VideoList from "./components/VideoList";
import Alert from "@material-ui/lab/Alert";

const AWS = require("aws-sdk");
const axios = require("axios");

const IMAGES = [
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 174,
    isSelected: true,
    caption: "After Rain (Jeshu John - designerspics.com)",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    tags: [
      { value: "Ocean", title: "Ocean" },
      { value: "People", title: "People" },
    ],
    caption: "Boats (Jeshu John - designerspics.com)",
  },
  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail:
      "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
  },
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 174,
    isSelected: false,
    caption: "After Rain (Jeshu John - designerspics.com)",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    tags: [
      { value: "Ocean", title: "Ocean" },
      { value: "People", title: "People" },
    ],
    caption: "Boats (Jeshu John - designerspics.com)",
  },
  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail:
      "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    tags: [{ value: "Lift", title: "Lift" }],
  },
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 174,
    isSelected: false,
    caption: "After Rain (Jeshu John - designerspics.com)",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    tags: [
      { value: "Ocean", title: "Ocean" },
      { value: "People", title: "People" },
    ],
    caption: "Boats (Jeshu John - designerspics.com)",
  },
  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail:
      "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
  },
];

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  upload: {
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(5),
    padding: theme.spacing(2),
    width: "100%",
  },
  uploadButton: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  fileName: {
    marginRight: "10px",
  },
  videoPlayer: {
    marginTop: theme.spacing(2),
    // padding: theme.spacing(2)
  },
}));

export default function App() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [videoUrl, setVideoUrl] = React.useState("");
  const [isUploadComplete, setUploadComplete] = React.useState(false);
  const [isShownMessge, setMessageState] = React.useState(false);

  const fileInput = React.createRef();

  useEffect(() => {
    setUploadComplete(true);
    // fetchVideoList();
  }, []);

  const onSubmit = (e) => {
    console.log("onSubmit");
    e.preventDefault();
    document.getElementById("file-input").click();
  };
  const onUpdate = async (e) => {
    e.preventDefault();
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("aaaaaaa1", e);
      setUploadComplete(false);
      setMessageState(false);
      setName(file.name);
      setResponse(`Uploading...`);
      console.log("bbbbbb" + file.name + ":" + file.type);
      // await Storage.put(AMPLIFY_CONFIG.AMPLIFY_UPLOADED_FOLDER + file.name, file, {
      //   contentType: file.type,
      //   progressCallback(progress) {
      //     setProgress((progress.loaded/progress.total*100).toFixed())
      //   },
      // })
      var formData = new FormData();
      formData.append("file", file);
      axios
        .post(
          "https://06fz3ysyg3.execute-api.us-east-1.amazonaws.com/dev/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(function (response) {
          //handle success
          console.log("ssssssssssssss", response);
          // setResponse(`Success uploading file: ${file.name}!`);
          setUploadComplete(true);
          setMessageState(true);
        })
        .then(() => {
          document.getElementById("file-input").value = null;
          setProgress(0);
          setName("");
          setResponse("");
        })
        .catch(function (err) {
          //handle error
          console.log(err);
          setUploadComplete(true);
          setResponse(`Can't upload file: ${err.response.data.message}`);
        });
      //   .then((result) => {
      //     console.log(result);
      //     setResponse(`Success uploading file: ${name}!`);
      //     const index = list.findIndex((e) => e.key === result.key);
      //     // if (index === -1) {
      //     //   fetchVideoList();
      //     // }
      //     setUploadComplete(true);
      //     setMessageState(true);

      //   })
      //   .then(() => {
      //     document.getElementById('file-input').value = null;
      //     setProgress(0);
      //     setName('');
      //     setResponse('');
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setResponse(`Can't upload file: ${err}`)
      //   })
    } else {
      setResponse(`Files needed!`);
    }
  };

  return (
    <Box color="text.primary" component="span" m={0}>
      <TopAppBar />
      <Grid container>
        <Grid item xs={12} container justifyContent="center">
          <Paper elevation={3} className={classes.upload}>
            <form>
              <Grid>
                <Grid
                  container
                  className={classes.uploadButton}
                  justifyContent="center"
                >
                  <label
                    htmlFor="file-input"
                    style={{
                      justifyContent: "center",
                      justifyContent: "center",
                      width: "100%",
                      textAlign: "center",
                      display: "flex",
                    }}
                  >
                    <input
                      style={{ display: "none" }}
                      id="file-input"
                      name="input-video"
                      type="file"
                      onChange={(e) => onUpdate(e)}
                      data-classbutton="btn btn-primary"
                      ref={fileInput}
                    />
                    <div>
                      <Typography style={{ width: "fullWidth" }} variant="h6">
                        {name}
                      </Typography>
                      <Button
                        style={{ width: "fullWidth" }}
                        color="primary"
                        variant="contained"
                        onClick={(e) => onSubmit(e)}
                        disabled={!isUploadComplete}
                      >
                        Click here to upload video{" "}
                        <CloudUploadIcon style={{ marginLeft: "8px" }} />
                      </Button>
                    </div>
                  </label>
                </Grid>
              </Grid>
            </form>
            {isShownMessge ? (
              <Alert severity="success" variant="outlined">
                The video file has been uploaded successfully. Please click
                refresh button below after a few seconds (depending on the size
                of the video file) to see the new one
              </Alert>
            ) : null}
            {progress ? (
              <LinearProgress variant="determinate" value={Number(progress)} />
            ) : null}
            <Grid container justifyContent="center">
              <Typography variant="h6">{response}</Typography>
            </Grid>
          </Paper>
          <Paper elevation={3} className={classes.upload}>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <Typography
                variant="h6"
                style={{ margin: "0px", alignSelf: "center" }}
              >
                Video List
              </Typography>
              <Button
                style={{ marginLeft: "auto" }}
                variant="contained"
                color="secondary"
                // onClick={fetchVideoList}
                className={classes.button}
                startIcon={<RefreshIcon />}
              >
                Refresh
              </Button>
            </div>
            <Divider />
            {isLoading ? (
              <Grid container justifyContent="center">
                <CircularProgress
                  style={{ marginTop: "60px", marginBottom: "60px" }}
                />
              </Grid>
            ) : (
              <VideoList
                data={list}
                style={{ minHeight: "200px" }}
                // handleClick={handleClick}
              />
            )}
            <Grid>
              <Alert severity="warning">
                Note: Since this is a prototype, the above video list is fetched
                from the AWS S3 Storage directly, so you need to click the
                refresh button if you want to see the latest video files.
                <br />
                Integrating with DynamoDB & GraphQL is under progress, you can
                see the list in real-time once we have finished the
                implementation.
              </Alert>
            </Grid>
          </Paper>
          <Grid
            container
            className={classes.uploadButton}
            justifyContent="center"
            item
            xs={12}
            // className={classes.videoPlayer}
          >
            <Paper elevation={3} className={classes.upload}>
              <Gallery images={IMAGES} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
