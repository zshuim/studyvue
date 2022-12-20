<template>
    <div class="component_searchBox" >
        <el-input style="width:200px; align-items: center;
    text-align: center;" placeholder="请输入要查询内容" v-model="searchInfo">
        <el-button slot="append" icon="el-icon-search" @click="consol_Info"></el-button></el-input>  
    </div>
</template>

<script>
export default {
    data(){
        return{
            searchInfo:"",
        }
    },
    methods:{
        consol_Info(){
            console.log(this.searchInfo);
        },
    },
}
</script>