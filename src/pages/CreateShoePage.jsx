import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useForm } from "react-hook-form";
import {
  Box,
  Container,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DirectionsRun, Image } from "@mui/icons-material";
import axiosInstance from "../axios";
import useFilePreview from "../hooks/useFilePreview";
import { useNavigate } from "react-router-dom";
import { addShoe } from "../api/shoesApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateShoePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, watch, reset } = useForm();
  const watchImageUrl = watch("image", false);
  const { imgSrc, setImgSrc } = useFilePreview(watchImageUrl);
  const queryClient = useQueryClient();
  const handleImageReset = () => {
    reset({ image: "" });
    setImgSrc(null);
  };
  const addShoeMutation = useMutation(addShoe, {
    onSuccess: () => {
      queryClient.invalidateQueries("shoes");
      queryClient.invalidateQueries("all_shoes");
      navigate("/my-shoes");
    },
  });
  const onSubmit = async (data) => {
    const formData = new FormData();

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    } else {
      delete data.image;
    }
    data = { ...data, user: user.user_id };

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        formData.append(key, data[key]);
      }
    }

    addShoeMutation.mutate(formData);
  };

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
          <DirectionsRun />
        </Avatar>
        <Typography component="h1" variant="h4">
          Add Shoe
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "75%",
          }}>
          <Grid
            container
            direction={"row"}
            spacing={1}
            justifyContent={"center"}
            textAlign={"center"}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                {...register("nickname", { required: true, maxLength: 30 })}
                label="Nickname"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                required
                {...register("brand", { required: true, maxLength: 30 })}
                label="Brand"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                required
                {...register("model", { required: true, maxLength: 30 })}
                label="Model"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                required
                {...register("notes", { required: true })}
                label="Notes"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                required
                {...register("distance_run", {
                  required: true,
                  valueAsNumber: true,
                })}
                label="Distance Run"
              />
            </Grid>
            <Grid item xs={12}>
              {imgSrc && imgSrc[0] !== null ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                  <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 3, width: "20%" }}
                    onClick={handleImageReset}>
                    Reset
                  </Button>
                  <img style={{ height: "auto", width: "50%" }} src={imgSrc} />
                </Box>
              ) : (
                <Button
                  startIcon={<Image />}
                  variant="contained"
                  component="label">
                  Image Upload
                  <input
                    type="file"
                    id="image"
                    hidden
                    accept="image/jpg, image/jpeg, image/png, image/gif, image/bmp"
                    {...register("image")}
                  />
                </Button>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox {...register("is_public")} defaultChecked />}
                label="Public"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 3, width: 100 }}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default CreateShoePage;
