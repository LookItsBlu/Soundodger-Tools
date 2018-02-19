<template lang="html">
    <div>
        <h2>Enemy Randomizer</h2>
        <p>Assigns random ennemies to every bullets</p>

        <form @submit.prevent='randomize'>

            <input name='formSubmit' type='submit'/>
        </form>
    </div>
</template>

<script>
export default {
    props: ['json'],
    data() {
        return {

        }
    },
    methods: {
        randomize() {
            var p = this;
            this.json.Song.Script.forEach(function(marker) {
                if(!marker._warpType)
                    marker._enemies = Math.round(Math.random()*parseInt(p.json.Song.Info._enemies)).toString();
            });
            this.$emit('updateLevel');
        }
    }
}
</script>

<style lang="css">

</style>
