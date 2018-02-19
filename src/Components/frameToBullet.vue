<template lang="html">
    <div>
        <h2>Frame to Bullet</h2>
        <p>Adds a bullet every frame</p>

        <form @submit.prevent='frameToBullet'>
            <input type='startTime' step='any' v-model='startTime'/>
            <input type='endTime' step='any' v-model='endTime'/>
            <input name='formSubmit' type='submit'/>
        </form>
    </div>
</template>

<script>
export default {
    props: ['json'],
    data() {
        return {
            startTime: 0,
            endTime: 0,
            bullet(){
                return {
                    "_time": "0",
                    "_shotType": "normal",
                    "_bulletType": "nrm1",
                    "_aim": "mid",
                    "_offset0": "0",
                    "_amount0": "1",
                    "_angle0": "0",
                    "_speed0": "4"
                }
            }
        }
    },
    methods: {
        frameToBullet() {
            var p = this;
            var firstTime = p.startTime-(1/30);

            console.log((p.endTime - p.startTime)*30);

            while(firstTime+(1/30)<p.endTime) {
                firstTime += 1/30;
                var newBullet = new p.bullet;
                newBullet._time = firstTime.toString();
                this.json.Song.Script.push(newBullet);
            }

            this.$emit('updateLevel');
        }
    }
}
</script>

<style lang="css">

</style>
