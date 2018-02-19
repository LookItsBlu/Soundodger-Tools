<template>
    <div>
        <navigation
          :xml = 'xml'
          :sdon = 'sdon'
          @init  = 'init'
        >
        </navigation>
        <router-view
          :json = 'json'
          @updateLevel = 'updateLevel'
        >
        </router-view>
    </div>
</template>

<script>
import X2JS from './script/xml2json.min.js';
import sdon from './script/sdon.js';
import navigation from './Components/navigation.vue';

export default {
    components: {
        'navigation': navigation
    },
    data () {
        return {
            x2js: new X2JS(),
            xml: null,      // Original level file, what is used by the game
            json: null,     // JSONified level file, what is used by this program
            sdon: null      // SDONified level file, json file made easily readable for humans
        }
    },
    methods: {
        init(data) {        // Initializes the values based on the uploaded xml
            if(data[0] == 'xml') {
                this.xml = data[1];
                this.json = this.x2js.xml_str2json(this.xml);
                this.makeSDON();
            }
            else if(data[0] == 'sdon') {
                this.sdon = data[1];
                this.json = sdon.translateSDON(this.sdon);
                this.makeXML();
            }
        },
        makeXML() {         // Updates the saved xml data based on the json data
            this.xml = this.x2js.json2xml_str(this.json);
        },
        makeSDON() {        // Creates an easily readable file from the JSON data
            this.sdon = sdon.createSDON(JSON.stringify(this.json, null, 2));
        },
        updateLevel() {
            //this.json = newjson;
            this.makeXML();
            this.makeSDON();
        }
    }
}
</script>

<style>

</style>
