import index from './Components/index.vue'
import shift from './Components/shift.vue'
import enemyRandomizer from './Components/enemyRandomizer.vue'
import frameToBullet from './Components/frameToBullet.vue'
import Schemify from './Components/schemify.vue'

export default [
    { path: '/', component: index },
    { path: '/shift', component: shift },
    { path: '/enemyRandomizer', component: enemyRandomizer },
    { path: '/frameToBullet', component: frameToBullet },
    { path: '/schemify', component: Schemify }
]
