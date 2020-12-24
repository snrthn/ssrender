// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { createRouter } from './router'

Vue.config.productionTip = false

var router = createRouter();

export function createApp () {
  var app = new Vue({
    router,
    render: h => h (App)
  });
  return { app, router}
}
