<template>
    <div>
        manage
    </div>
</template>
<script>
import loginMixin from '@mixins/login'
export default {
  mixins: [loginMixin],
  created () {
    if (this.isLogined()) {
      console.log('logined')
      return
    }
    console.log('not logined')
  }
}
</script>
