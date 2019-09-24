// eslint-disable-next-line consistent-return
function adminToken(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send('Access Denied, Admin Access Only');

  next();
}
module.exports = adminToken;
