<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .overlay {
    background-color: #757ec9;
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>
