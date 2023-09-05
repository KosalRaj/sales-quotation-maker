import { cleanEnv } from 'envalid'
import { port, str } from 'envalid/dist/validators'

export default cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
  MONGO_CONNECTION_STRING: str(),
  PORT: port(),
  JWT_SECRET: str()
})
