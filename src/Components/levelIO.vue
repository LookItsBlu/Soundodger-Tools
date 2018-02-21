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
        <div class='sdon-format-select'>
            <span>SDON file format:</span>
            <select v-model="selected_format">
                <option v-for="format in sdon_formats">{{ format }}</option>
            </select>
        </div>
    </div>
</template>

<script>
import { Bus } from '../bus.js';
import formats from '../script/sdon.formats.js';

export default {
    props: ['xml', 'sdon'],
    data() {
        return {
            filename: [],
            selected_format: 'default'
        }
    },
    computed: {
        sdon_formats() {
            return Object.keys(formats);
        }
    },
    watch: {
        selected_format(new_val, old_val) {
            if(this.filename.length)
                this.sdon.updateFormat(new_val);
        }
    },
    methods: {
        getFile(event) {
            var p = this;
            var reader = new FileReader();
            p.filename = [];

            if(event.target.files[0]) {

                let parseFilename = event.target.files[0].name.split('.');

                // last word of the file separated by a dot is the extension
                p.filename[0] = parseFilename.pop();
                // second to last word of the file separated by a dot
                // could be a format name
                let nextVal = parseFilename[parseFilename.length-1];
                if(p.filename[0]=='sdon' && p.sdon_formats.indexOf(nextVal)!=-1) {
                    p.filename[1] = parseFilename.pop();
                    p.selected_format = p.filename[1];
                }
                else {
                    p.filename[1] = null;
                }
                // the rest is the filename, put any dot back
                // where they should and all it to the array
                p.filename[2] = parseFilename.join('.');

                reader.readAsText(event.target.files[0]);
                reader.onload = function(){
                    Bus.$emit('initAppData', [...p.filename, reader.result]);
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
                element.setAttribute('download', this.filename[2] + '.xml');
            }
            else if(type=='sdon') {
                element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(this.sdon.output));
                element.setAttribute('download', this.filename[2] + '.' + this.sdon.format + '.sdon');
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
