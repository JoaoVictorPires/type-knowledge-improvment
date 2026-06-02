import { app } from './server/server';

app.listen(process.env.PORT || 3030, () => {
  console.log('Server is running on port ' + (process.env.PORT || 3030));
});