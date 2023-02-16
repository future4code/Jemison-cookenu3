import {app} from './app';
import { recipeRouter } from './routes/recipeRouter';
import { userRouter } from './routes/userRouter';
import { loginRouter } from './routes/loginRouter';
import { followRouter } from './routes/followRouter';

app.use('/', loginRouter)

app.use('/user', userRouter)

app.use('/recipe', recipeRouter)

app.use('/follow', followRouter)