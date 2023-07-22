const { registration, login, loadUser, updateProfile, allUser, singleUser, password, PutUserInfo } = require("../service/users")

exports.register = async (req, res) => {
  const { status, code, message, token, user } = await registration({
    body:req.body,
    ...req.body,
    res:res
  });
  res.status(code).json({ code, status, message, token, user });
};
  
exports.login = async (req, res) => {
  const { status, code, message, token, user } = await login({
    body:req.body,
    ...req.body,
    res: res
  });
  res.status(code).json({ code, status, message, token, user });
};
exports.update = async (req, res) => {
  const { status, code, message } = await updateProfile({ ...req.body, id:req.params.id });
  res.status(code).json({ code, status, message });
};

exports.loadUser = async (req, res) => {
  const { status, code, message, user } = await loadUser({ req:req});
  res.status(code).json({ code, status, message, user });
};

exports.users = async (req, res) => {
  const { status, code, message, users } = await allUser();
  res.status(code).json({ code, status, message, users });
};

exports.user = async (req, res ) => {
  const { status, code, message, user } = await singleUser({ id:req.params.id});
  res.status(code).json({ code, status, message, user });
};

exports.changePassword = async (req, res ) => {
  const { status, code, message } = await password({ ...req.body, id:req.params.id});
  res.status(code).json({ code, status, message });
};

exports.putUserInfo = async (req, res ) => {
  const { status, code, message } = await PutUserInfo({ ...req.body, id:req.params.id});
  res.status(code).json({ code, status, message });
};