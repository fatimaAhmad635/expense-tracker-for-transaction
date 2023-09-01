// Controller function for retrieving user information
export const index = (req, res) => {
  // Respond with the user information from the request (authenticated user)
  res.json({ user: req.user });
};
