<template lang="html">
    <div>
        <h2>Schemify</h2>
        <p>Creates a color scheme from a single given color</p>

        <form @submit.prevent='schemify'>
            <input type='color' v-model='mainColor'/>
            <input name='formSubmit' type='submit'/>
        </form>

        <div class='color-grid' v-if='suggestedColors' >
            <div
              class='color-item'
              v-for='suggestedColor in suggestedColors'
              :style="{'backgroundColor': suggestedColor.value}"
            ></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['json'],
    data() {
        return {
            mainColor: '#0099ff',
            suggestedColors: []
        }
    },
    methods: {
        schemify() {
            var p = this;

            axios.get('http://www.thecolorapi.com/scheme?hex='+p.mainColor.replace('#', '')+'&mode=quad&count=9&format=json')
            .then(resp=>{
                p.suggestedColors = resp.data.colors.map((e)=>{return e.hex});
            });
        }
    }
}
</script>

<style lang="css">
.color-item {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin: 0 10px;
}
</style>
