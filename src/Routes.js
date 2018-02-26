import index from './Components/index.vue'
import shift from './Components/shift.vue'
import enemyRandomizer from './Components/enemyRandomizer.vue'
import frame2bullet from './Components/frame2bullet.vue'
import schemify from './Components/schemify.vue'
import XMLmerger from './Components/XMLmerger.vue'
import bulletAlign from './Components/bulletAlign.vue'

export default [
    { path: '/', name: 'index', component: index },
    { path: '/shift', name: 'shift', component: shift },
    { path: '/enemy-randomizer', name: 'Enemy Randomizer', component: enemyRandomizer },
    { path: '/frame2bullet', name: 'Frame to Bullet', component: frame2bullet },
    { path: '/schemify', name: 'Schemify', component: schemify },
    { path: '/XML-merger', name: 'XML Merger', component: XMLmerger }//,
    //{ path: '/bullet-align', name: 'Bullet Align', component: bulletAlign }
]
