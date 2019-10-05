<template>
<div class="q-pa-md">
    <!-- <q-btn @click="add">add</q-btn> -->
    <q-input v-model="msg" label="Todo ?"/>
    <q-btn @click="create">Add</q-btn>
    <q-btn @click="getData(msg)">Search</q-btn>
    <q-btn @click="getAll">Refresh</q-btn>
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
                        <q-btn @click="remove(t._id)" icon="delete" color="negative" round size="xs">

                        </q-btn>
                        
                    </q-item-section>
                
                </q-item>
             </q-list>
        </div>

</template>

<script>
import { async } from 'q';
export default {
    data(){
        return {
        msg:'',
        todos:[]
        }
    },
    async mounted(){
          const aps = await this.$appfeathers.service('todos').find({query:{$limit:100}});
            this.todos=aps.data;
            
            this.$appfeathers.service('todos').on('created',(res)=>{
                console.log('Created Data',res.data)
                this.getAll()
            })

            this.$appfeathers.service('todos').on('patched',(res)=>{
                console.log('Data Updated',res.data) 
                this.getAll()

            })

            this.$appfeathers.service('todos').on('removed',(res)=>{
                console.log('Removed Data',res.data)
                this.getAll()

            })
    },
    methods:{
        getAll:async function(){
            const aps = await this.$appfeathers.service('todos').find({query:{$limit:100}});
            this.todos = aps.data;
            console.log(aps.data)
        },
        getData:async function(msg){
            console.log(msg)
            const aps = await this.$appfeathers.service('todos').find({
                query:{ desc:msg }
            });
            this.todos = aps.data;
            console.log('Searching : ',aps.data)
        },
        create:async function(){

            await this.$appfeathers.service('todos').create({
                desc:this.msg,
                isDone:false,
            }).then((res)=>{
                this.msg=''
            })  

            
        },
        update:async function(data){
            await this.$appfeathers.service('todos').patch(data._id,{
                isDone:!data.isDone
            })    

            
        },
        remove:async function(id){
            await this.$appfeathers.service('todos').remove(id)
              
            
        }
        
    }
}
</script>