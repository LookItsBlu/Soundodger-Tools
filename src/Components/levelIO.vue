<template lang="html">
    <div class='upload'>
        <label>xml / sdon file: </label>
        <input type='file' name='level-import' accept='.xml, .sdon' @change='getFile($event)'>
        <br />
        <div class="level-download" v-if='filename'>
            <span>Download as:</span>
            <button type='button' v-if='xml' @click="downloadFile('xml')">XML</button>
            <button type='button' v-if='sdon' @click="downloadFile('sdon')">SDON</button>
        </div>
    </div>
</template>

<script>
import { Bus } from '../bus.js';
//@click.prevent="downloadFile('xml')"
export default {
    props: ['xml', 'sdon'],
    data() {
        return {
            filename: null
        }
    },
    methods: {
        getFile(event) {
            var p = this;
            var reader = new FileReader();
            p.filename = event.target.files[0] || null;

            if(p.filename) {
                p.filename = p.filename.name.split(/\.([a-z]*)$/).slice(0, -1);

                reader.readAsText(event.target.files[0]);
                reader.onload = function(){
                    Bus.$emit('initAppData', [p.filename[1], reader.result]);
                }
            }
            else {
                Bus.$emit('resetAppData');
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
