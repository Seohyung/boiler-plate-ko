module.exports = logout;
router.route('/logout').get(async (req, res, next) => {
  try {
    await User.update({ token: '' }, { where: { id: req.user.id } });
    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
    });
    next(err);
  }
});
