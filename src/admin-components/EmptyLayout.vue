<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
    name: "EmptyLogin",
    components: {
        RouterView,
    },

    setup() {

        return {

        }
    }
})
</script>

<template>
    <div class="contain">
        <div class="header">
            <div>hello</div>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
        <div class="footer">
        </div>
    </div>
</template>

<style lang="scss" scoped></style>