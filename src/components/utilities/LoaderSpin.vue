<template>
    <div class="flex justify-center items-center mb-4 mt-2">
        <div class="animate-spin  ">

            <img class="bg-np-fill rounded" :class="`h-${height} w-${width}`" src="/9p-logo-empty-filled-sq.png" >
        </div>
    </div>
</template>

<script>

export default {
    props: {
        height: {
            default: 4,
            type: Number
        },
        width: {
            default: 4,
            type: Number
        }
    }
}

</script>

<style>
@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
