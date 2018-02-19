<template>
    <div>
        <navigation
          :xml = 'xml'
          :sdon = 'sdon'
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
import { Bus } from './bus.js';

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
        // Initializes the values based on the uploaded xml
        init(data) {
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
        // Updates the saved xml data based on the json data
        makeXML() {
            this.xml = this.x2js.json2xml_str(this.json);
        },
        // Creates an easily readable file from the JSON data
        makeSDON() {
            this.sdon = sdon.createSDON(JSON.stringify(this.json, null, 2));
        },
        // Applies the changes made to the level across all files
        updateLevel() {
            this.makeXML();
            this.makeSDON();
        },
        // Resetthe app back to its initial state
        reset() {
            this.xml = this.json = this.sdon = null;
        }
    },
    // lifecycle hooks
    created() {
        Bus.$on('initAppData', this.init);
        Bus.$on('resetAppData', this.reset);
    }
}
</script>

<style>

</style>
