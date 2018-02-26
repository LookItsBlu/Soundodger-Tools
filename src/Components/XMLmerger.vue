<template lang="html">
    <div>
        <h2>XML merger</h2>
        <p>merge 2 or more xml files into one xml file</p>

        <label for='xml-merger-import'>Add a new XML file: </label>
        <input
          type='file'
          id='xml-merger-import'
          ref='xmlMergerInput'
          accept='.xml'
          @change='addXML($event)'
          >
        <li v-for='file in files'>
            {{ file.name }}
            <button type='button' @click.prevent='removeXML(file)'>Remove</button>
        </li>
        <br/>
        <button type='button' @click='merge()'>Merge XML</button>
    </div>
</template>

<script>
import X2JS from '../script/xml2json.min.js';

export default {
    props: ['json'],
    data() {
        return {
            x2js: new X2JS(),
            files: []
        }
    },
    methods: {
        merge() {
            let spinrates = [];
            let timewarps = [];
            let bullets = [];

            if(this.json) {
                this.json.Song.Script.forEach(marker=>{
                    if(marker._warpType)
                        marker._warpType == 'spinRate' ? spinrates.push(marker) : timewarps.push(marker);
                    else
                        bullets.push(marker);
                });
            }

            this.files.forEach(elem=>{
                elem.data.Song.Script.forEach(marker=>{
                    if(marker._warpType)
                        marker._warpType == 'spinRate' ? spinrates.push(marker) : timewarps.push(marker);
                    else
                        bullets.push(marker);
                });
            });

            spinrates.sort(function(a, b) { return parseFloat(a._time) - parseFloat(b._time); });
            timewarps.sort(function(a, b) { return parseFloat(a._time) - parseFloat(b._time); });
            bullets.sort(function(a, b) { return parseFloat(a._time) - parseFloat(b._time); });

            spinrates = spinrates.concat(timewarps);
            spinrates = spinrates.concat(bullets);

            this.json.Song.Script = spinrates;

            this.$emit('updateLevel');
        },
        addXML(event) {
            var p = this;
            var reader = new FileReader();
            reader.readAsText(event.target.files[0]);
            reader.onload = function(){
                p.files.push({
                    name: event.target.files[0].name,
                    data: p.x2js.xml_str2json(reader.result)
                });
                p.$refs.xmlMergerInput.value = '';
            }
        },
        removeXML(file) {
            this.files.splice(this.files.indexOf(file), 1);
        }
    }
}
</script>

<style lang="css">

</style>
