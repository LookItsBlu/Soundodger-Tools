<template lang="html">
    <div>
        <h1>Soundodger Tools</h1>
        <ul>
            <li><router-link to="/">index</router-link></li>
            <li><router-link to="/shift">shift</router-link></li>
            <li><router-link to="/enemyRandomizer">Enemy Randomizer</router-link></li>
            <li><router-link to="/frameToBullet">Frame to Bullet</router-link></li>
            <li><router-link to="/schemify">Schemify</router-link></li>
        </ul>

        <levelIO
          :xml = 'xml'
          :sdon = 'sdon'
        >
        </levelIO>
    </div>
</template>

<script>
import levelIO from './levelIO.vue'

export default {
    props: ['xml', 'sdon'],
    components: {
        'levelIO': levelIO
    }
}
</script>

<style lang="css">

</style>
