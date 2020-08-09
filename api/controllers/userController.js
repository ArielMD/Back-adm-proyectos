class UserController {
  async getUser(req, res) {
    console.log("getUser");
  }

  async getUsers(req, res) {
    console.log("getUsers");
  }

  async postUser(req, res) {
    console.log("postUser");
  }

  async updateUser(req, res) {
    console.log("updateUser");
  }

  async deleteUser(req, res) {
    console.log("deleteUser");
  }
}

module.exports = new UserController();
