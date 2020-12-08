import { SetupContext } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

const E = (prop: { prop: string; e: number }, ctx: SetupContext) => {
  return <span>{prop.prop}</span>
}

export default () => (
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <E prop="hello world" e={1} />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
)
