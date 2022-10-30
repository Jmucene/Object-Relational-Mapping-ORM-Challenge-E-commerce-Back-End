const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTagData = await Tag.findAll({
      include: [{ model: Product }, { model: Product, through: ProductTag }],
    });
    res.json(allTagData);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTagData = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Product }, { model: Product, through: ProductTag }],
    });
    res.json(singleTagData);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  // note: tag table only has id & tag_name
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(newTag);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    //finding matching note first
    const oldTag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
    });

    //updating tag
    oldTag.update({
      tag_name: req.body.tag_name,
    });

    res.send(oldTag);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete one tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json(deletedTag);
    console.log("Tag was deleted!");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;