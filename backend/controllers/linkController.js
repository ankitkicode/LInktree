import Link from '../models/Link.js';
import User from '../models/User.js';

// Create Link
export const createLink = async (req, res) => {
  const { title, url } = req.body;
  try {
    const newLink = new Link({
      userId: req.user,
      title,
      url,
    });
    await newLink.save();
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get User Links
export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ userId: req.user }).sort({ createdAt: -1 });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateLink = async (req, res) => {
  const { id } = req.params;
  const { title, url } = req.body;

  try {
    // Check ownership first
    const link = await Link.findById(id);
    if (!link) return res.status(404).json({ message: 'Link not found' });
   

    const updatedLink = await Link.findByIdAndUpdate(
      id,
      { title, url },
      { new: true, runValidators: true }
    );

    res.json({ message: 'Link updated successfully', link: updatedLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Delete Link
export const deleteLink = async (req, res) => {
  const { id } = req.params;

  try {
    const link = await Link.findById(id);
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    await Link.findByIdAndDelete(id);
    res.json({ message: 'Link deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Public Links by username
export const getPublicLinks = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ name: username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const links = await Link.find({ userId: user._id }).sort({ createdAt: -1 });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
