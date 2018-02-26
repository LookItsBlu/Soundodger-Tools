<template lang="html">
    <div>
        <h1>Soundodger Tools</h1>

        <ul>
            <li v-for='route in routes'>
                <router-link :to="route.path">{{ route.name }}</router-link>
            </li>
        </ul>

        <levelIO
          :xml = 'xml'
          :sdon = 'sdon'
        >
        </levelIO>
    </div>
</template>

<script>
import routeList from '../Routes.js'
import levelIO from './levelIO.vue'

export default {
    props: ['xml', 'sdon'],
    components: {
        'levelIO': levelIO
    },
    data() {
        return {
            routes: routeList
        }
    }
}
</script>

<style lang="css">

</style>
