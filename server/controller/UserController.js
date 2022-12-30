// after authenticate the get back json response
export const index=(req, res) => {
    res.json({ user: req.user });
  }