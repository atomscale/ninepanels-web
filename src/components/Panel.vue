<template>
    <div>
        {{ this.panel }} via props
    </div>
</template>

<script>



export default {
  props: {
    panel: {type: Object}
  }
}

</script>