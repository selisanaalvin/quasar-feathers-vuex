<template>
<div class="q-pa-md">
    <q-btn @click="getTodo">Refresh</q-btn>
    <!-- <q-btn v-for="todo in getTodo" :key="todo.id">{{todo.msg}}</q-btn> -->
    <q-input v-model="msg" label="Todo ?"/>
    <q-btn @click="create">Add</q-btn>
    <!-- <q-btn @click="getData(msg)">Search</q-btn> -->
    <!-- <q-btn @click="getAll">Refresh</q-btn> -->
    <br>
             <q-list bordered separator>
                <q-item v-for="(t,i) in todos"  :key="i" clickable v-ripple>
                     
                    <q-item-section avatar>
                    <div class="q-gutter-sm">
                        <q-checkbox @click.native="update(t)" :value="t.isDone" />
                       </div>
                    <q-icon name="" />
                    </q-item-section>
                    <q-item-section :style="{'text-decoration':(t.isDone?'line-through':'')}" >{{t.desc}}</q-item-section>
                    <q-item-section side>
                        <q-btn @click="remove(t.desc)" icon="delete" color="negative" round size="xs">

                        </q-btn>
                        
                    </q-item-section>
                
                </q-item>
             </q-list> 
        </div>

</template>

<script>
export default {
    data () {
        return {
            msg: '',
            todos: []
        }
    },
    mounted () {
        this.todos = this.$store.getters['todo/getTodo']
    },
    methods:{
        getTodo () {
            this.todos = this.$store.getters['todo/getTodo']
        },
        create () {
            this.$store.dispatch('todo/insertTodo',this.msg)
        },
        update (data) {
             this.$store.dispatch('todo/updateTodo',data)
        },
        remove (data) {
             this.$store.dispatch('todo/deleteTodo',data)
        },
    }
}
</script>