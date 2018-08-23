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
  },
  jwtSecret: "SeConduct0r",
  jwtSession: { session: false },
  cors: {
    origin: "*",
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Content-Length",
      "X-Requested-With",
      "Accept"
    ],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
};
