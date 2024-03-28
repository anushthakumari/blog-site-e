import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { usePosts } from "./Context/PostContext";
import { v4 as uuidv4 } from "uuid";
import { useAccounts } from "./Context/AccountsContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const categories = [
  "Academic Resources",
  "Career Services",
  "Campus Culture",
  "Local Community Resources",
  "Social",
  "Sports",
  "Health and Wellness",
  "Technology",
  "Travel",
  "Alumni",
];

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState(null);
  const { onAddPost } = usePosts();
  const { currAcc } = useAccounts();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = currAcc.name;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleSubmit = () => {
    // You can handle the submission here
    const currentDate = new Date();

    // Format the date as "Month Day"
    const formattedDate = `${
      months[currentDate.getMonth()]
    } ${currentDate.getDate()}`;
    const newPost = {
      id: uuidv4(),
      title: title,
      description: description,
      category: category,
      date: formattedDate,
      image: image ? URL.createObjectURL(image) : null,
      createdBy: user,
      comments: [],
      // You can add other fields like image, imageLabel, etc. if needed
    };

    // Add the new post to the posts list
    onAddPost(newPost);
    setTitle("");
    setDescription("");
    setCategory("");
    setImage(null);
    // Close the modal
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add Post</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Post
          </Typography>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            {/* Increased mt value */}
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            sx={{ mt: 2 }}
          />
          <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
