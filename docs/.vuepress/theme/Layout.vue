<template>
    <div class="theme-container">
        <Content/>
    </div>
</template>
<script>
export default {
  created(){
      console.log(this.$site)
      console.log(this.$page)
  }
}
</script>