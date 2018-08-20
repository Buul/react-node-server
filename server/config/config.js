export default {
  database: "db",
  username: "",
  password: "",
  params: {
    dialect: "sqlite",
    storage: `${process.env.REACT_APP_DB.trim()}_db.sqlite`,
    define: {
      underscored: true
    }
  }
};
