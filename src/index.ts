import {app} from './app';
import { recipeRouter } from './routes/recipeRouter';
import { userRouter } from './routes/userRouter';
import { loginRouter } from './routes/loginRouter';

app.use('/', loginRouter)

app.use('/user', userRouter)

app.use('/recipe', recipeRouter)