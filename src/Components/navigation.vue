<template lang="html">
    <div>
        <h1>Soundodger Tools</h1>
        <ul>
            <li><router-link to="/">index</router-link></li>
            <li><router-link to="/shift">shift</router-link></li>
            <li><router-link to="/enemyRandomizer">Enemy Randomizer</router-link></li>
            <li><router-link to="/frameToBullet">Frame to Bullet</router-link></li>
        </ul>

        <div class='upload'>
            <label>xml / sdon file: </label>
            <input type='file' name='level-import' accept='.xml, .sdon' @change='getFile($event)'>
            <br />
            <div class="level-download" v-if='filename'>
                <span>Download as:</span>
                <button type='button' v-if='xml' @click.prevent="downloadFile('xml')">XML</button>
                <button type='button' v-if='sdon' @click.prevent="downloadFile('sdon')">SDON</button>
            </div>
        </br/>
        </div>
    </div>
</template>

<script>
export default {
    props: ['xml', 'sdon'],
    data() {
        return {
            filename: []
        }
    },
    methods: {
        getFile(event) {
            var p = this;
            var reader = new FileReader();
            this.filename = event.target.files[0].name.split(/\.([a-z]*)$/).slice(0, -1);

            reader.readAsText(event.target.files[0]);
            reader.onload = function(){
                p.$emit('init', [p.filename[1], reader.result]);
            }
        },
        downloadFile(type) {
            var element = document.createElement('a');
            if(type=='xml') {
                element.setAttribute('href', 'data:application/xml;charset=utf-8,' + encodeURIComponent(this.xml));
                element.setAttribute('download', this.filename[0] + '.xml');
            }
            else if(type=='sdon') {
                element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(this.sdon));
                element.setAttribute('download', this.filename[0] + '.sdon');
            }

            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    }
}
</script>

<style lang="css">

</style>
