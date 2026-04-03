const defaultHeaderNavigation = {
  allCategory: {
    label: "All category",
    to: "/category/AllCategory",
  },
  primaryLinks: [
    { label: "Hot offers", to: "/category/AllCategory" },
    { label: "Gift boxes", to: "/gift-boxes" },
    { label: "Projects", to: "/projects" },
    { label: "Menu items", to: "/menu-items" },
  ],
  helpLinks: [
    { label: "Help Center", to: "/help-center" },
    { label: "Contact Us", to: "/contact-us" },
  ],
};

export const getHeaderNavigation = async (req, res) => {
  try {
    // Backend-driven payload for frontend navbar.
    // Can be replaced with DB-managed content later.
    res.status(200).json(defaultHeaderNavigation);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch header navigation",
      error: error.message,
    });
  }
};
