const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminControllers");

router.post("/api/admins/login", adminController.loginAdmin);
router.post("/api/admins/logout", adminController.logoutAdmin);
router.get('/api/admins/contacts', adminController.getAllContacts);
router.get('/api/admins/suggestions', adminController.getAllSuggestions);
router.get('/api/admins/issues', adminController.getAllIssues);
router.get('/api/admins/reviews', adminController.getAllReviews);
router.post('/api/admins/updateIssue', adminController.updateIssueProgress);
router.post("/api/admins/createAnnouncement", adminController.createAnnouncement);
router.get("/api/admins/announcements", adminController.getAnnouncements);
router.delete("/api/admins/deleteAnnouncement/:id", adminController.deleteAnnouncement);
router.get('/admin/viewFeedback', (req, res) => {
  res.render('admin/viewFeedback', {
    title: "Feedback: Ones Café",
    css: [
      'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css',
      '/css/admin/general.css',
      '/css/admin/sidebar.css',
      '/css/admin/viewFeedback.css'
    ],
    js: [
      'https://kit.fontawesome.com/bbd49eb172.js',
      '/js/admin/dashboard.js',
      '/js/admin/main.js',
      '/js/admin/viewFeedback.js'
    ]
  });
});

router.get('/admin/announcements', (req, res) => {
    res.render('admin/announcements', {
      title: "Announcements: Ones Café",
      css: [
        'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css',
        '/css/admin/general.css',
        '/css/admin/sidebar.css',
        '/css/admin/announcements.css'
      ],
      js: [
        'https://kit.fontawesome.com/bbd49eb172.js',
        '/js/admin/dashboard.js',
        '/js/admin/main.js',
        '/js/admin/announcement.js'
      ]
    });
  });

module.exports = router;
