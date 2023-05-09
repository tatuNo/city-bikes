const { app, start } = require("./app");

const { PORT } = require("./utils/config");

app.listen(PORT, async () => {
  await start();
  console.log(`Server running on port ${PORT}`);
});
