export default () => ({
    port: parseInt(process.env.PORT, 10),
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username:process.env.DATABASE_USERNAME,
      password:process.env.DATABASE_PASSWORD,
      name:process.env.DATABASE_NAME,
      sync:process.env.DATABASE_SYNC=="true",
      logging:process.env.DATABASE_LOGGING=="true"
    },
    jwt:{
      secret:process.env.JWT_SECRET,
      expiresIn:process.env.JWT_EXPIRESIN,
      queryAccessTokenKey:process.env.QUERY_ACCESS_TOKEN_KEY
    },
    media:{
      validUploadsMimeType:process.env.VALID_UPLOADS_MIME_TYPES.split(',')||[],
      maxFileSize:parseInt(process.env.MAX_FiLE_SIZE_IN_BYTES, 10),
      uploadDirectory: process.env.UPLOAD_DIRECTORY
    },
    cors:{
      allowAllOrigins:process.env.ALLOW_ALL_ORIGINS=="true",
      allowedOrigins:process.env.ALLOWED_ORIGINS.split(',')||[]
    }
  });