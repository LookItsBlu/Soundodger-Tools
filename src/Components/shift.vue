<template lang="html">
    <div>
        <h2>Shift</h2>
        <p>Moves Bullets a given amount of second</p>

        <form @submit.prevent='shift'>
            <input type='number' step='any' v-model='shiftAmnt'/>
            <input name='formSubmit' type='submit'/>
        </form>
    </div>
</template>

<script>
export default {
    props: ['json'],
    data() {
        return {
            shiftAmnt: 0
        }
    },
    methods: {
        shift() {
            var p = this;
            this.json.Song.Script.forEach(function(marker) {
              marker._time = (parseFloat(marker._time) + parseFloat(p.shiftAmnt)).toString();
            });
            this.$emit('updateLevel');
        }
    }
}
</script>

<style lang="css">

</style>
