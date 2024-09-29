const { User } = require('../../models');

module.exports = async function createUser(user_name, user_email) {
  const user = await User.create({
    name: user_name,
    email: user_email
  });
  console.log(user.toJSON());
}

// createUser();

module.exports = async function getUser(id) {
    const user = await User.findByPk(id);
    console.log(user ? user.toJSON() : 'User not found');
  }
  
  async function getAllUsers() {
    const users = await User.findAll();
    console.log(users.map(user => user.toJSON()));
  }
  
//   getUser(1);  // 특정 사용자 조회
//   getAllUsers();  // 모든 사용자 조회
  
module.exports = async function updateUser(id, user_name) {
    const user = await User.findByPk(id);
    if (user) {
      user.name = user_name;
      await user.save();
      console.log('User updated:', user.toJSON());
    } else {
      console.log('User not found');
    }
  }
  
//   updateUser(1);
  
module.exports = async function deleteUser(id) {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      console.log('User deleted');
    } else {
      console.log('User not found');
    }
  }
  
//   deleteUser(1);
