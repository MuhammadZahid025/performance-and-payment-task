export default () => ({
    database: {
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'mypassword',
      name: process.env.DB_NAME || 'nestjs_db',
    },
    app: {
      port: parseInt(process.env.APP_PORT|| '3000', 10) || 3000,
    },
    
  });
  