<template>
    <div class="content">
        <slot></slot>
    </div>
</template>

<script>

export default {
  name: 'content-component'
}
</script>

<style scoped>
.content {
  position: absolute;
  width: 100%;
  height: 765px;
  display: flex;
  align-items: center;
}
</style>
