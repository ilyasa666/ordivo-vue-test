import { createApp } from "vue";
import { Button, Input, List } from "ant-design-vue";
import infiniteScroll from "vue-infinite-scroll";
import App from "./App.vue";
import "./index.css";

const app = createApp(App);

app.use(Button);
app.use(Input);
app.use(List);
app.use(infiniteScroll);

app.mount("#app");
