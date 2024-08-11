require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");
const app = express();

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.PUBLIC_ANON_KEY
);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/home", (req, res) => {
  res.send("Welcome to TUFs");
});

app.get("/api/v1/banner", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("banner")
      .select("*")
      .order("id", { ascending: true })
      .limit(1)
      .single();

    if (!data) {
      return res.status(404).json({ message: "No banner found" });
    }

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/v1/banner", async (req, res) => {
  const {
    bannerOn,
    bannerHeading,
    bannerSubHeading,
    bannerEndTime,
    bannerLink,
  } = req.body;

  try {
    const { data: existingBanner, error: fetchError } = await supabase
      .from("banner")
      .select("*")
      .order("id", { ascending: true })
      .limit(1)
      .single();

    let data, error;

    if (existingBanner) {
      ({ data, error } = await supabase
        .from("banner")
        .update({
          banner_on: bannerOn,
          banner_heading: bannerHeading,
          banner_sub_heading: bannerSubHeading,
          banner_end_time: bannerEndTime,
          banner_link: bannerLink,
        })
        .eq("id", existingBanner.id));
    } else {
      ({ data, error } = await supabase.from("banner").insert([
        {
          banner_on: bannerOn,
          banner_heading: bannerHeading,
          banner_sub_heading: bannerSubHeading,
          banner_end_time: bannerEndTime,
          banner_link: bannerLink,
        },
      ]));
    }

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({
      message: existingBanner
        ? "Banner updated successfully"
        : "Banner created successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});
