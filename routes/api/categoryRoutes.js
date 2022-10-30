const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(allCategoryData);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCategoryData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Product }],
    });
    res.json(singleCategoryData);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  // note: category table only has id category_name
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(newCategory);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    //finding the category to update first
    const oldCategory = await Category.findOne({
      where: {
        id: req.params.id,
      },
    });

    //updating the category
    oldCategory.update({
      category_name: req.body.category_name,
    });

    res.json(oldCategory);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json(deletedCategory);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;